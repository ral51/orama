// Copyright 2017 Kensho Technologies, LLC.

export const windowMock = {
  innerWidth: 1000,
  innerHeight: 1000,
  open: () => undefined
};

export const getWindow = () => {
  if (global.window) return global.window;
  return windowMock;
};
