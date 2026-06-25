const PRODUCTS = [
  { id:1, name:"Kablosuz Kulaklık Pro", price:1299, oldPrice:1799, category:"elektronik", rating:4.8, reviews:234, img:"🎧", badge:"İndirim", desc:"40 saat pil ömrü, aktif gürültü engelleme, premium ses kalitesi. Üretken çalışma ve müzik dinleme için ideal." },
  { id:2, name:"Mekanik Klavye RGB", price:2499, oldPrice:null, category:"elektronik", rating:4.6, reviews:189, img:"⌨️", badge:"Yeni", desc:"Cherry MX switch, tam RGB aydınlatma, alüminyum kasa. Oyun ve yazılım geliştiriciler için tasarlandı." },
  { id:3, name:"Ergonomik Mouse", price:699, oldPrice:899, category:"elektronik", rating:4.5, reviews:312, img:"🖱️", badge:"İndirim", desc:"6 programlanabilir tuş, 16000 DPI optik sensör, sağ el ergonomik tasarım." },
  { id:4, name:"4K Webcam", price:1899, oldPrice:null, category:"elektronik", rating:4.7, reviews:98, img:"📷", badge:"Çok Satan", desc:"4K 30fps, geniş açı lens, dahili mikrofon. Uzaktan çalışma ve içerik üretimi için." },
  { id:5, name:"USB-C Hub 7'li", price:549, oldPrice:749, category:"elektronik", rating:4.4, reviews:445, img:"🔌", badge:"İndirim", desc:"HDMI 4K, 3x USB-A, SD kart, USB-C PD 100W. Laptop için tam bağlantı çözümü." },
  { id:6, name:"Laptop Sırt Çantası", price:899, oldPrice:null, category:"aksesuar", rating:4.9, reviews:567, img:"🎒", badge:"Çok Satan", desc:"Su geçirmez kumaş, 15.6\" laptop bölmesi, USB şarj portu, 30L kapasite." },
  { id:7, name:"Telefon Standı Ayarlanabilir", price:299, oldPrice:399, category:"aksesuar", rating:4.3, reviews:823, img:"📱", badge:"İndirim", desc:"Alüminyum, 360° döner, yükseklik ayarlı. Masaüstü telefon standı." },
  { id:8, name:"Monitör Işığı Bar", price:799, oldPrice:null, category:"aksesuar", rating:4.7, reviews:156, img:"💡", badge:"Yeni", desc:"Asimetrik aydınlatma, göz koruması, USB güç, 3 renk sıcaklığı ayarı." },
  { id:9, name:"Mekanik Kalem Seti", price:449, oldPrice:599, category:"kırtasiye", rating:4.5, reviews:234, img:"✏️", badge:"İndirim", desc:"5 adet 0.5mm mekanik kalem, metal gövde, kaymaz tutuş, yedek uç dahil." },
  { id:10, name:"Masa Organizatör", price:649, oldPrice:null, category:"kırtasiye", rating:4.6, reviews:189, img:"🗂️", badge:null, desc:"Bambu malzeme, 6 bölmeli, telefon standı dahil, doğal ve sürdürülebilir." },
  { id:11, name:"Yapışkanlı Not Kağıtları Seti", price:149, oldPrice:199, category:"kırtasiye", rating:4.2, reviews:678, img:"📝", badge:"İndirim", desc:"10 renk, 1000 yaprak, 75x75mm. Ofis ve ev kullanımı için renkli not kağıtları." },
  { id:12, name:"Programlama Kitabı Seti", price:1199, oldPrice:1599, category:"kitap", rating:4.8, reviews:145, img:"📚", badge:"İndirim", desc:"JavaScript, CSS ve HTML5 üçlüsü. Yeni başlayanlar için kapsamlı kaynak seti." },
  { id:13, name:"Teknik İngilizce Rehberi", price:299, oldPrice:null, category:"kitap", rating:4.4, reviews:89, img:"📖", badge:"Yeni", desc:"Yazılım geliştirme terminolojisi, teknik döküman okuma, mülakat hazırlık." },
  { id:14, name:"Proje Yönetimi El Kitabı", price:399, oldPrice:499, category:"kitap", rating:4.5, reviews:112, img:"📗", badge:"İndirim", desc:"Agile, Scrum, Kanban metodolojileri. Junior geliştiriciler için iş hayatı rehberi." },
  { id:15, name:"Çift Monitör Standı", price:1499, oldPrice:null, category:"elektronik", rating:4.7, reviews:203, img:"🖥️", badge:"Çok Satan", desc:"13-27\" uyumlu, C tipi kelepçe montaj, kablo yönetimi, tam hareket." },
  { id:16, name:"Bluetooth Hoparlör Mini", price:799, oldPrice:999, category:"elektronik", rating:4.6, reviews:334, img:"🔊", badge:"İndirim", desc:"12 saat pil, su geçirmez IPX7, 360° ses, taşınabilir kompakt tasarım." },
];

const CART_KEY = 'ali_shop_cart';

function getCart() { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) { existing.qty += qty; }
  else { cart.push({ id: productId, qty }); }
  saveCart(cart);
  updateCartBadge();
  showToast('Ürün sepete eklendi!');
}

function removeFromCart(productId) {
  const cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
  updateCartBadge();
}

function updateQty(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) { item.qty = qty; if (item.qty <= 0) removeFromCart(productId); else saveCart(cart); }
  updateCartBadge();
}

function getCartCount() { return getCart().reduce((s, i) => s + i.qty, 0); }
function getCartTotal() {
  return getCart().reduce((s, i) => {
    const p = PRODUCTS.find(p => p.id === i.id);
    return s + (p ? p.price * i.qty : 0);
  }, 0);
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (badge) {
    const count = getCartCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#10B981;color:#fff;padding:12px 20px;border-radius:8px;font-size:0.87rem;font-weight:600;z-index:9999;transform:translateY(80px);transition:transform 0.3s;font-family:Inter,sans-serif;';
    document.body.appendChild(t);
  }
  t.textContent = '✓ ' + msg;
  t.style.transform = 'translateY(0)';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.transform = 'translateY(80px)'; }, 2200);
}

function formatPrice(n) { return n.toLocaleString('tr-TR') + ' ₺'; }
function starHTML(rating) {
  return Array.from({length:5}, (_,i) => `<span style="color:${i < Math.floor(rating) ? '#F59E0B' : 'rgba(255,255,255,0.2)'}">★</span>`).join('');
}

function productCardHTML(p, linkPrefix = '') {
  const discount = p.oldPrice ? Math.round((1 - p.price/p.oldPrice)*100) : null;
  return `
    <div class="product-card" onclick="window.location='${linkPrefix}pages/product.html?id=${p.id}'">
      <div class="product-img">
        <span class="product-emoji">${p.img}</span>
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        ${discount ? `<span class="product-discount">-${discount}%</span>` : ''}
      </div>
      <div class="product-body">
        <div class="product-cat">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-rating">${starHTML(p.rating)} <span>${p.rating} (${p.reviews})</span></div>
        <div class="product-price-row">
          <span class="product-price">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="product-old-price">${formatPrice(p.oldPrice)}</span>` : ''}
        </div>
        <button class="add-btn" onclick="event.stopPropagation(); addToCart(${p.id})">Sepete Ekle</button>
      </div>
    </div>`;
}

const SHARED_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy:#0F172A; --navy-2:#1E293B; --navy-3:#263348;
    --blue:#3B82F6; --blue-d:#1D4ED8; --green:#10B981; --red:#EF4444; --yellow:#F59E0B;
    --slate:#94A3B8; --white:#F1F5F9; --border:rgba(255,255,255,0.08);
  }
  html,body { min-height:100vh; font-family:'Inter',sans-serif; background:var(--navy); color:var(--white); }
  a { text-decoration:none; color:inherit; }

  nav {
    position:sticky; top:0; z-index:100;
    background:rgba(15,23,42,0.97); backdrop-filter:blur(12px);
    border-bottom:1px solid var(--border);
    display:flex; align-items:center; justify-content:space-between;
    padding:0 5%; height:62px; gap:16px;
  }
  .nav-logo { font-family:'Syne',sans-serif; font-weight:800; font-size:1.2rem; color:var(--white); }
  .nav-logo span { color:var(--blue); }
  .nav-search {
    flex:1; max-width:400px;
    display:flex; gap:0;
  }
  .nav-search input {
    flex:1; background:var(--navy-2); border:1.5px solid var(--border);
    border-right:none; border-radius:8px 0 0 8px;
    padding:9px 14px; color:var(--white); font-family:'Inter',sans-serif;
    font-size:0.88rem; outline:none;
  }
  .nav-search input::placeholder { color:var(--slate); }
  .nav-search input:focus { border-color:var(--blue); }
  .nav-search button {
    background:var(--blue); border:none; border-radius:0 8px 8px 0;
    padding:9px 16px; color:var(--white); cursor:pointer; font-size:1rem;
  }
  .nav-actions { display:flex; align-items:center; gap:12px; }
  .nav-link { color:var(--slate); font-size:0.85rem; font-weight:500; transition:color 0.2s; }
  .nav-link:hover { color:var(--white); }
  .cart-btn {
    position:relative; background:var(--blue); color:var(--white);
    border:none; border-radius:8px; padding:8px 16px;
    font-family:'Inter',sans-serif; font-size:0.85rem; font-weight:600;
    cursor:pointer; display:flex; align-items:center; gap:6px;
    transition:background 0.2s;
  }
  .cart-btn:hover { background:var(--blue-d); }
  #cartBadge {
    position:absolute; top:-6px; right:-6px;
    background:var(--red); color:#fff;
    width:18px; height:18px; border-radius:50%;
    font-size:0.65rem; font-weight:700;
    display:none; align-items:center; justify-content:center;
  }

  .product-card {
    background:var(--navy-2); border:1px solid var(--border);
    border-radius:14px; overflow:hidden; cursor:pointer;
    transition:transform 0.2s, border-color 0.2s, box-shadow 0.2s;
  }
  .product-card:hover { transform:translateY(-4px); border-color:rgba(59,130,246,0.4); box-shadow:0 12px 32px rgba(0,0,0,0.2); }
  .product-img {
    height:160px; background:var(--navy-3);
    display:flex; align-items:center; justify-content:center;
    position:relative; overflow:hidden;
  }
  .product-emoji { font-size:4rem; }
  .product-badge {
    position:absolute; top:10px; left:10px;
    background:var(--blue); color:#fff;
    font-size:0.68rem; font-weight:700; padding:3px 8px; border-radius:4px;
  }
  .product-discount {
    position:absolute; top:10px; right:10px;
    background:var(--red); color:#fff;
    font-size:0.68rem; font-weight:700; padding:3px 8px; border-radius:4px;
  }
  .product-body { padding:16px; }
  .product-cat { font-size:0.7rem; color:var(--blue); font-weight:600; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:6px; }
  .product-name { font-family:'Syne',sans-serif; font-size:0.95rem; font-weight:700; margin-bottom:8px; line-height:1.3; }
  .product-rating { font-size:0.78rem; color:var(--slate); margin-bottom:10px; display:flex; align-items:center; gap:4px; }
  .product-price-row { display:flex; align-items:baseline; gap:8px; margin-bottom:12px; }
  .product-price { font-family:'Syne',sans-serif; font-size:1.1rem; font-weight:800; color:var(--white); }
  .product-old-price { font-size:0.82rem; color:var(--slate); text-decoration:line-through; }
  .add-btn {
    width:100%; background:var(--blue); color:#fff; border:none;
    border-radius:7px; padding:10px; font-family:'Inter',sans-serif;
    font-size:0.85rem; font-weight:600; cursor:pointer; transition:background 0.2s;
  }
  .add-btn:hover { background:var(--blue-d); }

  footer { background:#080D18; padding:40px 5% 24px; margin-top:80px; border-top:1px solid var(--border); }
  .footer-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:32px; margin-bottom:32px; }
  .footer-brand { font-family:'Syne',sans-serif; font-size:1.1rem; font-weight:800; margin-bottom:10px; }
  .footer-brand span { color:var(--blue); }
  .footer-desc { font-size:0.82rem; color:var(--slate); line-height:1.7; }
  .footer-title { font-size:0.75rem; font-weight:700; color:var(--slate); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:12px; }
  .footer-links { list-style:none; display:flex; flex-direction:column; gap:8px; }
  .footer-links a { font-size:0.83rem; color:rgba(255,255,255,0.5); transition:color 0.2s; }
  .footer-links a:hover { color:var(--blue); }
  .footer-bottom { border-top:1px solid var(--border); padding-top:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; }
  .footer-copy { font-size:0.75rem; color:rgba(255,255,255,0.2); }
  .footer-dev { font-size:0.75rem; color:rgba(255,255,255,0.3); }
  .footer-dev a { color:var(--blue); }

  @media(max-width:768px) {
    nav { padding:0 4%; }
    .nav-search { display:none; }
  }
`;
