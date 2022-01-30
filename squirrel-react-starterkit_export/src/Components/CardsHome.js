import React from "react";
import data from "../data";
import PropTypes from "prop-types";
import Thumbnail from "../assets/cardPicture/thumbnail.png";
import Play from "../assets/cardPicture/play.png"

const CardsHome = (props) => {
  return (
    <div>
      {data[0].playlist.map((element) => (
        <div className="mt-5" key={element.playlist_title}>
          <h5 className="fw-bold">{element.playlist_title}</h5>
          <div className="d-flex flex-wrap">
            {element.videos.map((link) => (
              <div className="card m-2" style={{ width: "240px" }} key={link.video_title}>
                  <div className="position-relative">
                <img src={Thumbnail} className="card-img-top p-4" alt="..." />
                <img src={Play} className="position-absolute postion-play"  alt="..." />
                </div>
                <div className="card-body">
                  <h6 className="card-title fw-bold">{link.video_title}</h6>
                  <p className="card-text">
                     Crée par: <a href="#">{link.autor}</a>
                  </p>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsHome;
