import React from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";

function App(props) {
  return (
    <BrowserRouter>
      <Route path="/" render={(props) => <HomePage />} />
    </BrowserRouter>
  );
}

export default App;
