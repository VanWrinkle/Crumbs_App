import {ToastContainer} from "react-toastify";
import React, {useContext} from "react";
import {ThemeContext} from "./ThemeContext";

export function Toastify() {
    const {theme} = useContext(ThemeContext);
   return(
       <ToastContainer
           position="top-right"
           autoClose={5000}
           hideProgressBar={false}
           newestOnTop={false}
           closeOnClick
           rtl={false}
           pauseOnFocusLoss
           draggable
           pauseOnHover
           theme={theme}
       />
   )
}