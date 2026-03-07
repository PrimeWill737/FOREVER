'use client';

import { useState } from 'react';
import { submitRsvp } from '@/app/actions/rsvp';

export function RsvpForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setStatus('loading');
    try {
      await submitRsvp(formData);
      setStatus('success');
      setMessage('Thank you! Your response has been recorded.');
      form.reset();
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <form className="rsvp-form" onSubmit={handleSubmit}>
      <div className="rsvp-form__row">
        <label htmlFor="guest_name">Name *</label>
        <input
          id="guest_name"
          name="guest_name"
          type="text"
          required
          placeholder="Your name"
        />
      </div>
      <div className="rsvp-form__row">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
        />
      </div>
      <div className="rsvp-form__row">
        <label>Will you attend? *</label>
        <div className="rsvp-form__radio-group">
          <label>
            <input type="radio" name="attending" value="yes" required />
            Yes
          </label>
          <label>
            <input type="radio" name="attending" value="no" />
            No
          </label>
        </div>
      </div>
      <div className="rsvp-form__row">
        <label>
          <input type="checkbox" name="plus_one" value="true" />
          I will bring a plus one
        </label>
      </div>
      <div className="rsvp-form__row rsvp-form__row--hidden" data-plus-one-name>
        <label htmlFor="plus_one_name">Plus one name</label>
        <input
          id="plus_one_name"
          name="plus_one_name"
          type="text"
          placeholder="Name"
        />
      </div>
      <div className="rsvp-form__row">
        <label htmlFor="dietary">Dietary requirements</label>
        <input
          id="dietary"
          name="dietary"
          type="text"
          placeholder="e.g. Vegetarian, allergies..."
        />
      </div>
      <div className="rsvp-form__row">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Anything you'd like to say..."
        />
      </div>
      {message && (
        <p className={`rsvp-form__message rsvp-form__message--${status}`}>
          {message}
        </p>
      )}
      <button type="submit" className="btn btn--primary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Submit RSVP'}
      </button>
    </form>
  );
}
