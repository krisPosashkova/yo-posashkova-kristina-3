const messageBtn = document.querySelector('.message_js');
const messageModal = document.querySelector('.message-modal_js');

const closeModalMessage = document.querySelector('.message__close_js');

const submitMessage = document.querySelector('.message__submit_js');



messageBtn.addEventListener('click', () => {
  messageModal.classList.remove('modal')
})

closeModalMessage.addEventListener('click', () => {
  messageModal.classList.add('modal')
});

document.addEventListener('keydown', (e) => {
  if (e.code === "Escape") {
    messageModal.classList.add('modal')
  }
});


// Отправка сообщения

(function () {
  // Получение формы
  const sendMessageForm = document.forms.sendMessage;

  // Получение элементов формы
  const name = sendMessage.elements.name;
  const messageSubject = sendMessage.elements.messageSubject;
  const email = sendMessage.elements.email;
  const phone = sendMessage.elements.phone;
  const checkbox = sendMessage.elements.checkbox; 

  sendMessageForm.addEventListener ('input', (e) => {
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

    if (name.value.length) {
      statusMessage.name = 'All right'
    }

    if (messageSubject.value.length) {
      statusMessage.messageSubject = 'All right'
    }

    if (isPhoneValid(phone.value)) {
      statusMessage.phone = 'All right'
    }
    

    if (Object.keys(statusMessage).length) {
        Object.keys(statusMessage).forEach((key) => {
          const excellentMessage = statusMessage[key];
          const input = sendMessageForm.elements[key];
          setExcellentText (input, excellentMessage);
        })
        return;
    }
  }) 

  sendMessageForm.addEventListener('submit', (e) => {
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

    if (!isEmailValid(email.value)) {
      errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")'
    }

    if (!name.value.length) {
      errors.name = 'This field is required'
    }

    if (!messageSubject.value.length) {
      errors.messageSubject = 'This field is required'
    }

    if (!isPhoneValid(phone.value)) {
      errors.phone = 'Please use this example to enter the phone number +7(900)111-11-11'
    }

    if (!checkbox.checked) {
      /* errors.checkbox = 'Agree to the processing of your personal information' */
    } 
    
    // Перебор ключей и вызов функции по созданию ошибок
    if (Object.keys(errors).length) {
      Object.keys(errors).forEach((key) =>{
        const errorMessage = errors[key];
        const input = sendMessageForm.elements[key];
        setErrorText(input, errorMessage);
      })
    return;
  }

    const data = {
      email: email.value,
      name: name.value,
      messageSubject: messageSubject.value,
      phone: phone.value,
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


function isPhoneValid (phone) {
  return phone.match(/^[\d\+][\d\(\)\ -]{4,14}\d$/);
}
