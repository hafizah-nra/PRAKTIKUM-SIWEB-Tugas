<?php
ob_start();
session_start();

if (!isset($_SESSION['user'])) {
    header('Location: login.php');
    exit;
}

$namaUser = htmlspecialchars($_SESSION['nama'] ?? $_SESSION['user']);
$roleUser = htmlspecialchars($_SESSION['role'] ?? '');
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tambah Produk – TumblrVault</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-custom">
    <div class="container">
      <a class="navbar-brand-custom" href="index.php">Tumblr<span>Vault</span></a>
      <button class="navbar-toggler navbar-toggler-custom" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarMain">
        <ul class="navbar-nav ms-auto align-items-lg-center gap-1">
          <li class="nav-item"><a class="nav-link nav-link-custom" href="index.php"><i class="bi bi-house me-1"></i>Beranda</a></li>
          <li class="nav-item"><a class="nav-link nav-link-custom" href="index.php#statistik"><i class="bi bi-bar-chart me-1"></i>Statistik</a></li>
          <li class="nav-item"><a class="nav-link nav-link-custom" href="index.php#produk"><i class="bi bi-box me-1"></i>Produk</a></li>
          <li class="nav-item ms-lg-2"><a class="btn btn-primary-custom active" href="tambah.php"><i class="bi bi-plus me-1"></i>Tambah Produk</a></li>
        </ul>

        <div class="user-chip ms-lg-3">
          <div class="avatar"><?php echo strtoupper(substr($namaUser, 0, 1)); ?></div>
          <span><?php echo $namaUser; ?></span>
          <span class="role-badge"><?php echo $roleUser; ?></span>
        </div>

        <button class="btn-logout ms-lg-2"
          data-bs-toggle="modal" data-bs-target="#logoutModal"
          title="Keluar dari akun">
          <i class="bi bi-box-arrow-right"></i>
          Logout
        </button>

        <button id="btn-theme" title="Ganti Tema">
          <i class="bi bi-moon-stars-fill" id="theme-icon"></i>
          <span id="theme-label">Mode Gelap</span>
        </button>
      </div>
    </div>
  </nav>

  <div class="tambah-header">
    <div class="container">
      <div class="d-flex align-items-center gap-3 mb-3">
        <a href="index.php" class="back-btn"><i class="bi bi-arrow-left me-1"></i>Kembali</a>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-cur">Tambah Produk</span>
      </div>
      <h1 class="tambah-title">Tambah Produk Baru</h1>
      <p class="tambah-desc">Isi data produk tumbler yang akan ditambahkan ke inventori</p>
    </div>
  </div>

  <section class="tambah-body">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-7">
          <div class="form-card">
            <form id="productForm" novalidate>

              <div class="form-section-title"><i class="bi bi-image me-2"></i>Foto Produk</div>
              <div class="mb-4">
                <div class="upload-area" id="uploadArea">
                  <input type="file" id="fotoInput" accept="image/jpeg,image/png,image/webp" class="upload-input" />
                  <div class="upload-placeholder" id="uploadPlaceholder">
                    <i class="bi bi-cloud-arrow-up upload-icon"></i>
                    <p class="upload-text">Klik atau seret foto ke sini</p>
                    <p class="upload-hint">JPG, PNG, WebP — maks. 5MB</p>
                  </div>
                  <div class="upload-preview" id="uploadPreview" style="display:none;">
                    <img id="previewImg" src="" alt="Preview" />
                    <button type="button" class="upload-remove" id="removeImg"><i class="bi bi-x-lg"></i></button>
                  </div>
                </div>
              </div>

              <hr class="form-divider" />

              <div class="form-section-title"><i class="bi bi-info-circle me-2"></i>Informasi Produk</div>

              <div class="row g-3 mb-3">
                <div class="col-md-8">
                  <label class="form-label-custom" for="namaProduk">Nama Produk <span class="required-star">*</span></label>
                  <input type="text" id="namaProduk" class="form-control form-control-custom" placeholder="Contoh: AquaCore Pro 750ml" required />
                  <div class="invalid-feedback">Nama produk wajib diisi.</div>
                </div>
                <div class="col-md-4">
                  <label class="form-label-custom" for="skuProduk">Kode SKU <span class="required-star">*</span></label>
                  <input type="text" id="skuProduk" class="form-control form-control-custom" placeholder="TBL-00X" required />
                  <div class="invalid-feedback">Kode SKU wajib diisi.</div>
                </div>
              </div>

              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="form-label-custom" for="kategori">Kategori <span class="required-star">*</span></label>
                  <select id="kategori" class="form-control form-control-custom" required>
                    <option value="" disabled selected>Pilih kategori...</option>
                    <option value="stainless">Stainless Steel</option>
                    <option value="double-wall">Double Wall</option>
                    <option value="keramik">Keramik</option>
                    <option value="bambu">Bambu</option>
                    <option value="plastik">Plastik BPA-Free</option>
                    <option value="titanium">Titanium</option>
                    <option value="borosilikat">Borosilikat / Kaca</option>
                  </select>
                  <div class="invalid-feedback">Pilih kategori produk.</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label-custom" for="kapasitas">Kapasitas (ml) <span class="required-star">*</span></label>
                  <input type="number" id="kapasitas" class="form-control form-control-custom" placeholder="Contoh: 750" min="100" max="3000" required />
                  <div class="invalid-feedback">Kapasitas 100–3000 ml.</div>
                </div>
              </div>

              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <label class="form-label-custom" for="harga">Harga Jual (Rp) <span class="required-star">*</span></label>
                  <div class="input-prefix-wrap">
                    <span class="input-prefix">Rp</span>
                    <input type="number" id="harga" class="form-control form-control-custom with-prefix" placeholder="185000" min="1000" required />
                  </div>
                  <div class="invalid-feedback">Harga wajib diisi.</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label-custom" for="stok">Jumlah Stok <span class="required-star">*</span></label>
                  <input type="number" id="stok" class="form-control form-control-custom" placeholder="Contoh: 50" min="0" required />
                  <div class="invalid-feedback">Stok wajib diisi.</div>
                </div>
              </div>

              <hr class="form-divider" />

              <div class="form-section-title"><i class="bi bi-list-ul me-2"></i>Detail Produk</div>
              <div class="mb-4">
                <label class="form-label-custom" for="deskripsi">Deskripsi Produk</label>
                <textarea id="deskripsi" class="form-control form-control-custom" rows="5" placeholder="Tulis deskripsi produk, keunggulan, bahan, cara penggunaan, dll..."></textarea>
              </div>

              <hr class="form-divider" />

              <div class="d-flex gap-3 justify-content-between flex-wrap">
                <a href="index.php" class="btn btn-outline-custom"><i class="bi bi-x-lg me-2"></i>Batal</a>
                <div class="d-flex gap-2">
                  <button type="reset" class="btn btn-outline-custom" id="resetBtn"><i class="bi bi-arrow-counterclockwise me-1"></i>Reset</button>
                  <button type="submit" class="btn btn-primary-custom"><i class="bi bi-check2-circle me-2"></i>Simpan Produk</button>
                </div>
              </div>

            </form>

            <div id="successMsg" class="success-msg d-none">
              <i class="bi bi-check-circle-fill me-2"></i>
              Produk berhasil ditambahkan!
              <a href="index.php" class="ms-2" style="color:#4a7a4e;font-weight:600;text-decoration:underline;">Lihat Inventori →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="modal fade modal-logout" id="logoutModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width:380px;">
      <div class="modal-content">
        <div class="modal-header border-0 pb-0">
          <h5 class="modal-title d-flex align-items-center gap-2">
            <span style="width:34px;height:34px;border-radius:50%;background:rgba(102,78,68,0.1);display:flex;align-items:center;justify-content:center;">
              <i class="bi bi-box-arrow-right" style="color:#664E44;font-size:0.9rem;"></i>
            </span>
            Konfirmasi Logout
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="font-size:0.75rem;"></button>
        </div>
        <div class="modal-body" style="padding:16px 24px 8px;">
          <p style="margin:0;font-size:0.88rem;color:rgba(58,44,38,0.7);">
            Hei, <strong style="color:#664E44;"><?php echo $namaUser; ?></strong>! Yakin ingin keluar dari sesi ini?
          </p>
        </div>
        <div class="modal-footer border-0 pt-0 gap-2">
          <button type="button" class="btn-cancel-logout" data-bs-dismiss="modal">Batal</button>
          <a href="controller/logout.php" class="btn-confirm-logout">
            <i class="bi bi-box-arrow-right me-1"></i>Ya, Logout
          </a>
        </div>
      </div>
    </div>
  </div>

  <footer class="footer-custom">
    <div class="container">
      <div class="row g-5">
        <div class="col-lg-4">
          <div class="footer-brand">Tumblr<span>Vault</span></div>
          <p class="footer-desc">Sistem manajemen penjualan tumbler yang sederhana dan efisien.</p>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <div class="footer-heading">Navigasi</div>
          <a href="index.php" class="footer-link">Beranda</a>
          <a href="index.php#statistik" class="footer-link">Statistik</a>
          <a href="index.php#produk" class="footer-link">Produk</a>
          <a href="tambah.php" class="footer-link">Tambah Produk</a>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <div class="footer-heading">Kategori</div>
          <a href="#" class="footer-link">Stainless Steel</a>
          <a href="#" class="footer-link">Double Wall</a>
          <a href="#" class="footer-link">Keramik</a>
          <a href="#" class="footer-link">Bambu &amp; Eco</a>
        </div>
        <div class="col-md-4 col-lg-3">
          <div class="footer-heading">Kontak</div>
          <a href="#" class="footer-link"><i class="bi bi-envelope me-2"></i>admin@tumblrvault.id</a>
          <a href="#" class="footer-link"><i class="bi bi-telephone me-2"></i>+62 812 3456 7890</a>
          <a href="#" class="footer-link"><i class="bi bi-geo-alt me-2"></i>Bandung, Jawa Barat</a>
        </div>
      </div>
      <hr class="footer-divider" />
      <div class="d-flex flex-wrap justify-content-between align-items-center gap-3">
        <p class="footer-bottom mb-0">© 2025 TumblrVault.</p>
        <p class="footer-bottom mb-0">HTML · CSS · Bootstrap 5 · PHP</p>
      </div>
    </div>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="js/script.js"></script>
</body>
</html>