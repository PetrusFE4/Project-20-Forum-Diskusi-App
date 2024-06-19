import React, { createContext, useEffect, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ initUser, children }) => {
    const [user, setUser] = useState(initUser);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }