import {useNotification} from "../../context/AlertProvider";
import {Alert, Collapse} from "react-bootstrap";

export function TopNavbarAlertArea() {
    const notifications = useNotification()!

    return(
        <Collapse in={true}>
            <>
                {notifications.map(item =>
                <Alert variant="warning" dismissible>
                    {item.message}
                </Alert>
                )}
            </>
        </Collapse>

    )
}