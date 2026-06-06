import { query } from "@/lib/db";
import Link from "next/link";
import { deleteMenu } from "@/app/actions/menu";
import DeleteButton from "@/components/DeleteButton";

export const dynamic = "force-dynamic";

const PlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function getCategoryBadgeClass(kategori: string): string {
  switch (kategori) {
    case "coffee": return "admin-badge-blue";
    case "non-coffee": return "admin-badge-green";
    default: return "admin-badge-gray";
  }
}

function getCategoryLabel(kategori: string): string {
  switch (kategori) {
    case "coffee": return "Coffee";
    case "non-coffee": return "Non-Coffee";
    case "food": return "Makanan";
    case "snack": return "Snack";
    default: return kategori;
  }
}

export default async function MenuAdminPage() {
  const menu = await query<any>(
    "SELECT id, nama, kategori, deskripsi, harga, image, is_available, urutan FROM menu ORDER BY urutan ASC, nama ASC"
  );

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Manajemen Menu</div>
          <div className="admin-page-subtitle">Kelola daftar produk kopi dan makanan ({menu.length} menu terdaftar)</div>
        </div>
        <Link href="/admin/menu/create" className="admin-btn admin-btn-primary">
          <PlusIcon /> Tambah Menu
        </Link>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: "60px" }}>Urutan</th>
              <th style={{ width: "80px" }}>Gambar</th>
              <th>Nama Menu</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Status</th>
              <th style={{ textAlign: "right", width: "96px" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {menu.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "48px", color: "#94a3b8" }}>
                  Belum ada menu. Klik &quot;Tambah Menu&quot; untuk memulai.
                </td>
              </tr>
            ) : menu.map((item: any) => (
              <tr key={item.id}>
                <td>
                  <span className="admin-badge admin-badge-gray">#{item.urutan}</span>
                </td>
                <td>
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.nama} 
                      style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "8px" }} 
                    />
                  ) : (
                    <div style={{ width: "48px", height: "48px", background: "#f1f5f9", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#94a3b8" }}>No Img</div>
                  )}
                </td>
                <td>
                  <div style={{ fontWeight: 700, fontSize: "14px", color: "#1e293b" }}>{item.nama}</div>
                  <div style={{ fontSize: "12px", color: "#64748b", maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={item.deskripsi}>
                    {item.deskripsi}
                  </div>
                </td>
                <td>
                  <span className={`admin-badge ${getCategoryBadgeClass(item.kategori)}`}>
                    {getCategoryLabel(item.kategori)}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: "#1e293b" }}>{formatPrice(item.harga)}</div>
                </td>
                <td>
                  {item.is_available ? (
                    <span className="admin-badge admin-badge-green">Tersedia</span>
                  ) : (
                    <span className="admin-badge admin-badge-gray" style={{ color: "#ef4444", borderColor: "#fecaca", background: "#fef2f2" }}>Habis</span>
                  )}
                </td>
                <td>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                    <Link href={`/admin/menu/${item.id}`} className="admin-btn admin-btn-icon" title="Edit">
                      <EditIcon />
                    </Link>
                    <DeleteButton
                      message="Hapus menu ini?"
                      action={async () => {
                        "use server";
                        await deleteMenu(item.id);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
