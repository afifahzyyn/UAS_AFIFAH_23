"use client";

import { useEffect, useState } from "react";

interface MenuItem {
  id: number;
  nama: string;
  kategori: string;
  deskripsi: string;
  harga: number;
  image: string | null;
}

const CATEGORIES = [
  { key: "all", label: "Semua" },
  { key: "coffee", label: "Coffee" },
  { key: "non-coffee", label: "Non-Coffee" },
  { key: "food", label: "Makanan" },
  { key: "snack", label: "Snack" },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function getCategoryLabel(cat: string): string {
  const found = CATEGORIES.find((c) => c.key === cat);
  return found ? found.label : cat;
}

export default function MenuSection() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    fetch("/api/menu")
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "ok") setMenuItems(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeFilter === "all"
      ? menuItems
      : menuItems.filter((item) => item.kategori === activeFilter);

  return (
    <section id="menu" className="menu-section">
      <h2 className="section-title">
        Menu <span className="text-gradient">Kami</span>
      </h2>
      <p className="section-subtitle">
        Pilihan kopi dan sajian spesial dari dapur Kopi Nusantara
      </p>

      {/* Filter */}
      <div className="menu-filter">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            className={`menu-filter__btn ${activeFilter === cat.key ? "menu-filter__btn--active" : ""}`}
            onClick={() => setActiveFilter(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="menu-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div className="menu-card" key={i}>
              <div className="skeleton skeleton--img" />
              <div style={{ padding: "1.5rem" }}>
                <div className="skeleton" style={{ height: "14px", width: "60px", marginBottom: "0.8rem" }} />
                <div className="skeleton" style={{ height: "20px", width: "70%", marginBottom: "0.5rem" }} />
                <div className="skeleton" style={{ height: "40px", marginBottom: "1rem" }} />
                <div className="skeleton" style={{ height: "20px", width: "40%" }} />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--text-dim)", padding: "3rem 0" }}>
          Belum ada menu tersedia.
        </p>
      ) : (
        <div className="menu-grid">
          {filtered.map((item, i) => (
            <div
              className="menu-card"
              key={item.id}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {item.image && (
                <div className="menu-card__img">
                  <img src={item.image} alt={item.nama} loading="lazy" />
                </div>
              )}
              <div className="menu-card__body">
                <div className="menu-card__category">{getCategoryLabel(item.kategori)}</div>
                <h3 className="menu-card__name">{item.nama}</h3>
                <p className="menu-card__desc">{item.deskripsi}</p>
                <div className="menu-card__footer">
                  <span className="menu-card__price">{formatPrice(item.harga)}</span>
                  <span className="menu-card__badge">Available</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
