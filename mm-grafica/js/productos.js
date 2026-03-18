/* ═══════════════════════════════════════════════
   M&M GRÁFICA — productos.js
   Lee data/productos.json · Renderiza portfolio
   Galería masonry · Lightbox con nav
═══════════════════════════════════════════════ */

let DB = null;          // Base de datos cargada del JSON
let lbImages = [];      // Imágenes del lightbox actual
let lbIndex  = 0;       // Índice activo del lightbox
let activeCat = 'Todos'; // Categoría activa

/* ════════════════════════════════
   INIT — llamado por el router
════════════════════════════════ */
async function initProductos(preFilter = null) {
  // 1. Cargar JSON si no está en memoria
  if (!DB) {
    try {
      const res = await fetch('data/productos.json');
      DB = await res.json();
    } catch (e) {
      console.error('Error cargando productos.json', e);
      return;
    }
  }

  // 2. Renderizar página
  renderPage();

  // 3. Aplicar filtro si viene desde nav/home
  if (preFilter) {
    switchTab(String(preFilter).toLowerCase());
  } else {
    switchTab('Todos');
  }

  // 4. Init lightbox
  initLightbox();
}

/* ════════════════════════════════
   RENDER — construye todo el HTML
════════════════════════════════ */
function renderPage() {
  const container = document.getElementById('productos-root');
  if (!container || !DB) return;

  const cats = DB.categorias;
  const totalItems = cats.reduce((acc, c) => acc + c.productos.length, 0);

  container.innerHTML = `
    <!-- Cabecera -->
    <div class="products-page__header">
      <span class="label">Catálogo completo</span>
      <h1 class="display-title">Productos</h1>
      <p class="products-count" id="prodCount">${totalItems} trabajos en el portfolio</p>
    </div>

    <!-- Tabs -->
    <div class="cat-tabs" id="catTabs">
      <button class="cat-tab active" data-cat="Todos" onclick="switchTab('Todos')">
        Todos (${totalItems})
      </button>
      ${cats.map(c => `
        <button class="cat-tab" data-cat="${c.id}" onclick="switchTab('${c.id}')">
          ${c.icono} ${c.nombre} (${c.productos.length})
        </button>
      `).join('')}
    </div>

    <!-- Secciones de categoría -->
    ${cats.map(c => renderCatSection(c)).join('')}

    <!-- Lightbox -->
    <div class="lightbox" id="lightbox" onclick="closeLightboxOutside(event)">
      <button class="lightbox__close" onclick="closeLightbox()">✕</button>
      <button class="lightbox__nav lightbox__prev" onclick="lbNav(-1)">‹</button>
      <div class="lightbox__img-wrap">
        <img class="lightbox__img" id="lbImg" src="" alt=""/>
      </div>
      <button class="lightbox__nav lightbox__next" onclick="lbNav(1)">›</button>
      <div class="lightbox__counter" id="lbCounter"></div>
      <div class="lightbox__caption" id="lbCaption"></div>
    </div>
  `;
}

/* ────────────────────────────────
   Renderiza la sección de 1 categoría
──────────────────────────────── */
function renderCatSection(cat) {
  const featured = cat.productos[0];
  const rest     = cat.productos.slice(1);

  const badgeHTML = cat.badge
    ? `<div class="prod-card__badge">${cat.badge}</div>`
    : '';

  const tagsHTML = cat.tags
    .map(t => `<span class="cat-hero__tag">${t}</span>`)
    .join('');

  const galleryHTML = rest.map((p, i) => `
    <div class="gallery-item"
         onclick="openLightbox('${cat.id}', ${i + 1})"
         title="${p.nombre}">
      <img src="${p.imagen}"
           alt="${p.nombre}"
           loading="lazy"
           onerror="this.parentElement.style.display='none'"/>
      <div class="gallery-item__overlay">
        <span class="gallery-item__zoom">🔍</span>
      </div>
    </div>
  `).join('');

  return `
    <section class="cat-section" id="cat-${cat.id}" data-cat="${cat.id}">

      <!-- Hero de la categoría -->
      <div class="cat-hero" style="border-left: 4px solid var(--accent)">
        <div class="cat-hero__info" style="background:${cat.color}">
          <div class="cat-hero__icon">${cat.icono}</div>
          <h2 class="cat-hero__title">${cat.nombre}</h2>
          <p class="cat-hero__desc">${cat.descripcion}</p>
          <div class="cat-hero__tags">${tagsHTML}</div>
          <div class="cat-hero__cta">
            <button class="btn-primary" onclick="navigate('contacto')">
              Consultar →
            </button>
          </div>
        </div>
        <div class="cat-hero__featured"
             onclick="openLightbox('${cat.id}', 0)"
             style="cursor:zoom-in">
          ${badgeHTML}
          <img src="${featured.imagen}"
               alt="${featured.nombre}"
               onerror="this.src=''"/>
        </div>
      </div>

      <!-- Galería masonry del resto -->
      ${rest.length > 0 ? `
        <div class="cat-gallery" id="gallery-${cat.id}">
          ${galleryHTML}
        </div>
      ` : ''}

    </section>
  `;
}

/* ════════════════════════════════
   FILTRO POR TAB
════════════════════════════════ */
function switchTab(catId) {
  const normalizedCat = catId === 'Todos' ? 'Todos' : String(catId).toLowerCase();
  activeCat = normalizedCat;

  // Tabs activos
  document.querySelectorAll('.cat-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.cat === normalizedCat);
  });

  // Mostrar/ocultar secciones
  document.querySelectorAll('.cat-section').forEach(s => {
    const show = normalizedCat === 'Todos' || s.dataset.cat === normalizedCat;
    s.classList.toggle('visible', show);
  });

  // Actualizar contador
  const el = document.getElementById('prodCount');
  if (el && DB) {
    if (normalizedCat === 'Todos') {
      const total = DB.categorias.reduce((a, c) => a + c.productos.length, 0);
      el.textContent = `${total} trabajos en el portfolio`;
    } else {
      const cat = DB.categorias.find(c => c.id === normalizedCat);
      el.textContent = cat ? `${cat.productos.length} trabajos · ${cat.nombre}` : '';
    }
  }
}

/* ════════════════════════════════
   LIGHTBOX
════════════════════════════════ */
function initLightbox() {
  document.addEventListener('keydown', handleLbKey);
}

function openLightbox(catId, index) {
  if (!DB) return;
  const cat = DB.categorias.find(c => c.id === catId);
  if (!cat) return;

  lbImages = cat.productos;
  lbIndex  = index;
  updateLb();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function closeLightboxOutside(e) {
  if (e.target.id === 'lightbox') closeLightbox();
}

function lbNav(dir) {
  lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
  updateLb();
}

function updateLb() {
  const item = lbImages[lbIndex];
  document.getElementById('lbImg').src        = item.imagen;
  document.getElementById('lbImg').alt        = item.nombre;
  document.getElementById('lbCounter').textContent = `${lbIndex + 1} / ${lbImages.length}`;
  document.getElementById('lbCaption').textContent = item.nombre;
}

function handleLbKey(e) {
  const lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'ArrowLeft')  lbNav(-1);
}
