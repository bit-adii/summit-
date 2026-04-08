/* ===================================================
   IHESUMMIT — The Indian Hair Economy Summit
   script.js — All Interactivity & Animations
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------
     1. INTERSECTION OBSERVER — Scroll Reveal
  ----------------------------------------------- */
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15,
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });


  /* -----------------------------------------------
     2. HEADER & MOBILE NAV — Scroll behaviour
  ----------------------------------------------- */
  let lastScroll = 0;
  const header    = document.getElementById('main-header');
  const mobileNav = document.getElementById('mobile-nav');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Shadow on scroll
    if (currentScroll > 50) {
      header.classList.add('shadow-md');
    } else {
      header.classList.remove('shadow-md');
    }

    // Auto-hide on scroll down, reveal on scroll up
    if (currentScroll > lastScroll && currentScroll > 150) {
      header.style.transform = 'translateY(-100%)';
      if (mobileNav) mobileNav.style.transform = 'translateY(100%)';
    } else {
      header.style.transform = 'translateY(0)';
      if (mobileNav) mobileNav.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  }, { passive: true });


  /* -----------------------------------------------
     3. FAQ ACCORDION — Native <details> enhancement
  ----------------------------------------------- */
  // Native <details> handles open/close; we just ensure
  // only one stays open at a time (optional behaviour).
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach(other => {
          if (other !== item && other.open) other.removeAttribute('open');
        });
      }
    });
  });


  /* -----------------------------------------------
     4. FORM — Smooth floating-label & submit handler
  ----------------------------------------------- */
  const form = document.querySelector('#register form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn  = form.querySelector('.btn-submit');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Submitting…';
      submitBtn.disabled = true;

      // Simulate async submission
      setTimeout(() => {
        submitBtn.textContent = '✓ Application Received!';
        submitBtn.style.backgroundColor = '#4a6741';

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.backgroundColor = '';
          form.reset();
        }, 3000);
      }, 1200);
    });
  }


  /* -----------------------------------------------
     5. CHAT BUBBLE — Toggle open/close state
  ----------------------------------------------- */
  const chatBtn  = document.getElementById('chat-toggle');
  const chatOpen = document.querySelector('.chat-icon-open');
  const chatClose = document.querySelector('.chat-icon-close');

  if (chatBtn) {
    let isOpen = false;

    chatBtn.addEventListener('click', () => {
      isOpen = !isOpen;
      if (isOpen) {
        chatOpen.style.display  = 'none';
        chatClose.style.display = 'block';
      } else {
        chatOpen.style.display  = 'block';
        chatClose.style.display = 'none';
      }
    });
  }


  /* -----------------------------------------------
     6. SMOOTH SCROLL — anchor links
  ----------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // header height
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* -----------------------------------------------
     7. MOBILE NAV — active link highlight
  ----------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        mobileNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

});
