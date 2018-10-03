const A = () => {console.warn('A');}

const B = () => {
  A();
  console.warn('B');
}

const C = '1234567890';

module.exports = {
  A,
  B,
  C
}