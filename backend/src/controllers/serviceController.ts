
import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import ServiceData from '../models/ServiceData';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();
const {
    JWT_KEY,
    NODE_ENV
  } = process.env;

  /*interface AuthRequest extends Request {
    user: { userId: string };
  }*/
  interface AuthRequest extends Request {
    user?: Record<string, any>;
  }

export const getServices = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if(req.user){
    const services = await ServiceData.find({ owner: req.user.userId });
    const decryptedServices = services.map((service: any) => {
        const decryptedData = service.decryptData();
        return {
            _id: service._doc._id.toString(),
            serviceName: decryptedData.serviceName,
            username: decryptedData.username,
            password: decryptedData.password
          };
      });
      //console.log(decryptedServices);

    res.status(200).json(decryptedServices);}
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createService = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if(req.user){
            const { serviceName, username, password } = req.body;
            console.log(req.user.userId);
            const newService = new ServiceData({
                owner: req.user.userId,
                data: {serviceName: serviceName, username: username, password: password },
            });
            const saved = await newService.save();
            const service = await ServiceData.findById(saved._id);
            if (service){
            const decryptedData = service.decryptData();
         
        }

            // Should return the newly created service here
            res.status(201).json({ message: 'Service created successfully' });
    }
    else {res.status(404).json({ message: 'User not found' });}
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const modifyService = async (req: AuthRequest, res: Response): Promise<void> => {
    try {

      res.status(201).json({ message: 'ok' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  
  export const deleteService = async (req: AuthRequest, res: Response): Promise<void> => {
    try {

      res.status(201).json({ message: 'ok' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

