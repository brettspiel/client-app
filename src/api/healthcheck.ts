export const healthcheck = (serverAddress: string) =>
  fetch(`${serverAddress}/__healthcheck`).then((res) => {
    return res.status === 200;
  });
