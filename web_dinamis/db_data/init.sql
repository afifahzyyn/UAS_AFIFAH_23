-- ============================================
-- Database: dbuasfika
-- Coffee Shop "Kopi Nusantara"
-- ============================================

CREATE DATABASE IF NOT EXISTS dbuasfika;
USE dbuasfika;

-- ── Tabel Users ──
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','editor') NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Tabel Menu ──
CREATE TABLE IF NOT EXISTS menu (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  kategori ENUM('coffee','non-coffee','food','snack') NOT NULL DEFAULT 'coffee',
  deskripsi TEXT,
  harga INT NOT NULL DEFAULT 0,
  image VARCHAR(500) DEFAULT NULL,
  is_available TINYINT(1) NOT NULL DEFAULT 1,
  urutan INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Tabel Berita ──
CREATE TABLE IF NOT EXISTS berita (
  id INT AUTO_INCREMENT PRIMARY KEY,
  judul VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  konten LONGTEXT,
  image VARCHAR(500) DEFAULT NULL,
  is_published TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Tabel Kontak ──
CREATE TABLE IF NOT EXISTS kontak (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  subjek VARCHAR(200) DEFAULT '',
  pesan TEXT NOT NULL,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ============================================
-- DATA AWAL
-- ============================================

-- ── Admin User ──
-- Username: admin | Password: admin123
INSERT INTO users (username, password, role) VALUES
('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- ── Menu Kopi ──
INSERT INTO menu (nama, kategori, deskripsi, harga, image, is_available, urutan) VALUES
('Espresso', 'coffee', 'Kopi espresso murni dengan crema yang kaya. Diseduh dari biji kopi Arabika pilihan Nusantara.', 18000, 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600', 1, 1),
('Cappuccino', 'coffee', 'Perpaduan sempurna espresso, susu steamed, dan foam lembut dengan taburan cocoa powder.', 25000, 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600', 1, 2),
('Caffe Latte', 'coffee', 'Espresso dengan susu steamed yang creamy dan lapisan foam tipis. Lembut dan nikmat.', 28000, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600', 1, 3),
('Kopi Susu Gula Aren', 'coffee', 'Signature drink kami! Espresso, susu segar, dan gula aren asli Nusantara.', 24000, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600', 1, 4),
('V60 Pour Over', 'coffee', 'Manual brew dengan metode V60. Menghasilkan rasa kopi yang bersih dan karakter biji yang menonjol.', 30000, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600', 1, 5),
('Americano', 'coffee', 'Espresso yang dipadukan dengan air panas. Rasa kopi yang bold namun ringan di lidah.', 20000, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=600', 1, 6),

-- ── Menu Non-Coffee ──
('Matcha Latte', 'non-coffee', 'Matcha premium Jepang dengan susu steamed. Earthy, creamy, dan menyegarkan.', 28000, 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600', 1, 7),
('Cokelat Panas', 'non-coffee', 'Cokelat Belgia premium yang dilelehkan dengan susu hangat. Comfort drink yang sempurna.', 25000, 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600', 1, 8),
('Teh Tarik', 'non-coffee', 'Teh hitam yang ditarik dengan susu kental manis. Tradisional dan autentik.', 18000, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600', 1, 9),

-- ── Menu Food ──
('Croissant Butter', 'food', 'Croissant klasik dengan lapisan butter yang flaky dan renyah. Dipanggang fresh setiap hari.', 22000, 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=600', 1, 10),
('Toast Avocado', 'food', 'Roti sourdough panggang dengan avocado segar, telur, dan seasoning spesial.', 35000, 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=600', 1, 11),
('Nasi Goreng Kopi', 'food', 'Menu signature! Nasi goreng dengan bumbu rempah khas dan sentuhan kopi.', 32000, 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600', 1, 12),

-- ── Menu Snack ──
('Banana Bread', 'snack', 'Kue pisang homemade yang lembut dan moist dengan taburan walnut.', 18000, 'https://images.unsplash.com/photo-1605090930601-a3a5a0a63318?w=600', 1, 13),
('Cookies Choco Chip', 'snack', 'Cookies renyah diluar, chewy di dalam, dengan chocolate chips premium.', 15000, 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600', 1, 14);

-- ── Berita / Blog ──
INSERT INTO berita (judul, slug, excerpt, konten, image, is_published) VALUES
(
  'Grand Opening Kopi Nusantara - Diskon 50% Semua Menu!',
  'grand-opening-kopi-nusantara',
  'Rayakan pembukaan Kopi Nusantara dengan promo spesial diskon 50% untuk semua menu selama satu minggu penuh!',
  '<p>Kami dengan bangga mengumumkan pembukaan resmi <strong>Kopi Nusantara</strong>! Sebagai bentuk terima kasih atas dukungan dan antusiasme kalian, kami menghadirkan promo istimewa.</p><h3>🎉 Promo Grand Opening</h3><ul><li>Diskon 50% untuk SEMUA menu minuman</li><li>Free pastry untuk 100 pelanggan pertama setiap hari</li><li>Buy 1 Get 1 untuk menu signature kami</li></ul><p>Promo berlaku selama satu minggu dari tanggal pembukaan. Jangan lewatkan kesempatan ini!</p><p>Kopi Nusantara hadir dengan konsep <em>modern tropical café</em> yang menggabungkan kekayaan rasa kopi Nusantara dengan suasana yang nyaman dan Instagram-worthy.</p>',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
  1
),
(
  'Mengenal Kopi Arabika Gayo: Harta Karun dari Aceh',
  'mengenal-kopi-arabika-gayo',
  'Kopi Arabika Gayo dari dataran tinggi Aceh dikenal dunia karena cita rasanya yang kompleks dan unik. Yuk, kenali lebih dekat!',
  '<p>Indonesia adalah salah satu produsen kopi terbesar di dunia, dan <strong>Kopi Arabika Gayo</strong> dari Aceh adalah salah satu permata mahkotanya.</p><h3>☕ Karakteristik Kopi Gayo</h3><p>Kopi Gayo ditanam di dataran tinggi Gayo, Aceh, pada ketinggian 1.200-1.600 mdpl. Kondisi ini menciptakan karakter rasa yang unik:</p><ul><li><strong>Body:</strong> Full body dengan tekstur creamy</li><li><strong>Acidity:</strong> Rendah hingga medium, sangat smooth</li><li><strong>Flavor:</strong> Notes cokelat, rempah, dan sedikit fruity</li><li><strong>Aroma:</strong> Earthy dengan hint herbal</li></ul><p>Di Kopi Nusantara, kami menyajikan Kopi Gayo melalui metode V60 pour over untuk menghasilkan karakter terbaik dari biji kopi ini.</p>',
  'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
  1
),
(
  'Workshop Latte Art untuk Pemula - Daftar Sekarang!',
  'workshop-latte-art-pemula',
  'Belajar seni latte art dari barista profesional kami. Workshop seru untuk pemula yang ingin mendalami dunia kopi.',
  '<p>Pernah terpukau melihat gambar cantik di atas kopi latte? Sekarang giliran kamu untuk belajar!</p><h3>🎨 Workshop Latte Art</h3><p>Kopi Nusantara mengadakan workshop latte art yang dipandu langsung oleh head barista kami. Workshop ini dirancang khusus untuk pemula.</p><h3>Yang Akan Dipelajari:</h3><ol><li>Dasar-dasar steaming susu yang benar</li><li>Teknik pouring: heart, rosetta, dan tulip</li><li>Tips dan trik dari barista profesional</li><li>Free practice session dengan bimbingan</li></ol><h3>Detail Workshop:</h3><ul><li><strong>Tanggal:</strong> Setiap Sabtu, 10:00 - 12:00 WIB</li><li><strong>Biaya:</strong> Rp 150.000 (termasuk semua bahan)</li><li><strong>Kuota:</strong> Maksimal 10 orang per sesi</li></ul><p>Hubungi kami via form kontak atau datang langsung ke Kopi Nusantara untuk mendaftar!</p>',
  'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800',
  1
);

-- ── Kontak Sampel ──
INSERT INTO kontak (nama, email, subjek, pesan, is_read) VALUES
('Budi Santoso', 'budi@email.com', 'Reservasi Tempat', 'Halo, saya ingin reservasi tempat untuk acara ulang tahun 20 orang hari Sabtu depan. Apakah bisa?', 0),
('Sari Dewi', 'sari@email.com', 'Kerjasama', 'Selamat siang, saya tertarik untuk kerjasama sebagai supplier biji kopi dari Toraja. Mohon info lebih lanjut.', 1);
