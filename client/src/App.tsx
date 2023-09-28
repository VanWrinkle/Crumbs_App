import './App.css';
import './Crumb';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {PersonalFeed} from "./Pages/PersonalFeed";
import {Signup} from "./Pages/Signup";
import {Login} from "./Pages/Login";


import {CrumbNavbar} from "./Components/Navbar";
import {AuthProvider} from "./AuthProvider";

function App() {
    return (
    <Router>
        <AuthProvider>
            <Routes>
                <Route element={<CrumbNavbar/>}>
                    <Route path="/" element={<PersonalFeed />}>For you</Route>
                    <Route path="/signup" element={<Signup />}>Signup</Route>
                    <Route path="/login" element={<Login />}>Login</Route>
                </Route>
            </Routes>
        </AuthProvider>
    </Router>
    );
}

export default App;
