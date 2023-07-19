import * as NodeRsa from 'node-rsa';

const privateKey = new NodeRsa(process.env.PRIVATE_KEY);
privateKey.setOptions({ encryptionScheme: 'pkcs1' });

export const decrypt = (data: string) => privateKey.decrypt(data, 'utf8');
