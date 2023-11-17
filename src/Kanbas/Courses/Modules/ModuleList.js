import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./modules.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faCircle,
  faCheck,
  faSortDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { addModule, deleteModule, updateModule, setModule, setModules } from "./modulesReducer";
import { findModulesForCourse, createModule } from "./client";
import * as client from "./client";

function ModuleList() {
  const { courseId } = useParams();
  useEffect(() => {
    findModulesForCourse(courseId).then((modules) => dispatch(setModules(modules)));
  }, [courseId]);

  const modules = useSelector((state) => state.modulesReducer.modules);
  const module = useSelector((state) => state.modulesReducer.module);
  const dispatch = useDispatch();

  const handleAddModule = () => {
    createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };

  const handleDeleteModule = (moduleId) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };

  const handleUpdateModule = async () => {
    const newModule = await client.updateModule(module);
    dispatch(updateModule(newModule));
  };

  return (
    <ul className="list-group mt-5 me-1" style={{ display: "block" }}>
      <li className="list-group-item border-info border-2 rounded">
        <input
          className="form-control"
          value={module.name}
          onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))}
        />
        <textarea
          className="form-control"
          value={module.description}
          onChange={(e) => dispatch(setModule({ ...module, description: e.target.value }))}
        />
        <div class="text-center mt-2">
          <button onClick={handleAddModule} className="btn btn-success text-center me-2">
            {" "}
            Add Module
          </button>
          <button onClick={handleUpdateModule} className="btn btn-info text-center">
            Update Module
          </button>
        </div>
      </li>

      {modules
        .filter((module) => module.course === courseId)
        .map((module, index) => [
          <li
            key={`module-${index}`}
            className="list-group-item list-group-item-secondary ak-module-title"
          >
            <h3>
              <FontAwesomeIcon icon={faEllipsisVertical} className="fa-xs" />
              <FontAwesomeIcon icon={faEllipsisVertical} className="fa-xs" />
              <FontAwesomeIcon icon={faSortDown} className="fa-2xs ms-2 me-2 ak-weight-sm" />
              {module.name}
              <button
                className="btn btn-sucess ms-3 me-2"
                style={{ color: "white", backgroundColor: "green" }}
                onClick={() => dispatch(setModule(module))}
              >
                Edit
              </button>
              <button
                className="btn btn-danger me-5"
                onClick={() => handleDeleteModule(module._id)}
              >
                Delete
              </button>
              <span className="float-end fa-2xs" style={{ display: "inline" }}>
                <span className="fa-stack fa-2xs mb-2">
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

                <FontAwesomeIcon icon={faSortDown} className="fa-2xs ms-1 me-4 mb-2 ak-weight-sm" />
                <FontAwesomeIcon icon={faPlus} className="fa-2xs me-4 ak-weight-sm" />
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className="fa-xs me-4 pt-3 ak-weight-sm"
                />
              </span>
            </h3>
          </li>,
          <li
            key={`nested-${index}`}
            className="list-group-item module-description"
            style={{ borderLeft: "1px solid green" }}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} className="fa-sm" />
            <FontAwesomeIcon icon={faEllipsisVertical} className="fa-sm me-5" />
            {module.description}
            <span className="float-end">
              <span className="fa-stack fa-2xs me-3">
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
              <span className="fa-stack" style={{ marginLeft: "-1rem" }}>
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className="fa-stack-1x"
                  style={{ color: "grey" }}
                />
              </span>
            </span>
          </li>,
        ])}
    </ul>
  );
}

export default ModuleList;
