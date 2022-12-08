let num = prompt('Введите число');
let i = 1;

if (num === null || num === '') {
  alert('Вы отказались от ввода')
} else if (Number.isNaN(num % 1)) {
  alert('Ошибка, введено НЕ ЧИСЛО')
} else {
  while (num) {
    i *= num--;
  }
  console.log(i);
}

