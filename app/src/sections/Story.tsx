import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
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
        y: -60,
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
    const elements = content.querySelectorAll('.story-animate');
    gsap.fromTo(
      elements,
      { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
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
      id="story"
      ref={sectionRef}
      style={{ backgroundColor: '#fdfaf7', padding: '120px 24px' }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        style={{ maxWidth: 1200 }}
      >
        {/* Left - Image */}
        <div className="overflow-hidden rounded-lg">
          <img
            ref={imageRef}
            src="/images/story-interior.jpg"
            alt="Riad interior with carved cedarwood and zellige tiles"
            className="w-full object-cover"
            style={{ aspectRatio: '3/4' }}
          />
        </div>

        {/* Right - Content */}
        <div ref={contentRef} style={{ paddingLeft: 0 }} className="md:pl-12">
          <p
            className="story-animate"
            style={{
              fontSize: 11,
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: '#c67b5c',
              marginBottom: 20,
            }}
          >
            THE RIAD
          </p>

          <h2
            className="story-animate"
            style={{
              fontSize: 'clamp(28px, 3vw, 36px)',
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              letterSpacing: '0.04em',
              textTransform: 'uppercase' as const,
              lineHeight: 1.2,
              color: '#3a2520',
              marginBottom: 32,
            }}
          >
            A LIVING LEGACY OF
            <br />
            ANDALUSIAN ART
          </h2>

          <p
            className="story-animate"
            style={{
              fontSize: 16,
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              lineHeight: 1.8,
              color: '#8b7355',
              marginBottom: 24,
            }}
          >
            Nestled within the ancient walls of Fes el-Bali, our restored 17th-century palace welcomes you with hand-carved stucco, geometric zellige mosaics, and the gentle murmur of courtyard fountains. Each archway and alcove tells a story of the artisans who have made Fes the cultural soul of Morocco for over a thousand years.
          </p>

          <p
            className="story-animate"
            style={{
              fontSize: 16,
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              lineHeight: 1.8,
              color: '#8b7355',
              marginBottom: 40,
            }}
          >
            From the cedarwood ceilings painted with gold leaf to the tadelakt walls that cool the summer air, every surface has been lovingly preserved to offer an authentic immersion into Moroccan heritage.
          </p>

          <a
            href="#story"
            className="story-animate inline-block transition-transform duration-300 hover:translate-x-1"
            style={{
              fontSize: 12,
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: '#c67b5c',
              textDecoration: 'none',
            }}
          >
            DISCOVER OUR STORY →
          </a>
        </div>
      </div>
    </section>
  );
}
