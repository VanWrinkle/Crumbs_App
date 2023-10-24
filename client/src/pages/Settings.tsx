import {Container, Tab, Tabs} from "react-bootstrap";
import React, {useEffect} from "react";
import {useAuth} from "../context/AuthProvider";
import {useNavigate} from "react-router-dom";
import {SettingsTabAccount} from "../containers/Settings/SettingsTabAccount";
import {SettingsTabPersonalization} from "../containers/Settings/SettingsTabPersonalization";

export function Settings() {
    const auth = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        // redirects user to homepage if logged out
        if (!auth?.username) {
            navigate("/")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);


    return (
        <Container className="main-content" style={{marginTop: 50}}>
            <h5>Settings</h5>
            <Tabs defaultActiveKey="account" fill>
                <Tab eventKey="account" title="Account">
                    <SettingsTabAccount />
                </Tab>
                <Tab eventKey="notifications" title="Notifications" style={{color: "black"}}>

                </Tab>
                <Tab eventKey="security" title="Security & Privacy">

                </Tab>
                <Tab eventKey="personalization" title="Personalization">
                    <SettingsTabPersonalization />
                </Tab>
            </Tabs>
        </Container>
    )

}
