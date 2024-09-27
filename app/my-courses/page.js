'use client'

import React, { useEffect, useState } from 'react';

const MyCourses = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        // Fetch all courses
        const response = await fetch('/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        
        const allCourses = await response.json();

        // Get the user data from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        
        // If user exists and has joined courses
        if (user && user.courses) {
          // Filter courses based on the user's joined courses
          const joinedCourses = allCourses.filter(course => 
            user.courses.includes(course.name) // Assuming user.courses is an array of course names
          );
          setMyCourses(joinedCourses);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  if (loading) {
    return <div>Loading your courses...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl m-4 font-bold mb-4">My Courses</h1>
      {myCourses.length > 0 ? (
        <ul className="space-y-4">
          {myCourses.map(course => (
            <li key={course._id} className="p-4 m-4 border rounded-lg bg-white shadow">
              <h2 className="text-xl font-semibold">{course.name}</h2>
              <p>Enrolled: {course.numEnrolled}</p>
              <p>Teacher: {course.teacherName}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses joined yet.</p>
      )}
    </div>
  );
};

export default MyCourses;
