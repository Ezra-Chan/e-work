import CryptoJS from 'crypto-js';

const key = 'TTJWeU5DTkZVaVE9';
const iv = 'TTJWeU5DTkZVaVE9';

const uid = () => {
  return ('0000000' + 100000000 * Math.random()).match(/(\d{8})(\.|$)/)?.[1];
};

export const Encrypt = (text: string) => {
  if (!text) return;
  text = 'EN@' + text + uid();
  // console.log('加密前----' + text);
  const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  // console.log('加密后----' + encrypted.toString());
  return encrypted.toString();
};

export const Decrypt = (text: string) => {
  if (!text) return;
  const baseResult = CryptoJS.enc.Base64.parse(text);
  const ciphertext = CryptoJS.enc.Base64.stringify(baseResult);
  const decryptResult = CryptoJS.AES.decrypt(
    ciphertext,
    CryptoJS.enc.Utf8.parse(key),
    {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  let data = decryptResult.toString(CryptoJS.enc.Utf8).toString();
  if (data.slice(0, 3) === 'EN@') {
    data = data.slice(3, data.length - 8);
  }
  return data;
};
