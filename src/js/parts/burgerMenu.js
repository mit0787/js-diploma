function burgerMenu() {
  //бургер-меню
  let burgerMenu = document.querySelector('.burger-menu'),
    btnBurger = document.querySelector('.burger');

  document.addEventListener('click', (event) => {
    if (screen.width <= 768) {
      let target = event.target;
      if (btnBurger.contains(event.target)) {
        burgerMenu.classList.toggle('burger-menu_active');
      } else if (!burgerMenu.contains(event.target)) {
        burgerMenu.classList.remove('burger-menu_active');
      }
    }
  });

  window.addEventListener('resize', () => {
    if (screen.width > 768) {
      burgerMenu.classList.remove('burger-menu_active');
    }
  });
}

module.exports = burgerMenu;