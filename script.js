(() => {
  const root = document.documentElement;
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const themeToggle = document.getElementById('themeToggle');
  const progress = document.getElementById('progress');
  document.getElementById('year').textContent = new Date().getFullYear();

  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false');
  }));

  const savedTheme = (() => { try { return localStorage.getItem('rutuja-theme'); } catch (_) { return null; } })();
  if (savedTheme === 'light') root.classList.add('light');
  themeToggle.textContent = root.classList.contains('light') ? '☾' : '☼';
  themeToggle.addEventListener('click', () => {
    root.classList.toggle('light');
    const theme = root.classList.contains('light') ? 'light' : 'dark';
    themeToggle.textContent = theme === 'light' ? '☾' : '☼';
    try { localStorage.setItem('rutuja-theme', theme); } catch (_) { /* Theme still works if storage is unavailable. */ }
  });

  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true }); updateProgress();

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  } else revealEls.forEach(el => el.classList.add('visible'));

  const filters = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(filter => filter.classList.toggle('active', filter === button));
    const category = button.dataset.filter;
    cards.forEach(card => card.classList.toggle('is-hidden', category !== 'all' && card.dataset.category !== category));
  }));
})();
