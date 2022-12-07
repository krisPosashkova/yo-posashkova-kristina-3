let n = prompt("Введите число");
let i = 1;

if (n === null) {
  alert('Вы отказались от ввода')
} else if (isNaN(n % 1) ) {
  alert('Ошибка, введено НЕ ЧИСЛО')
} 

while(n) {
  i *= (n--);
} 
console.log(i);