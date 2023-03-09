/* window.addEventListener('DOMContentLoaded', function () {
}); */

const burgerMenu = document.querySelector('.burger-menu_js');
const headerMobile = document.querySelector('.header-mobile_js');
const closeHeaderMobile = document.querySelector('.header-mobile__close-btn_js');

isLogin = localStorage.getItem('token');

if (isLogin) {
  rerenderLinks()
}

function rerenderLinks() {
  const registerBtn = document.querySelector('.register_js');
  const signInBtn = document.querySelector('.sign-in_js');
  const profileBtn = document.querySelector('.profile-btn_js');
  const blogBtn = document.querySelector('.blog-btn_js');

  const registerBtnMobile = document.querySelector('.register-mobil_js');
  const signInBtnMobile = document.querySelector('.sign-mobil_js');
  const profileBtnMobile = document.querySelector('.profile-mobil_js');
  const blogBtnMobile = document.querySelector('.blog-mobil_js');

  const isLogin = localStorage.getItem('token');
  if (isLogin) {
    registerBtn.classList.add('hidden');
    signInBtn.classList.add('hidden');
    profileBtn.classList.remove('hidden');
    blogBtn.classList.remove('hidden');

    registerBtnMobile.classList.add('hidden');
    signInBtnMobile.classList.add('hidden');
    profileBtnMobile.classList.remove('hidden');
    blogBtnMobile.classList.remove('hidden');
  } else {
    registerBtn.classList.remove('hidden');
    signInBtn.classList.remove('hidden');
    profileBtn.classList.add('hidden');
    blogBtn.classList.add('hidden');

    registerBtnMobile.classList.remove('hidden');
    signInBtnMobile.classList.remove('hidden');
    profileBtnMobile.classList.add('hidden');
    blogBtnMobile.classList.add('hidden');
  }
}



burgerMenu.addEventListener('click', () => {
  rerenderLinks()
  headerMobile.classList.add('header-mobile__open');

})

closeHeaderMobile.addEventListener('click', () => {
  headerMobile.classList.remove('header-mobile__open')
});

(function () {
  const button = document.querySelector('.button-to-top_js');

  if (!button) return;

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })

  window.addEventListener('scroll', (e) => {
    if (window.pageYOffset > 1500) {
      button.classList.remove('button-to-top_hidden');
    } else {
      button.classList.add('button-to-top_hidden');
    }
  })
})()





