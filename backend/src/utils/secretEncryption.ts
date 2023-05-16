import * as crypto from 'crypto';

function deriveKeyFromPassword(password: string, salt: Buffer): Promise<Buffer> {
    const iterations = 100000; // Number of iterations
    const keyLength = 32; // AES-256 key length
  
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, iterations, keyLength, 'sha256', (err, derivedKey) => {
        if (err) {
          reject(err);
        } else {
          resolve(derivedKey);
        }
      });
    });
}
  
  // Encryption function
async function encrypt(text: string, password: string): Promise<string> {
    const salt = crypto.randomBytes(16); // Generate a random salt
    const aesKey = await deriveKeyFromPassword(password, salt);
    const iv = crypto.randomBytes(16); // Generate a random initialization vector
    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return salt.toString('hex') + iv.toString('hex') + encrypted;
}
  
  // Decryption function
async function decrypt(encryptedText: string, password: string): Promise<string> {
    const salt = Buffer.from(encryptedText.slice(0, 32), 'hex'); // Extract the salt from the encrypted text
    const iv = Buffer.from(encryptedText.slice(32, 64), 'hex'); // Extract the initialization vector from the encrypted text
    const aesKey = await deriveKeyFromPassword(password, salt);
    const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
    let decrypted = decipher.update(encryptedText.slice(64), 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export {encrypt, decrypt}