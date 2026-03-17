/* ═══════════════════════════════════════════════
   M&M GRÁFICA — contacto.js
   Validación y envío real con Netlify Forms
═══════════════════════════════════════════════ */

function initContacto() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const error   = document.getElementById('formError');
  const sendBtn = document.getElementById('sendBtn');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    success.style.display = 'none';
    if (error) error.style.display = 'none';

    if (!validateForm(form)) return;

    const originalHTML = sendBtn.innerHTML;
    sendBtn.textContent = 'Enviando…';
    sendBtn.disabled = true;

    try {
      const body = new URLSearchParams(new FormData(form)).toString();

      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      });

      if (!res.ok) throw new Error('No se pudo enviar el formulario');

      form.reset();
      success.style.display = 'block';
      setTimeout(() => { success.style.display = 'none'; }, 6000);
    } catch (err) {
      if (error) {
        error.style.display = 'block';
        setTimeout(() => { error.style.display = 'none'; }, 7000);
      }
      console.error(err);
    } finally {
      sendBtn.innerHTML = originalHTML;
      sendBtn.disabled = false;
    }
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

  const emailField = form.querySelector('[type="email"]');
  if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
    emailField.style.borderColor = '#d4401a';
    valid = false;
  }

  return valid;
}
