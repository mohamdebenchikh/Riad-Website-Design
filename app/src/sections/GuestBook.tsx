import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'An oasis of tranquility in the most fascinating city in Morocco. The attention to detail in every corner of this riad is extraordinary.',
    name: 'Eleanor R.',
    location: 'London, UK — March 2025',
  },
  {
    quote: 'We came for the architecture and stayed for the hospitality. The rooftop dinners under the stars were the highlight of our trip.',
    name: 'Marc & Sophie T.',
    location: 'Paris, France — January 2025',
  },
  {
    quote: 'Riad Al Andalous is not just a hotel — it is an immersion into the soul of Morocco. We will return every year.',
    name: 'James K.',
    location: 'New York, USA — December 2024',
  },
];

export default function GuestBook() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cardEls = cards.querySelectorAll('.testimonial-card');

    // Header entrance
    const headers = section.querySelectorAll('.gb-header');
    gsap.fromTo(
      headers,
      { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Cards entrance
    gsap.fromTo(
      cardEls,
      { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cards,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section
      id="guestbook"
      ref={sectionRef}
      style={{ backgroundColor: '#fdfaf7', padding: '120px 24px' }}
    >
      <div style={{ maxWidth: 1200 }} className="mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="gb-header"
            style={{
              fontSize: 11,
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: '#c67b5c',
              marginBottom: 16,
            }}
          >
            GUEST BOOK
          </p>
          <h2
            className="gb-header"
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
            WORDS FROM
            <br />
            OUR GUESTS
          </h2>
        </div>

        {/* Testimonials */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card"
              style={{
                borderTop: '1px solid #d4c8b8',
                paddingTop: 40,
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 16,
                      color: '#c9a84c',
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontSize: 16,
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  lineHeight: 1.7,
                  color: '#3a2520',
                  marginBottom: 24,
                }}
              >
                "{t.quote}"
              </p>

              {/* Name */}
              <p
                style={{
                  fontSize: 14,
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 400,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase' as const,
                  color: '#3a2520',
                  marginBottom: 4,
                }}
              >
                {t.name}
              </p>

              {/* Location */}
              <p
                style={{
                  fontSize: 12,
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 400,
                  color: '#8b7355',
                }}
              >
                {t.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
