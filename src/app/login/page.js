'use client';
import { useState } from 'react';
import { logIn } from '@/authHelper';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true while logging in

        try {
            await logIn(email, password);
            alert('Login successful!'); // Alert for successful login
            window.location.href = '/'; // Redirect to home page
        } catch (error) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false); // Reset loading state after the login attempt
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Password"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Logging In...' : 'Log In'} {/* Button text changes based on loading state */}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
