import {Button, Card} from "react-bootstrap";
import React, {useContext} from "react";
import ThemeProvider from "../../providers/themeProvider";
import {ThemeContext} from "../../context/ThemeContext";
import themeProvider from "../../providers/themeProvider";

export function SettingsTabPersonalization() {
    const {theme, toggleTheme} = useContext(ThemeContext)
    const setThemeIndex = (theme: string): void => {
        document.documentElement.setAttribute('data-bs-theme', theme)
    }
    const handleClick = () => {
        setThemeIndex(theme)
        toggleTheme()
    }

    return(
        <Card style={{borderTop: "0", borderTopLeftRadius: "0", borderTopRightRadius: "0"}}>
            <Card.Body>
                <Button variant={"primary"} size={"lg"} onClick={handleClick}>
                    Change to {theme} mode
                </Button>
            </Card.Body>
        </Card>
    )
}