const registerModal = document.querySelector('.register-modal_js');
const registerMobilBtn = document.querySelector('.register-mobil_js');
const registerBtn = document.querySelector('.register_js');
const closeModalRegister = document.querySelector('.register__close_js');
const serverResponse = document.querySelector('.register-response_js');
const closeResponse = document.querySelector('.register-response__close-btn_js');
console.log(closeResponse);
const loader = document.querySelector('.preloader-main_js');
console.log(loader)

// Открытие формы Регистрации

registerBtn.addEventListener('click', () => {
  registerModal.classList.remove('hidden')
})

registerMobilBtn.addEventListener('click', () => {
  headerMobile.classList.remove('header-mobile__open');
  registerModal.classList.remove('hidden')
})


closeModalRegister.addEventListener('click', () => {
  registerModal.classList.add('hidden')
});

document.addEventListener('keydown', (e) => {
  if (e.code === "Escape") {
    registerModal.classList.add('hidden')
  }
});

closeResponse.addEventListener('click', () => {
  registerModal.classList.add('hidden')
});

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
  const errorCheckbox = document.querySelector('.register__checkbox-invalid_js');

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
          // hiddenLoader(loader)
        })
        return;
    }
  }) 

  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    showLoader(loader);

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


    if (!isEmailValid (email.value)) {
      errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")'
    } 
    
    if (password.value.length < 6 ) {
      errors.password = 'The password must contain at least 7 symbols'
    } 

    if (repeatPassword.value !== password.value || repeatPassword.value == '') {
      errors.repeatPassword = 'The password does not match'
    }

    if (checkbox.checked == true) {
        checkbox.value = 1;
      } else {
        checkbox.value = 0;
        setErrorCheckedCheckbox(checkbox, errorCheckbox);
      }

    
    // Перебор ключей и вызов функции по созданию ошибок
    if (Object.keys(errors).length || !checkbox.checked) {
      Object.keys(errors).forEach((key) =>{
        const errorMessage = errors[key];
        const input = registrationForm.elements[key];
        setErrorText(input, errorMessage);
        hiddenLoader(loader)
      })
    return;
    }

    const data = {
      email: email.value,
      password: password.value,
      repeatPassword: repeatPassword.value,
      name: name.value,
      surname: surname.value,
      age: +age.value,
      location: location.value,
      checkbox: checkbox.value,
    } 
    console.log (data) 

    sendRequest ({
      url: 'api/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data),
    })

    .then (response => {
      if(response.status === 422) {
        console.log(response.data);
        console.log(response.status);
        return;
      }
      return response.json();
    })
    .then(response => {
      if (response.success) {
        registrationForm.style.display = 'none';
        serverResponse.classList.remove('hidden');
        
      }
    })

    .catch(() => {
      clearErrors();
      registrationForm.style.display = 'none';
      serverResponse.classList.remove('hidden');
      serverResponse.style.color = '#EB3617';
      serverResponse.children[0].textContent = 'The form was sent but the server transmits an error: “The form was sent but the server transmits an error';
    })

    .finally(() => {
      hiddenLoader(loader);
      setTimeout(() => {
        registerModal.classList.add('hidden');
        serverResponse.classList.add('hidden');
        registrationForm.style.display = 'block';
      }, 2000)
    })

  })
})();

