import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, cert } from 'firebase-admin/app';

/**
 * Firebase Admin SDK configuration for initializing Firebase services.
 * 
 * @constant
 * @type {Object}
 * @property {Object} credential - The Firebase Admin SDK credentials.
 */
const firebaseAdminConfig = {
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
};

/**
 * Initializes the Firebase Admin SDK if it hasn't been initialized yet.
 */
if (!initializeApp.apps?.length) {
    initializeApp(firebaseAdminConfig);
}


/**
 * Middleware function to verify the user's authentication token from cookies.
 * If the token is invalid or missing, the user is redirected to the login page.
 * If the token is valid, the request is forwarded to the next middleware or handler.
 * 
 * @async
 * @function middleware
 * @param {import('next/server').NextRequest} req - The incoming Next.js request object.
 * @returns {Promise<import('next/server').NextResponse>} - A promise that resolves to the NextResponse object.
 */
export async function middleware(req) {
    const token = req.cookies.get('authToken');

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const decodedToken = await getAuth().verifyIdToken(token);
        req.user = decodedToken;
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

/**
 * Configuration for the Next.js middleware to define which routes are protected.
 * 
 * @constant
 * @type {Object}
 * @property {Array<string>} matcher - An array of route patterns that require authentication.
 */
export const config = {
    matcher: ['/products/:path*/reviews/:path*', '/profile/:path*'], // Protect these routes
};