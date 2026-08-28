const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('.filter-button').forEach((button) => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('.filter-button').forEach((item) => item.classList.toggle('is-active', item === button));
  document.querySelectorAll('.service-card').forEach((card) => {
    const visible = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('is-filtered-out', !visible);
  });
}));

const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox?.querySelector('img');
const closeLightbox = () => {
  lightbox?.classList.remove('is-open');
  lightbox?.setAttribute('aria-hidden', 'true');
};

document.querySelectorAll('[data-lightbox]').forEach((item) => item.addEventListener('click', () => {
  lightboxImage.src = item.dataset.lightbox;
  lightboxImage.alt = item.querySelector('img')?.alt || '';
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
}));

lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox || event.target.classList.contains('lightbox-close')) closeLightbox();
});
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); });

document.querySelector('#enquiry-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const note = document.querySelector('#form-note');
  note.textContent = 'Thank you. Your enquiry is ready to be connected with our team.';
  event.target.reset();
});
