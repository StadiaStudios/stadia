const components = {
  navbar: `
    <style>
      #main-nav {
        position: fixed;
        top: 0; left: 0; width: 100%;
        z-index: 100;
        background: rgba(0,0,0,0.80);
        border-bottom: 1px solid rgba(255,255,255,0.05);
        backdrop-filter: blur(12px);
        transition: background 0.3s, box-shadow 0.3s;
      }
      .navbar-inner {
        max-width: 1024px;
        margin: 0 auto;
        padding: 0 24px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .navbar-brand {
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: opacity 0.2s;
        user-select: none;
      }
      .navbar-brand:hover .navbar-title {
        opacity: 1;
      }
      .navbar-brand .navbar-title {
        font-family: 'Barlow', 'Inter', Arial, sans-serif;
        font-weight: bold;
        font-size: 14px;
        letter-spacing: -0.5px;
        color: #fff;
        opacity: 0.9;
        transition: opacity 0.2s;
      }
      .navbar-brand img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin-right: 12px;
        border: 1px solid rgba(255,255,255,0.2);
        object-fit: cover;
        background: #232323;
      }
      .navbar-menu {
        display: flex;
        align-items: center;
        gap: 32px;
      }
      .navbar-link {
        font-size: 12px;
        font-family: 'Inter', Arial, sans-serif;
        font-weight: 400;
        color: #b5bbbe;
        text-decoration: none;
        transition: color 0.15s;
      }
      .navbar-link:hover {
        color: #fff;
      }
      .navbar-actions {
        display: flex;
        align-items: center;
        gap: 20px;
      }
      .navbar-icon-link {
        color: #b5bbbe;
        transition: color 0.15s;
      }
      .navbar-icon-link:hover {
        color: #fff;
      }
      #mobile-menu-button {
        display: none;
        background: none;
        border: none;
        color: #b5bbbe;
        cursor: pointer;
        padding: 0;
        transition: color 0.15s;
      }
      #mobile-menu-button:hover {
        color: #fff;
      }
      @media (max-width: 768px) {
        .navbar-menu {
          display: none;
        }
        #mobile-menu-button {
          display: block;
        }
      }
    </style>
    <nav id="main-nav">
      <div class="navbar-inner">
        <div class="navbar-brand" onclick="window.location.href='index.html'">
          <img src="assets/favicon.png" alt="Logo">
          <span class="navbar-title">STADIASTUDIOS</span>
        </div>
        <div class="navbar-menu">
          <a href="index.html" class="navbar-link">Home</a>
          <a href="https://forms.gle/W3R8sizfH6YcUbeD9" class="navbar-link">Report & Feedback</a>
          <a href="store/store.html" class="navbar-link">App Store</a>
          <a href="https://discord.gg/UGBFVrcKKx" class="navbar-link">Community</a>
        </div>
        <div class="navbar-actions">
          <a href="mailto:stadiastudios.support@proton.me" class="navbar-icon-link">
            <i class="fas fa-envelope" style="font-size:13px;"></i>
          </a>
          <button id="mobile-menu-button">
            <i class="fa-solid fa-bars-staggered" style="font-size:14px;"></i>
          </button>
        </div>
      </div>
    </nav>
    <style>
      #mobile-menu {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        z-index: 110;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.3s;
      }
      #mobile-menu.visible {
        visibility: visible;
        opacity: 1;
      }
      #mobile-menu-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,0.9);
        backdrop-filter: blur(8px);
      }
      #mobile-menu-panel {
        position: absolute;
        top: 0; left: 0;
        width: 100vw;
        height: 100vh;
        padding: 48px 0 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 32px;
        z-index: 1;
      }
      #mobile-menu-close {
        position: absolute;
        top: 24px;
        right: 24px;
        background: none;
        border: none;
        color: #b5bbbe;
        font-size: 32px;
        cursor: pointer;
        transition: color 0.15s;
        z-index: 10;
      }
      #mobile-menu-close:hover {
        color: #fff;
      }
      .mobile-nav-link {
        font-size: 28px;
        font-family: 'Barlow', 'Inter', Arial, sans-serif;
        font-weight: 600;
        color: #fff;
        text-decoration: none;
        transition: color 0.15s;
        display: block;
      }
      .mobile-nav-link.special {
        color: #8c939a;
      }
      .mobile-nav-link:not(.special):hover {
        color: #2986d2;
      }
      .mobile-nav-link.special:hover {
        color: #2986d2;
      }
      @media (min-width: 769px) {
        #mobile-menu { display: none !important; }
      }
    </style>
    <div id="mobile-menu">
      <div id="mobile-menu-backdrop"></div>
      <div id="mobile-menu-panel">
        <button id="mobile-menu-close">&times;</button>
        <a href="index.html" class="mobile-nav-link">Home</a>
        <a href="https://forms.gle/W3R8sizfH6YcUbeD9" class="mobile-nav-link">Report & Feedback</a>
        <a href="store/store.html" class="mobile-nav-link">App Store</a>
        <a href="mailto:stadiastudios.support@proton.me" class="mobile-nav-link">Contact Us</a>
        <a href="https://discord.gg/UGBFVrcKKx" class="mobile-nav-link special">Discord</a>
      </div>
    </div>
  `,
  footer: `
    <style>
      .custom-footer {
        background: #000;
        color: #b5bbbe;
        padding-top: 48px;
        padding-bottom: 24px;
        font-family: 'Inter', Arial, sans-serif;
        font-size: 12px;
        border-top: 1px solid rgba(255,255,255,0.05);
      }
      .footer-container {
        max-width: 1600px;
        margin: 0 auto;
        padding-left: 16px;
        padding-right: 16px;
      }
      .footer-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 32px;
        margin-bottom: 48px;
      }
      @media (min-width: 768px) {
        .footer-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      @media (min-width: 1200px) {
        .footer-grid {
          grid-template-columns: repeat(6, 1fr);
        }
      }
      .footer-section h4 {
        font-weight: bold;
        color: #fff;
        margin-bottom: 16px;
        font-size: 15px;
        letter-spacing: 0.01em;
      }
      .footer-section ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .footer-section li {
        margin-bottom: 12px;
      }
      .footer-section a {
        color: #b5bbbe;
        text-decoration: none;
        transition: color 0.18s, text-decoration 0.18s;
        border-bottom: 1px solid transparent;
      }
      .footer-section a:hover {
        color: #fff;
        text-decoration: underline;
        border-bottom: 1px solid #fff;
      }
      .footer-bottom {
        padding-top: 32px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        border-top: 1px solid rgba(255,255,255,0.05);
      }
      .footer-bottom-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 16px;
      }
      .footer-bottom-row span,
      .footer-bottom-row a {
        color: #b5bbbe;
        font-size: 12px;
        text-decoration: none;
        transition: color 0.18s;
        margin-right: 20px;
      }
      .footer-bottom-row a:hover {
        color: #fff;
        text-decoration: underline;
      }
      @media (min-width: 1024px) {
        .footer-bottom {
          flex-direction: row;
          justify-content: space-between;
        }
        .footer-bottom-row {
          margin-right: 0;
        }
      }
    </style>
    <footer class="custom-footer">
      <div class="footer-container">
        <div class="footer-grid">
          <div class="footer-section">
            <h4>Games</h4>
            <ul>
              <li><a href="https://stadiastudios.github.io/JetSurfers2/">Jet Surfers II</a></li>
              <li><a href="https://stadiastudios.github.io/candyswap">CandySwap</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Applications</h4>
            <ul>
              <li><a href="https://stadiabeta.github.io/tool-panel/">Stadia Tool Panel</a></li>
              <li><a href="https://stadiastudios.github.io/passpro/">PassPro</a></li>
              <li><a href="https://stadiastudios.github.io/ourjourney/splash">Our Journey</a></li>
              <li><a href="store/recorder-pro.html">RecorderPRO</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Stadia</h4>
            <ul>
              <li><a href="tos.pdf">Terms Of Service</a></li>
              <li><a href="store/store.html">Stadia App Store</a></li>
              <li><a href="mailto:stadiastudios.support@proton.me">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="footer-bottom-row">
            <a href="tos.pdf">Terms Of Service</a>
            <a href="store/store.html">Stadia Store</a>
          </div>
          <div class="footer-bottom-row">
            <a href="https://discord.gg/UGBFVrcKKx">Discord Community</a>
            <span>&copy; StadiaStudios ${new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  `
};

function initLayout() {
  const navPlaceholder = document.getElementById('navbar-placeholder');
  if (navPlaceholder) navPlaceholder.innerHTML = components.navbar;

  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) footerPlaceholder.innerHTML = components.footer;

  setupEvents();
}

function setupEvents() {
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    if (window.scrollY > 20) {
      nav.style.background = 'rgba(0,0,0,0.95)';
      nav.style.boxShadow = '0 2px 16px 0 rgba(0,0,0,0.5)';
    } else {
      nav.style.background = 'rgba(0,0,0,0.80)';
      nav.style.boxShadow = 'none';
    }
  });

  const mobileMenu = document.getElementById('mobile-menu');
  const menuBackdrop = document.getElementById('mobile-menu-backdrop');
  const openBtn = document.getElementById('mobile-menu-button');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMenu = (show) => {
    if (!mobileMenu) return;
    if (show) {
      mobileMenu.classList.add('visible');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.remove('visible');
      document.body.style.overflow = 'auto';
    }
  };

  if (openBtn) openBtn.onclick = () => toggleMenu(true);
  if (closeBtn) closeBtn.onclick = () => toggleMenu(false);
  if (menuBackdrop) menuBackdrop.onclick = () => toggleMenu(false);

  mobileLinks.forEach(link => {
    link.onclick = () => toggleMenu(false);
  });
}

window.addEventListener('DOMContentLoaded', initLayout);