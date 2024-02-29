import createHash from "./createHash";

const baseURL = 'https://api.valantis.store:41000/';

const APIRequest = async (data) => {
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': createHash(),
    },
    body: JSON.stringify(data),
  };

  for (let i = 0; i <= 1; i++) {
    try {
      const response = await fetch(baseURL, params);
      const data = await response.json();
      return data;
    } catch (e) {
      console.error(e.message);
    }
  }

  alert('Ошибка сервера, попробуйте ещё раз');
};

export default APIRequest;
