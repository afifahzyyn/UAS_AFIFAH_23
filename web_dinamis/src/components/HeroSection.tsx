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
      <div className="floating-accent" style={{ top: "15%", left: "5%" }} />
      <div className="floating-accent floating-accent--alt" style={{ bottom: "15%", right: "10%" }} />

      <span className="hero-tagline">☕ Authentic Indonesian Coffee</span>
      <h1 className="hero-title">
        Rasakan Kehangatan
        <br />
        <span className="hero-title--gradient">Kopi Nusantara</span>
      </h1>
      <p className="hero-description">
        Dari dataran tinggi Indonesia ke cangkir Anda. Kami menyajikan kopi
        terbaik dengan cinta, ditemani suasana yang memanjakan setiap momen.
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <a href="#menu" className="cta-button cta-button--filled">
          Lihat Menu
        </a>
        <a href="#contact" className="cta-button">
          Hubungi Kami
        </a>
      </div>

      <div className="hero-decorative">
        <div className="hero-decorative__item">
          <div className="hero-decorative__number">100%</div>
          <div className="hero-decorative__label">Biji Lokal</div>
        </div>
        <div className="hero-decorative__item">
          <div className="hero-decorative__number">15+</div>
          <div className="hero-decorative__label">Varian Menu</div>
        </div>
        <div className="hero-decorative__item">
          <div className="hero-decorative__number">♥</div>
          <div className="hero-decorative__label">Dibuat Dengan Cinta</div>
        </div>
      </div>
    </section>
  );
}
