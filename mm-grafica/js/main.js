/* ═══════════════════════════════════════════════
   M&M GRÁFICA — main.js
   Navegación SPA · Header/Footer inyectados
═══════════════════════════════════════════════ */

/* ── HEADER HTML (compartido) ── */
const HEADER_HTML = `
<div class="topbar">
  📦 Envíos a todo el país &nbsp;·&nbsp;
  <a href="#">Precios mayoristas</a>
  &nbsp;·&nbsp; 📱 +54 9 11 3831-2154
</div>
<header class="site-header">
  <div class="header-inner">
    <div class="site-logo" onclick="navigate('home')">
      <span class="site-logo__main">M&amp;M</span>
      <span class="site-logo__sub">Gráfica &amp; Publicidad</span>
    </div>
    <nav class="site-nav">
      <button class="nav-link" id="nav-home" onclick="navigate('home')">Inicio</button>
      <div class="nav-dropdown">
        <button class="nav-link" id="nav-productos" onclick="navigate('productos')">Productos ▾</button>
        <div class="nav-dropdown__menu">
          <button onclick="navigate('productos','Banners')">Banners con portabanner</button>
          <button onclick="navigate('productos','Graficas')">Gráficas para colgar</button>
          <button onclick="navigate('productos','Vidrios')">Decoración de vidrios</button>
          <button onclick="navigate('productos','PVC')">Gráficas montadas en PVC</button>
          <button onclick="navigate('productos','Senaletica')">Señalética / Comunicación</button>
          <button onclick="navigate('productos','Metro')">Impresión por metro</button>
          <button onclick="navigate('productos','Stickers')">Stickers / Calcos</button>
          <button onclick="navigate('productos','Digital')">Impresión digital</button>
          <button onclick="navigate('productos','Cuadros')">Cuadros</button>
        </div>
      </div>
      <button class="nav-link" id="nav-contacto" onclick="navigate('contacto')">Contacto</button>
    </nav>
  </div>
</header>`;

/* ── FOOTER HTML (compartido) ── */
const FOOTER_HTML = `
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-brand">
        <div class="footer-logo__main">M&amp;M</div>
        <div class="footer-logo__sub">Gráfica &amp; Publicidad</div>
        <p>Impresiones de alta calidad para empresas, agencias y profesionales. Desde Buenos Aires para todo el país.</p>
      </div>
      <div class="footer-col">
        <h4>Productos</h4>
        <ul>
          <li><a onclick="navigate('productos','Banners')">Banners</a></li>
          <li><a onclick="navigate('productos','Metro')">Lonas y vinilos</a></li>
          <li><a onclick="navigate('productos','Stickers')">Stickers</a></li>
          <li><a onclick="navigate('productos','Digital')">Impresión digital</a></li>
          <li><a onclick="navigate('productos','Cuadros')">Cuadros</a></li>
          <li><a onclick="navigate('productos','Senaletica')">Señalética</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Empresa</h4>
        <ul>
          <li><a>Quiénes somos</a></li>
          <li><a>Preguntas frecuentes</a></li>
          <li><a>Medios de pago</a></li>
          <li><a>Envíos y retiro</a></li>
          <li><a>Términos y condiciones</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contacto</h4>
        <div class="footer-contact-item">📱 <span><strong>WhatsApp</strong> +54 9 11 3831-2154</span></div>
        <div class="footer-contact-item">✉️ <span>info@mmgrafica.com.ar</span></div>
        <div class="footer-contact-item">📍 <span>Av. Pte. Perón 3899 - Local 7, A. Korn</span></div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© M&amp;M Gráfica 2026 — Todos los derechos reservados &nbsp;·&nbsp; <a>Defensa del consumidor</a></p>
      <div class="social-links">
        <span class="social-link" title="Instagram">📸</span>
        <span class="social-link" title="Facebook">👤</span>
        <span class="social-link" title="WhatsApp">💬</span>
      </div>
    </div>
  </div>
</footer>`;

/* ── WHATSAPP FLOTANTE ── */
const WA_NUMBER = '5491138312154';
const WA_MESSAGE = encodeURIComponent('Hola! Quiero hacer una consulta sobre sus productos.');

const WA_BTN_HTML = `
<a
  class="wa-float"
  href="https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}"
  target="_blank"
  rel="noopener"
  aria-label="Contactar por WhatsApp"
  title="Escribinos por WhatsApp"
>
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.75.72 5.37 2.08 7.67L.5 31.5l8.07-2.05A15.44 15.44 0 0016 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.3a13.7 13.7 0 01-7.01-1.93l-.5-.3-5.18 1.32 1.35-4.93-.33-.52A13.72 13.72 0 1116 28.8zm7.52-10.28c-.41-.2-2.43-1.2-2.81-1.33-.37-.14-.64-.2-.91.2-.27.41-1.05 1.33-1.29 1.6-.24.28-.47.31-.88.1a11.17 11.17 0 01-3.28-2.02 12.3 12.3 0 01-2.27-2.82c-.24-.41 0-.63.18-.84.17-.18.41-.47.61-.7.2-.24.27-.41.41-.68.14-.27.07-.51-.03-.71-.1-.2-.91-2.2-1.25-3.01-.33-.79-.66-.68-.91-.69h-.77c-.27 0-.71.1-1.08.51-.37.41-1.42 1.38-1.42 3.37s1.45 3.91 1.65 4.18c.2.27 2.85 4.35 6.91 6.1.97.41 1.72.66 2.31.85.97.3 1.85.26 2.55.16.78-.12 2.43-.99 2.77-1.95.34-.96.34-1.78.24-1.95-.1-.17-.37-.27-.78-.48z"/>
  </svg>
</a>`;

/* ════════════════════════════════
   ROUTER SPA
════════════════════════════════ */
const PAGES = {
  home:      { file: 'pages/home.html',      css: 'css/home.css',      title: 'Inicio — M&M Gráfica' },
  productos: { file: 'pages/productos.html', css: 'css/productos.css', title: 'Productos — M&M Gráfica' },
  contacto:  { file: 'pages/contacto.html',  css: 'css/contacto.css',  title: 'Contacto — M&M Gráfica' },
};

let currentPage = null;
let currentPageCSS = null;

async function navigate(pageId, filter = null) {
  if (!PAGES[pageId]) return;

  const cfg = PAGES[pageId];

  // Cargar CSS de página si cambia
  if (currentPage !== pageId) {
    if (currentPageCSS) currentPageCSS.remove();
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cfg.css;
    document.head.appendChild(link);
    currentPageCSS = link;
  }

  // Cargar HTML de página
  try {
    const res = await fetch(cfg.file);
    const html = await res.text();
    document.getElementById('page-content').innerHTML = html;
  } catch {
    document.getElementById('page-content').innerHTML = `<p style="padding:80px 32px;font-size:18px">Error cargando la página.</p>`;
  }

  // Scroll al top DESPUÉS de inyectar el contenido
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Nav activo
  document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
  const nb = document.getElementById('nav-' + pageId);
  if (nb) nb.classList.add('active');

  document.title = cfg.title;
  currentPage = pageId;

  // Inicializar funciones de página
  if (pageId === 'productos') setTimeout(() => initProductos(filter), 50);
  if (pageId === 'contacto')  setTimeout(() => initContacto(), 50);
}

/* ════════════════════════════════
   INIT — Inyectar header + footer
════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('site-header').innerHTML = HEADER_HTML;
  document.getElementById('site-footer').innerHTML = FOOTER_HTML;
  document.body.insertAdjacentHTML('beforeend', WA_BTN_HTML);
  navigate('home');
});
