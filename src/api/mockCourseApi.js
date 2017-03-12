import delay from './delay';
import firebase from '../base'


// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
let courses = [
   {
     id: "react-flux-building-applications",
     title: "Building Applications in React and Flux",
     watchHref: "http://www.pluralsight.com/courses/react-flux-building-applications",
     authorId: "cory-house",
     length: "5:08",
     category: "JavaScript"
   },
   {
     id: "clean-code",
     title: "Clean Code: Writing Code for Humans",
     watchHref: "http://www.pluralsight.com/courses/writing-clean-code-humans",
     authorId: "cory-house",
     length: "3:10",
     category: "Software Practices"
   },
   {
     id: "architecture",
     title: "Architecting Applications for the Real World",
     watchHref: "http://www.pluralsight.com/courses/architecting-applications-dotnet",
     authorId: "cory-house",
     length: "2:52",
     category: "Software Architecture"
   },
   {
     id: "career-reboot-for-developer-mind",
     title: "Becoming an Outlier: Reprogramming the Developer Mind",
     watchHref: "http://www.pluralsight.com/courses/career-reboot-for-developer-mind",
     authorId: "cory-house",
     length: "2:30",
     category: "Career"
   },
   {
     id: "web-components-shadow-dom",
     title: "Web Component Fundamentals",
     watchHref: "http://www.pluralsight.com/courses/web-components-shadow-dom",
     authorId: "cory-house",
     length: "5:10",
     category: "HTML5"
   }
 ];
//console.log('about to set DB')
//console.log(firebase.database().ref('authors'))
//console.log(firebase.database().ref().child('courses'))
//firebase.database().ref('courses').set(courses)
// const coursesRef = firebase.database().ref('courses')
// coursesRef.once('value', snap => {
//   console.log(snap.val())
//   courses = snap.val()
// })
let storeIfNotThere = firebase.database().ref('courses')
storeIfNotThere.on('value', snap =>{
  //console.log('snap.val()', snap.val() )
  if(!snap.val()){
   // console.log('if fired and courses = ', courses)
    storeIfNotThere.set(courses)
  }
  else{
    //console.log('there is already data stored in /courses')
    courses = snap.val()
  }
})
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (course) => {
  return replaceAll(course.title, ' ', '-');
};

class CourseApi {

  static getAllCourses() {
    return new Promise((resolve, reject) => {
//      setTimeout(() => {
//        resolve(Object.assign([], courses));
//      }, delay);
        let coursesRef = firebase.database().ref('courses')
        coursesRef.once('value', snap => {
         // console.log('new snapshot',snap.val())
          resolve(snap.val())
        })
    });
  }

  static saveCourse(course) {
  //  console.log('save course called, passed in: ', course)
   // course = Object.assign({}, course); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
//      setTimeout(() => {
        // Simulate server-side validation
        const minCourseTitleLength = 1;
        if (course.title.length < minCourseTitleLength) {
          reject(`Title must be at least ${minCourseTitleLength} characters.`);
        }

        if (course.id) {
          const existingCourseIndex = courses.findIndex(a => a.id == course.id);
          courses.splice(existingCourseIndex, 1, course);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          course.id = generateId(course);
          course.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
          
          let coursesRef = firebase.database().ref('courses')
        //  console.log('about to save this:', course)
          courses.push(course)
          coursesRef.set(courses)
        }

        resolve(course);
 //     }, delay);
    });
  }

  static deleteCourse(courseId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfCourseToDelete = courses.findIndex(course => {
          course.id == courseId;
        });
        courses.splice(indexOfCourseToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default CourseApi;
