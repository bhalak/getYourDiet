import React, { ReactNode, useEffect, useState, MouseEventHandler } from "react";
import { GlobalVariables } from "../utils/data-sets/GlobalVariables";
import { RequestApiUtils } from "../utils/api/RequestApiUtils";
import { useHistory } from "react-router-dom";

export type AuthContextType = {
  isLoggedIn: boolean,
  userId: number,
  onLogin: Function,
  onLogout: MouseEventHandler
}

export const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  userId: GlobalVariables.JUNK_ID,
  onLogin: ()=>{},
  onLogout: ()=>{}
});



const AuthContextProvider: React.FC<{children: ReactNode}> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(GlobalVariables.JUNK_ID);
  const history = useHistory();

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);

      const newUserId: number = +localStorage.getItem('userId')!

      setUserId(newUserId);
    }
  }, []);

  const logInHandler = async (email: string, password: string): Promise<boolean> => {

    const userId = await RequestApiUtils.checkUserExist(email, password);

    if (userId) {
      setIsLoggedIn(true);
      setUserId(userId);
      localStorage.setItem('isLoggedIn', '1');
      localStorage.setItem('userId', `${userId}`);
      history.push("/");
      return true;
    }

    return false;
  }

  const logOutHandler = () => {
    setIsLoggedIn(false);
    setUserId(GlobalVariables.JUNK_ID);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
  }

  const contextValue: AuthContextType = {
    isLoggedIn: isLoggedIn,
    userId: userId,
    onLogin: logInHandler,
    onLogout: logOutHandler
  }

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
}

export default AuthContextProvider;