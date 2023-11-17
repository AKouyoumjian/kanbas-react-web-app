import KanbasNavigation from "./KanbasNavigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import db from "./Database";
import { useState } from "react";
import store from "./store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import * as service from "./service";

function Kanbas() {
  const [courses, setCourses] = useState([]);  
  const [course, setCourse] = useState({
    name: "New Course",
    number: "New Number",
    numberLong: "New Number Long",
    abbreviation: "New Abbreviation",
    color: "darkblue",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
  });

  const URL = "http://localhost:4000/api/courses";

   const init = async () => {
     const courses = await service.fetchCourses();
     setCourses(courses);
   };

   useEffect(() => {
     init();
   }, []);

   const addNewCourse = async () => {
     try {
       console.log("kanbas/index.js addNewCourse: " + course.name);
       const newCourse = await service.addNewCourse(course);
       setCourses([newCourse, ...courses]);
       //  setCourse({ name: "" });
     } catch (error) {
       console.log(error);
     }
   };
   const deleteCourse = async (course) => {
     try {
       await service.deleteCourse(course);
       setCourses(courses.filter((c) => c._id !== course._id));
     } catch (error) {
       console.log(error);
     }
   };
   const updateCourse = async (course) => {
     try {
       const updatedCourse = await service.updateCourse(course);

       // produced undefined
       console.log("updatedCourse name: " + updatedCourse.name);

       setCourses(
         courses.map((c) => {
           if (c._id === updatedCourse._id) {
             return updatedCourse;
           }
           return c;
         })
       );
      //  setCourse({ name: "" });
     } catch (error) {
       console.log(error);
     }
   };

  return (
    <Provider store={store}>
      <div className="d-flex">
        <KanbasNavigation />
        <div style={{ width: "100%" }}>
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="Account" element={<h1>Account</h1>} />
            <Route
              path="Dashboard"
              element={
                <Dashboard
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourse}
                  updateCourse={updateCourse}
                />
              }
            />

            <Route path="Courses/:courseId/*" element={<Courses courses={courses} />} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}
export default Kanbas;
