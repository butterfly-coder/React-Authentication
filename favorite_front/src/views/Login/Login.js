import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = props => {
  return (
    <div>
      login
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.object
};

export default withRouter(Login);
