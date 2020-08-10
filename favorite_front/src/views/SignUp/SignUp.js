import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import {TopbarOmit, ContainedBlueButton} from 'components';
import validate from 'validate.js';
import AuthService from 'services/auth.service'

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Link,
  FormHelperText,  
  Typography
} from '@material-ui/core';

const schema = {
  username: {
    presence: { allowEmpty: false ,message: 'is required' },
    length: {
      maximum: 128,
    },
  },
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
  },
  confirm: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,      
    }
  },
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
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
  logo : {    
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '75px',
    width: 'fit-content',
    marginTop: '100px'
  },
  logoImage : {
    width: 227,
    height: 51,
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
    paddingTop: 125,
    flexBasis: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },    
  linkSignup: {
    color: '#546e7a',
    marginLeft: 10
  },  
  signUpButton: {
    margin: "30px 0px",    
  },
  linkLogin: {
    color: '#546e7a',
    marginLeft: 10
  },
  iconButton: {
    
  },  
  textField: {
    marginTop: theme.spacing(2)
  },
  progress: {
    position: "fixed",
    left: '50%',
    top: '50%',
    marginTop: -40,
    marginLeft: -40,    
  }
}));

const SignUp = props => {
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const { history } = props;
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState('');

  useEffect(() => {
    const errors = validate(formState.values, schema);    
    setFormState(formState => ({
      ...formState,
      isValid: errors || formState.values.confirm !== formState.values.password ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const [isLoading, setIsLoading] = React.useState(false);

  const classes = useStyles();

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const handleSignUp = event => {
    event.preventDefault();
    setFormState(formState => ({
      ...formState,
      isValid: false,
    }));
    AuthService.register(
      formState.values.username,
      formState.values.email,
      formState.values.password,
    ).then(      
      response => {          
        setIsLoading(false);    
        setFormState(formState => ({
          ...formState,
          isValid: true,
        }));  
        if(response.success === true) {         
          history.push('/favorite');
          window.location.reload();
        }        
      },
      error => {
        const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        setIsLoading(false); 
        setFormState(formState => ({
          ...formState,
          isValid: true,
        }));   
        setAlert(resMessage);
        setOpen(true);
      }
    )
  }

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

  return (
    <div>
      <TopbarOmit title={'Sign Up'}/>
      <div className={classes.contentBody}>            
        <form
          className={classes.form}
          onSubmit={handleSignUp}
        >               
          <TextField
            className={classes.textField}
            error={hasError('username')}
            fullWidth
            helperText={
              hasError('username') ? formState.errors.username[0] : null
            }
            disabled={isLoading}
            label="User name"
            name="username"
            onChange={handleChange}
            type="text"
            value={formState.values.username || ''}
            variant="outlined"
          />                 
          <TextField
            className={classes.textField}
            error={hasError('email')}
            fullWidth
            helperText={
              hasError('email') ? formState.errors.email[0] : null
            }
            disabled={isLoading}
            label="Email"
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
            disabled={isLoading}
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={formState.values.password || ''}
            variant="outlined"
          />
          <TextField
            className={classes.textField}
            error={hasError('confirm')}
            fullWidth
            helperText={
              hasError('confirm') ? formState.errors.confirm[0] : null
            }
            disabled={isLoading}
            label="Confirm Password"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={formState.values.confirm || ''}
            variant="outlined"
          />     
                
          {hasError('policy') && (
            <FormHelperText error>
              {formState.errors.policy[0]}
            </FormHelperText>
          )}
          <div className={classes.signUpButton}>
            <ContainedBlueButton  onClick={handleSignUp} disabled={!formState.isValid} width={"100%"} height={50} title={"Sign Up"}/>
          </div>                
          <Typography
            color="textSecondary"
            variant="body1"
          >
            Already have an account?{' '}
            <Link
              component={RouterLink}
              to="/log-in"
              variant="h6"
              className={classes.linkLogin}
            >
              Login
            </Link>
          </Typography>
        </form>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignUp);
