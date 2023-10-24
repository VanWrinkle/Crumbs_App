import { ThemeContext } from "../context/ThemeContext";
import React, {useState} from "react";

export function ThemeProvider(props: any) {
    const [theme, setTheme] = useState<"light" | "dark">(
        (localStorage.getItem("ui.theme") as "light" | "dark") || "light"
    );

    const toggleTheme = (): void => {
        const val = theme === "light" ? "dark" : "light";
        setTheme(val);
        localStorage.setItem("ui.theme", val);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme}}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;