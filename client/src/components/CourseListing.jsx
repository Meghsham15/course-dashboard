import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import courses from '../data/courses';
const CourseListing = () => {
  // const [courses,setCourses] = useState([]);

  return (
    <div className="course-list container">
      <h2>Available Courses</h2>
      <div className="course-cards">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseListing;
