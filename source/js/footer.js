// const messageBtn = document.querySelector('.message_js');
// const messageModal = document.querySelector('.message-modal_js');
// const closeModalMessage = document.querySelector('.message__close_js');
// const submitMessage = document.querySelector('.message__submit_js');
// const submit = document.querySelector('.message-submit_js');
// const serverResponseMessage = document.querySelector('.message-response_js');
// const closeResponseMessage = document.querySelector('.message-response__close-btn_js');

// const loaderMessage = document.querySelector('.preloader-main_js');


// closeModalMessage.addEventListener('click', () => {interactionModal(messageModal)});
// messageBtn.addEventListener('click', () => {interactionModal(messageModal)});

// document.addEventListener('keydown', (e) => {
//   if (e.code === "Escape") {
//     interactionModal(messageModal)
//   }
// });

// closeResponseMessage.addEventListener('click', () => {
//   messageModal.classList.add('hidden')
// });

// // Отправка сообщения

// (function () {


//   const errorCheckbox = document.querySelector('.message__checkbox-invalid_js');
//   const name = sendMessage.elements.name;
//   const messageSubject = sendMessage.elements.messageSubject;
//   const email = sendMessage.elements.email;
//   const phone = sendMessage.elements.phone;
//   const checkbox = sendMessage.elements.checkbox;
//   const sendMessageForm = document.forms.sendMessage;

  

//   sendMessageForm.addEventListener ('input', (e) => {
//     e.preventDefault();

//     clearExcellentMessages ();

//     let statusMessage = {};

//     if (isEmailValid(email.value)) {
//       statusMessage.email = 'All right'
//     }

//     if (name.value.length) {
//       statusMessage.name = 'All right'
//     }

//     if (messageSubject.value.length) {
//       statusMessage.messageSubject = 'All right'
//     }

//     if (isPhoneValid(phone.value)) {
//       statusMessage.phone = 'All right'
//     }
    

//     if (Object.keys(statusMessage).length) {
//         Object.keys(statusMessage).forEach((key) => {
//           const excellentMessage = statusMessage[key];
//           const input = sendMessageForm.elements[key];
//           setExcellentText (input, excellentMessage);
//         })
//         return;
//     }
//   }) 

//   sendMessageForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     showLoader(loaderMessage)

//     clearErrors();

//     let errors = {};


//     if (!isEmailValid(email.value)) {
//       errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")'
//     }

//     if (!name.value.length) {
//       errors.name = 'This field is required'
//     }

//     if (!messageSubject.value.length) {
//       errors.messageSubject = 'This field is required'
//     }

//     if (!isPhoneValid(phone.value)) {
//       errors.phone = 'Please use this example to enter the phone number +7(900)111-11-11'
//     }

//     if (checkbox.checked == true) {
//       checkbox.value = 1;
//     } else {
//       checkbox.value = 0;
//       setErrorCheckedCheckbox(checkbox, errorCheckbox);
//     }
    
//     // Перебор ключей и вызов функции по созданию ошибок
//     if (Object.keys(errors).length || !checkbox.checked) {
//       Object.keys(errors).forEach((key) =>{
//         const errorMessage = errors[key];
//         const input = sendMessageForm.elements[key];
//         setErrorText(input, errorMessage);
//         hiddenLoader(loaderMessage);
//       })
//     return;
//   }
//   let data = {
//     email: email.value,
//     name: name.value,
//     messageSubject: messageSubject.value,
//     phone: phone.value,
//     checkbox: checkbox.value,
//   }  
//   // console.log(JSON.stringify(data));

//   // sendRequest ({
//   //   url: 'api/emails',
//   //   method: 'POST',
//   //   headers: {
//   //     'Content-Type': 'application/json;charset=utf-8'
//   //   },
//   //   body: JSON.stringify(data),
//   // })
//   // data = new FormData(sendMessageForm);
//   console.log(JSON.stringify(data));
//   sendRequest({
//     method: 'POST',
//     url: 'api/emails',
//     to: 'kristina.posashkova@icloud.com',
//     body: JSON.stringify(data),
//     headers: {
//       'Content-Type':  'application/json'
//     }
//   })
//   .then (response => response.json())
//   .then(response => {
//     if (response.success) {
//       registrationForm.style.display = 'none';
//       serverResponseMessage.classList.remove('hidden');
//     }
//   })

//   .catch(err => {
//     clearErrors();
//     sendMessageForm.style.display = 'none';
//     serverResponseMessage.classList.remove('hidden');
//     serverResponseMessage.style.color = '#EB3617';
//     serverResponseMessage.children[0].textContent = 'The form was sent but the server transmits an error: “The form was sent but the server transmits an error';
//   })

//   .finally (() => {
//     hiddenLoader(loaderMessage);
//   })
//   })  
// })();
