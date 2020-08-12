import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {TopbarOmit, ContainedBlueButton} from 'components';
import AuthService from 'services/auth.service'

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,
      minimum: 6,
    }
  }
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    }
  },  
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    paddingTop:125,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },  
  linkSignup: {
    color: '#546e7a',
    marginLeft: 10
  },
  buttonProp: { 
    margin: '30px 0px'
  },
  textField: {
    marginTop: theme.spacing(2)
  },
}));

const Login = props => {
  const { history } = props;
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState('');

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleChange = event => {
    event.persist();    
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleLogin = event => {
    event.preventDefault();        
    AuthService.login(formState.values.email, formState.values.password)
    .then(
      response => {
        if(response.success === true ) {
          history.push('/favorite');
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
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.content}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} >
        <Alert onClose={handleClose} severity="error">
          {alert}
        </Alert>
      </Snackbar>
      <TopbarOmit title={'Log In'}/>
      <div className={classes.contentBody}>
        <form
          className={classes.form}
          onSubmit={handleLogin}
        >
          <Typography
            color="textSecondary"
            gutterBottom
          >
            LOGIN WITH
          </Typography>                
          <TextField
            className={classes.textField}
            error={hasError('email')}
            fullWidth
            helperText={
              hasError('email') ? formState.errors.email[0] : null
            }
            label="Email address"
            name="email"
            onChange={handleChange}
            type="text"
            value={formState.values.email || ''}
            variant="outlined"
          />
          <TextField
            className={classes.textField}
            error={hasError('password')}
            fullWidth
            helperText={
              hasError('password') ? formState.errors.password[0] : null
            }
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={formState.values.password || ''}
            variant="outlined"
          />
          <div className={classes.buttonProp}>
            <ContainedBlueButton  onClick={handleLogin} disabled={!formState.isValid} width={"100%"} height={50} title={"Log In"}/>
          </div>                
          <Typography
            color="textSecondary"
            variant="body1"
          >
            need an account?{' '}
            <Link
              component={RouterLink}
              to="/sign-up"
              variant="h6"
              className={classes.linkSignup}
            >
              Sign up
            </Link>
          </Typography>
        </form>
      </div>
    </div>        
  );
};

Login.propTypes = {
  history: PropTypes.object
};

export default withRouter(Login);
