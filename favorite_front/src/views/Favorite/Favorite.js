import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const Favorite = props => {

  return (
    <div>
      favorite
    </div>
  );
};

Favorite.propTypes = {
  history: PropTypes.object
};

export default withRouter(Favorite);
