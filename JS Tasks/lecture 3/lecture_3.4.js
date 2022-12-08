// 4. Создайте свой счетчик, который будет принимать шаг cчетчика. То есть ваш counterCreater должен принимать аргумент step и изменять index на step.Step должен иметь значение по умолчанию 2.Изначально index равен 0



function counterCreater(step = 2) {
  index = 0;
  return function() {
    return index += step;
  }
}

let myCounter1 = counterCreater(-1);

console.log(myCounter1()); // -1
console.log(myCounter1()); // -2

let myCounter2 = counterCreater(4);

console.log(myCounter2()); // 4
console.log(myCounter2()); // 8

let myCounter3 = counterCreater();

console.log(myCounter3()); // 2
console.log(myCounter3()); // 4