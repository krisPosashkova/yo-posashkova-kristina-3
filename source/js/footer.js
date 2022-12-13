const messageBtn = document.querySelector('.message__js');
const messageModal = document.querySelector('.message-modal__js');

const closeModalMessage = document.querySelector('.message__close_js');

const submitMessage = document.querySelector('.message__submit_js');

messageBtn.addEventListener('click', () => {
  messageModal.classList.remove('modal')
})

closeModalMessage.addEventListener('click', () => {
  messageModal.classList.add('modal')
})

document.addEventListener('keydown', (e) => {
  if (e.code === "Escape") {
    messageModal.classList.add('modal')
  }
});