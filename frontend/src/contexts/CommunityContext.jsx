import React, { createContext, useState } from 'react';

export const CommunityContext = createContext();

export const CommunityProvider = ({ children }) => {
    const [community, setCommunity] = useState(null);

    return (
        <CommunityContext.Provider value={{ community, setCommunity }}>
            {children}
        </CommunityContext.Provider>
    )
}