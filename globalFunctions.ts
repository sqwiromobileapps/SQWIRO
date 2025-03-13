/* eslint-disable no-undef */
(global as any).sleep = (ms = 100) =>
  new Promise((resolve) => setTimeout(resolve, ms));
