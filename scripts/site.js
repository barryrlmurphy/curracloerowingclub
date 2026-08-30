// Curracloe Rowing Club — site JS
// Vanilla, no framework. Handles:
//  - Mobile nav toggle
//  - Newsletter banner form (every page)
//  - Big newsletter signup form (home page)
//  - News page category filter
//  - Contact form

(function () {
  'use strict';

  // ---------------- mobile nav -------------------------------------------
  function initNav() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('[data-nav]');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // ---------------- helper: validate email -------------------------------
  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());
  }

  // ---------------- newsletter banner ------------------------------------
  function initNewsletterBanner() {
    const form = document.querySelector('[data-newsletter-banner]');
    if (!form) return;
    const input = form.querySelector("input[type='email']");
    const msg = form.parentElement.querySelector(
      '[data-newsletter-banner-msg]'
    );
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = input.value.trim();
      if (!isEmail(email)) {
        msg.textContent = 'Please enter a valid email address.';
        msg.classList.add('is-visible');
        msg.style.color = '#ffadd3';
        input.focus();
        return;
      }
      msg.textContent = "Thanks, you're on the list. See you on the water.";
      msg.style.color = '#ffadd3';
      msg.classList.add('is-visible');
      input.value = '';
    });
  }

  // ---------------- big home signup --------------------------------------
  function initSignup() {
    const form = document.querySelector('[data-signup]');
    if (!form) return;
    const msg = form.querySelector('[data-signup-msg]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      if (!name || !isEmail(email)) {
        msg.innerHTML =
          '<strong>Almost there</strong>Please add your name and a valid email.';
        msg.classList.add('is-visible');
        msg.style.borderLeftColor = 'var(--crc-danger)';
        return;
      }
      msg.innerHTML =
        "<strong>You're in</strong>Thanks " +
        escapeHTML(name.split(' ')[0]) +
        ', next club update lands in your inbox on the first of the month.';
      msg.style.borderLeftColor = 'var(--crc-pink-500)';
      msg.classList.add('is-visible');
      form.reset();
    });
  }

  // ---------------- contact ---------------------------------------------
  // Submits to Formspree so the message actually reaches
  // curracloerowingclub@gmail.com. Formspree endpoint lives on the
  // form's action attribute in contact.html.
  function initContact() {
    const form = document.querySelector('[data-contact]');
    if (!form) return;
    const msg = form.querySelector('[data-contact-msg]');
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitLabel = submitBtn ? submitBtn.querySelector('span') : null;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      if (!name || !isEmail(email) || message.length < 1) {
        msg.innerHTML =
          '<strong>Hold on</strong>Please complete every field, at least a few words in your message.';
        msg.style.borderLeftColor = 'var(--crc-danger)';
        msg.classList.add('is-visible');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        if (submitLabel) submitLabel.textContent = 'Sending…';
      }

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error('Formspree returned an error status.');
          }
          msg.innerHTML =
            '<strong>Message sent</strong>Thanks ' +
            escapeHTML(name.split(' ')[0]) +
            ', we will get back to your as soon as possible.';
          msg.style.borderLeftColor = 'var(--crc-pink-500)';
          msg.classList.add('is-visible');
          form.reset();
        })
        .catch(function () {
          msg.innerHTML =
            '<strong>Something went wrong</strong>Your message did not send. Please try again, or reach us on social media.';
          msg.style.borderLeftColor = 'var(--crc-danger)';
          msg.classList.add('is-visible');
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            if (submitLabel) submitLabel.textContent = 'Send message';
          }
        });
    });
  }

  // ---------------- news filter ------------------------------------------
  function initNewsFilter() {
    const root = document.querySelector('[data-news-filter]');
    if (!root) return;
    const buttons = root.querySelectorAll('button[data-cat]');
    const cards = document.querySelectorAll('[data-news-item]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const cat = btn.getAttribute('data-cat');
        buttons.forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
        });
        cards.forEach(function (card) {
          const itemCat = card.getAttribute('data-cat');
          const match = cat === 'all' || itemCat === cat;
          card.style.display = match ? '' : 'none';
        });
        // Hide featured if filtered
        const featured = document.querySelector('[data-news-featured]');
        if (featured) {
          const fcat = featured.getAttribute('data-cat');
          featured.style.display = cat === 'all' || fcat === cat ? '' : 'none';
        }
      });
    });
  }

  // ---------------- year stamp ------------------------------------------
  function initYearStamp() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  // ---------------- header shadow on scroll ------------------------------
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const update = function () {
      const scrolled = window.scrollY > 8;
      header.style.boxShadow = scrolled
        ? '0 4px 16px -8px rgba(19,18,16,0.16)'
        : 'none';
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      }[c];
    });
  }

  // ---------------- boot -------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initNewsletterBanner();
    initSignup();
    initContact();
    initNewsFilter();
    initHeaderScroll();
    initYearStamp();
  });
})();
