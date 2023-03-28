import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';


const ValidateCookie = ()=>{
    const token = Cookies.get('token');
    if(token){
        try{
            console.log("on Token")
            console.log(token)
            const decodedToken = jwt_decode(token)
            console.log("pysty dekodaa")
            return decodedToken.exp > Date.now() / 1000;
        }catch(error){
            //Cookies.remove('token');
            return false;
        }
    }else {
        return false; 
    }
}

export default ValidateCookie