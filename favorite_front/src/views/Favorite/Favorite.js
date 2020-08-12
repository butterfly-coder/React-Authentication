import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import UserService from 'services/user.service';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {TopbarOmit, ContainedBlueButton} from 'components';
import userService from 'services/user.service';

const useStyles = makeStyles(theme => ({
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',
    maxWidth: '100%',
    flexBasis: '100%'
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    },
    position: 'absolute',
    margin: 'auto',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },  
  select: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  buttonProp: { 
    margin: '30px 0px'
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Favorite = props => {
  const classes = useStyles();
  const { history } = props;
  const [defaultSelect, setDefaultSelect] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState('');
  
  const handleSelectChange = event => {        
    UserService.setFavorite(Number(event.target.value))
    .then (
      response => {
        
      },
      error => {        
        const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();        
        setAlert(resMessage);
        setOpen(true);        
      }
    )
  }
  useEffect(() => {
    UserService.getUserInfo()
    .then(
      response => {
        setDefaultSelect(response.data.user.favorite_id);
        setFavorites(response.data.favorite_list);
        setIsDataLoaded(true);
      },
      error => {        
        const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();        
        setAlert(resMessage);
        setOpen(true);
      }
    )
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleDeleteAccount = (event) => {
    userService.deleteAccount("delete")
    .then(
      response => {
        if(response.success === true ) {
          history.push('/sign-up');
          window.location.reload();
        } else {
          setAlert(response.message);
          setOpen(true);
        }
      },
      error => {
        const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();        
        setAlert(resMessage);
        setOpen(true);
      }
    )

  }

  const handleLogout = (event) => {
    localStorage.removeItem("user");
    history.push('/log-in');
    window.location.reload();
  }

  if(isDataLoaded) {
    return (
      <div className={classes.content}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {alert}
          </Alert>
        </Snackbar>
        <TopbarOmit title={'Favorite'}/>
        <div className={classes.contentBody}>
          <form
            className={classes.form}
          > 
            <div>
              <FormControl variant="filled" className={classes.select}>
                <InputLabel htmlFor="filled-age-native-simple">Favorite</InputLabel>
                <Select
                  native                        
                  defaultValue={defaultSelect}
                  onChange={handleSelectChange}
                  inputProps={{
                    name: 'age',
                    id: 'filled-age-native-simple',
                  }}
                >
                  {favorites.map((favorite, index) => (
                    <option key={index} value={favorite.id}>
                      {favorite.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </div>  
            <div className={classes.buttonProp}>
              <ContainedBlueButton  onClick={handleDeleteAccount} width={"100%"} height={50} title={"Delete account"}/>
            </div>           
            <div className={classes.buttonProp}>
              <ContainedBlueButton  onClick={handleLogout} width={"100%"} height={50} title={"Log out"}/>
            </div>                          
          </form>  
        </div>
      </div>
    );
  } else {
    return (
      <div/>
    )
  }
  
};

Favorite.propTypes = {
  history: PropTypes.object
};

export default withRouter(Favorite);
