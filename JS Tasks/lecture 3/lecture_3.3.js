// 3. Напишите функцию addCreator, которая будет работать по коду на след слайде

function addCreator(numOne) {
  return function (numTwo) {
    return numOne + numTwo;
  }
}

const add = addCreator(5);
console.log(add(5)); // 10
console.log(addCreator(1)(4)); // 4