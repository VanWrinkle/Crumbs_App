import {Button, Card} from "react-bootstrap";
import React, {useContext} from "react";
import {ThemeContext} from "../../context/ThemeContext";

export function SettingsTabPersonalization() {
    const {theme, toggleTheme} = useContext(ThemeContext)
    const handleClick = () => {
        toggleTheme()
    }

    return(
        <Card style={{borderTop: "0", borderTopLeftRadius: "0", borderTopRightRadius: "0"}}>
            <Card.Body>
                <Button variant={"primary"} size={"lg"} onClick={handleClick}>
                    {theme} mode
                </Button>
            </Card.Body>
        </Card>
    )
}