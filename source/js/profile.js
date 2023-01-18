const changePasswordBtn = document.querySelector('.password_js');
const changePasswordModal = document.querySelector('.password-modal_js');
const closeModalChangePassword = document.querySelector('.password__close_js');

const changeDataBtn = document.querySelector('.data_js');
const changeDataModal = document.querySelector('.data-modal_js');
const closeModalChangeData = document.querySelector('.data__close_js');


changePasswordBtn.addEventListener('click', () => {
  changePasswordModal.classList.remove('modal')
})

closeModalChangePassword.addEventListener('click', () => {
  changePasswordModal.classList.add('modal')
});


changeDataBtn.addEventListener('click', () => {
  changeDataModal.classList.remove('modal')
})

closeModalChangeData.addEventListener('click', () => {
  changeDataModal.classList.add('modal')
});




// Валидация смена пароля

(function () {
  const changePassword = document.forms.changePassword;

  const oldPassword = changePassword.elements.oldPassword;
  const newPassword = changePassword.elements.newPassword;
  const repeatPassword = changePassword.elements.repeatPassword;


  changePassword.addEventListener ('input', (e) => {
    e.preventDefault();

    // Для удаления повтора сообщения на странице

    const excellentMessages = document.querySelectorAll('.valid-feedback');
    if (excellentMessages) {
      for (let excellentMessage of excellentMessages) {
        excellentMessage.remove();
      }
    }

    let statusMessage = {};


    if (newPassword.value.length > 6) {
      statusMessage.newPassword = 'All right'
    }

    if (repeatPassword.value === newPassword.value  && repeatPassword.value !== '') {
      statusMessage.repeatPassword = 'All right'
    }



    if (Object.keys(statusMessage).length) {
        Object.keys(statusMessage).forEach((key) => {
          const excellentMessage = statusMessage[key];
          const input = changePassword.elements[key];
          setExcellentText (input, excellentMessage);
        })
        return;
    }
  }) 

  changePassword.addEventListener('submit', (e) => {
    e.preventDefault();

    // Для удаления повтора ошибки на странице

    const errorMessages = document.querySelectorAll('.invalid-feedback');
    if (errorMessages) {
      for (let errorMessage of errorMessages) {
        errorMessage.remove();
      }
    }

    let errors = {};

    if (newPassword.value.length < 6) {
      errors.newPassword = 'The password must contain at least 7 symbols'
    }

    if (repeatPassword.value !== newPassword.value || repeatPassword.value == '') {
      errors.repeatPassword = 'The password does not match'
    }

    if (Object.keys(errors).length) {
        Object.keys(errors).forEach((key) =>{
          const errorMessage = errors[key];
          const input = changePassword.elements[key];
          setError(input, errorMessage);
        })
      return;
    }

    const data = {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
      repeatPassword: repeatPassword.value,
    };

    console.log(data);
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




