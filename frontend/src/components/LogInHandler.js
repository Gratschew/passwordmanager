import { useState } from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const LogInHandler = () => {
  const [isLogIn, SetIsLogin] = useState(true);

  const setIsLoginHandler = (login) => {
    SetIsLogin(login);
  };

  return (
    <>
      {isLogIn ? (
        <LogIn setIsLoginHandler={setIsLoginHandler}></LogIn>
      ) : (
        <SignUp setIsLoginHandler={setIsLoginHandler}></SignUp>
      )}
    </>
  );
};

export default LogInHandler;
