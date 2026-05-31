import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Dining() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    if (!section || !image || !content) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Parallax on image
    if (!prefersReducedMotion) {
      gsap.to(image, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Content entrance
    const elements = content.querySelectorAll('.dining-animate');
    gsap.fromTo(
      elements,
      { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section
      id="dining"
      ref={sectionRef}
      style={{ backgroundColor: '#3a2520' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left - Image */}
        <div className="overflow-hidden relative">
          <img
            ref={imageRef}
            src="/images/dining-table.jpg"
            alt="Traditional Moroccan dining"
            className="w-full h-full object-cover"
            style={{ minHeight: 500 }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(201,168,76,0.1)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Right - Content */}
        <div
          ref={contentRef}
          className="flex flex-col justify-center"
          style={{ padding: 'clamp(60px, 8vw, 160px) clamp(30px, 5vw, 80px)' }}
        >
          <p
            className="dining-animate"
            style={{
              fontSize: 11,
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: '#c9a84c',
              marginBottom: 20,
            }}
          >
            DINING
          </p>

          <h2
            className="dining-animate"
            style={{
              fontSize: 'clamp(28px, 3vw, 36px)',
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              letterSpacing: '0.04em',
              textTransform: 'uppercase' as const,
              lineHeight: 1.2,
              color: '#fdfaf7',
              marginBottom: 32,
            }}
          >
            A JOURNEY OF
            <br />
            FLAVOR & TRADITION
          </h2>

          <p
            className="dining-animate"
            style={{
              fontSize: 16,
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              lineHeight: 1.8,
              color: '#d4c8b8',
              marginBottom: 40,
            }}
          >
            Our chef crafts each dish from recipes passed down through generations — fragrant tagines slow-cooked to perfection, pastilla with its delicate balance of sweet and savory, and fresh bread baked daily in the communal oven of the medina. Dine beneath the stars on our rooftop terrace or in the intimate glow of the courtyard by candlelight.
          </p>

          <div className="dining-animate">
            <button
              style={{
                backgroundColor: 'transparent',
                color: '#c9a84c',
                fontSize: 12,
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                padding: '16px 32px',
                border: '1px solid #c9a84c',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = '#c9a84c';
                el.style.color = '#3a2520';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = 'transparent';
                el.style.color = '#c9a84c';
              }}
            >
              EXPLORE OUR MENU
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
