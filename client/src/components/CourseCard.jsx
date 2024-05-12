import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import LikesButton from './LikeButton';
import User from './User';

const CourseCard = ({ course }) => {
    const [rating, setRating] = useState(0);
    const[courseId,setCourseId] = useState(0);
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        let courseRatings = User.getCourseRatings();
        courseRatings.forEach((ele)=>{
            if(course.id===ele.courseId){
                // console.log(ele);
                setRating(ele.rating);
                setCourseId(course.id);
            }
        })
        // let courseLikes = User.getCourseLikes();
        // courseLikes.forEach((ele)=>{
        //     if(course.id===ele.courseId){
        //         // console.log(ele);
        //         setLikes(ele.likes);
        //     }
        // })
    }, []);

    return (
        <div className="course-card">
            <img src={course.thumbnail} alt={course.name} className="course-thumbnail" />
            <div className="course-content">
                <h3>{course.name}</h3>
                <LikesButton like={false} style={{color:"#09c401"}} courseId={courseId-1} />
                <p>Instructor: {course.instructor}</p>
                <Typography component="legend"><strong> Rating - </strong></Typography>
                <Rating
                    name="simple-controlled"
                    value={rating}
                />
                <details>
                    <summary style={{ cursor: "pointer" }}>
                        Learn more
                    </summary>
                    <p>Description: {course.description}</p>
                    <p>Enrollment Status: {course.enrollmentStatus}</p>
                    <Link to={`/courses/${course.id}`}>View course</Link>
                </details>
            </div>
        </div>
    );
};

export default CourseCard;
