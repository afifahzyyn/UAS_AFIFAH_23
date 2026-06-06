"use client";

import { useEffect, useRef } from "react";

export default function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("fade-in--visible");
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-section fade-in" ref={sectionRef}>
      <div className="about-inner">
        <div className="about-image">
          <img src="/cafe-interior.png" alt="Interior Kopi Nusantara" />
        </div>

        <div className="about-text">
          <span className="about-label">🌷 Cerita Kami</span>
          <h2 className="about-heading">
            Tentang <span className="text-gradient">Kopi Nusantara</span>
          </h2>
          <p className="about-desc">
            Berawal dari kecintaan terhadap kopi Indonesia, Kopi Nusantara hadir
            untuk menghadirkan pengalaman ngopi yang autentik dan nyaman. Kami
            bekerja langsung dengan petani kopi lokal dari Aceh hingga Papua
            untuk mendapatkan biji kopi terbaik.
          </p>
          <p className="about-desc">
            Setiap cangkir kopi kami adalah perjalanan rasa melintasi kepulauan
            Nusantara — dari aroma earthy Sumatra, keasaman fruity Toraja,
            hingga kelembutan Java.
          </p>

          <div className="about-features">
            <div className="about-feature">
              <div className="about-feature__icon">☕</div>
              <span>Biji Kopi Lokal Premium</span>
            </div>
            <div className="about-feature">
              <div className="about-feature__icon">🍰</div>
              <span>Dessert Homemade</span>
            </div>
            <div className="about-feature">
              <div className="about-feature__icon">🌿</div>
              <span>Suasana Nyaman</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
