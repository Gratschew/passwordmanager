import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  twoFaSecret: string;
  twoFaEnabled: boolean;
}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  twoFaSecret: { type: String},
  twoFaEnabled: {type: Boolean, required: true, default: false},
});

const User = model<IUser>('User', userSchema);

export default User;