let num = prompt('Введите число');
let degree = prompt('Введите степень')
let result = 1;

if (num === null || num === '' || degree === null || degree === '') {
  alert('Вы отказались от ввода')
} else if (isNaN(num % 1) || isNaN(degree % 1)) {
  alert('Ошибка, введено НЕ ЧИСЛО')
} else {
  for (let i = 0; i < degree; i++ ) {
    result = result *= num
  }
  console.log(result);
}



