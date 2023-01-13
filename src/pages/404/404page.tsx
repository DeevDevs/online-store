import React, { useEffect } from 'react';
import './404page.scss';
import troll from './../../static/troll.png';
import map from './../../static/map.png';

function WrongDirectoryPage() {
  useEffect((): void => {
    document.title = 'Tabletop Geek: Page not found';
  }, []);

  return (
    <div className="wd-page">
      <img className="wd-page__map" src={map} alt="map image" />
      <div className="wd-text">
        <p className="wd-text__fof">404</p>
        <p className="wd-text__msg">
          This path is too dangerous. Please, find another way to the treasures.
        </p>
      </div>
      <img className="wd-page__troll" src={troll} alt="troll image" />
    </div>
  );
}

export default WrongDirectoryPage;
