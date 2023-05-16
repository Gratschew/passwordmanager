
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { authenticator } from 'otplib';
import { addAesKey, removeAesKey } from '../models/AesKeys';
import dotenv from 'dotenv';
import qrcode from 'qrcode';
import { encrypt, decrypt } from '../utils/secretEncryption';
dotenv.config();
const {
    JWT_KEY,
    NODE_ENV
  } = process.env;


export const register = async (req: Request, res: Response): Promise<void> => {
  try {

    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // the password contains at least one lowercase letter, one uppercase letter, 
    // one digit, one special character, and is at least 8 characters long.
    // Check if password is secure enough
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({ message: 'Password is not secure enough' });
      return;
    }

    // Hash password, 10 salt rounds is a minimum
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      username,
      password: hashedPassword,
      twoFaEnabled: false,
    });

    await newUser.save();

    // preparation of Google Authenticator 2FA Setup
    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(username, "Password manager", secret);
    qrcode.toDataURL(otpauth, (err, imageUrl) => {
      if (err) {
        res.status(400).json({message: 'Error with QR'});
        return;
      }
      res.json({secret, otpauth, imageUrl});
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Check if the user has setup 2FA properly after register
export const validateTwoFa = async (req: Request, res: Response): Promise<void> => {
  try {
    const { secret, twoFaToken, username, password } = req.body;
    const user = await User.findOne({username});
    if(!user){
      res.status(400).json({message: 'incorrect email or password'});
      return;
    }
  
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if(!isValidPassword){
      res.status(400).json({message: 'incorrect email or password'})
      return;
    }

    if(user.twoFaEnabled){
      res.status(400).json({message: '2Fa already set up'});
      return;
    }

    const isValid = authenticator.check(twoFaToken, secret);
    if (!isValid){
      res.status(404).json({message: 'incorrect token'});
      return;
    }

  try {
    const encryptedSecret = await encrypt(secret, password);
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { twoFaSecret: encryptedSecret, twoFaEnabled: true },
      { new: true }
    );
    console.log('success');
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: '2FA secret encryption or update failed' });
    return;
  }

    if(!JWT_KEY){
      throw new Error('JWT_SECRET not set!')
    }
    await addAesKey(user.id,password)

    const token = jwt.sign({ userId: user.id }, JWT_KEY, {
      expiresIn: '1h',
    });
    res.cookie('token', token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.status(200).json({ message: '2FA enabled' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Verify user's 2FA login
export const verifyTwoFa = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, twoFaToken } = req.body;

    const user = await User.findOne({username});
    if(!user){
      res.status(400).json({message: 'incorrect email or password'});
      return;
    }
  
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if(!isValidPassword){
      res.status(400).json({message: 'incorrect email or password'})
      return;
    }

    const decryptedSecret = await decrypt(user.twoFaSecret, password);
    const isValid = authenticator.check(twoFaToken, decryptedSecret);
    if (!isValid){
      res.status(404).json({message: 'incorrect token'});
      return;
    }

    if(!JWT_KEY){
      throw new Error('JWT_SECRET not set!')
    }
    await addAesKey(user.id,password)

    const token = jwt.sign({ userId: user.id }, JWT_KEY, {
      expiresIn: '1h',
    });
    res.cookie('token', token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
    });
     res.status(200).json({ message: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {

  try{
    const { username, password } = req.body;
    const user = await User.findOne({username});
    if(!user){
      res.status(400).json({message: 'incorrect email or password'});
      return;
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword){
      res.status(400).json({message: 'incorrect email or password'})
      return;
    }
    if (!user.twoFaEnabled){
      const secret = authenticator.generateSecret();
      const otpauth = authenticator.keyuri(username, "Password manager", secret);
      qrcode.toDataURL(otpauth, (err, imageUrl) => {
        if (err) {
          console.log('Error with QR');
          return;
        }
        res.status(403).json({message: 'TWOFA_DISABLED',secret, otpauth, imageUrl});
      });
      return;
    }
    res.status(200).json({ message: 'log in success, move to 2fa' });
    return;

  }catch(error){
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try{
    res.cookie('token', '', { expires: new Date(0)});
    
    const token = req.cookies.token;
    if(!token){
      res.status(500).json({ message: 'Internal server error' });
      return ;
    }
    const secret = process.env.JWT_KEY;
    if(!secret){
      res.status(500).json({ message: 'Internal server error' });
      return ;
    }
    const decoded: any = jwt.verify(token, secret);
    const id =  decoded.userId;

    removeAesKey(id);
    res.set('Cache-Control', 'no-store');
    res.status(200).json({ message: 'Logout successful' });
  }catch(error){
    res.status(500).json({ message: 'Internal server error' });
  }
 
};
  