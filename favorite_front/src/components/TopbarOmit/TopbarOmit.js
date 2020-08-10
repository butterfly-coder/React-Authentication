import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {   
  Typography
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    
  },  
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  titleContainer: {    
    width: 'calc(100% + 48px)',     
    textAlign: 'center'
  },
  title: {
    color: "#546e7a",
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 0,
    width: 'fit-content'
  },
  horizonLine: {    
    backgroundColor: "#d8d8d8"
  },
}));

const TopbarOmit = props => {
  const { className, title, onClick, ...rest } = props; 
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.contentHeader}>        
        <div className={classes.titleContainer}>
          <Typography                  
            variant="h2"
            className={classes.title}
          >
            {props.title}
          </Typography>           
        </div>            
      </div>
      <hr className={classes.horizonLine}/>
    </div>
    
  );
};

TopbarOmit.propTypes = {
  className: PropTypes.string,  
};

export default TopbarOmit;
