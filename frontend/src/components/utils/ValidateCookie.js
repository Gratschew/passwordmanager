import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

//luultavasti turha funktio, ei pitäis valitoida frontis. 
const ValidateCookie = ()=>{
    const token = Cookies.get('token');
    if(token){
        try{
            const decodedToken = jwt_decode(token)
            return decodedToken.exp > Date.now() / 1000;
        }catch(error){
            Cookies.remove('token');
            return false;
        }
    }else {
        return false; 
    }
}

export default ValidateCookie