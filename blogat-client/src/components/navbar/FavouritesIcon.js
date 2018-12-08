import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const FavouritesIcon = ({showFavourites, favorite}) => (
  <OverlayTrigger placement="right" overlay={<Tooltip>Toggle your favourites</Tooltip>} delayShow={300} >
    <i className="fas fa-heart fa-2x icon-spacing" onClick={showFavourites} style={favorite}/>
  </OverlayTrigger>
);

export default FavouritesIcon;