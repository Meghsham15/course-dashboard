import React, { useState } from 'react';
import CourseCard from './CourseCard';
import courses from '../data/courses';

const Profile = ({student}) => {

  return (
    
    <div className="student-dashboard container">
      <h2>Welcome, {student.name}</h2>
      <h3>Student Information</h3>
      <ul>
        <li><strong> Name: </strong>{student.name}</li>
        <li><strong> Email: </strong>{student.email}</li>
        {/* Add additional student information if needed */}
      </ul>
      <h3>Enrolled Courses</h3>
      <div className="course-cards">
        {student.enrolledCourses?student.enrolledCourses.map((courseId) => {
          const course = courses.find((c) => c.id === courseId);
          if (course) {
            return (
              <CourseCard key={course.id} course={course} />
            );
          }
          return null;
        }):<></>}
      </div>
    </div>
  );
};

export default Profile;
