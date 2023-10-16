import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams, useLocation } from "react-router-dom";

function CourseNavigation() {
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom Meetings",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
    "Ponopto Video",
    "Discussions",
    "Announcements",
    "Pages",
    "Files",
    "Rubrics",
    "Outcomes",
    "Collaborations",
    "Syllabus",
    "Progress Reports (EAB Navigate)",
    "Settings",
  ];
  const { courseId } = useParams();
  const { pathname } = useLocation();
  return (
    <div className="col-3 d-none d-md-block ak-second-col" style={{ width: "200px" }}>
      <span style={{ fontSize: "10px" }} className="ms-3">
        {courseId}_2 Fall 2023 Semest...
      </span>
      <ul className="ak-course-navigation list-group">
        {links.map((link, index) => (
          <Link
            key={index}
            to={`/Kanbas/Courses/${courseId}/${link}`}
            className={`list-group-item ${
              // replaces %20 with a space since pathname doesnt include spaces
              pathname.replace(/%20/g, " ").includes(link) && "active"
            }`}
          >
            {link}
            {index >= 9 && index <= 16 && (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="fa-flip-horizontal float-end fa-regular"
                style={{ color: "grey" }}
              />
            )}
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default CourseNavigation;
