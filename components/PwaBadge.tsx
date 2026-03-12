'use client';

import { useState, useEffect, useCallback } from 'react';

export function PwaBadge() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  const reloadToUpdate = useCallback(() => {
    setShowUpdate(false);
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  }, [registration]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if already installed (standalone or TWA)
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    const standaloneApple = (navigator as unknown as { standalone?: boolean }).standalone;
    if (standalone || standaloneApple) {
      setIsInstalled(true);
      setShowInstall(false);
    }

    navigator.serviceWorker.register('/sw').then((reg) => {
      setRegistration(reg);
      reg.update(); // Check for new version on each load
      if (reg.waiting) setShowUpdate(true);
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (!newWorker) return;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            setShowUpdate(true);
          }
        });
      });
    }).catch(() => {});

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });

    // Check for updates on focus
    const onFocus = () => {
      registration?.update?.();
    };
    window.addEventListener('focus', onFocus);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  useEffect(() => {
    if (!registration) return;
    const onFocus = () => registration.update?.();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [registration]);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstall(false);
      setInstallPrompt(null);
    }
  };

  if (isInstalled && !showUpdate) return null;

  return (
    <>
      {showUpdate && (
        <div className="pwa-badge pwa-badge--update" role="status">
          <span className="pwa-badge__text">New version available</span>
          <button type="button" className="pwa-badge__btn" onClick={reloadToUpdate}>
            Update
          </button>
          <button type="button" className="pwa-badge__dismiss" onClick={() => setShowUpdate(false)} aria-label="Dismiss">
            ×
          </button>
        </div>
      )}
      {showInstall && installPrompt && (
        <div className="pwa-badge pwa-badge--install" role="region" aria-label="Install app">
          <span className="pwa-badge__text">Install our app</span>
          <button type="button" className="pwa-badge__btn" onClick={handleInstall}>
            Download app
          </button>
          <button type="button" className="pwa-badge__dismiss" onClick={() => setShowInstall(false)} aria-label="Dismiss">
            ×
          </button>
        </div>
      )}
    </>
  );
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}
