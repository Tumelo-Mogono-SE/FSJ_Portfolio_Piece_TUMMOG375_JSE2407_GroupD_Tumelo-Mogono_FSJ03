'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig'; // Firebase client config

/**
 * AuthContext is used to provide authentication state and actions to components within the application.
 * 
 * @constant
 * @type {React.Context}
 */
const AuthContext = createContext();

/**
 * AuthProvider component that wraps the application or part of the application where authentication is required.
 * It provides the current user and sign-out functionality to the components within its context.
 * 
 * @function AuthProvider
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The children components that will have access to the auth context.
 * @returns {JSX.Element} - The AuthProvider component which provides authentication context.
 */
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        // Cleanup subscription on component unmount
        return unsubscribe;
    }, []);

    /**
     * Signs out the authenticated user using Firebase's signOut method.
     * 
     * @function signOut
     * @returns {Promise<void>} - A promise that resolves when the user is signed out.
     */
    const signOut = () => firebaseSignOut(getAuth(app));

    return (
        <AuthContext.Provider value={{ user, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Custom hook to access the authentication context.
 * 
 * @function useAuth
 * @returns {Object} - The current authentication context, including the user object and sign-out function.
 */
export function useAuth() {
    return useContext(AuthContext);
}