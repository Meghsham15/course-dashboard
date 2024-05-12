import React, { useEffect, useState, like } from 'react';
import { database, ref, onValue, off, transaction } from './Firebase';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const LikesButton = ({ courseId, style, userId, liked, like, setLiked }) => {
  const [likes, setLikes] = useState(0);
  const courseRef = ref(database, `courses/ratings/${courseId}`);
  const userRef = ref(database, `courses/userRatings/${userId}`);
  // useEffect(() => {
  //   onValue(courseRef, (snapshot) => {
  //     const course = snapshot.val();
  //     // setLikes(course?.likes || 0);
  //     // console.log(course);
  //   });
  // }, []);

  const handleLike = () => {
    // Increment the 'likes' value for the specific course in the database
    // console.log("like clk "+liked);
    if (!liked) {
      transaction(courseRef, (course) => {
        if (course) {
          course.likes += 1;
        } else {
          course = {
            courseId,
            likes: 1,
          };
        }
        return course;
      });

      transaction(userRef, (user) => {
        if (user) {
          user.likes.push(courseId+1)
          // console.log("done");
          setLiked(true);
        } else {
          user = {
            userId,
            likes: [courseId+1],
          };
        }
        return user;
      })

    }

  };

  useEffect(() => {
    // Listen for changes to the specific course node in the database
    const unsubscribe = onValue(courseRef, (snapshot) => {
      const course = snapshot.val();
      setLikes(course?.likes || 0);
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [courseRef]);

  // const handleLike = () => {
  //   // Increment the 'likes' value for the specific course in the database
  //   transaction(courseRef, (course) => {
  //     if (course) {
  //       course.likes += 1;
  //     } else {
  //       course = {
  //         courseId,
  //         likes: 1,
  //       };
  //     }
  //     return course;
  //   });
  // };

  return (
    // <div>
    //   <button onClick={handleLike}>Like</button>
    //   <span>Likes: {likes}</span>
    // </div>
    <div className='likes'><ThumbUpIcon onClick={like?handleLike:""} style={style}
    //  onClick={edit?handleLike:""} 
     className='like-btn'/> {likes} likes</div>
  );
};

export default LikesButton;