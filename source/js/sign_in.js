const signInBtn = document.querySelector('.sign-in_js');
const signInModal = document.querySelector('.sign-in-modal_js');

const signInMobilBtn = document.querySelector('.sign-in-mobil_js');
const closeModalSignIn = document.querySelector('.sign-in__close_js');
const signInSubmit = document.querySelector('.sign-in__submit_js');

const serverResponseSign = document.querySelector('.sign-response_js');
const closeResponseSign = document.querySelector('.sign-response__close-btn_js');

const loaderSignIn = document.querySelector('.preloader-main_js');


signInBtn.addEventListener('click', () => {
  signInModal.classList.remove('hidden')
})

signInMobilBtn.addEventListener('click', () => {
  headerMobile.classList.remove('header-mobile__open')
  signInModal.classList.remove('hidden')
})

closeModalSignIn.addEventListener('click', () => {
  signInModal.classList.add('hidden')
});

document.addEventListener('keydown', (e) => {
  if (e.code === "Escape") {
    signInModal.classList.add('hidden')
  }
});
closeResponseSign.addEventListener('click', () => {
  signInModal.classList.add('hidden')
});


// Валидация

(function () {
  const signInForm = document.forms.signIn;

  const email = signInForm.elements.email;
  const password = signInForm.elements.password;

  isLogin = localStorage.getItem('token');

  if (isLogin) {
    rerenderLinks()
  }

  signInForm.addEventListener('input', (e) => {
    e.preventDefault();



    // Для удаления повтора сообщения на странице

    clearExcellentMessages();

    let statusMessage = {};

    if (isEmailValid(email.value)) {
      statusMessage.email = 'All right'
    }

    if (password.value.length > 6) {
      statusMessage.password = 'All right'
    }

    if (Object.keys(statusMessage).length) {
      Object.keys(statusMessage).forEach((key) => {
        const excellentMessage = statusMessage[key];
        const input = signInForm.elements[key];
        setExcellentText(input, excellentMessage);
      })
      return;
    }
  })

  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showLoader(loaderSignIn);

    clearErrors();

    let errors = {};

    if (!isEmailValid(email.value)) {
      errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")'

    }
    if (password.value.length < 6) {
      errors.password = 'The password must contain at least 7 symbols'
    }

    if (Object.keys(errors).length) {
      Object.keys(errors).forEach((key) => {
        const errorMessage = errors[key];
        const input = signInForm.elements[key];
        setError(input, errorMessage);
        hiddenLoader(loaderSignIn)
      })
      return;
    }

    const data = {
      email: email.value,
      password: password.value,
    };


    sendRequest ({
      url: 'api/users/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data),
    })

    .then (response =>   {
      if(response.status === 400) {
        console.log(response.status);
        return;
      }
      return response.json();
    }    
    )
    .then(response => {
      if (response.success) {
        console.log(response);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        rerenderLinks();
        signInForm.style.display = 'none';
        serverResponseSign.classList.remove('hidden');
      }
    })

    .catch(() => {
      clearErrors();
      signInForm.style.display = 'none';
      serverResponseSign.classList.remove('hidden');
      serverResponseSign.style.color = '#EB3617';
      serverResponseSign.children[0].textContent = 'The form was sent but the server transmits an error: “The form was sent but the server transmits an error';
    })

    .finally(() => {
      hiddenLoader(loaderSignIn);
      setTimeout(() => {
        signInModal.classList.add('hidden');
        serverResponseSign.classList.add('hidden');
        signInForm.style.display = 'block';
      }, 2000)
    })

  })
})();

