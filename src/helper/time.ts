export const AwaitTime = (time: number) =>
  new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, time);
  });

export const AwatiScrollTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  const aniamate = (callBack: (value: unknown) => void) => {
    const top = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;

    if (top <= 0) {
      callBack(undefined);
    } else {
      requestAnimationFrame(aniamate.bind(null, callBack));
    }
  };

  return new Promise((res) => {
    aniamate(res);
  });
};
