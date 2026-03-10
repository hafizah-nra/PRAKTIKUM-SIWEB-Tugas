<?php
session_start();

if (isset($_SESSION["user"])) {
    header("Location: index.php");
    exit;
}

$error = $_GET['error'] ?? '';
$errorMsg = '';
if ($error === 'empty') {
    $errorMsg = '<i class="bi bi-exclamation-triangle-fill me-2"></i>Username dan password wajib diisi.';
} elseif ($error === 'invalid') {
    $errorMsg = '<i class="bi bi-x-circle-fill me-2"></i>Username atau password salah. Silakan coba lagi.';
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Login – TumblrVault</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
  <link rel="stylesheet" href="css/style.css" />
</head>
<body class="page-login">

  <div class="login-grain"></div>
  <div class="login-deco-line"></div>
  <div class="login-deco-line"></div>
  <div class="login-dots">
    <div class="login-dot"></div>
    <div class="login-dot"></div>
    <div class="login-dot"></div>
    <div class="login-dot"></div>
    <div class="login-dot"></div>
  </div>

  <div class="login-card-wrap">
    <div class="login-card">

      <div class="login-card-header">
        <div class="login-brand-mark">
          <div class="login-brand-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C9.24 2 7 4.24 7 7v1H5v14h14V8h-2V7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v1H9V7c0-1.66 1.34-3 3-3zm0 9a2 2 0 110 4 2 2 0 010-4z"/>
            </svg>
          </div>
          <span class="login-brand-name">TumblrVault</span>
        </div>
        <h1 class="login-card-title">Selamat<br><em>Datang</em></h1>
        <p class="login-card-subtitle">Masuk untuk melanjutkan perjalanan Anda</p>
      </div>

      <div class="login-card-body">

        <?php if ($errorMsg): ?>
        <div class="alert alert-danger d-flex align-items-center gap-2 mb-4 py-2 px-3"
             style="border-radius:10px; font-size:0.84rem; border:none;
                    background:rgba(201,123,90,0.12); color:#a05a2c;
                    border-left:4px solid #c97b5a;" role="alert">
          <?php echo $errorMsg; ?>
        </div>
        <?php endif; ?>

        <form method="POST" action="controller/proses_login.php" autocomplete="off">

          <div class="login-field">
            <label for="username">Username</label>
            <div class="login-input-wrap">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Masukkan username"
                value="<?php echo htmlspecialchars($_COOKIE['username'] ?? ''); ?>"
                required
              />
              <span class="icon">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
              </span>
            </div>
          </div>

          <div class="login-field">
            <label for="password">Password</label>
            <div class="login-input-wrap">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Masukkan password"
                required
              />
              <span class="icon">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </span>
              <button type="button" class="login-eye-toggle" onclick="togglePassword()" aria-label="Tampilkan password">
                <svg id="eye-icon" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="login-field login-row-check">
            <label class="login-check-label">
              <input type="checkbox" name="remember"
                <?php echo isset($_COOKIE['username']) && $_COOKIE['username'] !== '' ? 'checked' : ''; ?>>
              <span class="login-custom-check"></span>
              Ingat saya
            </label>
            <a href="#" class="login-forgot-link">Lupa password?</a>
          </div>

          <div class="login-divider">
            <span></span><p>masuk dengan akun Anda</p><span></span>
          </div>

          <div class="login-field">
            <button type="submit" class="login-btn-submit">Masuk Sekarang</button>
          </div>

        </form>

        <a href="index.php" class="login-back-link">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Kembali ke Beranda
        </a>
      </div>

    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script>
    function togglePassword() {
      const input = document.getElementById('password');
      const icon  = document.getElementById('eye-icon');
      if (input.type === 'password') {
        input.type = 'text';
        icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>';
      } else {
        input.type = 'password';
        icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
      }
    }
  </script>

</body>
</html>