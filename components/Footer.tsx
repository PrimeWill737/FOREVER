import Link from 'next/link';

function HeartIcon() {
  return (
    <svg className="footer__heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

interface FooterLink {
  id: string;
  label: string;
  url: string;
  sort_order: number;
}

interface FooterProps {
  links?: FooterLink[];
}

export function Footer({ links = [] }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">
          <div className="footer__col">
            <h3 className="footer__heading">Navigate</h3>
            <ul className="footer__list">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/our-story">Our Story</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/rsvp">RSVP</Link></li>
            </ul>
          </div>
          <div className="footer__col footer__col--cta">
            <h3 className="footer__heading">William & Esther</h3>
            <Link href="/rsvp" className="btn btn--secondary">RSVP</Link>
          </div>
          {links.length > 0 && (
            <div className="footer__col">
              <h3 className="footer__heading">Follow</h3>
              <ul className="footer__list">
                {links.map((link) => (
                  <li key={link.id}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p className="footer__copy">
            William & Esther · Forever
            <Link href="/admin" className="footer__copy-icon" aria-label="Admin">
              <HeartIcon />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
