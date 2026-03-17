/* ═══════════════════════════════════════════════
   M&M GRÁFICA — contacto.js
   Validación y envío de formulario
═══════════════════════════════════════════════ */

function initContacto() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const sendBtn = document.getElementById('sendBtn');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm(form)) return;

    // Simular envío
    sendBtn.textContent = 'Enviando…';
    sendBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      sendBtn.innerHTML = 'Enviar consulta <span class="arrow">→</span>';
      sendBtn.disabled  = false;
      success.style.display = 'block';
      setTimeout(() => { success.style.display = 'none'; }, 6000);
    }, 1200);
  });
}

function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    const err = field.parentElement.querySelector('.field-error');
    if (!field.value.trim()) {
      field.style.borderColor = '#d4401a';
      if (err) err.style.display = 'block';
      valid = false;
    } else {
      field.style.borderColor = '';
      if (err) err.style.display = 'none';
    }
  });

  // Validar email
  const emailField = form.querySelector('[type="email"]');
  if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
    emailField.style.borderColor = '#d4401a';
    valid = false;
  }

  return valid;
}
