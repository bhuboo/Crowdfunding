import { useState, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loginreg from './Components/loginreg/loginreg.jsx';
import Home from './Components/mainpages/Home/index.jsx';
import axios from 'axios';
import './App.css'
import { AuthContext } from "./context/AuthContext";
import Contactus from './Components/mainpages/Contactus/Contactus.jsx';
import Aboutus from './Components/mainpages/Aboutus/Aboutus.jsx';
import Shareideas from './Components/mainpages/Shareideas/Shareideas.jsx';
import BussinessIdeaPost from './Components/Enterprenuer/BussinessIdea/BussinessIdeaPost.jsx';
import BussinessIdeaview from './Components/Enterprenuer/BussinessIdeaview/Bussinessview.jsx';
import FindInnovator from './Components/mainpages/Connect/FindInnovator.jsx';
import Chat from './Components/mainpages/Connect/Chat.jsx';
function App() {

  axios.defaults.baseURL = 'http://localhost:8080/api/';

  // Set authorization header globally using an interceptor
  // axios.interceptors.request.use(function (config) {
  //   const accessToken = localStorage.getItem("user").accessToken; // Assuming req is accessible here
  //   if (accessToken) {
  //     config.headers.Authorization = accessToken;
  //   }
  //   return config;
  // }, function (error) {
  //   return Promise.reject(error);
  // });


  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Loginreg />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path='contactus'
              element={
                <ProtectedRoute>
                  <Contactus />
                </ProtectedRoute>
              }
            />
            <Route
              path='aboutus'
              element={
                <ProtectedRoute>
                  <Aboutus />
                </ProtectedRoute>
              }
            />
            <Route
              path='shareideas/:booleanParam?/:Id?'
              element={
                <ProtectedRoute>
                  <Shareideas />
                </ProtectedRoute>
              }
            />
            <Route
              path='bussinessIdeas'
              element={
                <ProtectedRoute>
                  <BussinessIdeaPost />
                </ProtectedRoute>
              }
            />
            <Route
              path='bussinessIdeas/:UserId/:Id'
              element={
                <ProtectedRoute>
                  <BussinessIdeaview />
                </ProtectedRoute>
              }
            />
            <Route
              path='findinnovator'
              element={
                <ProtectedRoute>
                  <FindInnovator />
                </ProtectedRoute>
              }
            />
            <Route
              path='Chat'
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
