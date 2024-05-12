import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import courses from "../data/courses";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import User from './User';
import LikeButton from './LikeButton';
import { database, ref, onValue, off, transaction } from './Firebase';

const CourseDetails = () => {
  let userId = User.getUserId();
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === parseInt(courseId));
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const courseRef = ref(database, `courses/ratings/${courseId}`);
  const userRef = ref(database, `courses/userRatings/${userId}`);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    let courseRatings = User.getCourseRatings();
    courseRatings.forEach((ele) => {
      if (course.id === ele.courseId) {
        // console.log(ele);
        setRating(ele.rating)
      }
    });

    let userRatings = User.getUserRatings();
    userRatings.forEach((ele) => {
      if (course.id === ele.courseId) {
        // console.log(ele);
        setUserRating(ele.rating);
      }
    })

    transaction(userRef, (user) => {
      if (user) {
        // console.log(user);
        let liked = user.likes.filter((ele) => {
          // console.log("courseId - "+courseId);
          // console.log(ele);
          return ele == courseId
        });
        // console.log(liked);
        if (liked.length!==0) {
          // console.log("yes");
          setLiked(true);
        }
      } else {
        user = {
          userId,
          likes: [courseId],
        };
      }
      return user;
    })

  }, []);



  async function handleUpdateRatings(courseRating, userRating) {
    // console.log("runned " + courseRating + " " + userRating);
    let userId = User.getUserId();
    let courseId = course.id;
    let newCourseRating = (courseRating + userRating) / 2;
    let newUserRating = userRating;
    let body = {
      userId,
      courseId,
      newCourseRating,
      newUserRating
    }
    let res = await fetch("/updateRatings", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    let data = await res.json();
    User.addCourseRatings(data.courseRatings);
    User.addUserRatings(data.userRatings);
    // console.log(data);
  }

  if (!course) {
    return <p>Course not found.</p>;
  }

  return (
    <div className="course-details container">

      <h2>{course.name}</h2>
      <LikeButton like={true} userId={userId} liked={liked} setLiked={setLiked} style={liked?{color:"blue"}:{color:"black"}} courseId={course.id-1} />
      <div className="course-info">
        <img style={{ marginRight: "20px" }} src={course.thumbnail} alt={course.name} className="course-thumbnail" />
        <div className="course-details-content">
          <p> <strong> Instructor: </strong>{course.instructor}</p>
          <p> <strong> Description: </strong>{course.description}</p>
          <p> <strong> Enrollment Status: </strong>{course.enrollmentStatus}</p>
          <p> <strong> Duration: </strong>{course.duration}</p>
          <p> <strong> Schedule: </strong>{course.schedule}</p>
          <p> <strong> Location: </strong>{course.location}</p>
          <p><Typography component="legend"><strong>Overall Rating - </strong></Typography>
            <Rating
              name="simple-controlled"
              value={rating}
            />
            <Typography component="legend"><strong>Your rating - </strong></Typography>
            <Rating
              name="simple-controlled"
              value={userRating}
              onChange={(event, newValue) => {
                handleUpdateRatings(rating, newValue);
                setUserRating(newValue);
                setRating((prevVal) => {
                  if (prevVal === 0) {
                    return newValue;
                  }
                  return (prevVal + newValue) / 2;
                });
              }}
            />
          </p>
        </div>
      </div>

      <h3>Prerequisites</h3>
      <ul className="course-prerequisites">
        {course.prerequisites.map((prequisite) => (
          <li key={prequisite}>{prequisite}</li>
        ))}
      </ul>
      <h3>Course Syllabus</h3>
      <ul className="course-syllabus">
        {course.syllabus.map((week) => (
          <li key={week.week}>
            <h4>Week {week.week}: {week.topic}</h4>
            <p>{week.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetails;
