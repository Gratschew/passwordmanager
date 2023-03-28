import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const {
    JWT_KEY,
  } = process.env; 


//TODO Tutki toimiiko oikeesti
const verifyJwtToken = (req, res)=> {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({error: 'Unauthorized'})
        }
        const decoded = jwt.verify(token, JWT_KEY);
    }catch(error){
        res.status(401).json({ error: 'Invalid credentials' });
    }
    
};
export default verifyJwtToken