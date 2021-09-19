import React, { useState, useEffect, useContext, createContext } from "react";
import { Api } from "../utils/api/api";
import useToken from "./use-token";
import * as constantClass from "../components/Constants/Constants";

interface IContextProps {
  token: string;
  signin: (callback: () => void, username: string, password: string) => Promise<string>;
  signout: (callback: () => void) => void;
  changePassword: (password: string) => void;
}

export const AuthContext = createContext({} as IContextProps);

export function ProvideAuth(props: any) {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const { token, setToken, remove } = useToken();
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (
    callback: () => void,
    username: string,
    password: string
  ): Promise<string> => {
    const response = Api.getSession(username, password).then(res => {
      if(res.code ===  200)
      {
        setToken(username?.trim(), res.data);
        callback();
        return "success";
      }
      else if(res.code ===  400)
      {
        return res.data.ExceptionMessage;
      }
      else
      {
        return res.data;
      }
    });

    return response;
  };

  const signout = (callback: () => void): void => {
    remove();
    callback();
  };
  const changePassword = (password: string): void => void {};

  return {
    token,
    signin,
    signout,
    changePassword
  };
}
