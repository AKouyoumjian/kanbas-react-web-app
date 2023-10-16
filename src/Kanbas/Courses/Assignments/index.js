import React from "react";
import { Link, useParams } from "react-router-dom";
import db from "../../Database";
import "./assignments.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const assignments = db.assignments;
  const courseAssignments = assignments.filter((assignment) => assignment.course === courseId);
  return (
    <div>
      <div style={{ paddingTop: "40px", width: "100%" }}>
        <input
          className="form-control w-25 float-start"
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
            <FontAwesomeIcon icon={faPlus} /> Module
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

          {courseAssignments.map((assignment) => (
            <Link
              key={assignment._id}
              to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
              className="list-group-item"
              style={{ borderLeft: "1px solid green" }}
            >
              <FontAwesomeIcon icon={faEllipsisVertical} />
              <FontAwesomeIcon icon={faEllipsisVertical} className="me-3" />
              <FontAwesomeIcon icon={faPenToSquare} className="me-3 text-success" />

              <span className="ms-3">{assignment.title}</span>
              <div className="ak-ms-6">
                {assignment.description}
                <span className="float-end">
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
                <span style={{ fontWeight: "bold" }}>Due</span> {assignment.duePts}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Assignments;
