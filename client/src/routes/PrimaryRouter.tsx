import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {TopNavbar} from "../containers/TopNavbar/TopNavbar";
import {Frontpage} from "../pages/Frontpage";
import {Register} from "../pages/Register";
import {Profile} from "../pages/Profile";
import {Settings} from "../pages/Settings";
import React from "react";

/**
 * PrimaryRouter is a React component that defines the primary routing structure for the application.
 * It uses the React Router library to map URLs to specific components and views.
 * @returns A React element representing the primary router configuration.
 */
export function PrimaryRouter() {
    return (
        <Router>
                <Routes>
                    <Route element={<TopNavbar/>}>
                        <Route path="/" element={<Frontpage feedBulkSize={10} />}>For you</Route>
                        <Route path="/register" element={<Register />}>Register</Route>
                        <Route path="/profile/:userid" element={<Profile feedBulkSize={10} />}>Profile</Route>
                        <Route path="/settings" element={<Settings />}>Settings</Route>
                    </Route>
                </Routes>
        </Router>
    );
}