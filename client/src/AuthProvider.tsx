import React, {useContext, useEffect, useState} from "react";
import axios from "axios";

export interface AuthState {
    username: String,
    ttl: Date
}


const AuthContext = React.createContext<AuthState | undefined>(undefined)
const AuthUpdateContext = React.createContext<(newToken: AuthState | undefined) => void>(() => {})

export function useAuth() {
    return useContext(AuthContext)
}

export function useAuthUpdate() {
    return useContext(AuthUpdateContext)
}

export function AuthProvider({children}: { children: React.ReactNode }) {
    const storedSession = localStorage.getItem('session')
    const initial = storedSession ? JSON.parse(storedSession) : undefined
    const [token, setNewToken] = useState<AuthState | undefined>(initial)

    function renewToken(newToken: AuthState | undefined) {
        setNewToken(newToken)
        if (newToken) {
            localStorage.setItem("session", JSON.stringify(newToken))
        } else {
            localStorage.removeItem("session")
        }
    }

    function expiresWithinHours(hoursRemaining: number): Boolean {
        if (token) {
            const threshold = hoursRemaining * 60 * 60 * 1000
            const currentTime = new Date().getTime()
            const exp = new Date(token.ttl).getTime()
            return exp < (currentTime + threshold) && exp > currentTime
        }
        return false
    }

    function hasExpired() {
        if (token) {
            const currentTime = new Date().getTime()
            const exp = new Date(token.ttl).getTime()
            return currentTime > exp
        }
        return true
    }

    function renewTest() {
        axios.post('/api/renew')
            .then(response => {
                console.log("response")
            })
            .catch(function (error: Promise<void>) {
                console.log(error);
            });
    }

    useEffect(() => {
        if (token) {
            if (expiresWithinHours(48)) {
                renewTest()
            } else if (hasExpired()) {
                renewToken(undefined)
            }
        }
    }, [token])


    return (
        <AuthContext.Provider value={token}>
            <AuthUpdateContext.Provider value={renewToken}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    )
}