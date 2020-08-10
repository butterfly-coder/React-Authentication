import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  button: {    
    textAlign : "center",         
  },
  
}));

function ContainedBlueButton(props){
  const { className, ...rest } = props;  
  const classes = useStyles();
  return (
    <Button onClick={rest.onClick} variant={props.variant} component={props.component} disabled={props.disabled} className={classes.button} style={{width:props.width, height:props.height, borderRadius:props.height/2}} variant="contained" color="secondary">
        {props.title}
    </Button>
  );
};

export default ContainedBlueButton;