import { query } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const beritaCount = await query<any>("SELECT COUNT(*) as total FROM berita");
  const menuCount = await query<any>("SELECT COUNT(*) as total FROM menu");
  const menuAvailable = await query<any>("SELECT COUNT(*) as total FROM menu WHERE is_available = 1");

  const stats = [
    { name: "Total Menu", value: menuCount[0]?.total ?? 0, href: "/admin/menu", color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc" },
    { name: "Menu Tersedia", value: menuAvailable[0]?.total ?? 0, href: "/admin/menu", color: "#059669", bg: "#f0fdf4", border: "#bbf7d0" },
    { name: "Total Berita", value: beritaCount[0]?.total ?? 0, href: "/admin/berita", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
  ];

  const recentBerita = await query<any>(
    "SELECT id, judul, is_published, created_at FROM berita ORDER BY created_at DESC LIMIT 5"
  );
  const recentMenu = await query<any>(
    "SELECT id, nama, kategori, harga, is_available FROM menu ORDER BY created_at DESC LIMIT 5"
  );

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
          Selamat Datang ☕
        </h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>
          Berikut adalah ringkasan konten website Kopi Nusantara Anda.
        </p>
      </div>

      {/* Stats */}
      <div className="admin-stats-grid">
        {stats.map((s) => (
          <Link key={s.name} href={s.href} className="admin-stat-card" style={{ textDecoration: "none" }}>
            <div>
              <div style={{ fontSize: "13px", color: "#64748b", fontWeight: 500, marginBottom: "8px" }}>{s.name}</div>
              <div style={{ fontSize: "32px", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>{s.value}</div>
            </div>
            <div style={{
              width: "48px", height: "48px", borderRadius: "12px",
              background: s.bg, border: `1px solid ${s.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: s.color, fontSize: "22px", fontWeight: 800,
            }}>
              {String(s.value).padStart(1, "0")}
            </div>
          </Link>
        ))}
      </div>

      {/* Recent content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Recent Berita */}
        <div className="admin-card">
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>Berita Terbaru</div>
            <Link href="/admin/berita/create" className="admin-btn admin-btn-primary" style={{ padding: "6px 14px", fontSize: "12px" }}>+ Tulis</Link>
          </div>
          <div>
            {recentBerita.length === 0 ? (
              <div style={{ padding: "32px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>Belum ada berita.</div>
            ) : recentBerita.map((b: any) => (
              <div key={b.id} style={{ padding: "14px 24px", borderBottom: "1px solid #f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.judul}</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>
                    {new Date(b.created_at).toLocaleDateString("id-ID")}
                  </div>
                </div>
                <span className={`admin-badge ${b.is_published ? "admin-badge-green" : "admin-badge-gray"}`} style={{ marginLeft: "12px", flexShrink: 0 }}>
                  {b.is_published ? "Published" : "Draft"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Menu */}
        <div className="admin-card">
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>Menu Terbaru</div>
            <Link href="/admin/menu/create" className="admin-btn admin-btn-primary" style={{ padding: "6px 14px", fontSize: "12px" }}>+ Tambah</Link>
          </div>
          <div>
            {recentMenu.length === 0 ? (
              <div style={{ padding: "32px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>Belum ada menu.</div>
            ) : recentMenu.map((m: any) => (
              <div key={m.id} style={{ padding: "14px 24px", borderBottom: "1px solid #f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.nama}</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>
                    {m.kategori} — Rp {Number(m.harga).toLocaleString("id-ID")}
                  </div>
                </div>
                <span className={`admin-badge ${m.is_available ? "admin-badge-green" : "admin-badge-gray"}`} style={{ marginLeft: "12px", flexShrink: 0 }}>
                  {m.is_available ? "Tersedia" : "Habis"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
