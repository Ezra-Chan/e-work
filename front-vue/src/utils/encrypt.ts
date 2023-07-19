import JSEncrypt from 'jsencrypt';

const _pubKey = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIbYc4ZRDXr+WO08v+m7FbX7DjvtXTMa
5mSu5VSSRqOI/WwAUYnnPnNOgjEu74m6CBoEHxJkMd69fbR01VVPyJUCAwEAAQ==
-----END PUBLIC KEY-----`;

const pubKey = new JSEncrypt();
pubKey.setPublicKey(_pubKey);

export const encrypt = (data: string) => pubKey.encrypt(data);
