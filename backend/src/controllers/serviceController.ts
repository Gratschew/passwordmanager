
import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import ServiceData from '../models/ServiceData';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import { Db } from 'mongodb';
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
    console.log("perkele");
    const decryptedServices = services.map((service: any) => {
        const decryptedData = service.decryptData();
        return {
            _id: service._doc._id.toString(),
            serviceName: decryptedData.serviceName,
            username: decryptedData.username,
            password: decryptedData.password
          };
      });

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
            console.log(newService);
            const saved = await newService.save();
            const service = await ServiceData.findById(saved._id);
            if (service){
              const decryptedData = service.decryptData();
              const response = { ...decryptedData, _id: saved._id };
              // Should return the newly created service here
              res.status(201).json(response);
        }

            
    }
    else {res.status(404).json({ message: 'User not found' });}
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const modifyService = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { id, serviceName, username, password } = req.body;
      const _id = id;
      console.log(`id: ${id}`);
      console.log(serviceName);
      console.log(username);
      console.log(password);
      //const updatedService = await ServiceData.findByIdAndUpdate(_id, { serviceName, username, password }, { new: true });
      //const updatedService = await ServiceData.findByIdAndUpdate(id, { serviceName, username, password }, { new: true });

      // const updatedService = await ServiceData.findByIdAndUpdate(_id, { serviceName, username, password }, (err, docs) => {
      //   if (err){
      //       console.log(err)
      //   }
      //   else{
      //       console.log("Updated User : ", docs);
      //   }
      // });
      //const updatedService = await ServiceData.findByIdAndUpdate(_id, { serviceName, username, password }, { new: true });

      //, service: updatedService.decryptData
      res.status(201).json({ message: 'Service data updated successfully' });
    }  catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  
  export const deleteService = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if(!req.user){

      }
      const {id} = req.body;
      //const service = await ServiceData.findById(req.params.id)Ö
      console.log(id);
      const service = await ServiceData.findById(id)

      if(!service){
        res.status(404).json({ message: 'Service not found' });
        return;
      }
      await service.deleteOne();

      res.status(201).json({ message: 'ok' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

