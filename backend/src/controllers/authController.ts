
import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import jwt from 'jsonwebtoken';
<<<<<<< HEAD
import { authenticator } from 'otplib';
=======
import { addAesKey, getAesKey, removeAesKey } from '../models/AesKeys';

>>>>>>> 35b29d7e36c51bd38aa8989a9e7f3482804d0c15
import dotenv from 'dotenv';
import qrcode from 'qrcode';
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
        res.status(400).json({messsage: 'Error with QR'});
        return;
      }
      res.json({secret, otpauth, imageUrl});
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
<<<<<<< HEAD
    const secret = authenticator.generateSecret();
=======
    res.setHeader('Cache-Control', 'no-store');
>>>>>>> 35b29d7e36c51bd38aa8989a9e7f3482804d0c15
    const users = await User.find();
    const token = authenticator.generate(secret);
    //const isValid = authenticator.check(token, secret);
    //const isValid = authenticator.verify({ token, secret });
    const otpauth = authenticator.keyuri("user", "service", secret);
    qrcode.toDataURL(otpauth, (err, imageUrl) => {
      if (err) {
        res.status(400).json({messsage: 'Error with QR'});
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
      res.status(400).json({messsage: 'incorrect email or password'});
      return;
    }
  
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if(!isValidPassword){
      res.status(400).json({message: 'incorrect email or password'})
      return;
    }

    const isValid = authenticator.check(twoFaToken, secret);
    if (!isValid){
      res.status(404).json({messsage: 'incorrect token'});
      return;
    }

    User.findOneAndUpdate(
      { username: username }, 
      { twoFaSecret: secret, twoFaEnabled: true}, 
      { new: true } 
    )

    res.json({ message: '2FA enabled' });
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
      res.status(400).json({messsage: 'incorrect email or password'});
      return;
    }
  
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if(!isValidPassword){
      res.status(400).json({message: 'incorrect email or password'})
      return;
    }

    const isValid = authenticator.check(twoFaToken, user.twoFaSecret);
    if (!isValid){
      res.status(404).json({messsage: 'incorrect token'});
      return;
    }
  
    if(!JWT_KEY){
      throw new Error('JWT_SECRET not set!')
    }
    const token = jwt.sign({ userId: user.id }, JWT_KEY, {
      expiresIn: '1h',
    });
    res.cookie('token', token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
    });
     res.status(200).json({ message: 'success?' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



//rate limit requesteille?
export const login = async (req: Request, res: Response): Promise<void> => {

  try{
    const { username, password } = req.body;

    const user = await User.findOne({username});
    if(!user){
      res.status(400).json({messsage: 'incorrect email or password'});
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
        res.status(400).json({messsage: 'TWOFA_DISABLED',secret, otpauth, imageUrl});
      });
      return;
    }

    res.status(200).json({ message: 'log in success, move to 2fa' });
  
    if(!JWT_KEY){
      throw new Error('JWT_SECRET not set!')
    }
    
    await addAesKey(user.id,password)

    const token = jwt.sign({ userId: user._id }, JWT_KEY, {
      expiresIn: '1h',
    });
    res.cookie('token', token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.set('Cache-Control', 'no-store');
    res.status(200).json({ message: 'success?' });

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
  