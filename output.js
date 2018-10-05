const _bigNumAdd = (num1, num2) => {
  const arr1 = num1.toString().split('').map(v => parseInt(v, 10)).reverse();
  const arr2 = num2.toString().split('').map(v => parseInt(v, 10)).reverse();
  const maxLen = Math.max(arr1.length + 1, arr2.length + 1);
  const sumArr = [];
  let i = 0, carryDigit = 0;
  while (i < maxLen) {
    const currDigit = ((arr1[i] || 0) + (arr2[i] || 0) + carryDigit) % 10;
    carryDigit = Math.floor(((arr1[i] || 0) + (arr2[i] || 0) + carryDigit) / 10);
    sumArr.push(currDigit);
    i++;
  }
  if (sumArr.length !== 1 && !sumArr[sumArr.length - 1]) {
    sumArr.pop();
  }
  return sumArr.reverse().join('');
}

const addStrings = (num1, num2) => {
  // code ...
  return _bigNumAdd(num1, num2);
}
