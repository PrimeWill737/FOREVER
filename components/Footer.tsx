import Link from 'next/link';

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
          </p>
        </div>
      </div>
    </footer>
  );
}
