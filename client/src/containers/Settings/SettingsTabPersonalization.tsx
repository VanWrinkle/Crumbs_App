import {Button, Card} from "react-bootstrap";
import React, {useContext} from "react";
import {ThemeContext} from "../../context/ThemeContext";

/**
 * SettingsTabPersonalization is a React container responsible for managing the "Personalization" tab in user settings.
 * It allows users to personalize their user interface, such as changing the theme mode.
 * @returns A React element for the "Personalization" tab in settings.
 */
export function SettingsTabPersonalization() {
    // Retrieve theme information and theme toggle function from the ThemeContext
    const {theme, toggleTheme} = useContext(ThemeContext)

    // Function to handle theme mode toggle
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