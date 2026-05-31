import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const navLinks = [
  { label: 'THE RIAD', href: '#story' },
  { label: 'SUITES', href: '#suites' },
  { label: 'DINING', href: '#dining' },
  { label: 'WELLNESS', href: '#experiences' },
  { label: 'GALLERY', href: '#experiences' },
  { label: 'JOURNAL', href: '#guestbook' },
  { label: 'CONTACT', href: '#footer' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Logo letter animation
    if (logoRef.current) {
      const letters = logoRef.current.querySelectorAll('.logo-letter');
      gsap.fromTo(
        letters,
        { clipPath: 'inset(100% 0 0 0)', y: 20 },
        {
          clipPath: 'inset(0% 0 0 0)',
          y: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
          delay: 0.2,
        }
      );
    }

    // Nav links and button fade in
    const items = linksRef.current?.querySelectorAll('.nav-item');
    if (items) {
      gsap.fromTo(
        items,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, delay: 0.5, ease: 'power3.out' }
      );
    }

    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.8, ease: 'power3.out' }
      );
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const logoText = 'RIAD AL ANDALOUS';

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        height: 72,
        backgroundColor: scrolled ? 'rgba(253,250,247,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div
        className="flex items-center justify-between h-full mx-auto px-6"
        style={{ maxWidth: 1200 }}
      >
        {/* Logo */}
        <div ref={logoRef} className="flex items-center">
          {logoText.split('').map((char, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                verticalAlign: 'top',
              }}
            >
              <span
                className="logo-letter"
                style={{
                  display: 'inline-block',
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  color: '#3a2520',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            </span>
          ))}
        </div>

        {/* Desktop Nav Links */}
        <div ref={linksRef} className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="nav-item relative"
              style={{
                fontSize: 12,
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 400,
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                color: '#3a2520',
                textDecoration: 'none',
              }}
            >
              {link.label}
              <span
                className="absolute bottom-0 left-1/2 h-px bg-terracotta transition-transform duration-400"
                style={{
                  width: '100%',
                  transform: 'translateX(-50%) scaleX(0)',
                  transformOrigin: 'center',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateX(-50%) scaleX(1)';
                }}
              />
            </a>
          ))}
        </div>

        {/* Reserve Button */}
        <button
          ref={btnRef}
          className="hidden lg:block transition-all duration-300 hover:scale-102"
          style={{
            backgroundColor: '#c67b5c',
            color: '#fdfaf7',
            fontSize: 12,
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            padding: '14px 28px',
            borderRadius: 0,
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = '#a85d40';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = '#c67b5c';
          }}
          onClick={() => {
            document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          RESERVE
        </button>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span
            className="block w-6 h-px transition-transform duration-300"
            style={{
              backgroundColor: '#3a2520',
              transform: mobileOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
            }}
          />
          <span
            className="block w-6 h-px transition-opacity duration-300"
            style={{
              backgroundColor: '#3a2520',
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-px transition-transform duration-300"
            style={{
              backgroundColor: '#3a2520',
              transform: mobileOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden absolute top-full left-0 right-0 py-8 px-6"
          style={{
            backgroundColor: 'rgba(253,250,247,0.98)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontSize: 14,
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 400,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  color: '#3a2520',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </a>
            ))}
            <button
              style={{
                backgroundColor: '#c67b5c',
                color: '#fdfaf7',
                fontSize: 12,
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                padding: '14px 28px',
                borderRadius: 0,
                border: 'none',
                cursor: 'pointer',
                marginTop: 16,
              }}
              onClick={() => {
                document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
                setMobileOpen(false);
              }}
            >
              RESERVE
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
