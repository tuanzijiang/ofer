// 数组第一位为数字二进制最后一位
const bitArr = (num) => {
  result = [...new Array(32).keys()].map(() => 0);
  num = parseInt(num);
  let i = 0;
  while (num > 0) {
    const midRemainder = num % 2;
    num = parseInt(num / 2);
    result[i] = midRemainder;
    i++;
  }
  return result;
};

// 将(a, b)绕(x, y)逆时针旋转n次90deg后得到的点
const rotateNum = (a, b, x, y, n) => {
  n = n % 4;
  if (n === 0) {
    return [a, b];
  } else if (n === 1) {
    return [x + y - b, y + a - x];
  } else if (n === 2) {
    return [x + x - a, y + y - b];
  } else {
    return [x + b - y, y + x - a];
  }
}

// 判断一组四个点是否为正方形[[1, -1], [1, 1], [-1, -1], [-1, 1]]
const isSquare = (points) => {
  const dists = [];
  points.forEach((ov, oi) => {
    points.forEach((iv, ii) => {
      if (ii > oi) {
        dists.push(dist(ov[0], ov[1], iv[0], iv[1]));
      }
    })
  })
  const distMap = dists.reduce((prev, curr) => {
    prev[curr] = true;
    return prev;
  }, {});
  const keys = Object.keys(distMap);
  return keys.length === 2 && keys.indexOf('0') === -1;
}

// 判断两个点之间的距离
const dist = (x0, y0, x1, y1) => {
  return Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2);
}

const smallCharacter = 'abcdefghijklmnopqrstuvwxyz';
const bigCharacter = smallCharacter.toUpperCase();

// 字母字典序索引
const dictMap = smallCharacter.split('').reduce((prev, curr, idx) => {
  prev[curr] = idx;
  return prev;
}, {});

// 组合数的值
const C = (n, m) => {
  const upperNum = [...new Array(m).keys()].map(v => v + n - m + 1).reduce((prev, curr) => (prev * curr), 1);
  const bottomNum = [...new Array(m).keys()].map(v => v + 1).reduce((prev, curr) => (prev * curr), 1);
  return upperNum / bottomNum;
}

// 安全的读取数组
const read = (arr, idxs = [], emptyVal = undefined) => {
  const MAXDEEP = idxs.length - 1;
  if(idxs.length === 0) {
    return arr;
  }
  const level = idxs.reduce((prev, curr, idx) => {
    if(idx !== MAXDEEP) {
      prev = prev[curr] || [];
    } else {
      lastIdx = curr;
    }
    return prev;
  }, arr);
  return level[lastIdx] === undefined ? emptyVal: level[lastIdx];
}

// 安全的写入数组
const write = (arr, idxs = [], val) => {
  let currLev = arr, idx, i;
  if (idxs.length === 0) {
    return;
  }
  for (i = 0; i < idxs.length - 1; i++) {
    idx = idxs[i];
    if (currLev[idx] === undefined) {
      currLev[idx] = [];
    }
    currLev = currLev[idx];
  }
  idx = idxs[i];
  currLev[idx] = val; 
}

module.exports = {
  rotateNum,
  isSquare,
  dist,
  bitArr,
  smallCharacter,
  bigCharacter,
  C
}