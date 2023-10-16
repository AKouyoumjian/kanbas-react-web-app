import ModuleList from "./ModuleList";
import "./modules.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faCircle, faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";

function Modules() {
  return (
    <div style={{ paddingTop: "40px", width: "100%" }}>
      <div style={{ float: "right", display: "inline" }}>
        <button
          className="btn ak-home-btn"
          style={{
            backgroundColor: "rgb(240, 237, 237)",
            marginRight: "4px",
            border: "1px solid rgb(217, 215, 215)",
          }}
        >
          Collapse All
        </button>
        <button
          className="btn ak-home-btn"
          style={{
            backgroundColor: "rgb(240, 237, 237)",
            marginRight: "4px",
            border: "1px solid rgb(217, 215, 215)",
          }}
        >
          View Progress
        </button>
        <div className="dropdown ak-home-dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{
              backgroundColor: "rgb(240, 237, 237)",
              border: "none",
              color: "black",
              marginRight: "4px",
            }}
          >
            <span className="fa-stack">
              <FontAwesomeIcon icon={faCircle} className="fa-stack-2x" style={{ color: "green" }} />
              <FontAwesomeIcon icon={faCheck} className="fa-stack-1x" style={{ color: "white" }} />
            </span>
            Publish All
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                <span className="fa-stack text-center icon-span"></span>
                Publish All
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Publish All modules and items
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Publish modules only
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                UnPublish All
              </a>
            </li>
          </ul>
        </div>
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

      <hr className="modulesHR" />

      <ModuleList />
    </div>
  );
}

export default Modules;
