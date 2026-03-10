# TumblrVault – Sistem Manajemen Penjualan Tumbler

Proyek Tugas Akhir 3 Praktikum Sistem Informasi Berbasis Web  
**Topik: PHP Session & Cookies**

---

## Deskripsi

TumblrVault adalah sistem manajemen penjualan tumbler berbasis web yang dibangun menggunakan HTML, CSS, Bootstrap 5, JavaScript, dan PHP. Proyek ini merupakan kelanjutan dari Tugas Akhir 1 (JavaScript & Web Storage) yang kini dilengkapi dengan autentikasi berbasis **PHP Session** dan **Cookies**.

---

## Fitur Utama

### 1. Sistem Login dengan PHP Session
- Form login dengan validasi username dan password (hardcode)
- Status login disimpan menggunakan `$_SESSION`
- Redirect ke `index.php` setelah berhasil login
- Semua halaman utama (`index.php`, `tambah.php`) diproteksi — redirect ke `login.php` jika belum login

### 2. Logout
- Tombol logout tersedia di navbar semua halaman
- Dilengkapi modal konfirmasi sebelum logout
- Session dihapus sepenuhnya (`session_destroy()`)
- Redirect ke `login.php` setelah logout

### 3. Remember Me (Cookies)
- Jika checkbox *Ingat Saya* dicentang, username disimpan dalam cookies selama **30 hari**
- Saat membuka halaman login kembali, field username otomatis terisi dari cookies
- Checkbox otomatis tercentang jika cookies masih aktif

### 4. Feedback Login Gagal (Bonus)
- Login gagal **tidak menggunakan `alert()` JavaScript**
- Menggunakan **Bootstrap Alert** yang ditampilkan via PHP `$_GET['error']`
- Pesan berbeda untuk: field kosong vs. kredensial salah

---

## Akun Login

| Username   | Password | Role     |
|------------|----------|----------|
| `admin`    | `1234`   | admin    |
| `hafizhah` | `123456` | pembeli  |

---

## Struktur Folder

```
tumblrvault/
├── index.php           ← Halaman utama (diproteksi session)
├── login.php           ← Halaman login
├── tambah.php          ← Halaman tambah produk (diproteksi session)
├── controller/
│   ├── proses_login.php  ← Memproses form login
│   └── logout.php        ← Menghapus session & redirect
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/             ← Gambar produk
```

---

## Teknologi

- **Frontend:** HTML5, CSS3, Bootstrap 5, Bootstrap Icons, JavaScript
- **Backend:** PHP (native)
- **Autentikasi:** PHP Session + Cookies