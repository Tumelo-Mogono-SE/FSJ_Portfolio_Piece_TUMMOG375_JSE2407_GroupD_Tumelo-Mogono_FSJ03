import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

/**
 * Signs up a new user with the provided email and password, and sets an authentication token as a cookie.
 *
 * @async
 * @function signUp
 * @param {string} email - The email address of the new user.
 * @param {string} password - The password for the new user.
 * @returns {Promise<import('firebase/auth').User>} - A promise that resolves to the authenticated user object.
 * @throws {Error} - Throws an error if the sign-up process fails.
 */
export const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        document.cookie = `authToken=${token}; path=/;`;
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Logs in an existing user with the provided email and password, and sets an authentication token as a cookie.
 *
 * @async
 * @function logIn
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user.
 * @returns {Promise<import('firebase/auth').User>} - A promise that resolves to the authenticated user object.
 * @throws {Error} - Throws an error if the login process fails.
 */
export const logIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        document.cookie = `authToken=${token}; path=/;`;
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Logs out the current user and clears the authentication token from cookies.
 *
 * @async
 * @function signOutUser
 * @returns {Promise<void>} - A promise that resolves when the user is signed out.
 * @throws {Error} - Throws an error if the sign-out process fails.
 */
export const signOutUser = async () => {
    try {
        await signOut(auth);
        document.cookie = `authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Listens for changes to the authentication state (e.g., user login, logout) and executes the provided callback.
 *
 * @function listenToAuthChanges
 * @param {function(import('firebase/auth').User | null): void} callback - The callback function to execute when the authentication state changes. It receives the authenticated user object or `null` if no user is authenticated.
 * @returns {import('firebase/auth').Unsubscribe} - A function that can be called to unsubscribe from the authentication state listener.
 *
 */
export const listenToAuthChanges = (callback) => {
    return onAuthStateChanged(auth, callback);
};