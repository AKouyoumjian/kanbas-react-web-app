import db from "../../Database";
import { useParams } from "react-router-dom";
import "./grades.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport, faGear, faSortDown, faTv, faCheck } from "@fortawesome/free-solid-svg-icons";

function Grades() {
  const { courseId } = useParams();
  const assignments = db.assignments.filter((assignment) => assignment.course === courseId);
  const enrollments = db.enrollments.filter((enrollment) => enrollment.course === courseId);
  return (
    <div style={{ paddingTop: "40px", width: "100%" }}>
      <div className="container mt-3 mb-2 p-0">
        <div className="row text-start">
          <div className="col">
            <button
              className="btn ak-grd-btn rounded my-2 px-1">
              <span className="ak-grades-span">
                Gradebook <FontAwesomeIcon icon={faSortDown} className="ms-2 fa-xs" />{" "}
              </span>
            </button>

            <FontAwesomeIcon
              icon={faTv}
              className="fa-xs float-end me-3 mt-4"
              style={{ color: "#ac1a1f" }}
            />
          </div>

          <div className="col">
            <div className="float-end">
              <button
                className="btn ak-grd-btn rounded me-2"
                style={{
                  backgroundColor: "rgb(235, 235, 235)",
                  border: "1px solid rgb(217, 215, 215)",
                  height: "40px",
                }}
              >
                <FontAwesomeIcon icon={faFileImport} /> Import
              </button>
              <select
                className="btn ak-grd-btn rounded me-2"
                style={{
                  backgroundColor: "rgb(235, 235, 235)",
                  border: "1px solid rgb(217, 215, 215)",
                  height: "40px",
                }}
              >
                <option selected value="Export">
                  &#9993; Export
                </option>
                <option value="Alt Option 1">Other 1 </option>
                <option value="Alt Option 2">Other 2 Fiction</option>
              </select>
              <button
                className="btn ak-grd-btn rounded"
                style={{
                  backgroundColor: "rgb(235, 235, 235)",
                  border: "1px solid rgb(217, 215, 215)",
                  height: "40px",
                }}
              >
                <FontAwesomeIcon icon={faGear} />
              </button>
            </div>
          </div>

          <div className="row text-start">
            {/* Column for Student Names*/}
            <div className="col">
              <h5>Student Names</h5>
              <input className="form-control" placeholder="&#x1F50D; Search Students" />
            </div>
            {/* Column for Assignment Names*/}
            <div className="col">
              <h5>Assignment Names</h5>
              <input className="form-control" placeholder=" &#x1F50D; Search Assignments" />
            </div>
          </div>
        </div>
        <button
          className="btn ak-grd-btn rounded my-2"
          style={{
            backgroundColor: "rgb(235, 235, 235)",
            border: "1px solid rgb(217, 215, 215)",
            height: "40px",
          }}
        >
          <FontAwesomeIcon icon={faCheck} />{" "}
          <span style={{ fontWeight: "300" }}>Apply Filters</span>
        </button>
      </div>

      <div className="table-responsive mt-2">
        <table className="table table-striped table-bordered" width="100%">
          <tbody>
            <tr>
              <td>Student Name</td>
              {assignments.map((assignment) => (
                <td>{assignment._id + " - " + assignment.title}</td>
              ))}
            </tr>
            {enrollments.map((enrollment) => {
              const user = db.users.find((user) => user._id === enrollment.user);
              return (
                <tr>
                  <td style={{ color: "#ac1a1f" }}>
                    {user.firstName} {user.lastName}
                  </td>
                  {assignments.map((assignment) => {
                    const grade = db.grades.find(
                      (grade) =>
                        grade.student === enrollment.user && grade.assignment === assignment._id
                    );
                    return <td>{grade?.grade || ""}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Grades;
