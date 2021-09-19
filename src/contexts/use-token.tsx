import { useState } from "react";
import * as Constants from "../components/Constants/Constants";
import { UserLocalStorage } from "../utils/api/Models";

export default function useToken() {
  const mapTokenString = (key: string) => {
    const obj : UserLocalStorage = JSON.parse(key);

    return obj?.sessionKey
  };
  const getToken = () => {
    const obj = localStorage.getItem(Constants.SESSION);
    return obj ? mapTokenString(obj) : ""
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (username: string, sessionKey: string) => {
    localStorage.setItem(Constants.SESSION, mapTokenObj(username, sessionKey));
    setToken(sessionKey);
  };

  const mapTokenObj = (userId: string, sessionKey: string) => {
    const obj : UserLocalStorage = {
      userId,
      sessionKey
    };

    return JSON.stringify(obj);
  };

  

  const clearToken = () => {
    localStorage.clear();
    setToken("");
  };

  return {
    setToken: saveToken,
    token,
    remove: clearToken
  };
}
