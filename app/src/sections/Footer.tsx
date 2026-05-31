import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const exploreLinks = [
  { label: 'The Riad', href: '#story' },
  { label: 'Suites', href: '#suites' },
  { label: 'Dining', href: '#dining' },
  { label: 'Wellness', href: '#experiences' },
  { label: 'Gallery', href: '#experiences' },
  { label: 'Journal', href: '#guestbook' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cols = footer.querySelectorAll('.footer-col');

    gsap.fromTo(
      cols,
      { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing to our newsletter!');
      setEmail('');
    }
  };

  return (
    <footer
      id="footer"
      ref={footerRef}
      style={{ backgroundColor: '#3a2520', padding: '80px 24px 40px' }}
    >
      <div
        className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
        style={{ maxWidth: 1200 }}
      >
        {/* Column 1 - Logo & Description */}
        <div className="footer-col">
          <p
            style={{
              fontSize: 14,
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              color: '#fdfaf7',
              marginBottom: 20,
            }}
          >
            RIAD AL ANDALOUS
          </p>
          <p
            style={{
              fontSize: 14,
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#8b7355',
              maxWidth: 260,
            }}
          >
            A restored 17th-century palace in the heart of Fes el-Bali, offering an authentic Moroccan experience of unparalleled beauty.
          </p>
        </div>

        {/* Column 2 - Explore */}
        <div className="footer-col">
          <p
            style={{
              fontSize: 11,
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: '#fdfaf7',
              marginBottom: 24,
            }}
          >
            EXPLORE
          </p>
          <div className="flex flex-col gap-3">
            {exploreLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="transition-colors duration-300 hover:text-alabaster"
                style={{
                  fontSize: 14,
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 400,
                  color: '#8b7355',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Column 3 - Contact */}
        <div className="footer-col">
          <p
            style={{
              fontSize: 11,
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: '#fdfaf7',
              marginBottom: 24,
            }}
          >
            CONTACT
          </p>
          <div className="flex flex-col gap-3">
            <p
              style={{
                fontSize: 14,
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 400,
                lineHeight: 1.7,
                color: '#8b7355',
              }}
            >
              14 Derb El Mitter<br />
              Ain Azleten, Fes el-Bali<br />
              Fes 30000, Morocco
            </p>
            <p
              style={{
                fontSize: 14,
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 400,
                color: '#8b7355',
              }}
            >
              +212 535 63 56 00
            </p>
            <a
              href="mailto:bonjour@riadalandalous.com"
              className="transition-colors duration-300 hover:text-alabaster"
              style={{
                fontSize: 14,
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 400,
                color: '#8b7355',
                textDecoration: 'none',
              }}
            >
              bonjour@riadalandalous.com
            </a>
          </div>
        </div>

        {/* Column 4 - Follow & Newsletter */}
        <div className="footer-col">
          <p
            style={{
              fontSize: 11,
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: '#fdfaf7',
              marginBottom: 24,
            }}
          >
            FOLLOW
          </p>
          <div className="flex gap-4 mb-8">
            {/* Instagram */}
            <a
              href="#"
              className="transition-colors duration-300 hover:text-alabaster"
              style={{ color: '#8b7355' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="5" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="#"
              className="transition-colors duration-300 hover:text-alabaster"
              style={{ color: '#8b7355' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* Pinterest */}
            <a
              href="#"
              className="transition-colors duration-300 hover:text-alabaster"
              style={{ color: '#8b7355' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2.2-1.8 4-4 4" />
                <path d="M12 16l-1 6" />
              </svg>
            </a>
          </div>

          <p
            style={{
              fontSize: 11,
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: '#fdfaf7',
              marginBottom: 12,
            }}
          >
            NEWSLETTER
          </p>
          <form onSubmit={handleSubscribe} className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              style={{
                flex: 1,
                padding: '10px 12px',
                backgroundColor: '#3a2520',
                color: '#fdfaf7',
                fontSize: 13,
                fontFamily: '"DM Sans", sans-serif',
                border: '1px solid #8b7355',
                borderRight: 'none',
                borderRadius: '4px 0 0 4px',
                outline: 'none',
              }}
              required
            />
            <button
              type="submit"
              className="transition-colors duration-300 hover:bg-terracotta-dark"
              style={{
                padding: '10px 16px',
                backgroundColor: '#c67b5c',
                color: '#fdfaf7',
                fontSize: 11,
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase' as const,
                border: 'none',
                borderRadius: '0 4px 4px 0',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="mx-auto mt-16 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
        style={{
          maxWidth: 1200,
          borderTop: '1px solid rgba(139,115,85,0.2)',
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 400,
            color: '#8b7355',
          }}
        >
          2025 Riad Al Andalous. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            href="#"
            className="transition-colors duration-300 hover:text-alabaster"
            style={{
              fontSize: 12,
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              color: '#8b7355',
              textDecoration: 'none',
            }}
          >
            Privacy Policy
          </a>
          <span style={{ color: '#8b7355' }}>·</span>
          <a
            href="#"
            className="transition-colors duration-300 hover:text-alabaster"
            style={{
              fontSize: 12,
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              color: '#8b7355',
              textDecoration: 'none',
            }}
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
