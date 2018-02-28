export function isIntEqual(n1, n2, base = 10) {
  const parsed1 = parseInt(n1, base);
  const parsed2 = parseInt(n2, base);
  if (Number.isNaN(parsed1) && Number.isNaN(parsed2)) {
    return true;
  }
  return parsed1 === parsed2;
}

// 转化成promise方法
export const promisify = (fn, receiver) => (
  (...args) => (
    new Promise((resolve, reject) => {
      fn.apply(receiver, [...args, (err, res) => (
        err ? reject(err) : resolve(res)
      )]);
    })
  )
);

// 转化成promise方法（单返回值）
export const promisifySingle = (fn, receiver) => (
  (...args) => (
    new Promise((resolve) => {
      fn.apply(receiver, [...args, res => (
        resolve(res)
      )]);
    })
  )
);

export const hasValue = v => (v !== undefined);
