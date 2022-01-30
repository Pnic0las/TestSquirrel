import React, { lazy } from "react";
import Search from '../assets/iconsHome/Buttons.png'

const NavbarHome = lazy(() => import("../Components/NavbarHome"));
const TabsHome = lazy(() => import("../Components/TabsHome"));
const Card = lazy(() => import("../Components/CardsHome"));

const HomeLayout = () => {
  return (
    <div className="navbar-color">
      <NavbarHome></NavbarHome>
      <div className="bg-white radius-home">
        <div className="padding-home">
            <div className="d-flex justify-content-between align-items-center">
                <div>
          <h2 className="fw-bold">Vidéos et podcasts</h2>
          <p className="deepblue_color">
            Consultez notre galerie de contenus média et suggérez-les à vos
            patients.
          </p>
          </div>
          <img src={Search} alt="..." style={{width: "56px", height: "56px", cursor: "pointer"}}/>
          </div>
          <TabsHome></TabsHome>
          <Card></Card>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
