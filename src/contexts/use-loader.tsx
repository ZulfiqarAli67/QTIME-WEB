import React, { useState, useEffect, useContext, createContext } from "react";

interface IContextProps {
  isLoading: boolean;
  hideLoader: () => void;
  showLoader: () => void;
}

export const LoaderContext = createContext({} as IContextProps);

export function ProvideLoader(props : any) {  
  const loader = useProvideLoader();
  return <LoaderContext.Provider value={loader}>{props.children}</LoaderContext.Provider>
}

export const useLoader = () => {
  return useContext(LoaderContext);
};
// Provider hook that creates auth object and handles state
function useProvideLoader() {

  const [isLoading, setLoading] = useState(false);
  
  const hideLoader = ()  => {
    setLoading(false);
  };
  const showLoader = ()  => {
    setLoading(true);
  };
 
  return {
    isLoading,
    hideLoader,
    showLoader
  };
}