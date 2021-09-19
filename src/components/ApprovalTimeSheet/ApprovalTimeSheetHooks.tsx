import React from 'react';
import useFetch from '../../contexts/use-effect';

export const withHooksHOC = (Component: any) => {
  return (props: any) => {
    const fetchURL = useFetch();

    return <Component useFetch={fetchURL} {...props} />;
  };
};