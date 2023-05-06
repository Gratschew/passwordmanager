
import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
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
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    res.setHeader('Cache-Control', 'no-store');
    const users = await User.find();
    res.json(users);
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
  
    if(!JWT_KEY){
      throw new Error('JWT_SECRET not set!')
    }
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
    
    //res.cookie('token', '', { expires: new Date(0) });
    res.cookie('token', '', { expires: new Date(0)});
    res.set('Cache-Control', 'no-store');
    res.status(200).json({ message: 'Logout successful' });
  }catch(error){
    res.status(500).json({ message: 'Internal server error' });
  }
 
};
  