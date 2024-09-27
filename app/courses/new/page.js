'use client';

import React, { useState } from 'react';

const NewCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState(''); // New state for course description
  const [numEnrolled, setNumEnrolled] = useState(0);
  const [resources, setResources] = useState([]);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');

  // Retrieve teacher's name from local storage
  const teacherName = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user'))?.name : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newCourse = {
      name: courseName,
      description: courseDescription, // Include description in the new course object
      numEnrolled,
      resources,
      comments,
      teacherName, // Add teacher name
    };

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourse),
      });

      if (response.ok) {
        setMessage('Course added successfully!');
        setCourseName('');
        setCourseDescription(''); // Clear description field
      } else {
        setMessage('Error adding the course.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="p-6 my-8 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Add New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Course Name:
          </label>
          <input
            id="name"
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Course Description:
          </label>
          <textarea
            id="description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <input type="hidden" value={numEnrolled} />
        <input type="hidden" value={JSON.stringify(resources)} />
        <input type="hidden" value={JSON.stringify(comments)} />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
          Add Course
        </button>
      </form>

      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default NewCourse;
