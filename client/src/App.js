import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseListing from './components/CourseListing';
import CourseDetails from './components/CourseDetails';
import StudentDashboard from './components/StudentDashboard';
import Navbar from './components/Navbar';
import Popup from './components/Popup';
import User from './components/User';

const App = () => {
  const [auth, setAuth] = useState(false);
  const [courseRatings,setCourseRatings] = useState();
  useEffect(() => {
    getCourseRatings();
    getCourseLikes();
  }, []);
  async function getCourseRatings() {
    let res = await fetch("/getCourseRatings");
    let data = await res.json();
    // console.log(data);
    // setCourseRatings(data[0].ratings);
    User.addCourseRatings(data[0].ratings);
    // User.addCourseRatings(data.ratings);
  }
  async function getCourseLikes() {
    let res = await fetch("/getCourseLikes");
    let data = await res.json();
    User.addCourseLikes(data[0].ratings);
  }
  // useEffect(()=>{
  //   if(courseRatings){
  //     User.addCourseRatings(courseRatings);
  //   }
  // },[courseRatings])
  return (<>
    {auth ? <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CourseListing />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
      </Routes>
    </Router> : <Popup setAuth={setAuth} />}
  </>
  );
};

export default App;
