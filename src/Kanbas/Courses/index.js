import { Navigate, Route, Routes, useParams } from "react-router-dom";
import CourseNavigation from "./CourseNavigation";
import "./courseNav.css";
import Modules from "./Modules";
import Breadcrumb from "../Breadcrumb/breadcrumb";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import Grades from "./Grades";




function Courses({ courses }) {
  const URL = "http://localhost:4000/api/courses";

  
  const { courseId } = useParams();

  const course = courses.find((course) => course._id === courseId);


  return (
    <div className="col">
      <Breadcrumb />

      <CourseNavigation />
      <div>
        <div className="overflow-y-scroll position-fixed bottom-0 end-0 ak-modules-div">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:assignmentId" element={<AssignmentEditor />} />
            <Route path="Grades" element={<Grades />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default Courses;
