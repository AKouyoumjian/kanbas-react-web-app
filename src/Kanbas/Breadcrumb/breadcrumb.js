import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGlasses } from "@fortawesome/free-solid-svg-icons";
import * as service from "../service";

function Breadcrumb() {
  const { pathname } = useLocation();
  const { courseId } = useParams();
  const path = pathname.split("/");
  const pathEnding = path.pop().replace(/%20/g, " ");
  const pathSecondLast = path.pop().replace(/%20/g, " ");

  const [course, setCourse] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCourse = await service.fetchCourseById(courseId);
        setCourse(fetchedCourse);
      } catch (error) {
        // Handle errors if any during fetch
        console.error("Error fetching course:", error);
        // Setting a default course in case of error
        setCourse({
          _id: courseId,
          abbreviation: "CS4550",
          name: "Web Development",
          number: "12631",
          startDate: "2023-09-01",
          endDate: "2023-12-15",
          color: "darkblue",
          numberLong: "111222",
        });
      }
    };

    fetchData();
  }, [courseId]);

  // Display a loading indicator while fetching course
  if (!course) {
    return 
        <div className="alert alert-danger mt-3" role="alert">
          Loading data from the NodeJS Server. Please allow up to 1 minute. Sorry for the
          inconvenience.
        </div>;
  }
  return (
    <div className="col">
      <div className="col" style={{ padding: "20px", height: "75px" }}>
        <nav style={{ "--bs-breadcrumb-divider": ">" }} aria-label="breadcrumb">
          {
            /* The examples of canvas only have "Student view button" on modules and home pages,
          so this checks the path's ending and displays button if it matches home or modules */
            (pathEnding === "Home" || pathEnding === "Modules") && (
              <span className="float-right" style={{ display: "inline", float: "right" }}>
                <button
                  className="btn me-4"
                  style={{
                    backgroundColor: "rgb(240, 237, 237)",
                    marginRight: "4px",
                    border: "1px solid rgb(217, 215, 215)",
                  }}
                >
                  <FontAwesomeIcon icon={faGlasses} /> Student View
                </button>
              </span>
            )
          }

          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <FontAwesomeIcon icon={faBars} className="me-4" style={{ color: "#ac1a1f" }} />
              <Link
                key={course._id}
                to={`/Kanbas/Courses/${course._id}`}
                style={{ textDecoration: "none", color: "#ac1a1f" }}
              >
                {course._id}.{course.number}.{course.numberLong}
              </Link>
            </li>
            {pathSecondLast === "Assignments" && (
              <li className="breadcrumb-item">
                <Link
                  key="Assignment"
                  to={`/Kanbas/Courses/${course._id}/Assignments`}
                  style={{ textDecoration: "none", color: "#ac1a1f" }}
                >
                  &gt; &nbsp; {pathSecondLast}{" "}
                </Link>
              </li>
            )}
            <li className="breadcrumb-item active" aria-current="page">
              &gt; &nbsp;
              {pathSecondLast === "Assignments" && <span>Edit Assignment: </span>}
              {pathEnding}
            </li>
          </ol>
        </nav>
        <hr className="mb-4 mt-4" />
      </div>
    </div>
  );
}

export default Breadcrumb;
