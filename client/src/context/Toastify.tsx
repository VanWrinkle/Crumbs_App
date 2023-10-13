import {ToastContainer} from "react-toastify";
import React from "react";

export function Toastify() {
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
           theme="light"
       />
   )
}