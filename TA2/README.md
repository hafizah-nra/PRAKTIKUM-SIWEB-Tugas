Deskripsi Project – TumblrVault
TumblrVault merupakan sistem manajemen penjualan tumbler berbasis web yang dirancang untuk membantu pengguna dalam mengelola data produk secara sederhana dan efisien. Website ini menyediakan fitur untuk menampilkan daftar produk, memantau stok yang tersedia, melihat ringkasan statistik penjualan, serta menambahkan produk baru melalui form input yang telah dilengkapi validasi.
Tampilan antarmuka dibuat modern dan responsif menggunakan HTML, CSS, dan Bootstrap 5 sehingga dapat diakses dengan baik melalui perangkat desktop maupun mobile. Fitur unggulan dalam sistem ini meliputi slider produk interaktif, upload dan preview gambar produk, validasi form otomatis, serta navigasi smooth scroll.
Project ini bertujuan untuk mengimplementasikan konsep perancangan antarmuka web, pengelolaan elemen form, serta penggunaan JavaScript dasar dalam membangun sistem inventori sederhana tanpa menggunakan database (frontend-based system).

# 🏺 TumblrVault – Dokumentasi JavaScript (`js/script.js`)

Dokumentasi ini menjelaskan arsitektur dan fungsionalitas logika interaktif dalam proyek TumblrVault. Seluruh logika terpusat dalam satu file utama untuk memudahkan pemeliharaan.

---

## 🛠 Konsep Arsitektur
Script ini dirancang untuk bekerja di dua halaman sekaligus secara cerdas dengan mendeteksi elemen DOM sebelum menjalankan fitur spesifik.

Deteksi Halaman Aktif
```javascript
const isIndex  = document.body.contains(document.getElementById('sliderTrack'));
const isTambah = document.body.contains(document.getElementById('productForm'));

```

* **Global Features:** Fitur seperti *Dark Mode* berjalan di seluruh halaman.
* **Conditional Features:** Fitur spesifik (seperti Slider atau Form Validation) hanya aktif jika variabel di atas bernilai `true`.

---

## 🌓 1. Dark / Light Mode — `initTheme()`

**Berlaku di:** `index.html` dan `tambah.html`

Mengelola estetika visual dan menyimpan preferensi pengguna agar tidak hilang saat halaman di-refresh.

| Fungsi | Keterangan |
| --- | --- |
| `applyTheme(isDark)` | Menambah/menghapus class `dark-mode`, memperbarui ikon, dan menyimpan status ke `localStorage`. |
| `Event click #btn-theme` | Menukar kondisi tema (Toggle) saat tombol diklik. |

---

## 🖱 2. Smooth Scroll & Navigasi

**Berlaku di:** `index.html`

Memberikan pengalaman navigasi yang mulus bagi pengguna.

* **Smooth Scroll:** Menggunakan `scrollIntoView({ behavior: 'smooth' })` untuk link jangkar (`#`).
* **Scroll Spy:** Secara otomatis memberikan class `.active` pada menu navigasi berdasarkan posisi scroll pengguna di section terkait.

---

## 🔔 3. Toast Notification — `tampilkanToast(pesan)`

**Berlaku di:** `index.html`

Sistem notifikasi dinamis yang muncul di sudut layar.

* **Contoh:** `tampilkanToast('✓ Berhasil membeli AquaCore Pro');`
* **Mekanisme:** Elemen dibuat via JS (DOM Injection) dan menghilang otomatis dalam **2,5 detik**.

---

## 💖 4. Wishlist & 🛒 5. Beli Produk

**Berlaku di:** `index.html`

| Fitur | Fungsi Utama | Deskripsi |
| --- | --- | --- |
| **Wishlist** | `updateWishlistUI()` | Sinkronisasi jumlah item, daftar produk, dan total harga di modal. |
|  | `hapusWishlist()` | Reset total terhadap semua ikon hati dan data array. |
| **Beli Produk** | `beliProduk(card)` | Mengurangi stok di UI, mengubah badge ke "Stok Tipis" jika ≤ 3. |

---

## 📦 6. Modal Detail Produk

**Berlaku di:** `index.html`

Menampilkan spesifikasi teknis lengkap yang ditarik dari data atribut kartu produk.

* **Sinkronisasi:** Jika pengguna membeli produk dari dalam modal, jumlah stok pada kartu produk di halaman utama juga akan ikut berkurang secara *real-time*.

---

## 🎢 7. Product Slider — `initSlider()`

**Berlaku di:** `index.html`

Slider kustom yang responsif dan mendukung berbagai input:

* **Navigasi:** Tombol panah (Prev/Next) dan Indikator Titik (Dots).
* **Input:** Drag (Mouse) dan Swipe (Touch Screen).
* **Responsivitas:** Menghitung ulang jumlah kartu yang tampil (`visibleCount`) saat ukuran jendela browser berubah.

---

## 📝 8. Form Tambah Produk

**Berlaku di:** `tambah.html`

Menangani alur penambahan data produk baru dengan validasi ketat.

### 📸 Upload Foto

* **Preview:** Menggunakan `FileReader` untuk menampilkan gambar sebelum diunggah.
* **Drag & Drop:** Area upload mendukung aksi seret-lepas file.
* **Validasi File:** Menolak file yang ukurannya melebihi **5MB**.

### 🛡 Validasi Form

* Menggunakan API `checkValidity()` untuk memastikan semua field wajib terisi.
* **Feedback:** Menampilkan `#successMsg` selama 5 detik setelah berhasil simulasi submit.

---

## 📂 Struktur Proyek

```text
project/
├── index.html       # Halaman utama (Katalog & Statistik)
├── tambah.html      # Halaman input produk
├── css/
│   └── style.css    # Styling & Variabel Dark Mode
├── js/
│   └── script.js    # Logika Interaktif (File Utama)
└── assets/          # Aset Gambar & Ikon
