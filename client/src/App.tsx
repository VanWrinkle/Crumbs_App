import './styles/App.css';
import './types/Crumb';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from "./context/AuthProvider";
import {PrimaryRouter} from "./routes/PrimaryRouter";

export default function App() {
    return (
        <AuthProvider>
            <PrimaryRouter/>
        </AuthProvider>
    );
}