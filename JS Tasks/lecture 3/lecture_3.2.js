// 2.Напишите 4 чистые функции, add (сложение 2 чисел), subtract (вычитание из первого аргумента второго), divide (деление первого аргумента на второй) и multiply (умножение). В комментариях напишите, почему эти функции чистые

function add(numOne, numTwo) {
  return numOne + numTwo;
}

add(4,5);

const subtract = function(numOne, numTwo) {
  return numOne - numTwo;
}

subtract(8,5);

const divide = (numOne, numTwo) => {
  return numOne / numTwo;
}

divide(10,5);

function multiply(numOne, numTwo) {
  return numOne * numTwo;
}

multiply(20,5);

// Данные функции чистые, потому что не имеют побочных эффектов (например не выводят значение на экран), с одинаковыми аргументами всегда возвращают одинаковое значение, также не пишут и не читают глобальные переменные, не изменяют состояние приложения.