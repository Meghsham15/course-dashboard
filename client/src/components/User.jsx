
class UserAuth{
    constructor(){
        this.user = undefined;
        this.courseRatings=[];
        this.userRatings=[];
    }

    async addUser(user){
        this.user = user;
        // console.log(user.id);
        // await this.fetchRatings(user.id);
    }
    addUserRatings(data){
        // console.log("this.userRatings");
        // console.log(data);
        this.userRatings = data;
    }
    addCourseRatings(data){
        // console.log("courseRating");
        // console.log(data);
        this.courseRatings = data;
    }
    addCourseLikes(data){
        // console.log("courseRating");
        // console.log(data);
        this.courseLikes = data;
    }
    getUserId(){
        return this.user.id;
    }
    getUserRatings(){
        return this.userRatings;
    }
    getCourseRatings(){
        return this.courseRatings;
    }
    getCourseLikes(){
        return this.courseLikes;
    }
    // async getCourseRatings(){
    //     let res = await fetch("/getCourseRatings");
    //     let data = await res.json();
    //     this.courseRatings = data;
    //     return this.courseRatings;
    // }

    // async fetchRatings(id){
    //     let res = await fetch("/getRatings",{
    //         method: "post",
    //         headers: {
    //           "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //           userId:id
    //         })
    //       });
    //     let data = await res.json();
    //     console.log(data);
    //     this.courseRatings = data.courseRatings.ratings;
    //     this.userRatings = data.userRatings.ratings;
    // }

    getUser(){
        return this.user;
    }
}

let User = new UserAuth();

export default User;