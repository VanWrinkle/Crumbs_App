import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {CrumbNavbar} from "../Components/Navbar";
import {PersonalFeed} from "../Pages/PersonalFeed";
import {Signup} from "../Pages/Signup";
import {Login} from "../Pages/Login";
import {Profile} from "../Pages/Profile";
import {Settings} from "../Pages/Settings";
import React from "react";

export function PrimaryRouter() {
    return (
        <Router>
                <Routes>
                    <Route element={<CrumbNavbar/>}>
                        <Route path="/" element={<PersonalFeed />}>For you</Route>
                        <Route path="/signup" element={<Signup />}>Signup</Route>
                        <Route path="/login" element={<Login />}>Login</Route>
                        <Route path="/profile/:userid" element={<Profile />}>Profile</Route>
                        <Route path="/settings" element={<Settings />}>Settings</Route>
                    </Route>
                </Routes>
        </Router>
    );
}