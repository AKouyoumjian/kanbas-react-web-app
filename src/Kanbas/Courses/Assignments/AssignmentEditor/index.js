import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../assignments.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircle, faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  addAssignment,
  updateAssignment as updateAssignmentAction,
  selectAssignment,
} from ".././assignmentsReducer";

import { createAssignment, updateAssignment } from "../client";

function AssignmentEditor() {
  const { assignmentId } = useParams();
  const assignments = useSelector((state) => state.assignmentsReducer.assignments);
  const assignment = useSelector((state) => state.assignmentsReducer.assignment);
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const newAssignmentTemplate = {
    title: "New Assignment Title",
    course: courseId,
    description: "New Description",
    points: "100",
    dueDate: "2023-09-18",
    availableFromDate: "2023-09-11",
    availableUntilDate: "2023-09-18",
  };

  const handleAddAssignment = (assignment) => {
    createAssignment(courseId, assignment).then((assignment) => {
      dispatch(addAssignment(assignment));
    });
  };

  const handleUpdateAssignment = async (assignment) => {
    const updatedAssignment = await updateAssignment(assignment);
    dispatch(updateAssignmentAction(updatedAssignment));
  };

  const handleSave = () => {
      if (assignmentId === "new") {
        const newAssignment = {
          ...assignment,
          _id: new Date().getTime().toString(),
        };
        handleAddAssignment(newAssignment);
      } else {
        handleUpdateAssignment(assignment);
      }
      navigate(`/Kanbas/Courses/${courseId}/Assignments`);

  };
  const aFrom = assignment.availableFromDate;
  const aUntil = assignment.availableUntilDate;

  return (
    <div style={{ paddingTop: "40px", width: "100%" }}>
      <span className="float-end">
        <span className="fa-stack fa-xs mb-2 me-2">
          <FontAwesomeIcon icon={faCircle} className="fa-stack-2x" style={{ color: "green" }} />
          <FontAwesomeIcon icon={faCheck} className="fa-stack-1x" style={{ color: "white" }} />
        </span>
        <span style={{ color: "green" }}>Published</span>
        <button
          className="btn ak-home-btn mx-2"
          style={{
            backgroundColor: "rgb(240, 237, 237)",
            marginRight: "4px",
            border: "1px solid rgb(217, 215, 215)",
          }}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} />{" "}
        </button>
      </span>
      <hr className="assignmentHR" />
      <span className="ak-bold">Assignment Name</span>
      <input
        value={assignment.title}
        className="form-control mb-3 mt-1"
        onChange={(e) => dispatch(selectAssignment({ ...assignment, title: e.target.value }))}
      />
      <span className="ak-bold">Assignment Description</span>
      <input
        value={assignment.description}
        className="form-control mb-2 mt-1"
        onChange={(e) => dispatch(selectAssignment({ ...assignment, description: e.target.value }))}
      />

      <div className="row mt-4">
        {/* Column for labels */}
        <div className="col-3 text-end">
          <span className="mb-5 ak-edit-col1">Points</span>
          {/* <span className="mb-5 ak-edit-col1">Assignment Group</span>
          <span className="mb-5 ak-edit-col1">Display Grade as</span> */}
          {/* <span className="mb-5 ak-edit-col1">Submission Type</span> */}
          <span className="ak-edit-col1 mt-4">Assign</span>
        </div>

        {/* Column on the right for the input */}
        <div className="col text-start me-3">
          <span className="mb-5 mb-xl-4 ak-edit-col2">
            <input
              className="form-control"
              type="number"
              value={assignment.points}
              onChange={(e) =>
                dispatch(selectAssignment({ ...assignment, points: e.target.value }))
              }
            />
          </span>

          {/* <span className="mb-5 ak-edit-col2">
            <select className="form-select">
              <option selected value="Assignments">
                ASSIGNMENTS
              </option>
            </select>
          </span>

          <span className="mb-5 mb-xl-4 ak-edit-col2">
            <select className="form-select">
              <option selected value="Percentage">
                Percentage
              </option>
            </select>
          </span> */}

          {/* <span className="mb-5 mb-xl-4 ak-edit-col2">
            <ul className="list-group ak-edit-lg">
              <select className="form-select w-50 m-3">
                <option selected value="Online">
                  Online
                </option>
              </select>

              <li className="list-group-item ak-edit-lgi">
                <b>Online Entry Options</b>
              </li>
              <div className="checkbox-label-container ms-3">
                <input type="checkbox" checked value="Text Entry" id="chkbox-text" />
                <label htmlFor="chkbox-text" className="p-2">
                  Text Entry
                </label>
              </div>

              <div className="checkbox-label-container ms-3">
                <input type="checkbox" checked value="Website URL" id="chkbox-website" />
                <label htmlFor="chkbox-website" className="p-2">
                  Website URL
                </label>
              </div>

              <div className="checkbox-label-container ms-3">
                <input type="checkbox" checked value="Media Recordings" id="chkbox-media" />
                <label htmlFor="chkbox-media" className="p-2">
                  Media Recordings
                </label>
              </div>

              <div className="checkbox-label-container ms-3">
                <input type="checkbox" value="Student Annotation" id="chkbox-annotations" />
                <label htmlFor="chkbox-annotations" className="p-2">
                  Student Annotation
                </label>
              </div>

              <div className="checkbox-label-container ms-3">
                <input type="checkbox" value="File Uploads" id="chkbox-file" />
                <label htmlFor="chkbox-file" className="p-2">
                  File Uploads
                </label>
              </div>

              <div className="checkbox-label-container ms-5">
                <input type="checkbox" value="File Uploads" id="chkbox-file" />
                <label htmlFor="chkbox-file" className="p-2">
                  Restrict Upload File Types
                </label>
              </div>
            </ul>
          </span> */}

          <ul className="list-group ak-edit-lg mt-5 mt-xl-4">
            <li className="list-group-item ak-edit-lgi">
              <div className="form-group ms-1">
                <div className="form-group">
                  <label htmlFor="autocomplete-input">
                    <b>Assign To</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="autocomplete-input"
                    placeholder="Everyone"
                  />
                </div>
              </div>
            </li>

            <label htmlFor="due-date" className="ms-4 mt-2">
              <b>Due</b>
            </label>
            <input
              onChange={(e) =>
                dispatch(selectAssignment({ ...assignment, dueDate: e.target.value }))
              }
              className="ms-4"
              type="date"
              id="due-date"
              value={assignment.availableUntilDate}
            />

            <div className="container m-0 mb-4">
              <div className="row">
                <div className="col">
                  <label htmlFor="avail-date" className="mt-3 me-2">
                    <b>Available from</b>
                  </label>

                  <input
                    onChange={(e) =>
                      dispatch(
                        selectAssignment({ ...assignment, availableFromDate: e.target.value })
                      )
                    }
                    type="date"
                    id="avail-date"
                    value={aFrom}
                  />
                </div>

                <div className="col">
                  <label htmlFor="until-date" className="mt-3 me-2">
                    <b>Until</b>
                  </label>
                  <input
                    onChange={(e) =>
                      dispatch(
                        selectAssignment({ ...assignment, availableUntilDate: e.target.value })
                      )
                    }
                    type="date"
                    id="until-date"
                    value={aUntil}
                  />
                </div>
              </div>
            </div>

            <li
              className="list-group-item ak-edit-lgi text-center"
              style={{ backgroundColor: "rgb(204, 204, 204)" }}
            >
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              <i className="fa fa-plus fa-sm" aria-hidden="true" style={{ fontWeight: 200 }}></i>
              Add
            </li>
          </ul>
        </div>
      </div>

      <hr className="mt-4" />
      <div className="float-end me-3">
        <Link to={`/Kanbas/Courses/${courseId}/Assignments`} className="btn btn-danger me-2">
          Cancel
        </Link>
        <button onClick={handleSave} className="btn btn-success me-2">
          Save
        </button>
      </div>
      <hr className="assignmentHR" />
    </div>
  );
}

export default AssignmentEditor;
