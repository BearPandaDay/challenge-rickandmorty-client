import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Auth } from '../api';

export const AuthContext = createContext();

export function AuthProvider(props) {
    const authController = new Auth();
    
    const { children } = props;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await authController.getDataUser();
            const dataUser = JSON.parse(response);
            
            if (!dataUser) {
                logout();
                setLoading(false);
                return;
            } else {
                reLogin(dataUser);
                setLoading(false);
            }
            
        })()
    }, []);
    
    
    async function login(params) {
        // Consulta para obtener data fetch accssT
        setUser(params);
    }

    async function reLogin(params) {
        // Consulta para obtener data fetch accssT
        setUser(params);
    }

    async function logout() {
        setUser(null);
        authController.removeLogUser();
    }

    const data = {
        user,
        login,
        logout
    }
    
    if (loading) return null;
    
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.any,
}