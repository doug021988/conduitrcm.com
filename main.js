// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile burger menu
const burger = document.getElementById('burger');
const links  = document.querySelector('.nav-links');
if (burger && links) {
  burger.addEventListener('click', () => {
    links.classList.toggle('open');
    burger.classList.toggle('open');
  });
  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      burger.classList.remove('open');
    });
  });
}

// Form submission feedback
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.innerHTML = `
          <div style="text-align:center;padding:3rem 1rem">
            <div style="font-size:2.5rem;margin-bottom:1rem">✓</div>
            <h3 style="color:var(--teal);margin-bottom:0.75rem">Request received!</h3>
            <p style="color:var(--mgray)">We'll be in touch within one business day to schedule your 30-minute intro call.</p>
          </div>`;
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      btn.textContent = 'Request my free review →';
      btn.disabled = false;
      alert('Something went wrong — please email us directly at ConduitRCM@gmail.com');
    }
  });
}

// Subtle scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.problem-card, .step, .code-card, .why-item, .service-item, .cred-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
