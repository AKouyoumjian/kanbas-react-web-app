import React from "react";
import { useParams } from "react-router-dom";
import db from "../../Database";
import "./modules.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faCircle,
  faCheck,
  faSortDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function ModuleList() {
  const { courseId } = useParams();
  const modules = db.modules;

  return (
    <ul className="list-group" style={{ display: "block" }}>
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
              <span className="float-end fa-2xs">
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

                <FontAwesomeIcon
                  icon={faSortDown}
                  className="fa-2xs ms-1 me-4 mb-2 ak-weight-sm"
                />
                <FontAwesomeIcon icon={faPlus} className="fa-2xs me-4 ak-weight-sm" />
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className="fa-xs me-4 pt-3 ak-weight-sm"
                />
              </span>
            </h3>
          </li>,
          <li key={`nested-${index}`} className="list-group-item module-description"
          style={{ borderLeft: "1px solid green"}}>
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
