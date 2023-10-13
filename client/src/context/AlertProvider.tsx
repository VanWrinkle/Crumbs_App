import React, {createContext, useContext, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';

export interface Notify {
    message: string,
    link: string
}

const AlertContext = createContext<Notify[] | undefined>(undefined)
const AlertUpdateContext = createContext<(alert: Notify) => void>(() => {})

export function useNotification() {
    return useContext(AlertContext);
}

export function useAddNotification() {
    return useContext(AlertUpdateContext);
}


export function AlertProvider({children}: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<Notify[]>([]);

    function addNotify(notify: Notify) {
        setNotifications([...notifications, notify]);
    }
    return (
        <AlertContext.Provider value={notifications}>
            <AlertUpdateContext.Provider value={addNotify}>
                {children}
            </AlertUpdateContext.Provider>
        </AlertContext.Provider>
    );
}