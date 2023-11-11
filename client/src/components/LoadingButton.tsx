import React, {SyntheticEvent} from "react";
import {Button, Spinner} from "react-bootstrap";

/**
 * LoadingButton is a React component that renders a button with optional loading spinner and specified text.
 * It is typically used for actions that require loading feedback, such as form submissions.
 * @param isLoading - A boolean indicating whether the loading spinner should be displayed.
 * @param onClick - A callback function to handle the button click event.
 * @param buttonText - The text to display on the button.
 * @param disabled - A boolean indicating if the button should be disabled.
 * @param variant - The variant style of the button (e.g., 'primary', 'danger', etc.).
 * @returns A React element representing the loading button.
 */
export function LoadingButton(prop: {
    isLoading: boolean,
    onClick: (event: SyntheticEvent) => void,
    buttonText: string,
    disabled: boolean,
    variant: string}) {
    return (
        <Button
            type = 'submit'
            variant = {prop.variant}
            onClick = {prop.onClick}
            disabled = {prop.isLoading || prop.disabled}
        >
        {prop.isLoading ? (
            <Spinner
                as = 'span'
                animation = 'border'
                size = 'sm'
                role = 'status'
                aria-hidden = 'true'
                className = 'me-2'
            />
        ) : null}
        {prop.buttonText}
        </Button>
    );
}
