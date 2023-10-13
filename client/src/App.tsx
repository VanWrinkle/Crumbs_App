import './styles/App.css';
import './types/Crumb';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from "./context/AuthProvider";
import {PrimaryRouter} from "./routes/PrimaryRouter";
import {AlertProvider} from "./context/AlertProvider";
import 'react-toastify/dist/ReactToastify.css';
import {Toastify} from "./context/Toastify";

export default function App() {
    return (
        <AlertProvider>
            <AuthProvider>
                <Toastify />
                <PrimaryRouter/>
            </AuthProvider>
        </AlertProvider>
    );
}