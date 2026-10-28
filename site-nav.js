/* Shared, dependency-free fullscreen menu interaction. */
document.querySelectorAll('.mobile-navigation').forEach(menu => {
  const toggle = menu.querySelector('summary');
  const links = [...menu.querySelectorAll('nav a')];
  const closeMenu = (restoreFocus = false) => {
    if (!menu.open) return;
    menu.open = false;
    if (restoreFocus) toggle.focus();
  };
  menu.addEventListener('toggle', () => {
    toggle.setAttribute('aria-label', menu.open ? 'Close navigation menu' : 'Open navigation menu');
    document.body.classList.toggle('menu-open', !!document.querySelector('.mobile-navigation[open]'));
    if (menu.open && links.length) links[0].focus({ preventScroll: true });
  });
  links.forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (!menu.open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu(true);
    }
    if (event.key === 'Tab' && links.length) {
      const last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === toggle) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); toggle.focus();
      }
    }
  });
  document.addEventListener('click', event => {
    if (menu.open && !menu.contains(event.target)) closeMenu();
  });
});
