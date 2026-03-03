const isIndex  = document.body.contains(document.getElementById('sliderTrack'));
const isTambah = document.body.contains(document.getElementById('productForm'));

(function initTheme() {
  const btnTheme   = document.getElementById('btn-theme');
  const themeIcon  = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');
  if (!btnTheme) return;

  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add('dark-mode');
      themeIcon.className    = 'bi bi-sun-fill';
      themeLabel.textContent = 'Mode Terang';
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      themeIcon.className    = 'bi bi-moon-stars-fill';
      themeLabel.textContent = 'Mode Gelap';
      localStorage.removeItem('theme');
    }
  }

  applyTheme(localStorage.getItem('theme') === 'dark');
  btnTheme.addEventListener('click', () =>
    applyTheme(!document.body.classList.contains('dark-mode'))
  );
})();

if (isIndex) {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', function () {
    let cur = '';
    sections.forEach(function (s) {
      if (window.scrollY >= s.offsetTop - 80) cur = s.id;
    });
    document.querySelectorAll('.nav-link-custom').forEach(function (l) {
      l.classList.remove('active');
      if (l.getAttribute('href') === '#' + cur) l.classList.add('active');
    });
  });
}

function tampilkanToast(pesan) {
  var toast = document.getElementById('toast-notif');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notif';
    toast.className = 'toast-notif';
    document.body.appendChild(toast);
  }
  toast.innerHTML = pesan;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(function () { toast.classList.remove('show'); }, 2500);
}

if (isIndex) {
  let wishlist = [];

  function updateWishlistUI() {
    const badge   = document.getElementById('wishlist-badge');
    const countEl = document.getElementById('modal-count');
    const emptyEl = document.getElementById('wishlist-empty');
    const listEl  = document.getElementById('daftar-wishlist');
    const totalEl = document.getElementById('wishlist-total');

    badge.textContent       = wishlist.length;
    badge.style.display     = wishlist.length > 0 ? 'flex' : 'none';
    countEl.textContent     = wishlist.length + ' item';
    emptyEl.style.display   = wishlist.length === 0 ? 'flex' : 'none';
    listEl.style.display    = wishlist.length === 0 ? 'none' : 'block';

    listEl.innerHTML = '';
    let total = 0;
    wishlist.forEach(function (item, idx) {
      const hargaNum = parseInt(item.harga.replace(/[^0-9]/g, ''));
      total += hargaNum;
      const li = document.createElement('li');
      li.className = 'list-group-item wishlist-item';
      li.innerHTML =
        '<div class="wishlist-item-info">' +
          '<span class="wishlist-item-icon"><i class="bi bi-cup-straw"></i></span>' +
          '<div>' +
            '<div class="wishlist-item-name">' + item.nama + '</div>' +
            '<div class="wishlist-item-meta">' + item.id + ' &bull; ' + item.harga + '</div>' +
          '</div>' +
        '</div>' +
        '<button class="wishlist-remove-btn" onclick="hapusItemWishlist(' + idx + ')" title="Hapus">' +
          '<i class="bi bi-x"></i>' +
        '</button>';
      listEl.appendChild(li);
    });
    totalEl.textContent = 'Rp ' + total.toLocaleString('id-ID');
  }

  window.hapusItemWishlist = function (idx) {
    const card = document.querySelector('.product-slide-card[data-id="' + wishlist[idx].id + '"]');
    if (card) {
      const btn = card.querySelector('.btn-wishlist-card');
      btn.classList.remove('active');
      btn.innerHTML = '<i class="bi bi-heart"></i>';
      btn.title = 'Tambah ke Wishlist';
    }
    wishlist.splice(idx, 1);
    updateWishlistUI();
  };

  window.hapusWishlist = function () {
    wishlist.forEach(function (item) {
      const card = document.querySelector('.product-slide-card[data-id="' + item.id + '"]');
      if (card) {
        const btn = card.querySelector('.btn-wishlist-card');
        btn.classList.remove('active');
        btn.innerHTML = '<i class="bi bi-heart"></i>';
        btn.title = 'Tambah ke Wishlist';
      }
    });
    wishlist = [];
    updateWishlistUI();
  };

  function aktifkanTombolWishlist() {
    document.querySelectorAll('.btn-wishlist-card').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const card  = btn.closest('.product-slide-card');
        const id    = card.dataset.id;
        const nama  = card.dataset.nama;
        const harga = card.dataset.harga;
        const idx   = wishlist.findIndex(function (w) { return w.id === id; });

        if (idx === -1) {
          wishlist.push({ id, nama, harga });
          btn.classList.add('active');
          btn.innerHTML = '<i class="bi bi-heart-fill"></i>';
          btn.title = 'Hapus dari Wishlist';
          btn.classList.add('bounce');
          setTimeout(function () { btn.classList.remove('bounce'); }, 400);
        } else {
          wishlist.splice(idx, 1);
          btn.classList.remove('active');
          btn.innerHTML = '<i class="bi bi-heart"></i>';
          btn.title = 'Tambah ke Wishlist';
        }
        updateWishlistUI();
      });
    });
  }

  function beliProduk(card) {
    const stokEl  = card.querySelector('.stok-text');
    const namaEl  = card.querySelector('.pcard-name');
    const badgeEl = card.querySelector('.badge-stock');
    const nama    = namaEl ? namaEl.innerText : 'Produk';
    let stok = parseInt(stokEl.innerText.replace(/[^0-9]/g, ''));

    if (stok > 0) {
      stok--;
      stokEl.innerHTML = '<i class="bi bi-box-seam me-1"></i>Stok: ' + stok;
      if (stok <= 3) {
        badgeEl.className   = 'badge-stock badge-low';
        badgeEl.textContent = 'Stok Tipis';
      }
      tampilkanToast('&#10003; Berhasil membeli <strong>' + nama + '</strong>');
      return true;
    }
    return false;
  }

  function aktifkanTombolBeli() {
    document.querySelectorAll('.btn-detail-buy').forEach(function (button) {
      button.addEventListener('click', function (e) {
        const card = e.target.closest('.product-slide-card');
        beliProduk(card);
      });
    });
  }

  var produkData = {
    'TBL-001': {
      desc: 'Tumbler premium berbahan stainless steel 18/8 food-grade dengan lapisan vakum double-wall. Menjaga minuman dingin hingga 24 jam dan panas hingga 12 jam. Dilengkapi tutup anti-bocor berputar 360°.',
      specs: [
        { icon: 'bi-moisture',       label: 'Material',   val: 'Stainless Steel 18/8' },
        { icon: 'bi-snow',           label: 'Dingin',     val: 'Hingga 24 jam' },
        { icon: 'bi-fire',           label: 'Panas',      val: 'Hingga 12 jam' },
        { icon: 'bi-rulers',         label: 'Kapasitas',  val: '750 ml' },
      ]
    },
    'TBL-002': {
      desc: 'Desain slim minimalis cocok untuk commuter & gym. Dinding ganda mencegah kondensasi di luar botol. Tutup flip-top one-hand dengan kunci pengaman.',
      specs: [
        { icon: 'bi-layers',         label: 'Tipe',       val: 'Double Wall Vacuum' },
        { icon: 'bi-snow',           label: 'Dingin',     val: 'Hingga 18 jam' },
        { icon: 'bi-fire',           label: 'Panas',      val: 'Hingga 8 jam' },
        { icon: 'bi-rulers',         label: 'Kapasitas',  val: '500 ml' },
      ]
    },
    'TBL-003': {
      desc: 'Lapisan keramik di dalam memberikan rasa minuman yang lebih murni tanpa bau plastik atau logam. Ideal untuk teh, kopi, dan infused water. BPA-free & ramah lingkungan.',
      specs: [
        { icon: 'bi-gem',            label: 'Material',   val: 'Ceramic Coated Interior' },
        { icon: 'bi-snow',           label: 'Dingin',     val: 'Hingga 20 jam' },
        { icon: 'bi-fire',           label: 'Panas',      val: 'Hingga 10 jam' },
        { icon: 'bi-rulers',         label: 'Kapasitas',  val: '1000 ml' },
      ]
    },
    'TBL-004': {
      desc: 'Terbuat dari serat bambu organik terbarukan. Pilihan eco-friendly terbaik untuk mengurangi sampah plastik. Ringan dan nyaman digenggam, cocok untuk aktivitas outdoor.',
      specs: [
        { icon: 'bi-tree',           label: 'Material',   val: 'Organic Bamboo Fiber' },
        { icon: 'bi-recycle',        label: 'Sertifikasi',val: 'BPA-Free, Eco-Cert' },
        { icon: 'bi-feather',        label: 'Berat',      val: 'Sangat ringan (~180g)' },
        { icon: 'bi-rulers',         label: 'Kapasitas',  val: '600 ml' },
      ]
    },
    'TBL-005': {
      desc: 'Teknologi VacuMax Elite dengan insulasi nitrogen triple-layer untuk performa termal tertinggi. Permukaan powder-coat tahan goresan dengan grip ergonomis.',
      specs: [
        { icon: 'bi-trophy',         label: 'Insulasi',   val: 'Triple-Layer VacuMax' },
        { icon: 'bi-snow',           label: 'Dingin',     val: 'Hingga 36 jam' },
        { icon: 'bi-fire',           label: 'Panas',      val: 'Hingga 18 jam' },
        { icon: 'bi-rulers',         label: 'Kapasitas',  val: '900 ml' },
      ]
    },
    'TBL-006': {
      desc: 'Kaca borosilikat berkualitas lab tahan thermal shock — aman untuk minuman mendidih langsung. Sleeve silikon anti-slip dan anti-baret.',
      specs: [
        { icon: 'bi-eye',            label: 'Material',   val: 'Borosilicate Glass' },
        { icon: 'bi-thermometer-half',label: 'Tahan Suhu',val: '-20°C s.d. 150°C' },
        { icon: 'bi-shield-check',   label: 'Sertifikasi',val: 'Lab-Grade, BPA-Free' },
        { icon: 'bi-rulers',         label: 'Kapasitas',  val: '650 ml' },
      ]
    },
    'TBL-007': {
      desc: 'Dibuat dari titanium aerospace-grade — material terkuat dan paling ringan. Tidak berasa, tidak berbau, tahan karat seumur hidup.',
      specs: [
        { icon: 'bi-lightning-charge',label: 'Material',  val: 'Titanium Grade 1' },
        { icon: 'bi-snow',           label: 'Dingin',     val: 'Hingga 30 jam' },
        { icon: 'bi-fire',           label: 'Panas',      val: 'Hingga 15 jam' },
        { icon: 'bi-rulers',         label: 'Kapasitas',  val: '800 ml' },
      ]
    }
  };

  var currentDetailCard = null;

  function bukaDetailProduk(card) {
    currentDetailCard = card;
    const id      = card.dataset.id;
    const nama    = card.dataset.nama;
    const harga   = card.dataset.harga;
    const stokEl  = card.querySelector('.stok-text');
    const badgeEl = card.querySelector('.badge-stock');
    const imgEl   = card.querySelector('.pcard-img');
    const catEl   = card.querySelector('.pcard-category');
    const stok    = parseInt(stokEl ? stokEl.innerText.replace(/[^0-9]/g, '') : 0);

    document.getElementById('detail-nama').textContent  = nama;
    document.getElementById('detail-sku').textContent   = id;
    document.getElementById('detail-harga').textContent = harga;
    document.getElementById('detail-category').innerHTML = catEl ? catEl.innerHTML : '';

    const stokValEl = document.getElementById('detail-stok-val');
    stokValEl.textContent = stok + ' unit';
    stokValEl.className   = 'detail-stok ' + (stok <= 3 ? 'stok-tipis' : 'stok-aman');

    const detailBadge = document.getElementById('detail-badge');
    detailBadge.className   = badgeEl ? badgeEl.className : 'badge-stock';
    detailBadge.textContent = badgeEl ? badgeEl.textContent : '';

    const detailImg         = document.getElementById('detail-img');
    const detailImgFallback = document.getElementById('detail-img-fallback');
    if (imgEl && imgEl.style.display !== 'none' && imgEl.src) {
      detailImg.src                    = imgEl.src;
      detailImg.style.display          = 'block';
      detailImgFallback.style.display  = 'none';
    } else {
      detailImg.style.display          = 'none';
      detailImgFallback.style.display  = 'flex';
    }

    const data    = produkData[id] || { desc: '', specs: [] };
    document.getElementById('detail-desc').textContent = data.desc;
    document.getElementById('detail-specs').innerHTML  = data.specs.map(function (s) {
      return '<div class="spec-item">' +
        '<i class="bi ' + s.icon + ' spec-icon"></i>' +
        '<div><div class="spec-label">' + s.label + '</div>' +
        '<div class="spec-val">' + s.val + '</div></div>' +
        '</div>';
    }).join('');

    const modalBuyBtn = document.getElementById('detail-buy-btn');
    modalBuyBtn.disabled  = false;
    modalBuyBtn.innerHTML = '<i class="bi bi-bag-plus me-2"></i>Beli Sekarang';
    modalBuyBtn.classList.remove('disabled');

    new bootstrap.Modal(document.getElementById('detailModal')).show();
  }

  function aktifkanTombolDetail() {
    document.querySelectorAll('.btn-detail-view').forEach(function (btn) {
      btn.addEventListener('click', function () {
        bukaDetailProduk(btn.closest('.product-slide-card'));
      });
    });
  }

  document.getElementById('detail-buy-btn').addEventListener('click', function () {
    if (!currentDetailCard) return;
    if (beliProduk(currentDetailCard)) {
      const stokEl    = currentDetailCard.querySelector('.stok-text');
      const stok      = parseInt(stokEl.innerText.replace(/[^0-9]/g, ''));
      const stokValEl = document.getElementById('detail-stok-val');
      stokValEl.textContent = stok + ' unit';
      stokValEl.className   = 'detail-stok ' + (stok <= 3 ? 'stok-tipis' : 'stok-aman');
    }
  });

  (function initSlider() {
    const track    = document.getElementById('sliderTrack');
    const prevBtn  = document.getElementById('prevBtn');
    const nextBtn  = document.getElementById('nextBtn');
    const dotsWrap = document.getElementById('sliderDots');
    const cards    = track.querySelectorAll('.product-slide-card');
    const GAP      = 24;
    let current = 0, isDragging = false, startX = 0, scrollStart = 0;

    function visibleCount() {
      return Math.floor(track.parentElement.offsetWidth / (cards[0].offsetWidth + GAP)) || 1;
    }
    function maxIndex() { return Math.max(0, cards.length - visibleCount()); }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, maxIndex()));
      track.style.transform = 'translateX(-' + (current * (cards[0].offsetWidth + GAP)) + 'px)';
      updateDots(); updateBtns();
    }
    function updateBtns() {
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current >= maxIndex();
    }
    function updateDots() {
      dotsWrap.querySelectorAll('.slider-dot').forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
    }
    function buildDots() {
      dotsWrap.innerHTML = '';
      for (let i = 0; i <= maxIndex(); i++) {
        const btn = document.createElement('button');
        btn.className = 'slider-dot' + (i === 0 ? ' active' : '');
        btn.addEventListener('click', function () { goTo(i); });
        dotsWrap.appendChild(btn);
      }
    }

    prevBtn.addEventListener('click', function () { goTo(current - 1); });
    nextBtn.addEventListener('click', function () { goTo(current + 1); });

    const wrapper = track.parentElement;
    function dragStart(x) { isDragging = true; startX = x; scrollStart = current; }
    function dragMove(x) {
      if (!isDragging) return;
      const diff = startX - x;
      if (Math.abs(diff) > (cards[0].offsetWidth + GAP) * 0.25) {
        goTo(diff > 0 ? scrollStart + 1 : scrollStart - 1);
        isDragging = false;
      }
    }
    function dragEnd() { isDragging = false; }

    wrapper.addEventListener('mousedown',  function (e) { dragStart(e.clientX); });
    wrapper.addEventListener('mousemove',  function (e) { dragMove(e.clientX); });
    wrapper.addEventListener('mouseup',    dragEnd);
    wrapper.addEventListener('mouseleave', dragEnd);
    wrapper.addEventListener('touchstart', function (e) { dragStart(e.touches[0].clientX); }, { passive: true });
    wrapper.addEventListener('touchmove',  function (e) { dragMove(e.touches[0].clientX); },  { passive: true });
    wrapper.addEventListener('touchend',   dragEnd);

    buildDots(); updateBtns();
    window.addEventListener('resize', function () { buildDots(); goTo(Math.min(current, maxIndex())); });
  })();

  /* Init semua fitur index */
  aktifkanTombolWishlist();
  aktifkanTombolBeli();
  aktifkanTombolDetail();
  updateWishlistUI();
}

if (isTambah) {
  const uploadArea        = document.getElementById('uploadArea');
  const fotoInput         = document.getElementById('fotoInput');
  const uploadPlaceholder = document.getElementById('uploadPlaceholder');
  const uploadPreview     = document.getElementById('uploadPreview');
  const previewImg        = document.getElementById('previewImg');
  const removeImg         = document.getElementById('removeImg');
  const form              = document.getElementById('productForm');
  const successMsg        = document.getElementById('successMsg');
  const resetBtn          = document.getElementById('resetBtn');

  function showPreview(file) {
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) { alert('Ukuran file terlalu besar. Maks. 5MB.'); return; }
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src                  = e.target.result;
      uploadPlaceholder.style.display = 'none';
      uploadPreview.style.display     = 'flex';
      uploadArea.classList.add('has-image');
    };
    reader.readAsDataURL(file);
  }

  function clearPreview() {
    previewImg.src                  = '';
    fotoInput.value                 = '';
    uploadPlaceholder.style.display = 'flex';
    uploadPreview.style.display     = 'none';
    uploadArea.classList.remove('has-image', 'drag-over');
  }

  uploadArea.addEventListener('click', function (e) {
    if (!e.target.closest('.upload-remove')) fotoInput.click();
  });
  fotoInput.addEventListener('change', function () {
    if (fotoInput.files[0]) showPreview(fotoInput.files[0]);
  });
  removeImg.addEventListener('click', function (e) { e.stopPropagation(); clearPreview(); });

  uploadArea.addEventListener('dragover',  function (e) { e.preventDefault(); uploadArea.classList.add('drag-over'); });
  uploadArea.addEventListener('dragleave', function ()  { uploadArea.classList.remove('drag-over'); });
  uploadArea.addEventListener('drop', function (e) {
    e.preventDefault(); uploadArea.classList.remove('drag-over');
    if (e.dataTransfer.files[0]) showPreview(e.dataTransfer.files[0]);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault(); e.stopPropagation();
    if (form.checkValidity()) {
      successMsg.classList.remove('d-none');
      form.reset(); form.classList.remove('was-validated'); clearPreview();
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(function () { successMsg.classList.add('d-none'); }, 5000);
    } else {
      form.classList.add('was-validated');
    }
  });

  resetBtn.addEventListener('click', function () {
    form.classList.remove('was-validated');
    clearPreview();
  });
}