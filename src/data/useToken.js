import { useState } from 'react';

function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };
    
    const removeToken = () => {
        sessionStorage.removeItem('token');
        setToken(null);
    };

    return {
        setToken: saveToken,
        removeToken: removeToken,
        token
    }
}

export default useToken;