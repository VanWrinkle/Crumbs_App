import {useNotification} from "../../context/AlertProvider";
import {Alert, Collapse} from "react-bootstrap";

export function TopNavbarAlertArea() {
    const notifications = useNotification()!

    return(
            <>
                {notifications.map(item =>
                <Alert variant="warning" className={"alertfield"} dismissible>
                    {item.message}
                </Alert>
                )}
            </>
    )
}