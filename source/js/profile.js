const loaderProfile = document.querySelector('.preloader-profile_js');



// Редактирование данных пользователя

(function(){
  const profileImg = document.querySelector('.profile-avatar_js');
  const profileName = document.querySelector('.profile-name_js');
  const profileSurname = document.querySelector('.profile-surname_js');
  const profileLocation = document.querySelector('.profile-location_js');
  const profileAge = document.querySelector('.profile-age_js');
  const profileEmail = document.querySelector('.profile-email_js');
  const fileNameSpan = document.querySelector('.file-span_js');
  const SERVER_URL = 'https://academy.directlinedev.com';
  const editDataBtn = document.querySelector('.data-edit_js');
  const editDataModal = document.querySelector('.data-modal_js');
  const closeDataModal = document.querySelector('.data__close_js');
  const editDataForm = document.forms.editData;
  const serverResponseData = document.querySelector('.data-response_js');
  const closeResponseData = document.querySelector('.data-response__close-btn_js');
  let profile = null;

  rerenderLinks();
  getProfile();

  function rerenderProfile (profile) {
    profileImg.style.backgroundImage = `url(${SERVER_URL}${profile.photoUrl})`;
    profileAge.innerText = profile.age;
    profileEmail.innerText = profile.email;
    profileLocation.innerText = profile.location;
    profileSurname.innerText = profile.surname;
    profileName.innerText = profile.name;
  }

  function getProfile() {
    sendRequest({
      method: 'GET',
      url: `api/users/${localStorage.getItem('userId')}`,
    })
    .then(response => response.json())
    .then(response => {
      if(response.success) {
        profile = response.data;
        rerenderProfile(profile);
        console.log(profile)
      } else {
        throw new Error(`${response.status} ${response.message}`)
      }
    })
    .catch((err) => {

    })
  }

  const changeData = (e) => {
    e.preventDefault();
    showLoader(loaderProfile);
    const data = new FormData(editDataForm);
    sendRequest({
      method: 'PUT',
      url: 'api/users',
      body: data,
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    })
    .then(response => {
      if(response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        location.pathname = '/';
        return;
      }
      return response.json();
    })

    .then(response => {
      if(response.success) {
        profile = response.data;
        rerenderProfile(profile);
        editDataForm.style.display = 'none';
        serverResponseData.classList.remove('hidden');
        console.log(profile)
      } else {
        throw response;
      }
    })

    .catch ((err) => {
      if (err.message) {
        console.log(err._message);
      }      
      clearErrors();
      editDataForm.style.display = 'none';
      serverResponseData.classList.remove('hidden');
      serverResponseData.style.color = '#EB3617';
      serverResponseData.children[0].textContent = 'The form was sent but the server transmits an error: “The form was sent but the server transmits an error';
    })

    .finally(() => {
      hiddenLoader(loaderProfile);
      location.reload();
      setTimeout(() => {
        location.reload();
        editDataModal.classList.add('hidden');
        serverResponseData.classList.add('hidden');
        editDataForm.style.display = 'block';
      }, 2000)
    })
  }

  editDataForm.avatar.addEventListener("change", () => {
    const fileValue = editDataForm.avatar.value;
    fileNameSpan.innerText = fileValue.substring(fileValue.lastIndexOf("\\")+1);
  });

  editDataBtn.addEventListener('click', () => {
    editDataForm.email.value = profile.email;
    editDataForm.name.value = profile.name;
    editDataForm.surname.value = profile.surname;
    editDataForm.age.value = profile.age;
    editDataForm.location.value = profile.location;
    editDataForm.avatar.file = profile.photoUrl;
    editDataModal.classList.remove('hidden');
  })

  closeDataModal.addEventListener('click', () => {
    editDataModal.classList.add('hidden')
  });

  closeResponseData.addEventListener('click', () => {
    editDataModal.classList.add('hidden')
  });

  editDataForm.addEventListener('submit', changeData);
  console.log(data)
})();

// Смена пароля

(function () {
  const editPasswordForm = document.forms.editPassword;
  const oldPassword = editPasswordForm.elements.oldPassword;
  const newPassword = editPasswordForm.elements.newPassword;
  const repeatPassword = editPasswordForm.elements.repeatPassword;
  const editPasswordBtn = document.querySelector('.password-edit_js');
  const editPasswordModal = document.querySelector('.password-modal_js');
  const closePasswordModal = document.querySelector('.password__close_js');
  const serverResponsePassword = document.querySelector('.password-response_js');
  const closeResponsePassword = document.querySelector('.password-response__close-btn_js');

  getPassword();

  function getPassword() {
    sendRequest({
      method: 'GET',
      url: `api/users/${localStorage.getItem('userId')}`,
    })
    .then(response => response.json())
    .then(response => {
      if(response.success) {
        passwordData = response.data;
      } else {
        throw new Error(`${response.status} ${response.message}`)
      }
    })
    .catch(() => {

    })
  }

  editPasswordForm.addEventListener('input', (e) => {
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

    if (repeatPassword.value === newPassword.value && repeatPassword.value !== '') {
      statusMessage.repeatPassword = 'All right'
    }

    if (Object.keys(statusMessage).length) {
      Object.keys(statusMessage).forEach((key) => {
        const excellentMessage = statusMessage[key];
        const input = editPassword.elements[key];
        setExcellentText(input, excellentMessage);
      })
      return;
    }
  })

  editPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showLoader(loaderProfile);

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
      Object.keys(errors).forEach((key) => {
        const errorMessage = errors[key];
        const input = editPasswordForm.elements[key];
        setError(input, errorMessage);
      })
      return;
    }

    const data = new FormData(editPasswordForm);
    sendRequest({
      method: 'PUT',
      url: 'api/users',
      body: data,
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    })

    .then(response => 
      {
      if(response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        location.pathname = '/';
        return;
      }
      return response.json();
    })
    .then(response => {
      if(response.success) {
        passwordData = response.data;
        editPasswordForm.style.display = 'none';
        serverResponsePassword.classList.remove('hidden');
      } else {
        throw response;
      }
    })
    .catch ((err) => {
      if (err.message) {
        console.log(err._message);
      }      
      clearErrors();
      editPasswordForm.style.display = 'none';
      serverResponsePassword.classList.remove('hidden');
      serverResponsePassword.style.color = '#EB3617';
      serverResponsePassword.children[0].textContent = 'The form was sent but the server transmits an error: “The form was sent but the server transmits an error';
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      location.pathname = '/';
      console.log('delete');
    })
    .finally(() => {
      hiddenLoader(loaderProfile);
      setTimeout(() => {
        editPasswordModal.classList.add('hidden');
        serverResponsePassword.classList.add('hidden');
        editPasswordForm.style.display = 'block';
      }, 2000)
    })
  })

  editPasswordBtn.addEventListener('click', () => {
    editPasswordModal.classList.remove('hidden')
  })
  
  closePasswordModal.addEventListener('click', () => {
    editPasswordModal.classList.add('hidden')
  });

  closeResponsePassword.addEventListener('click', () => {
    editPasswordModal.classList.add('hidden')
  });
})();

// Удаление профиля

(function(){

  const deleteBtn = document.querySelector('.delete_js');

  deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showLoader(loaderProfile);
  
    deleteProfile();

    function deleteProfile() {
      sendRequest({
        method: 'DELETE',
        url: `api/users/${localStorage.getItem('userId')}`,
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      .then (response => response.json())

      .then(response => {
        if(response.success) {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          location.pathname = '/';
          console.log('delete');

        }
      })
      .catch(() => {
        console.log('no delete')
        if(response.status === 401 || response.status === 403) {
          console.log(`${err._message}`)
        }
      })
      .finally(() => {
        hiddenLoader(loaderProfile);
      })
    }

  })
})();
