import { md5 } from 'js-md5';

const createHash = () => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth() + 1 > 9
    ? now.getUTCMonth() + 1
    : '0' + (now.getUTCMonth() + 1);
  const day = now.getUTCDate() > 9
    ? now.getUTCDate()
    : '0' + (now.getUTCDate());

  return md5(`Valantis_${year}${month}${day}`);
};

export default createHash;