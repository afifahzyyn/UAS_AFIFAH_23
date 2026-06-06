import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href="/" className="logo">Kopi Nusantara</Link>
          <p className="footer-tagline">
            Menghadirkan cita rasa autentik kopi Indonesia dengan sentuhan modern.
            Setiap cangkir adalah cerita dari Nusantara.
          </p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Menu</h4>
            <Link href="/#hero">Beranda</Link>
            <Link href="/#menu">Menu</Link>
            <Link href="/#about">Tentang</Link>
            <Link href="/#berita">Berita</Link>
          </div>
          <div className="footer-col">
            <h4>Kategori</h4>
            <span>Coffee</span>
            <span>Non-Coffee</span>
            <span>Makanan</span>
            <span>Snack</span>
          </div>
          <div className="footer-col">
            <h4>Jam Operasional</h4>
            <span>Setiap Hari</span>
            <span>08.00 - 22.00 WIB</span>
            <span>Jakarta, Indonesia</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Kopi Nusantara. Semua hak dilindungi undang-undang.</p>
        <p className="footer-credit">Project by Afifah Zayyin</p>
      </div>
    </footer>
  );
}
