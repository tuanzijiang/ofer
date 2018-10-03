const C = 1234567890
const A = () => {console.warn('A');}
const B = () => {
  A();
  console.warn('B');
}

const Leetcode = (c) => {
  B();
  C;
}
