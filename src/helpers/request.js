const proxy = "https://morning-reaches-98940.herokuapp.com/";

const mainUrl = "https://itunes.apple.com";
export default async function request(url, method = "GET", body) {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  return fetch(proxy + mainUrl + url, config).then(async (response) => {
    const res = await response.json();

    if (response.status >= 400 && response.status < 600) {
      if (res.error) {
        throw res.error;
      } else {
        throw new Error("Something went wrong!");
      }
    }

    return res;
  });
}
