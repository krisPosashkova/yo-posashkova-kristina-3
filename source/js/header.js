const burgerMenu = document.querySelector('.burger-menu_js');
const headerMobile = document.querySelector('.header-mobile_js');
const closeHeaderMobile = document.querySelector('.header-mobile__close-btn_js');

burgerMenu.addEventListener('click', () => {
  headerMobile.classList.add('header-mobile__open')
})

closeHeaderMobile.addEventListener('click', () => {
  headerMobile.classList.remove('header-mobile__open')
});