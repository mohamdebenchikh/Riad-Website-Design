import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: 'Hammam & Spa Rituals',
    description: 'Traditional black soap exfoliation and argan oil massage in our authentic steam bath',
    image: '/images/exp-hammam.jpg',
  },
  {
    title: 'Medina Guided Tours',
    description: 'Walk the 9,000 alleyways with our expert guides revealing hidden workshops and ancient madrasas',
    image: '/images/exp-tour.jpg',
  },
  {
    title: 'Cooking Classes',
    description: 'Learn the secrets of Moroccan cuisine from market selection to final presentation',
    image: '/images/exp-cooking.jpg',
  },
  {
    title: 'Sunset Rooftop Tea',
    description: 'Mint tea ceremony as the call to prayer echoes across the golden rooftops of Fes',
    image: '/images/exp-tea.jpg',
  },
];

export default function Experiences() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = grid.querySelectorAll('.exp-card');

    // Header entrance
    const header = section.querySelectorAll('.exp-header');
    gsap.fromTo(
      header,
      { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
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
      cards,
      { opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section
      id="experiences"
      ref={sectionRef}
      style={{ backgroundColor: '#fdfaf7', padding: '120px 24px' }}
    >
      <div style={{ maxWidth: 1200 }} className="mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="exp-header"
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
            EXPERIENCES
          </p>
          <h2
            className="exp-header"
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
            CURATED MOMENTS
            <br />
            IN FES
          </h2>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {experiences.map((exp) => (
            <div
              key={exp.title}
              className="exp-card group cursor-pointer overflow-hidden"
              style={{ borderRadius: 8 }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-400"
                  style={{
                    backgroundColor: 'rgba(139,115,85,0.3)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = '0.33';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = '1';
                  }}
                />
              </div>
              <div style={{ padding: '24px 0' }}>
                <h3
                  style={{
                    fontSize: 20,
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 400,
                    letterSpacing: '0.03em',
                    color: '#3a2520',
                    marginBottom: 8,
                  }}
                >
                  {exp.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: '#8b7355',
                  }}
                >
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
