import React from "react";
import GlobalStyles from "./GlobalStyle";
import {Route, Routes} from 'react-router-dom';
//import pages
import Reg from "./pages/Reg";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <GlobalStyles/>
      <Routes>
      <Route path="/reg" element={<Reg/>}/>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
