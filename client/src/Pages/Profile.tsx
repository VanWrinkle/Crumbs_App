import {useParams} from "react-router-dom";
import React from "react";
import {Container} from "react-bootstrap";

export function Profile() {
    const {userid} = useParams()

    return (
        <Container className="main-content">
            Personlig feed til {userid}

        </Container>
    )
}