import { useEffect, useState } from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { useDispatch, useSelector } from "react-redux";
import Home from "./Home";
import { getServices } from "../Redux/reducers/ServiceReducer";

const LogInHandler = () => {
  const [isLogIn, SetIsLogin] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const service = useSelector((state) => state.service);
  const dispatch = useDispatch();
  const setIsLoginHandler = (login) => {
    SetIsLogin(login);
  };

  useEffect(() => {
    dispatch(getServices());
  }, []);

  return (
    <>
      {isLoggedIn || service.loading ? (
        <Home></Home>
      ) : isLogIn ? (
        <LogIn setIsLoginHandler={setIsLoginHandler}></LogIn>
      ) : (
        <SignUp setIsLoginHandler={setIsLoginHandler}></SignUp>
      )}
    </>
  );
};

export default LogInHandler;
