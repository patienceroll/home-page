export const AwaitTime = (time: number) =>
  new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, time);
  });
