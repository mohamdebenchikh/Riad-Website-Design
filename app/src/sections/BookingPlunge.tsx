import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plungeImages = [
  '/images/plunge-courtyard.jpg',
  '/images/plunge-salon.jpg',
  '/images/plunge-rooftop.jpg',
  '/images/plunge-hammam.jpg',
  '/images/plunge-dining.jpg',
  '/images/plunge-bedroom.jpg',
];

export default function BookingPlunge() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    suite: 'andalusian',
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Show everything without animation
      const layers = section.querySelectorAll('.plunge-wrap');
      layers.forEach((layer, i) => {
        if (i === layers.length - 1) {
          (layer as HTMLElement).style.opacity = '1';
        } else {
          (layer as HTMLElement).style.opacity = '0';
        }
      });
      if (formRef.current) {
        formRef.current.style.opacity = '1';
        formRef.current.style.pointerEvents = 'auto';
      }
      return;
    }

    // Wait for images to be ready
    const images = section.querySelectorAll('.plunge-img');
    let loadedCount = 0;
    const totalImages = images.length;

    const initAnimation = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'center center',
          end: '+=300%',
          pin: true,
          scrub: true,
        },
      });

      // Step 1: Outer arch zoom (0% to 20%)
      tl.fromTo(
        '[data-plunge-l1]',
        {
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
          scale: 1,
          rotateY: 0,
          translateZ: 0,
        },
        {
          clipPath: 'polygon(25% 5%, 75% 5%, 95% 25%, 95% 75%, 75% 95%, 25% 95%, 5% 75%, 5% 25%)',
          scale: 1.8,
          rotateY: -8,
          translateZ: -150,
          ease: 'power2.inOut',
        },
        0
      );

      // Step 2: Tunnel descent
      tl.add('tunnel', '>');

      // Layer 1 continues deeper
      tl.fromTo(
        '[data-plunge-l1]',
        {
          scale: 1.8,
          rotateY: -8,
          translateZ: -150,
          opacity: 1,
        },
        {
          scale: 3.2,
          rotateY: 15,
          translateZ: -500,
          opacity: 0.2,
          ease: 'power3.in',
        },
        'tunnel-=0.3'
      );

      // Layer 2
      tl.fromTo(
        '[data-plunge-l2]',
        {
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
          scale: 1,
          rotateY: 0,
          translateZ: 0,
        },
        {
          scale: 2.4,
          rotateY: -12,
          translateZ: -350,
          ease: 'power2.inOut',
        },
        'tunnel-=0.3'
      );

      // Layer 3
      tl.fromTo(
        '[data-plunge-l3]',
        {
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
          scale: 1,
          rotateY: 0,
          translateZ: 0,
        },
        {
          scale: 1.9,
          rotateY: 8,
          translateZ: -250,
          ease: 'power2.inOut',
        },
        'tunnel-=0.3'
      );

      // Layer 4
      tl.fromTo(
        '[data-plunge-l4]',
        {
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
          scale: 1,
          rotateY: 0,
          translateZ: 0,
        },
        {
          scale: 1.5,
          rotateY: -5,
          translateZ: -180,
          ease: 'power2.inOut',
        },
        'tunnel'
      );

      // Layer 5
      tl.fromTo(
        '[data-plunge-l5]',
        {
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
          scale: 1,
          rotateY: 0,
          translateZ: 0,
        },
        {
          scale: 1.2,
          rotateY: 3,
          translateZ: -100,
          ease: 'power2.inOut',
        },
        'tunnel+=0.2'
      );

      // Step 3: Target reveal
      tl.fromTo(
        '[data-plunge-target]',
        {
          clipPath: 'polygon(30% 10%, 70% 10%, 90% 30%, 90% 70%, 70% 90%, 30% 90%, 10% 70%, 10% 30%)',
          scale: 0.8,
          rotateY: 0,
          translateZ: 0,
          opacity: 0,
        },
        {
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
          scale: 1,
          rotateY: 0,
          translateZ: 50,
          opacity: 1,
          ease: 'power2.out',
        },
        'tunnel+=1.5'
      );

      // Step 4: Form reveal
      tl.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: 'power2.out' },
        'tunnel+=1.8'
      );
    };

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        // Small delay to ensure layout is settled
        setTimeout(initAnimation, 100);
      }
    };

    images.forEach((img) => {
      const bgImg = img as HTMLElement;
      const bgUrl = bgImg.style.backgroundImage;
      if (bgUrl) {
        const url = bgUrl.replace(/url\(["']?/, '').replace(/["']?\)/, '');
        const tempImg = new Image();
        tempImg.onload = checkAllLoaded;
        tempImg.onerror = checkAllLoaded;
        tempImg.src = url;
      } else {
        checkAllLoaded();
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will check availability and contact you shortly.');
  };

  return (
    <div
      id="booking"
      ref={sectionRef}
      className="plunge-section"
      style={{
        backgroundColor: '#3a2520',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Plunge Container */}
      <div
        className="plunge-container relative"
        style={{
          width: '45vw',
          minWidth: 300,
          height: '60vh',
          minHeight: 400,
          perspective: 1000,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Layer 1 */}
        <div
          data-plunge-l1
          className="plunge-wrap"
          style={{
            position: 'absolute',
            inset: 0,
            willChange: 'clip-path, transform, opacity',
          }}
        >
          <div
            className="plunge-img w-full h-full"
            style={{
              backgroundImage: `url(${plungeImages[0]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>

        {/* Layer 2 */}
        <div
          data-plunge-l2
          className="plunge-wrap"
          style={{
            position: 'absolute',
            inset: 0,
            willChange: 'clip-path, transform, opacity',
          }}
        >
          <div
            className="plunge-img w-full h-full"
            style={{
              backgroundImage: `url(${plungeImages[1]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>

        {/* Layer 3 */}
        <div
          data-plunge-l3
          className="plunge-wrap"
          style={{
            position: 'absolute',
            inset: 0,
            willChange: 'clip-path, transform, opacity',
          }}
        >
          <div
            className="plunge-img w-full h-full"
            style={{
              backgroundImage: `url(${plungeImages[2]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>

        {/* Layer 4 */}
        <div
          data-plunge-l4
          className="plunge-wrap"
          style={{
            position: 'absolute',
            inset: 0,
            willChange: 'clip-path, transform, opacity',
          }}
        >
          <div
            className="plunge-img w-full h-full"
            style={{
              backgroundImage: `url(${plungeImages[3]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>

        {/* Layer 5 */}
        <div
          data-plunge-l5
          className="plunge-wrap"
          style={{
            position: 'absolute',
            inset: 0,
            willChange: 'clip-path, transform, opacity',
          }}
        >
          <div
            className="plunge-img w-full h-full"
            style={{
              backgroundImage: `url(${plungeImages[4]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>

        {/* Target Layer */}
        <div
          data-plunge-target
          className="plunge-wrap"
          style={{
            position: 'absolute',
            inset: 0,
            willChange: 'clip-path, transform, opacity',
            opacity: 0,
          }}
        >
          <div
            className="plunge-img w-full h-full"
            style={{
              backgroundImage: `url(${plungeImages[5]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
      </div>

      {/* Booking Form Overlay */}
      <div
        ref={formRef}
        className="plunge-content"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(58,37,32,0.92)',
            backdropFilter: 'blur(20px)',
            padding: 'clamp(32px, 5vw, 60px)',
            borderRadius: 8,
            maxWidth: 480,
            width: '90%',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              letterSpacing: '0.04em',
              textTransform: 'uppercase' as const,
              color: '#fdfaf7',
              textAlign: 'center',
              marginBottom: 12,
            }}
          >
            BEGIN YOUR JOURNEY
          </h2>
          <p
            style={{
              fontSize: 16,
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#d4c8b8',
              textAlign: 'center',
              marginBottom: 32,
            }}
          >
            Reserve your stay and let us craft an unforgettable experience
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  style={{
                    fontSize: 11,
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 400,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase' as const,
                    color: '#d4c8b8',
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  CHECK-IN
                </label>
                <input
                  type="date"
                  value={formData.checkIn}
                  onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: '#fdfaf7',
                    color: '#3a2520',
                    fontSize: 14,
                    fontFamily: '"DM Sans", sans-serif',
                    border: '1px solid #d4c8b8',
                    borderRadius: 4,
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#c9a84c';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#d4c8b8';
                  }}
                  required
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: 11,
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 400,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase' as const,
                    color: '#d4c8b8',
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  CHECK-OUT
                </label>
                <input
                  type="date"
                  value={formData.checkOut}
                  onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: '#fdfaf7',
                    color: '#3a2520',
                    fontSize: 14,
                    fontFamily: '"DM Sans", sans-serif',
                    border: '1px solid #d4c8b8',
                    borderRadius: 4,
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#c9a84c';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#d4c8b8';
                  }}
                  required
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  fontSize: 11,
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 400,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase' as const,
                  color: '#d4c8b8',
                  display: 'block',
                  marginBottom: 6,
                }}
              >
                GUESTS
              </label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#fdfaf7',
                  color: '#3a2520',
                  fontSize: 14,
                  fontFamily: '"DM Sans", sans-serif',
                  border: '1px solid #d4c8b8',
                  borderRadius: 4,
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#c9a84c';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#d4c8b8';
                }}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5+">5+ Guests</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  fontSize: 11,
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 400,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase' as const,
                  color: '#d4c8b8',
                  display: 'block',
                  marginBottom: 6,
                }}
              >
                SUITE PREFERENCE
              </label>
              <select
                value={formData.suite}
                onChange={(e) => setFormData({ ...formData, suite: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#fdfaf7',
                  color: '#3a2520',
                  fontSize: 14,
                  fontFamily: '"DM Sans", sans-serif',
                  border: '1px solid #d4c8b8',
                  borderRadius: 4,
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#c9a84c';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#d4c8b8';
                }}
              >
                <option value="andalusian">The Andalusian Suite</option>
                <option value="garden">The Garden Suite</option>
                <option value="terrace">The Terrace Suite</option>
              </select>
            </div>

            <button
              type="submit"
              className="transition-colors duration-300"
              style={{
                width: '100%',
                padding: 18,
                backgroundColor: '#c67b5c',
                color: '#fdfaf7',
                fontSize: 14,
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                border: 'none',
                cursor: 'pointer',
                marginTop: 8,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#a85d40';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#c67b5c';
              }}
            >
              CHECK AVAILABILITY
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
