import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import RippleShader from './RippleShader';

export default function Hero() {
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const shaderWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Shader container entrance
    if (shaderWrapRef.current && !prefersReducedMotion) {
      gsap.fromTo(
        shaderWrapRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out', delay: 0.1 }
      );
    }

    // Right panel content entrance
    if (rightPanelRef.current) {
      const elements = rightPanelRef.current.querySelectorAll('.hero-animate');
      gsap.fromTo(
        elements,
        { opacity: 0, y: prefersReducedMotion ? 0 : -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
          delay: 0.3,
        }
      );
    }

    // Divider line animation
    if (dividerRef.current) {
      gsap.fromTo(
        dividerRef.current,
        { width: '0%' },
        { width: '100%', duration: 1.2, ease: 'power2.inOut', delay: 0.8 }
      );
    }
  }, []);

  return (
    <section id="hero" style={{ height: '100vh', position: 'relative', display: 'flex' }}>
      {/* Left Panel - Shader */}
      <div
        ref={shaderWrapRef}
        style={{
          width: '55%',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="hidden md:block"
      >
        <RippleShader />
        {/* Noise overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.15,
            pointerEvents: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />
      </div>

      {/* Mobile Shader - Full width background */}
      <div
        className="md:hidden"
        style={{
          position: 'absolute',
          inset: 0,
          height: '50vh',
        }}
      >
        <RippleShader />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.15,
            pointerEvents: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />
      </div>

      {/* Right Panel - Content */}
      <div
        ref={rightPanelRef}
        style={{
          width: '100%',
          backgroundColor: '#fdfaf7',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 40px',
          position: 'relative',
          zIndex: 2,
        }}
        className="md:!w-[45%] pt-[50vh] md:pt-0"
      >
        <div style={{ maxWidth: 500 }}>
          <p
            className="hero-animate"
            style={{
              fontSize: 11,
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: '#8b7355',
              marginBottom: 20,
            }}
          >
            RIAD AL ANDALOUS
          </p>

          <h1
            className="hero-animate"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              letterSpacing: '0.04em',
              textTransform: 'uppercase' as const,
              lineHeight: 1.1,
              color: '#3a2520',
              marginBottom: 24,
            }}
          >
            WHERE TIME
            <br />
            STANDS STILL
          </h1>

          <p
            className="hero-animate"
            style={{
              fontSize: 16,
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#8b7355',
              maxWidth: 380,
              marginBottom: 40,
            }}
          >
            A sanctuary of serenity in the heart of Fes, where centuries of Andalusian craftsmanship meet modern luxury.
          </p>

          <div className="hero-animate flex flex-wrap gap-4">
            <button
              style={{
                backgroundColor: '#c67b5c',
                color: '#fdfaf7',
                fontSize: 12,
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                padding: '16px 32px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#a85d40';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#c67b5c';
              }}
              onClick={() => {
                document.querySelector('#suites')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              EXPLORE SUITES
            </button>
            <button
              style={{
                backgroundColor: 'transparent',
                color: '#3a2520',
                fontSize: 12,
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                padding: '16px 32px',
                border: '1px solid #d4c8b8',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = '#3a2520';
                el.style.color = '#fdfaf7';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = 'transparent';
                el.style.color = '#3a2520';
              }}
            >
              VIRTUAL TOUR
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div
        ref={dividerRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 1,
          backgroundColor: '#d4c8b8',
          width: '0%',
        }}
      />
    </section>
  );
}
