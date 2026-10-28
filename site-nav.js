/* Shared navigation behaviour; no dependency on the enquiry form. */
document.querySelectorAll('.mobile-navigation').forEach(menu => {
  const toggle = menu.querySelector('summary');
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { menu.open = false; });
  });
  menu.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      toggle.focus();
    }
  });
});
