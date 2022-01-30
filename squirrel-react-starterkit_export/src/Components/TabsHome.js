import React from 'react';
import PropTypes from 'prop-types';

const TabsHome = (props) => {
  return <div>
     <ul className="nav nav-tabs mb-3" id="ex1" role="tablist">
  <li className="" role="presentation">
    <a
      className="nav-link active"
      id="ex1-tab-1"
      data-mdb-toggle="tab"
      href="#ex1-tabs-1"
      role="tab"
      aria-controls="ex1-tabs-1"
      aria-selected="true"
      >LES CONTENUS</a
    >
  </li>
  <li className="" role="presentation">
    <a
      className="nav-link"
      id="ex1-tab-2"
      data-mdb-toggle="tab"
      href="#ex1-tabs-2"
      role="tab"
      aria-controls="ex1-tabs-2"
      aria-selected="false"
      >MES FAVORIS</a
    >
  </li>
  <li className="" role="presentation">
    <a
      className="nav-link"
      id="ex1-tab-3"
      data-mdb-toggle="tab"
      href="#ex1-tabs-3"
      role="tab"
      aria-controls="ex1-tabs-3"
      aria-selected="false"
      >MES DERNIERES ECOUTES</a
    >
  </li>
</ul>
  </div>;
};

TabsHome.propTypes = {};

export default TabsHome;
