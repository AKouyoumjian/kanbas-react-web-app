import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom";
import db from "../Database";
import "./dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cardImageDarkBlue from "../../Kanbas/Dashboard/Dash-Images/card-image-dkblue.png";
import cardImagePink from "../../Kanbas/Dashboard/Dash-Images/card-image-pink.png";
import cardImageGreen from "../../Kanbas/Dashboard/Dash-Images/card-image-green.png";
import cardImageLightBlue from "../../Kanbas/Dashboard/Dash-Images/card-image-lightblue.png";

function Dashboard() {
  const courses = db.courses;

  // map to store images of cards to corresponding colors
  const imageMap = {
    darkblue: cardImageDarkBlue,
    lightblue: cardImageLightBlue,
    pink: cardImagePink,
    green: cardImageGreen,
  };

  return (
    <div className="col dash-col">
      <h1 className="dash-header">
        Dashboard <hr style={{ marginTop: "4px" }} />
      </h1>

      <h3 className="dash-subheader">
        Published Courses ({courses.length}) <hr style={{ marginTop: "2px" }} />
      </h3>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-xxl-4" style={{ marginLeft: "20px", width: "100%"}}>
        {courses.map((course) => (
          <Link key={course._id} to={`/Kanbas/Courses/${course._id}`} className="list-group-item">
            <div class="col ak-dash-card">
              <div className="card">
                <img
                  src={imageMap[course.color]}
                  className="card-img-top"
                  alt="Course card image"
                />
                <div className="card-body">
                  <h6 className="card-title">
                    <a style={{ color: course.color }} href="#" className="ak-card-link">
                      {course._id} {course.number} {course.name}
                    </a>
                  </h6>
                  <a href="#" style={{ textDecoration: "none" }}>
                    <h6 className="card-text ak-subtext1">
                      {course._id}.{course.number}.{course["numberLong"]}
                      <p className="ak-subtext2">
                        {course["numberLong"]} Fall 2023 Semester Full Term
                      </p>
                    </h6>
                  </a>

                  <FontAwesomeIcon
                    icon={faFileLines}
                    className="fa-regular fa-md"
                    style={{ color: "grey", left: "5px", bottom: "5px", position: "relative" }}
                    prefix="far"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
