"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const stepTime = Math.max(Math.floor(duration / target), 16);
          const timer = setInterval(() => {
            start += Math.ceil(target / (duration / stepTime));
            if (start >= target) {
              start = target;
              clearInterval(timer);
            }
            setCount(start);
          }, stepTime);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <h4 ref={ref} className="stat-number">
      {count.toLocaleString("id-ID")}
      {suffix}
    </h4>
  );
}

export default function VisionSection() {
  return (
    <section id="about" className="about-section">
      <div className="vision-flex">
        <div className="vision-text">
          <span className="hero-tagline" style={{ opacity: 1, transform: "none", fontSize: "0.85rem" }}>
            Cerita Kami
          </span>
          <h2 className="vision-heading">
            Tentang <span className="text-gradient">Kopi Nusantara</span>
          </h2>
          <p className="vision-desc">
            Berawal dari kecintaan terhadap kopi Indonesia, Kopi Nusantara hadir
            untuk menghadirkan pengalaman ngopi yang autentik. Kami bekerja
            langsung dengan petani kopi lokal dari Aceh hingga Papua untuk
            mendapatkan biji kopi terbaik yang disangrai dengan penuh perhatian.
          </p>
          <p className="vision-desc" style={{ marginBottom: "3rem" }}>
            Setiap cangkir kopi kami adalah perjalanan rasa melintasi kepulauan
            Nusantara — dari aroma earthy Sumatra, keasaman fruity Toraja,
            hingga kelembutan Java.
          </p>
          <div className="stats-row">
            <div className="stat">
              <AnimatedCounter target={2020} />
              <span className="stat-label">Berdiri Sejak</span>
            </div>
            <div className="stat">
              <AnimatedCounter target={15} suffix="+" />
              <span className="stat-label">Varian Menu</span>
            </div>
            <div className="stat">
              <AnimatedCounter target={5000} suffix="+" />
              <span className="stat-label">Pelanggan</span>
            </div>
          </div>
        </div>
        <div className="vision-visual">
          <div className="coffee-cup-visual">
            <div className="coffee-ring coffee-ring--outer" />
            <div className="coffee-ring coffee-ring--inner" />
            <div className="coffee-core">☕</div>
          </div>
        </div>
      </div>
    </section>
  );
}
