let attemptInput = document.querySelector(".field__form__input");
let checkBtn = document.querySelector(".field__form__btn");
let resultCheck = document.querySelector(".result__check__out");

let randNum = 1 + Math.floor(Math.random() * 100);
let i = 0;
let userNum;

checkBtn.addEventListener('click', function startGame() {
  userNum = attemptInput.value;
  console.log(userNum, randNum);
    if (userNum > randNum || userNum < randNum || isNaN(userNum % 1)) {
    resultCheck.textContent = "Не угадали, попробуйте снова!";
    i++;
  } else {
    resultCheck.textContent = "Поздравляю! Вы угадали число. Начните игру снова!";
    i++;
    randNum = 1 + Math.floor(Math.random() * 100);
  } 
  attemptInput.value = '';
  attemptInput.focus();
  });



