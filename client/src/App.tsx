import './App.css';
import './Crumb';
import React, {SyntheticEvent, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Col, Container, Form, Image, Row, Button, Nav} from "react-bootstrap";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {PersonalFeed} from "./Pages/PersonalFeed";
import {Signup} from "./Pages/Signup";
import {CrumbNavbar} from "./Components/Navbar";

function App() {
    return (
    <Router>
        <Routes>
            <Route element={<CrumbNavbar/>}>
                <Route path="/" element={<PersonalFeed />}>For you</Route>
                <Route path="/signup" element={<Signup />}>Signup</Route>
            </Route>
        </Routes>
    </Router>
    );
}

export default App;
