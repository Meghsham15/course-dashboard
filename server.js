const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const courses = require("./courseData");
const mongoose = require("mongoose");
const { error } = require("console");
mongoose.connect("mongodb://localhost:27017/coursesDB");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./client/build")));

const ratingsSchema = new mongoose.Schema({
    courseId: {
        type: Number,
        required: [true, "courseId required "]
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
});
// Create a model using the fruit Schema 
const Rating = mongoose.model("Rating", ratingsSchema);

const likesSchema = new mongoose.Schema({
    courseId: {
        type: Number,
        required: [true, "courseId required "]
    },
    likes: {
        type: Number,
    },
});
// Create a model using the fruit Schema 
const Like = mongoose.model("Like", likesSchema);

const courseLikesSchema = new mongoose.Schema({
    ratings: [likesSchema]
});

const CourseLike = mongoose.model("CourseLike", courseLikesSchema);

const courseSchema = new mongoose.Schema({
    ratings: [ratingsSchema]
});

const Course = mongoose.model("Course", courseSchema);

let course1 = new Like({
    courseId: 1,
    likes: 2
});
let course2 = new Like({
    courseId: 2,
    likes: 4
});
let course3 = new Like({
    courseId: 3,
    likes: 5
});
let course4 = new Like({
    courseId: 4,
    likes: 3
});
let course5 = new Like({
    courseId: 5,
    likes: 6
});
// course1.save();
// course2.save();
// course3.save();
// course4.save();
// course5.save();

let allcourses = new CourseLike({
    ratings: [course1, course2, course3, course4, course5]
})
// console.log(allcourses);
// allcourses.save();
// console.log(allcourses);

const userLikeSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: [true, "courseId required "]
    },
    ratings: [likesSchema]
});

const UserLike = mongoose.model("UserLike", userLikeSchema);

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: [true, "courseId required "]
    },
    ratings: [ratingsSchema]
});

const User = mongoose.model("User", userSchema);

let userrating = new Like({
    courseId:3,
    likes:1
});
let userrating2 = new Like({
    courseId:5,
    likes:1
});
// userrating.save();

let user = new UserLike({
    userId:102,
    ratings:[userrating,userrating2]
})
// console.log(user);
// user.save();

async function getCourses() {
    let course = await Course.find({});
    // console.log(course);
    return course;
}

async function getCoursesLikes() {
    let course = await CourseLike.find({});
    // console.log(JSON.stringify(course));
    return course;
}
// getCoursesLikes();

async function getUser(id) {
    let user = await User.findOne({ userId: id }).exec();
    return user;
}
// getUser();

async function getUserLikes(id) {
    let user = await User.findOne({ userId: id }).exec();
    return user;
}
// getUserLikes();

async function findCourseAndUpdate(id, newRating) {
    let data = await Course.findOne({ _id: "663e2d595df6c6f107b797b7" });
    let courses = data.ratings;
    // console.log(courses);
    courses.forEach((ele) => {
        if (ele.courseId === id) {
            console.log(ele);
            ele.rating = newRating;
        }
    })
    data.ratings = courses;
    data.save();
    // console.log(JSON.stringify(data));
    return true;
}
// findCourseAndUpdate(5,3);

async function findUserAndUpdate(id, courseId, newRating) {
    let data = await User.findOne({ userId: id });
    let userRatingsArr = data.ratings;
    let found = false;
    userRatingsArr.forEach((ele) => {
        if (ele.courseId === courseId) {
            // console.log(ele);
            found = true;
            ele.rating = newRating;
        }
    });
    if (found) {
        data.ratings = userRatingsArr;
    } else {
        let newUserRating = new Rating({
            courseId: courseId,
            rating: newRating
        });
        userRatingsArr.push(newUserRating);
        data.ratings = userRatingsArr;
    }
    data.save();
    // console.log(JSON.stringify(data));
    return true;
}
// findUserAndUpdate(101, 2, 4);



app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"),);
});

app.get("/getData", function (req, res) {
    res.send(JSON.stringify(courses));
});

app.get("/getCourseRatings", async function (req, res) {
    let courseRatings = await getCourses();
    // console.log(JSON.stringify(courseRatings));
    res.send(JSON.stringify(courseRatings));
});

app.post("/getRatings", async function (req, res) {
    let data = req.body;
    let user = await getUser(data.userId);
    res.send(JSON.stringify(user));
});

app.get("/getCourseLikes", async function (req, res) {
    let courseRatings = await getCoursesLikes();
    // console.log(JSON.stringify(courseRatings));
    res.send(JSON.stringify(courseRatings));
});

app.post("/getUserLikes", async function (req, res) {
    let data = req.body;
    let user = await getUserLikes(data.userId);
    res.send(JSON.stringify(user));
});



app.post("/updateRatings",async function(req,res){
    let output;
    let data = req.body;
    let userId= data.userId;
    let courseId= data.courseId;
    let newCourseRating= data.newCourseRating;
    let newUserRating= data.newUserRating;
    let resp = await findUserAndUpdate(userId,courseId,newUserRating) && await findCourseAndUpdate(courseId,newCourseRating);
    if(resp){
        // console.log("yes");
        let courses = await getCourses();
        let user = await getUser(userId);
        output = {
            userRatings:user.ratings,
            courseRatings:courses[0].ratings
        }; 
    }
    res.send(JSON.stringify(output));

})


app.listen("3000", function () {
    console.log("server running at port 3000");
})