import React, { useContext, useState } from "react";

const AuthContext = React.createContext<string>("")
const AuthUpdateContext = React.createContext<(newToken: string) => void>(() => {})

export function useAuth() {
    return useContext(AuthContext)
}

export function useAuthUpdate() {
    return useContext(AuthUpdateContext)
}

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [token, setNewToken] = useState<string>("")

    function renewToken(newToken: string) {
        setNewToken(newToken)
    }

    return (
        <AuthContext.Provider value={token}>
            <AuthUpdateContext.Provider value={renewToken}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    )
}