import {useNotification} from "../../context/AlertProvider";
import {Alert} from "react-bootstrap";

/**
 * TopNavbarAlertArea is a React container responsible for displaying alert notifications in the top navbar.
 * It renders alert messages, such as warnings or informational messages, in a dismissible format.
 * @returns A React element for displaying alert notifications.
 */
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