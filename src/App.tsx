import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes} from "./routes";
import { ProvideAuth } from "./contexts/use-auth";
import { ProvideLoader } from "./contexts/use-loader";

function App() {
  return (
    <div className="App">
      <ProvideAuth>
        <ProvideLoader>
        <Routes></Routes>
        </ProvideLoader>
      </ProvideAuth>
    </div>
  );
}

export default App;
