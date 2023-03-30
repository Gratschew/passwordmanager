import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

interface IDecryptedData {
    serviceName: string;
    username: string;
    password: string;
}

interface IServiceData extends mongoose.Document {
  owner: mongoose.Types.ObjectId;
  data: string;
  decryptData: () => IDecryptedData;
}

const ServiceDataSchema = new mongoose.Schema(
    {
      owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      data: {
        type: Object,
        required: true,
      },
    },
    { timestamps: true },
  );
  
  ServiceDataSchema.pre<IServiceData>('save', function (next) {
      const algorithm = 'aes-256-cbc';
      const key = process.env.ENCRYPTION_KEY!;
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv(algorithm, key, iv);
      let encrypted = cipher.update(JSON.stringify(this.data), 'utf8', 'hex');
      encrypted += cipher.final('hex');
      encrypted = iv.toString('hex') + ':' + encrypted
      this.data = encrypted;
      next();
  });
  
  ServiceDataSchema.methods.decryptData = function (): IDecryptedData {
      const encryptedArray = this.data.split(':');
      const iv = Buffer.from(encryptedArray.shift(), 'hex');
      const encrypted = encryptedArray.join(':');
      const algorithm = 'aes-256-cbc';
      const key = process.env.ENCRYPTION_KEY!;
      const decipher = crypto.createDecipheriv(algorithm, key, iv);
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return JSON.parse(decrypted);
  };

export default mongoose.model<IServiceData>('ServiceData', ServiceDataSchema);
