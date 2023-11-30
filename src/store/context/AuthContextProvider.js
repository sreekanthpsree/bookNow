const { createContext, useState, useMemo, useContext } = require("react");


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const contextValue = useMemo(() => {
        return [userData, setUserData]
    }, [userData, setUserData]);

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext)
}