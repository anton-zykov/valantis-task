import createHash from "./createHash";

const baseURL = 'http://api.valantis.store:40000/';
const reserveURL = 'https://api.valantis.store:41000/';

const APIRequest = async (data) => {
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': createHash(),
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(baseURL, params);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e.message);
  }

  try {
    const response = await fetch(reserveURL, params);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e.message);
  }
};

export default APIRequest;
