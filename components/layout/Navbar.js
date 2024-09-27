'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Retrieve user data from local storage on component mount
        const storedUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;
        setUser(storedUser);
    }, []);

    const handleLogout = () => {
        // Clear user data from local storage
        localStorage.removeItem('user');
        setUser(null); // Update the state to reflect the logout
    };

    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">LMS</h1>
                <ul className="flex space-x-6">
                    {user ? (
                        <>
                            <li>
                                <Link href="/" className="hover:underline">Home</Link>
                            </li>
                            <li>
                                <span className="hover:underline">Hello, {user.name}</span>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="hover:underline">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link href="/" className="hover:underline">Home</Link>
                            </li>
                            <li>
                                <Link href="/login" className="hover:underline">Login</Link>
                            </li>
                            <li>
                                <Link href="/register" className="hover:underline">Register</Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link href="/my-courses" className="hover:underline">My Courses</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
