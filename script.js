document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-links');
  const progressBar = document.querySelector('.progress');
  const revealItems = document.querySelectorAll('.reveal');
  const prefersLessMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile navigation
  function closeMenu() {
    if (!menu || !menuButton) return;

    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    menuButton.textContent = '＋';
  }

  if (menu && menuButton) {
    menuButton.setAttribute('aria-controls', menu.id || 'site-menu');
    menu.id = menu.id || 'site-menu';

    menuButton.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menuButton.textContent = open ? '×' : '＋';
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 700) closeMenu();
    });
  }

  // Thin reading-progress line at the top of each page
  if (progressBar) {
    let waitingForFrame = false;

    function updateProgress() {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
      waitingForFrame = false;
    }

    window.addEventListener('scroll', () => {
      if (waitingForFrame) return;
      waitingForFrame = true;
      window.requestAnimationFrame(updateProgress);
    }, { passive: true });

    updateProgress();
  }

  // Reveal sections as they enter the screen
  if (prefersLessMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('visible'));
  } else {
    document.documentElement.classList.add('js-ready');

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        currentObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -35px 0px'
    });

    revealItems.forEach((item) => observer.observe(item));
  }

  document.documentElement.classList.add('page-ready');
});
