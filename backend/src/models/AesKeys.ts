import * as crypto from 'crypto';

interface AesKey {
  userId: any;
  key: any;
}

var AesKeys : AesKey[] = [];

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
    AesKeys.push({userId, key});
  } catch (err) {
    console.error(err);
  }
}
const getAesKey =(userId: any): any | undefined =>{
  return AesKeys.find((aesKey)=>aesKey.userId == userId)?.key;
}

const removeAesKey =(userId: string) =>{
  AesKeys.filter((aesKey)=>aesKey.userId!=userId);
}

export { addAesKey, getAesKey, removeAesKey };