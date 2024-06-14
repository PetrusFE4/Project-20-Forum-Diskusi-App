import React, { useState, useEffect } from 'react'

function useSessionStorage(key) {
    const [storedValue, setStoredValue] = useState(() => sessionStorage.getItem(key));

    useEffect(() => {
        const handleStorageChange = () => {
            setStoredValue(sessionStorage.getItem(key));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key]);

    return storedValue;
}

export default useSessionStorage;