import { Link, useLocation } from "react-router-dom";
import db from "../Database";
import "./navbar.css";
import {
  faUser,
  faCircle,
  faGaugeHigh,
  faBook,
  faCalendarDays,
  faInbox,
  faClock,
  faTv,
  faC,
  faArrowRight,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function KanbasNavigation() {
  const course = db.courses[0];
  const links = [
    {
      text: "Account",
      id: "acc-icon",
      to: "/Kanbas/Account",
      icon: faCircle,
      iconClass: "fa-stack-2x fa-regular fa-inverse",
      iconStyle: { color: "black", borderColor: "white" },
      stack: true,
      stackIcon: faUser,
      stackClass: "fa-stack-1x nav-icon",
      stackStyle: { color: "grey" },
    },
    {
      text: "Dashboard",
      id: "dash-icon",
      to: "/Kanbas/Dashboard",
      icon: faGaugeHigh,
      iconClass: "fa-xl nav-icon",
      iconStyle: { color: "#ac1a1f" },
      stack: false,
    },
    {
      text: "Courses",
      id: "courses-icon",
      to: `/Kanbas/Courses/${course._id}`,
      icon: faBook,
      iconClass: "fa-solid fa-xl nav-icon",
      iconStyle: { color: "#ac1a1f" },
      stack: false,
    },
    {
      text: "Calendar",
      id: "calendar-icon",
      to: "/Kanbas/Calendar",
      icon: faCalendarDays,
      iconClass: "fa-solid fa-xl nav-icon",
      iconStyle: { color: "#ac1a1f" },
      stack: false,
    },
    {
      text: "Inbox",
      id: "inbox-icon",
      to: "/Kanbas/Inbox",
      icon: faInbox,
      iconClass: "fa-solid fa-xl nav-icon",
      iconStyle: { color: "#ac1a1f" },
      stack: false,
    },
    {
      text: "History",
      id: "history-icon",
      to: "/Kanbas/History",
      icon: faClock,
      iconClass: "fa-regular fa-xl nav-icon",
      iconStyle: { color: "#ac1a1f" },
      stack: false,
    },
    {
      text: "Studio",
      id: "studio-icon",
      to: "/Kanbas/Studio",
      icon: faTv,
      iconClass: "fa-solid fa-xl nav-icon",
      iconStyle: { color: "#ac1a1f" },
      stack: false,
    },
    {
      text: "Commons",
      id: "commons-icon",
      to: "/Kanbas/Commons",
      icon: faC,
      iconClass: "fa-stack-2x fa-solid nav-icon",
      iconStyle: { color: "#ac1a1f" },
      stack: true,
      stackIcon: faArrowRight,
      stackClass: "fa-stack-1x fa-solid nav-icon",
      stackStyle: { color: "#ac1a1f" },
    },
    {
      text: "Help",
      id: "help-icon",
      to: "/Kanbas/Help",
      icon: faCircleQuestion,
      iconClass: "fa-regular fa-xl nav-icon",
      iconStyle: { color: "#ac1a1f" },
      stack: false,
    },
  ];

  const { pathname } = useLocation();

  return (
    <div className="col-1 d-none d-lg-block navbar ak-navbar bg-black" style={{ width: "85px" }}>
      <ul className="nav flex-column">
        <li className="mb-2">
          {/* <img src="src/Kanbas/KanbasNavigation/NU-Logo.png" alt="NU logo" /> */}
          <Link to="/Kanbas/Dashboard">
            <img
              src="https://i.pinimg.com/originals/08/bd/47/08bd47b365a7ad4ed868352014ecbd48.png"
              alt="NU logo image"
              height="90%"
              width="90%"
              style={{ marginLeft: "5%", marginTop: "5%" }}
            />
          </Link>
        </li>

        {links.map((link, index) => (
          <li
            key={index}
            className={`nav-item ${pathname.includes(link.text) && "bg-white"} 
            ${link.className || ""}`}
          >
            <Link
              to={link.to}
              className={`nav-link ${pathname.includes(link.text) && "current"}`}
              id={link.id}
            >
              <span className="fa-stack text-center icon-span">
                <FontAwesomeIcon
                  icon={link.icon}
                  className={link.iconClass}
                  style={link.iconStyle}
                />

                {link.stack && (
                  <FontAwesomeIcon
                    icon={link.stackIcon}
                    className={link.stackClass}
                    style={link.stackStyle}
                  />
                )}
              </span>

              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KanbasNavigation;
