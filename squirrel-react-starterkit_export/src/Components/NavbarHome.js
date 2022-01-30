import React, { useState } from "react";
import Logo from "../assets/_Branding.png";
import Dashboard from "../assets/iconsHome/Activity.png";
import Galerie from "../assets/iconsHome/Galerie.png";
import Moncompte from "../assets/iconsHome/Moncompte.png";
import MesPatients from "../assets/iconsHome/Patients.png";
import ProfilePicture from "../assets/iconsHome/CircleProfile.png";
import ArrowIcon from "../assets/iconsHome/_Arrow.png";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { textState } from "../Atom/Atom";

const NavbarHome = () => {
  const [collapse, setCollapsed] = useState(true);
  const [selected, setselected] = useState();
  


  const email = useRecoilValue(textState);

  const array = [
    {
      name: "Tableau de bord",
      image_src: Dashboard,
    },
    {
      name: "Mes Patients",
      image_src: MesPatients,
    },
    {
      name: "Galerie de contenus",
      image_src: Galerie,
    },
    {
      name: "Mon Compte",
      image_src: Moncompte,
    },
  ];
  const handleCollapse = () => setCollapsed(!collapse);

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark  bg-dark navbar-color w-100">
        <div className="w-100">
          <div className="container-fluid d-flex justify-content-between ">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded={!collapse ? true : false}
              aria-label="Toggle navigation"
              onClick={handleCollapse}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div />
            <img alt="logo" className="" src={Logo}></img>
            <div className="d-flex align-items-center left-border-color border-1">
              <img
                className="img-profile me-2 ms-4"
                src={ProfilePicture}
                alt="Profile"
              ></img>
              <span className="me-2 ms-2 ps-2 pe-4 white-color d-none d-sm-block">{email}</span>
              <img
                className="arrow-profile"
                src={ArrowIcon}
                alt="Profile"
              ></img>
            </div>
          </div>
          <div
            className={`${collapse ? "collapse" : ""} navbar-collapse`}
            id="navbarCollapse"
          >
            <ul className="navbar-nav me-auto ms-auto mb-2 mb-md-0">
              {array.map((element) => (
                <li className={`nav-item ${selected === element.name ? "selected" : ""}`} onClick={() => setselected(element.name)} key={element.name}>
                  <img
                    src={element.image_src}
                    alt={element.name}
                    className="pe-2"
                  ></img>
                  {element.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavbarHome;
