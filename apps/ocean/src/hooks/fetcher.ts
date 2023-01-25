const fetcher = (url: RequestInfo) =>
  fetch(url, {
    headers: {
      'x-api-key': `${process.env['NX_OCEAN_API_KEY']}`,
    },
  }).then((_) => _.json());

export default fetcher;
