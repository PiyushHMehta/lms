'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import Courses from "./courses/page";

export default function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Retrieve user data from local storage when component mounts
        const storedUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;
        setUser(storedUser);
    }, []);

    return (
        <div>
            <div className="w-full flex items-center justify-center">
                {user?.isTeacher && (  // Check if user is a teacher
                    <Link className="mx-auto m-4 text-2xl font-semibold" href={'/courses/new'}>
                        Add New Course
                    </Link>
                )}
            </div>
            <Courses />
        </div>
    );
}
