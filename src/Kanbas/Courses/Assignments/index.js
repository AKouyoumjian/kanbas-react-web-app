import React from "react";
import { Link, useParams } from "react-router-dom";
import "./assignments.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findAssignmentsForCourse, deleteAssignment } from "./client";
import {
  setAssignments,
  deleteAssignment as deleteAssignmentAction,
  selectAssignment,
} from "./assignmentsReducer";
import {
  faCheck,
  faCircle,
  faEllipsisVertical,
  faPenToSquare,
  faPlus,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

function Assignments() {
  const { courseId } = useParams();
  const assignments = useSelector((state) => state.assignmentsReducer.assignments);
  const courseAssignments = assignments.filter((assignment) => assignment.course === courseId);
  const newAssignmentTemplate = {
    title: "New Assignment Title",
    course: courseId,
    description: "New Description",
    points: "100",
    dueDate: "2023-09-18",
    availableFromDate: "2023-09-11",
    availableUntilDate: "2023-09-18",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    findAssignmentsForCourse(courseId).then((assignments) => {
      dispatch(setAssignments(assignments));
    });
  }, [courseId]);

  const handleDeleteAssignment = (assignmentId) => {
    deleteAssignment(assignmentId).then((status) => {
      dispatch(deleteAssignmentAction(assignmentId));
    });
  };

  return (
    <div>
      <div style={{ paddingTop: "40px", width: "100%" }}>
        <input
          className="form-con trol w-25 float-start"
          type="text"
          placeholder="Search for Assignment"
        />
        <div style={{ float: "right", display: "inline" }}>
          <button
            className="btn ak-home-btn"
            style={{
              backgroundColor: "rgb(240, 237, 237)",
              marginRight: "4px",
              border: "1px solid rgb(217, 215, 215)",
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Group
          </button>

          <button
            className="btn ak-module-btn"
            style={{
              color: "white",
              backgroundColor: "#cf3036",
              marginRight: "4px",
              border: "1px solid rgb(217, 215, 215)",
            }}
          >
            <Link
              key={new Date().getTime().toString()}
              to={`/Kanbas/Courses/${courseId}/Assignments/new`}
              className="list-group-item"
              style={{ display: "block", width: "100%" }}
              onClick={() => dispatch(selectAssignment(newAssignmentTemplate))}
            >
              <FontAwesomeIcon icon={faPlus} /> Assignment
            </Link>
          </button>
          <button
            className="btn ak-home-btn"
            style={{
              backgroundColor: "rgb(240, 237, 237)",
              marginRight: "4px",
              border: "1px solid rgb(217, 215, 215)",
            }}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />{" "}
          </button>
        </div>

        <hr className="assignmentHR" />

        <div className="list-group">
          <div className="list-group-item list-group-item-secondary mt-3 pb-0">
            <FontAwesomeIcon icon={faEllipsisVertical} />
            <FontAwesomeIcon icon={faEllipsisVertical} className="me-3" />
            <FontAwesomeIcon icon={faSortDown} className="me-2 fa-xs" />
            <span style={{ fontWeight: "500" }}>ASSIGNMENTS</span>
            <span className="float-end">
              <button
                className="btn rounded-pill ak-btn mb-2"
                style={{
                  backgroundColor: "rgb(240, 237, 237)",
                  border: "1px solid rgb(217, 215, 215)",
                }}
              >
                40% of Total
              </button>
              <FontAwesomeIcon icon={faPlus} className="fa-sm ms-1 me-3" aria-hidden="true" />
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </span>
          </div>

          {
            // added this for if there are no assignments
            courseAssignments.length === 0 ? (
              <div className="list-group-item">
                <span className="text-muted">No Assignments</span>
              </div>
            ) : null
          }

          {courseAssignments.map((assignment) => (
            <Link
              key={assignment._id}
              to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
              className="list-group-item"
              style={{ borderLeft: "1px solid green" }}
              onClick={() => dispatch(selectAssignment(assignment))}
            >
              <FontAwesomeIcon icon={faEllipsisVertical} />
              <FontAwesomeIcon icon={faEllipsisVertical} className="me-3" />
              <FontAwesomeIcon icon={faPenToSquare} className="me-3 text-success" />

              <span className="ms-3">{assignment.title}</span>
              <div className="ak-ms-6">
                {assignment.description}
                <span className="float-end">
                  <button className="btn btn-success mb-3 me-5">Edit Assignment</button>

                  <button
                    className="btn btn-danger mb-3 me-5"
                    onClick={(e) => {
                      e.preventDefault();

                      const confirmDelete = window.confirm(
                        "Are you sure you want to delete this assignment?"
                      );
                      // window will pop up to confirm if you want to delete
                      if (confirmDelete) {
                        handleDeleteAssignment(assignment._id);
                      }
                    }}
                  >
                    Delete Assignment
                  </button>

                  <span className="fa-stack fa-xs mb-2 me-2">
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="fa-stack-2x"
                      style={{ color: "green" }}
                    />
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="fa-stack-1x"
                      style={{ color: "white" }}
                    />
                  </span>
                  <FontAwesomeIcon icon={faEllipsisVertical} className="me-3 fa-xl mb-1" />
                </span>
              </div>
              <div className="ak-ms-6">
                Available: {assignment.availableFromDate}
                <span style={{ fontWeight: "bold", marginLeft: "5px" }}> Due:</span>{" "}
                {assignment.dueDate} at 11:59pm
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Assignments;
