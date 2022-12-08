let num = prompt('Введите число');

if (num === null || num === '') {
  alert('Вы отказались от ввода');
} else if (Number.isNaN(num % 1)) {
  alert('Ошибка, введено НЕ ЧИСЛО');
} else {
  for (let i=1; i < num; i++) {
    if (i % 4 === 0) continue;
  console.log(i);
  }
}
