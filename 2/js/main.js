// function get random number from two integers number

function getRandomNumber(min, max) {
  let randomNumber;
  if (min < 0 || max < 0) {
    throw new Error('Числа должны быть больше или равны 0')
  }
  if (min === max) {
    return min;
  }
  if (min > max) {
    let t = max;
    max = min;
    min = t;
  }
  randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

  return randomNumber;
}

getRandomNumber(0,3);


// function get random number with floating points from two integers number
// and number of digits after the decimal point

function getFloatingPointNumber(min, max, floatPoint) {
  let randomNumber;
  if (min < 0 || max < 0 || floatPoint < 0) {
    throw new Error('Числа должны быть больше или равны 0')
  }
  if (min === max) {
    return min;
  }
  if (min > max) {
    let t = max;
    max = min;
    min = t;
  }

  return Number((Math.random() * (max - min) + min).toFixed(floatPoint));
}

getFloatingPointNumber(1,11,3);

