import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/navigation.css";
import Logo from "../assets/White logo.png";
import { FaBars, FaTimes } from 'react-icons/fa';

export function Navigation() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setActiveLink(location.pathname);
    setMenuOpen(false);
  }, [location]);

  return (
    <div id="navigation">
      <div className="logo-container">
        <Link to={"/dentistry-clinic-admin/home"}>
          <img src={Logo} alt="Dentistry Clinic Admin system Logo"></img>
        </Link>
      </div>
      <div className={`link-container ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link
              className={
                activeLink === "/dentistry-clinic-admin/home" ? "active-link" : "link"
              }
              to={"/dentistry-clinic-admin/home"}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={
                activeLink === "/dentistry-clinic-admin/doctors" ? "active-link" : "link"
              }
              to={"/dentistry-clinic-admin/doctors"}
            >
              Doctors
            </Link>
          </li>
          <li>
            <Link
              className={
                activeLink === "/dentistry-clinic-admin/patients" ? "active-link" : "link"
              }
              to={"/dentistry-clinic-admin/patients"}
            >
              Patients
            </Link>
          </li>
          <li>
            <Link
              className={
                activeLink === "/dentistry-clinic-admin/procedures" ? "active-link" : "link"
              }
              to={"/dentistry-clinic-admin/procedures"}
            >
              Procedures
            </Link>
          </li>
        </ul>
      </div>
      <div className="burger-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </div>
  );
}
