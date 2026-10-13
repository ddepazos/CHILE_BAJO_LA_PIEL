'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navegacion');
const mobile = window.matchMedia('(max-width: 760px)');
function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}
function syncMenu() {
  menuButton.hidden = !mobile.matches;
  navigation.dataset.collapsible = String(mobile.matches);
  closeMenu();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});
mobile.addEventListener('change', syncMenu);
syncMenu();

const dialog = document.querySelector('#art-dialog');
let lastArtwork;
if (typeof dialog.showModal === 'function') {
  document.querySelectorAll('.art-open').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      lastArtwork = link;
      document.querySelector('#dialog-title').textContent = link.dataset.title;
      const image = document.querySelector('#dialog-image');
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      dialog.showModal();
      document.body.classList.add('modal-open');
    });
  });
  document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    lastArtwork?.focus();
  });
}
