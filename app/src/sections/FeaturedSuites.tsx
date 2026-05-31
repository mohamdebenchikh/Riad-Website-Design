import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const suites = [
  {
    name: 'The Andalusian Suite',
    description: 'A grand space with hand-painted cedar ceiling and panoramic medina views',
    price: 'From €180 / night',
    image: '/images/suite-andalusian.jpg',
  },
  {
    name: 'The Garden Suite',
    description: 'Open directly onto our jasmine-scented central courtyard',
    price: 'From €220 / night',
    image: '/images/suite-garden.jpg',
  },
  {
    name: 'The Terrace Suite',
    description: 'Private rooftop terrace overlooking the ancient city at sunset',
    price: 'From €260 / night',
    image: '/images/suite-terrace.jpg',
  },
];

export default function FeaturedSuites() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cardEls = cards.querySelectorAll('.suite-card');

    // Parallax on images
    if (!prefersReducedMotion) {
      cardEls.forEach((card) => {
        const img = card.querySelector('img');
        if (img) {
          gsap.to(img, {
            y: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });
    }

    // Card entrance
    gsap.fromTo(
      cardEls,
      { opacity: 0, y: prefersReducedMotion ? 0 : 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section
      id="suites"
      ref={sectionRef}
      style={{ backgroundColor: '#f0ebe3', padding: '120px 24px' }}
    >
      <div style={{ maxWidth: 1200 }} className="mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
          <div>
            <p
              style={{
                fontSize: 11,
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 400,
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                color: '#c67b5c',
                marginBottom: 12,
              }}
            >
              OUR SUITES
            </p>
            <h2
              style={{
                fontSize: 'clamp(28px, 3vw, 36px)',
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 400,
                letterSpacing: '0.04em',
                textTransform: 'uppercase' as const,
                lineHeight: 1.2,
                color: '#3a2520',
              }}
            >
              SANCTUARIES OF
              <br />
              SERENITY
            </h2>
          </div>
          <a
            href="#suites"
            className="transition-colors duration-300 hover:text-terracotta"
            style={{
              fontSize: 12,
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: '#8b7355',
              textDecoration: 'none',
            }}
          >
            VIEW ALL SUITES →
          </a>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {suites.map((suite) => (
            <div
              key={suite.name}
              className="suite-card group cursor-pointer"
              style={{
                backgroundColor: '#fdfaf7',
                borderRadius: 8,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(58,37,32,0.06)',
                transition: 'transform 0.4s ease-out, box-shadow 0.4s ease-out',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-8px)';
                el.style.boxShadow = '0 12px 40px rgba(58,37,32,0.12)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = '0 4px 20px rgba(58,37,32,0.06)';
              }}
            >
              <div className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img
                  src={suite.image}
                  alt={suite.name}
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-103"
                />
              </div>
              <div style={{ padding: 32 }}>
                <h3
                  style={{
                    fontSize: 20,
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 400,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase' as const,
                    color: '#3a2520',
                    marginBottom: 8,
                  }}
                >
                  {suite.name}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: '#8b7355',
                    marginBottom: 16,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {suite.description}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 400,
                    color: '#c67b5c',
                    marginBottom: 16,
                  }}
                >
                  {suite.price}
                </p>
                <a
                  href="#suites"
                  className="transition-colors duration-300 hover:text-terracotta"
                  style={{
                    fontSize: 11,
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 400,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase' as const,
                    color: '#3a2520',
                    textDecoration: 'none',
                  }}
                >
                  VIEW SUITE →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
