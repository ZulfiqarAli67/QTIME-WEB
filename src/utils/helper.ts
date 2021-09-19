import * as Constants from "../components/Constants/Constants";
import { UserLocalStorage } from "./api/Models";

export const getUserId = () => {
  const strObj = localStorage.getItem(Constants.SESSION);

  if (strObj) {
    const obj: UserLocalStorage = JSON.parse(strObj);
    return obj.userId;
  }

  return null;
};
