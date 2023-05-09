import * as crypto from 'crypto';

interface AesKey {
  userId: any;
  encryptionKey: Buffer;
}

interface AesKeyCache {
  [userId: string]: AesKey;
}

const aesKeys: AesKeyCache = {};

const addAesKey= async (userId:any, password:any) =>{
  try {
    const salt = process.env.ENCRYPTION_KEY!;
    const iterations = 10000;
    const keyLength = 32;
    const digest = 'sha256';

    const key = await new Promise<Buffer>((resolve, reject) => {
      crypto.pbkdf2(password, salt, iterations, keyLength, digest, (err, key) => {
        if (err) {
          reject(err);
        } else {
          resolve(key);
        }
      });
    });
    aesKeys[userId] = key;
  } catch (err) {
    console.error(err);
  }
}
const getAesKey =(userId: any): any | undefined =>{
  console.log(aesKeys);
  return aesKeys[userId];
}

const removeAesKey =(userId: string) =>{
  delete aesKeys[userId];
}

export { addAesKey, getAesKey, removeAesKey };