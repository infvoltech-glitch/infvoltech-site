const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('open') ?? false;
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  menuButton.textContent = isOpen ? '×' : '☰';
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) {
    menuButton.textContent = '☰';
    menuButton.setAttribute('aria-label', 'Abrir menu');
  }
}));

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();


// Carrossel de serviços: apresenta três cartões por vez e avança automaticamente.
const carousel = document.querySelector('.promo-carousel');
if (carousel) {
  const grid = carousel.querySelector('.promo-grid');
  const cards = Array.from(grid.querySelectorAll('[data-service-card]'));
  const dots = document.querySelector('.carousel-dots');
  let first = 0;
  let timer;
  const visibleCount = () => window.matchMedia('(max-width: 700px)').matches ? 1 : (window.matchMedia('(max-width: 980px)').matches ? 2 : 3);
  const render = () => {
    const count = visibleCount();
    cards.forEach((card, index) => {
      const offset = (index - first + cards.length) % cards.length;
      card.hidden = offset >= count;
      card.style.order = String(offset);
    });
    if (dots) {
      dots.innerHTML = cards.map((_, i) => `<button type="button" class="carousel-dot${i === first ? ' is-active' : ''}" aria-label="Mostrar serviço ${i + 1}" aria-current="${i === first ? 'true' : 'false'}"></button>`).join('');
      dots.querySelectorAll('button').forEach((dot, i) => dot.addEventListener('click', () => { first = i; render(); restart(); }));
    }
  };
  const move = (step) => { first = (first + step + cards.length) % cards.length; render(); };
  const restart = () => { clearInterval(timer); timer = setInterval(() => move(1), 4500); };
  carousel.querySelector('.carousel-prev')?.addEventListener('click', () => { move(-1); restart(); });
  carousel.querySelector('.carousel-next')?.addEventListener('click', () => { move(1); restart(); });
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', restart);
  window.addEventListener('resize', render);
  render(); restart();
}
