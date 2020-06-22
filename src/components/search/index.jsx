import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputTextField from '../inputTextField';

const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      width: '60em',
    },
  }
}));

function Search({ callbacks, label, variant, id }) {
  const classes = useStyles();

  return (
    <InputTextField 
      id={id} 
      variant={variant} 
      className={classes.root} 
      label={label} 
      onChange={callbacks} 
    /> 
  );
}

export default Search;