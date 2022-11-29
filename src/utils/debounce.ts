export default (fn: any, delay = 200) => {
  let timer: number;
  return function (this: any) {
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
};
