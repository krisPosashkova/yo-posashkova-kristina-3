let num = prompt("Введите число");
let degree = prompt(" Введите степень")
let result = 1;

console.log(typeof num)
console.log(typeof degree)

if (num === null || degree === null) {
  alert('Вы отказались от ввода')
} else if (isNaN(num % 1) || isNaN(degree % 1)) {
  alert('Ошибка, введено НЕ ЧИСЛО')
} else {
  for (let i = 0; i < degree; i++ ) {
    result = result *= num
  }
  console.log(result);
}



