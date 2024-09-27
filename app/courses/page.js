'use client';

import React, { useEffect, useState } from 'react';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for logged-in status

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    // Check if the user is logged in by looking in localStorage
    const user = JSON.parse(localStorage.getItem('user')); // Parse the user object
    if (user && user.name) {
      setIsLoggedIn(true); // Set logged-in status based on whether userName exists
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
  };

  const handleJoinCourse = async (course) => {
    // Check login status
    if (!isLoggedIn) {
      alert('User not logged in');
      return;
    }

    const userName = JSON.parse(localStorage.getItem('user')).name; // Get the user name

    try {
      // PUT request to update user with the new course
      const userResponse = await fetch('/api/register', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: userName, courseName: course.name }),
      });

      if (!userResponse.ok) {
        throw new Error('Failed to update user');
      }

      // PUT request to increment numEnrolled in the course
      const courseResponse = await fetch('/api/courses', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: course._id, numEnrolled: course.numEnrolled + 1 }),
      });

      if (!courseResponse.ok) {
        throw new Error('Failed to update course enrollment');
      }

      const user = JSON.parse(localStorage.getItem('user'));
      const updatedCourses = user.courses ? user.courses : []; // Get existing courses
      updatedCourses.push(course.name); // Add the new course
      localStorage.setItem('user', JSON.stringify({ ...user, courses: updatedCourses })); // Save updated user data

      alert('Successfully joined the course!');

    } catch (error) {
      console.error(error);
      alert('An error occurred: ' + error.message);
    }
  };

  if (loading) {
    return <div>Loading courses...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl m-4 font-bold mb-4">Courses</h1>
      <ul className="space-y-4">
        {courses.map(course => (
          <li key={course._id} className="p-4 m-4 border rounded-lg bg-white shadow">
            <h2 className="text-xl font-semibold">{course.name}</h2>
            <p>Enrolled: {course.numEnrolled}</p>
            <p>Teacher: {course.teacherName}</p>
            <button 
              onClick={() => handleViewCourse(course)} 
              className="text-blue-600 hover:underline"
            >
              View Course
            </button>
            <button 
              onClick={() => handleJoinCourse(course)} 
              className="text-green-600 hover:underline ml-4"
            >
              Join Course
            </button>
          </li>
        ))}
      </ul>

      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={handleCloseModal}>
          <div className="max-w-xl bg-white p-6 rounded-md shadow-md" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-semibold">{selectedCourse.name}</h2>
            <p>{selectedCourse.description}</p>
            <button onClick={handleCloseModal} className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
