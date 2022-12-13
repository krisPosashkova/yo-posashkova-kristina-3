const signInBtn = document.querySelector('.sign-in__js');
const signInModal = document.querySelector('.sign-in-modal__js');

const registerModal = document.querySelector('.register-modal__js')
const registerBtn = document.querySelector('.register__js');

const closeModalSignIn = document.querySelector('.sign-in__close_js');

const closeModalRegister = document.querySelector('.register__close_js')

const registerSubmit = document.querySelector('.register__submit_js');
const signInSubmit = document.querySelector('.sign-in__submit_js');


// Sign In
// Открытие формы вход

signInBtn.addEventListener('click', () => {
  signInModal.classList.remove('modal')
})

closeModalSignIn.addEventListener('click', () => {
  signInModal.classList.add('modal')
})

document.addEventListener('keydown', (e) => {
  if (e.code === "Escape") {
    signInModal.classList.add('modal')
  }
});


(function () {
  const signInForm = document.forms.signIn;
  
  const email = signInForm.querySelector('input[type="email"]');
  const password = signInForm.querySelector('input[type="password"]');

  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();

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

document.addEventListener('keydown', (e) => {
  if (e.code === "Escape") {
    registerModal.classList.add('modal')
  }
});


closeModalRegister.addEventListener('click', () => {
  registerModal.classList.add('modal')
})

// Регистрация
(function () {
  // Получение формы
  const registrationForm = document.forms.registartion;

  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Получение элементов формы
    const email = registartion.elements.email;
    const password = registartion.elements.password;
    const repeatPassword = registartion.elements.repeat_password;
    const name = registartion.elements.name;
    const surname = registartion.elements.surname;
    const location = registartion.elements.location;
    const age = registartion.elements.age;
    const checkbox = registartion.elements.checkbox_yes;

    // создание объекта ошибок
    let error = {};

    // вносим ошибки в объект ошибок

    if (name.value.length < 2) {
      error.name = ''
    }
    if (!checkbox) {
      error.checkbox = 'Согласитесь на обработку ваших персональных данных.'
    }

    if (!isEmailCorrect(email.value)) {
      error.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")'
    }

    if (password.value.length < 6 ) {
      error.password = 'Слишком короткий пароль'
    }
    
    // Перебор ключей и вызов функции по созданию ошибок
    if(Object.keys(error).length) {
      Object.keys(error). forEach((key) =>{
        const messageError = error[key];
        const input = form.elements[key];
        setError(input, messageError);
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
/*   console.log(data);
  console.log(error); */
  })
})();

// Создание контейнера под ошибку

const errorCreator = (message) => {
  let messageErrorContainer = document.createElement ('div');
  messageErrorContainer.classList.add('invalid-feedba');
  messageErrorContainer.innerText = message;
  return messageErrorContainer;
}


const setErrorChecked = (inputs, errorMessage) => {
  const error = errorCreator(errorMessage);
  inputs[0].parentElement.parentElement.insertAdjacentElement('afterend', error);
  function handler() {
    error.remove();
    for (let input of inputs) {
      input.removeEventListener('input', handler);
      input.classList.remove('is-invalid');
    }
  }
  for(let input of inputs) {
    input.classList.add('is-invalid');
    input.addEventListener('input', handler);
  }
}


// Вставляем ошибку в HTML
const setErrorText = (input, errorMessage) => {
  const error = errorCreator(errorMessage);
  input.classList.add('is-invalid');
  input.insertAdjacentElement('afterend', error);
  input.addEventListener('input', () => {
    error.remove();
    input.classList.remove('is-invalid')
  })
}

console.log(setErrorText);

const setError = (input, messageError) => {
  if(input[0]) {
    setErrorChecked(input, messageError);
  } else {
    setErrorText(input, messageError);
  }
}


function isEmailCorrect (email) {
  return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
}

function isPasswordCorrect (password) {
  return password.match( /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/);
}

/* 
(function () {
  const registrationForm = document.forms.registartion;
  console.log(registrationForm);

  registartion.addEventListener('submit', (e) => {
    const inputs = signInForm.querySelectorAll('input');

    for (let input of inputs) {
      switch(input.type) {
        case 'radio': {
          if (input.checked) {

          }
          break;
        }
        case 'file': {
          break;
        }
        default : {

        }
      }
    }
  })
})();
 */