import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {TopNavbar} from "../containers/TopNavbar/TopNavbar";
import {Frontpage} from "../pages/Frontpage";
import {Register} from "../pages/Register";
import {Profile} from "../pages/Profile";
import {Settings} from "../pages/Settings";
import React from "react";

export function PrimaryRouter() {
    return (
        <Router>
                <Routes>
                    <Route element={<TopNavbar/>}>
                        <Route path="/" element={<Frontpage />}>For you</Route>
                        <Route path="/register" element={<Register />}>Register</Route>
                        <Route path="/profile/:userid" element={<Profile />}>Profile</Route>
                        <Route path="/settings" element={<Settings />}>Settings</Route>
                    </Route>
                </Routes>
        </Router>
    );
}