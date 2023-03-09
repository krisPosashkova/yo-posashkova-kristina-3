function sendRequest({url, method, headers, body = null,}) {
  return fetch ('https://academy.directlinedev.com' +  '/' + url, {
    method,
    headers,
    body,
  })
}

function interactionModal (modal) {
  modal.classList.toggle('hidden')
}

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
  inputs[0].parentElement.parentElement.insertAdjacentElement('afterend', error);
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


function isPhoneValid (phone) {
  return phone.match(/^[\d\+][\d\(\)\ -]{4,14}\d$/);
}

function clearExcellentMessages () {
  const excellentMessages = document.querySelectorAll('.valid-feedback');
  if (excellentMessages) {
    for (let excellentMessage of excellentMessages) {
      excellentMessage.remove();
    }
  }
}

function clearErrors () {
  const errorMessages = document.querySelectorAll('.invalid-feedback');
  if (errorMessages) {
    for (let errorMessage of errorMessages) {
      errorMessage.remove();
    }
  }
}

// Получение ошибки checkbox и ее удаление

function setErrorCheckedCheckbox (checkbox, errorCheckbox) {
  errorCheckbox.style.display = 'block';
  checkbox.addEventListener('click', () => {
    errorCheckbox.style.display = 'none';
  }, {once: true})
}

function showLoader(loader) {
  loader.classList.remove('hidden');
}

function hiddenLoader(loader) {
  loader.classList.add('hidden');
}

function rerenderLinks() {
  const registerBtn = document.querySelector('.register_js');
  const signInBtn = document.querySelector('.sign-in_js');
  const profileBtn = document.querySelector('.profile-btn_js');
  const blogBtn = document.querySelector('.blog-btn_js');

  const isLogin = localStorage.getItem('token');
  if (isLogin) {
    registerBtn.classList.add('hidden');
    signInBtn.classList.add('hidden');
    profileBtn.classList.remove('hidden');
    blogBtn.classList.remove('hidden');
  } else {
    registerBtn.classList.remove('hidden');
    signInBtn.classList.remove('hidden');
    profileBtn.classList.add('hidden');
    blogBtn.classList.add('hidden');
  }
}

