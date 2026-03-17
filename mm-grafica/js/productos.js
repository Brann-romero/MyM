/* ═══════════════════════════════════════════════
   M&M GRÁFICA — productos.js
   Filtros · Ordenamiento · Sidebar
═══════════════════════════════════════════════ */

function initProductos(preFilter = null) {

  /* ── TOGGLE SIDEBAR ── */
  document.querySelectorAll('.sb-title').forEach(title => {
    title.addEventListener('click', () => {
      const body  = title.nextElementSibling;
      const arrow = title.querySelector('.sb-arrow');
      const isClosed = body.classList.toggle('closed');
      arrow.textContent = isClosed ? '+' : '−';
      arrow.style.transform = isClosed ? 'rotate(-90deg)' : '';
    });
  });

  /* ── FILTRO POR CATEGORÍA (sidebar) ── */
  document.querySelectorAll('#sbCatList a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('#sbCatList a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
      applyCategory(link.dataset.cat);
    });
  });

  /* ── ORDENAR ── */
  const sortSel = document.getElementById('sortSel');
  if (sortSel) {
    sortSel.addEventListener('change', () => sortProducts(sortSel.value));
  }

  /* ── LIMPIAR FILTROS ── */
  const clearBtn = document.getElementById('clearFiltersBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      document.querySelectorAll('#prodGrid .prod-card').forEach(c => c.style.display = '');
      document.querySelectorAll('#sbCatList a').forEach((a, i) => a.classList.toggle('active', i === 0));
      document.querySelectorAll('.chk-list input[type="checkbox"]').forEach(c => c.checked = false);
      updateCount();
    });
  }

  /* ── PRE-FILTRO desde navegación ── */
  if (preFilter) applyCategory(preFilter);
}

/* ── Aplicar categoría ── */
function applyCategory(cat) {
  const cards = document.querySelectorAll('#prodGrid .prod-card');
  cards.forEach(c => {
    const show = !cat || cat === 'Todos' || c.dataset.cat === cat;
    c.style.display = show ? '' : 'none';
  });

  // Actualizar sidebar activo
  document.querySelectorAll('#sbCatList a').forEach(a => {
    const match = a.dataset.cat === cat || (!cat && a.dataset.cat === 'Todos');
    a.classList.toggle('active', match);
  });

  updateCount();
}

/* ── Ordenar ── */
function sortProducts(val) {
  const grid  = document.getElementById('prodGrid');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('.prod-card')];
  cards.sort((a, b) => {
    const na = a.querySelector('.prod-card__name').textContent;
    const nb = b.querySelector('.prod-card__name').textContent;
    if (val === 'az') return na.localeCompare(nb, 'es');
    if (val === 'za') return nb.localeCompare(na, 'es');
    return 0;
  });
  cards.forEach(c => grid.appendChild(c));
}

/* ── Contador ── */
function updateCount() {
  const el      = document.getElementById('prodCount');
  const visible = document.querySelectorAll('#prodGrid .prod-card:not([style*="none"])').length;
  if (el) el.textContent = visible + ' productos encontrados';
}
