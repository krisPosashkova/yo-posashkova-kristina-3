let input = document.querySelector(".field__form__input");
let btn = document.querySelector(".field__form__btn");
let check = document.querySelector(".result__check__out");

let randNum = 1 + Math.floor(Math.random() * 100);
let i = 0;
let userNum;

btn.onclick = function () {
  userNum = input.value;
  console.log(userNum, randNum);
    if (userNum > randNum) {
    check.textContent = "Не угадали, попробуйте снова!";
    i++;
  } else if (userNum < randNum) {
    check.textContent = "Не угадали, попробуйте снова!";
    i++;
  } else if (isNaN(userNum % 1)) {
    check.textContent = "Не угадали, попробуйте снова!";
    i++;
  } else {
    check.textContent = "Поздравляю! Вы угадали число";
    i++;
    randNum = 1 + Math.floor(Math.random() * 100);
  } 
  input.value = '';
  input.focus()
  };


