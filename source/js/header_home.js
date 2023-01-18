const signInBtn = document.querySelector('.sign-in_js');
const signInModal = document.querySelector('.sign-in-modal_js');

const signInMobilBtn = document.querySelector('.sign-in-mobil_js')

const registerModal = document.querySelector('.register-modal_js')
const registerMobilBtn = document.querySelector('.register-mobil_js')
const registerBtn = document.querySelector('.register_js');

const closeModalSignIn = document.querySelector('.sign-in__close_js');
const closeModalRegister = document.querySelector('.register__close_js')

const registerSubmit = document.querySelector('.register__submit_js');
const signInSubmit = document.querySelector('.sign-in__submit_js');

const burgerMenu = document.querySelector('.burger-menu_js');
const headerMobile = document.querySelector('.header-mobile_js');
const closeHeaderMobile = document.querySelector('.header-mobile__close-btn_js');

burgerMenu.addEventListener('click', () => {
  headerMobile.classList.add('header-mobile__open')
})

closeHeaderMobile.addEventListener('click', () => {
  headerMobile.classList.remove('header-mobile__open')
});



// Sign In
// Открытие формы Sign In

signInBtn.addEventListener('click', () => {
  signInModal.classList.remove('modal')
})

signInMobilBtn.addEventListener('click', () => {
  headerMobile.classList.remove('header-mobile__open')
  signInModal.classList.remove('modal')
})

closeModalSignIn.addEventListener('click', () => {
  signInModal.classList.add('modal')
});

document.addEventListener('keydown', (e) => {
  if (e.code === "Escape") {
    signInModal.classList.add('modal')
  }
});



// Валидация

(function () {
  const signInForm = document.forms.signIn;

  const email = signInForm.elements.email;
  const password = signInForm.elements.password;

  signInForm.addEventListener ('input', (e) => {
    e.preventDefault();

    // Для удаления повтора сообщения на странице

    const excellentMessages = document.querySelectorAll('.valid-feedback');
    if (excellentMessages) {
      for (let excellentMessage of excellentMessages) {
        excellentMessage.remove();
      }
    }

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
          setExcellentText (input, excellentMessage);
        })
        return;
    }
  }) 

  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Для удаления повтора ошибки на странице

    const errorMessages = document.querySelectorAll('.invalid-feedback');
    if (errorMessages) {
      for (let errorMessage of errorMessages) {
        errorMessage.remove();
      }
    }

    let errors = {};

    if (!isEmailValid(email.value)) {
      errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")'
      
    }
    if (password.value.length < 6) {
      errors.password = 'The password must contain at least 7 symbols'
    }

    if (Object.keys(errors).length) {
        Object.keys(errors).forEach((key) =>{
          const errorMessage = errors[key];
          const input = signInForm.elements[key];
          setError(input, errorMessage);
        })
      return;
    }

    const data = {
      email: email.value,
      password: password.value,
    };

    console.log(data);
  })
})();


// Register

// Открытие формы Регистрации

registerBtn.addEventListener('click', () => {
  registerModal.classList.remove('modal')
})

registerMobilBtn.addEventListener('click', () => {
  headerMobile.classList.remove('header-mobile__open')
  registerModal.classList.remove('modal')
})

closeModalRegister.addEventListener('click', () => {
  registerModal.classList.add('modal')
});

document.addEventListener('keydown', (e) => {
  if (e.code === "Escape") {
    registerModal.classList.add('modal')
  }
});


// Регистрация

(function () {
  // Получение формы
  const registrationForm = document.forms.registartion;

  // Получение элементов формы
  const email = registartion.elements.email;
  const password = registartion.elements.password;
  const repeatPassword = registartion.elements.repeatPassword;
  const name = registartion.elements.name;
  const surname = registartion.elements.surname;
  const location = registartion.elements.location;
  const age = registartion.elements.age;
  const checkbox = registartion.elements.checkbox; 

  registrationForm.addEventListener ('input', (e) => {
    e.preventDefault();

    // Для удаления повтора сообщения на странице

    const excellentMessages = document.querySelectorAll('.valid-feedback');
    if (excellentMessages) {
      for (let excellentMessage of excellentMessages) {
        excellentMessage.remove();
      }
    }

    let statusMessage = {};

    if (isEmailValid(email.value)) {
      statusMessage.email = 'All right'
    }

    if (password.value.length > 6) {
      statusMessage.password = 'All right'
    }
    if (name.value.length) {
      statusMessage.name = 'All right'
    }

    if (surname.value.length) {
      statusMessage.surname = 'All right'
    }

    if (location.value.length) {
      statusMessage.location = 'All right'
    }

    if (age.value.length) {
      statusMessage.age = 'All right'
    }
    
    if (repeatPassword.value === password.value  && repeatPassword.value !== '') {
      statusMessage.repeatPassword = 'All right'
    }

    if (Object.keys(statusMessage).length) {
        Object.keys(statusMessage).forEach((key) => {
          const excellentMessage = statusMessage[key];
          const input = registrationForm.elements[key];
          setExcellentText (input, excellentMessage);
        })
        return;
    }
  }) 

  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Для удаления повтора ошибки на странице

    const errorMessages = document.querySelectorAll('.invalid-feedback');
      if (errorMessages) {
        for (let errorMessage of errorMessages) {
          errorMessage.remove();
        }
      }
    
    // создание объекта ошибок
    let errors = {};

    // вносим ошибки в объект ошибок

    if (!name.value.length) {
      errors.name = 'This field is required'
    }

    if (!surname.value.length) {
      errors.surname = 'This field is required'
    }

    if (!location.value.length) {
      errors.location = 'This field is required'
    }

    if (!age.value.length) {
      errors.age = 'This field is required'
    }

    if (!checkbox.checked) {
      /* errors.checkbox = 'Agree to the processing of your personal information' */
    } 

    if (!isEmailValid (email.value)) {
      errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")'
    } 
    
    if (password.value.length < 6 ) {
      errors.password = 'The password must contain at least 7 symbols'
    } 

    if (repeatPassword.value !== password.value || repeatPassword.value == '') {
      errors.repeatPassword = 'The password does not match'
    }


    
    // Перебор ключей и вызов функции по созданию ошибок
    if (Object.keys(errors).length) {
      Object.keys(errors).forEach((key) =>{
        const errorMessage = errors[key];
        const input = registrationForm.elements[key];
        setErrorText(input, errorMessage);
      })
    return;
  }

    const data = {
      email: email.value,
      password: password.value,
      repeatPassword: repeatPassword.value,
      name: name.value,
      surname: surname.value,
      age: age.value,
      location: location.value,
      checkbox: checkbox.value,
    } 
    console.log (data) 
  })
})();



// Создание контейнера под ошибку

function errorCreator (message) {
  let messageErrorContainer = document.createElement ('div');
  messageErrorContainer.classList.add('invalid-feedback');
  messageErrorContainer.innerText = message;
  return messageErrorContainer;
}

// Функция для работы с текстовыми инпутами вставляем и удаляем в верстку ошибку

function setErrorText (input, errorMessage) {
  const error = errorCreator(errorMessage);
  input.classList.add('is-invalid');
  input.insertAdjacentElement('afterend', error);
  input.addEventListener('input', () => {
    error.remove();
    input.classList.remove('is-invalid')
  }, {once: true})
}

// Функция для чекбоксов и радиокнопок

function setErrorChecked (inputs, errorMessage) {
  const error = errorCreator(errorMessage);
  inputs [0].parentElement.parentElement.insertAdjacentElement('afterend', error);
  function handler() {
    error.remove();
    for (let input of [...inputs]) {
      input.removeEventListener('input', handler);
      input.classList.remove('is-invalid');
    }
  }
  for (let input of [...inputs]) {
    input.classList.add('is-invalid');
    input.addEventListener('input', handler);
  }
}

function setError (input, errorMessage) {
  if (input [0]) {
    setErrorChecked(input, errorMessage);
  } else {
    setErrorText(input, errorMessage);
  }
}

// Cоздание контейнера под сообщение об успешном заполнении поля

function excellentCreator (message) {
  let messageExcellentCreator = document.createElement ('div');
  messageExcellentCreator.classList.add ('valid-feedback');
  messageExcellentCreator.innerText = message;
  return messageExcellentCreator;
}

function setExcellentText (input, excellentMessage) {
  const excellent = excellentCreator (excellentMessage);
  input.classList.add('is-valid');
  input.insertAdjacentElement('afterend', excellent);
  input.addEventListener('input', () => {
    excellent.remove();
    input.classList.remove('is-valid')
  }, {once: true})
} 

// Валидация почты

function isEmailValid (email) {
  return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
}

