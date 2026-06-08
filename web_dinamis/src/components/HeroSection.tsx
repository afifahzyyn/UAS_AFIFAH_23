"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("hero--visible");
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      {/* Decorative petals */}
      <div className="petal" style={{ top: "15%", left: "8%" }} />
      <div className="petal" style={{ top: "25%", left: "75%" }} />
      <div className="petal" style={{ top: "65%", left: "90%" }} />

      <div className="hero-inner">
        <div className="hero-content">
          <span className="hero-tagline">🌸 Welcome to our cafe</span>
          <h1 className="hero-title">
            <span className="hero-title--gradient">afifah zayyin_2388010032</span>
          </h1>
          <p className="hero-description">
            Tempat menikmati kopi terbaik dan menciptakan cerita manis setiap hari.
          </p>
          <a href="#menu" className="cta-button cta-button--filled">
            ☕ Lihat Menu
          </a>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat__number">100%</div>
              <div className="hero-stat__label">Biji Lokal</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat__number">15+</div>
              <div className="hero-stat__label">Varian Menu</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat__number">♥</div>
              <div className="hero-stat__label">Dibuat Dengan Cinta</div>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img src="/hero-cafe.png" alt="Kopi dan dessert aesthetic" />
        </div>
      </div>
    </section>
  );
}
