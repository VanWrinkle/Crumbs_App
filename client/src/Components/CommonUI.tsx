import React, {SyntheticEvent} from "react";
import {Button, Spinner} from "react-bootstrap";

export function LoadingButton(prop: {
    isLoading: boolean,
    onClick: (event: SyntheticEvent) => void,
    buttonText: string,
    disabled: boolean}) {
    return (
        <Button
            type = 'submit'
            variant = 'primary'
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
