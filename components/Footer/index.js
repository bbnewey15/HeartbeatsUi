import React from "react";
import { makeStyles } from '@material-ui/core/styles';


const StyledFooter = (props) => {
  const useStyles = makeStyles(theme => ({
    root: {
      padding: '15px',
      background: '#888582',
      color: '#fff',
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '-webkit-fill-available',
      marginBottom: '0px',
      boxShadow: 'inset 0px 4px 4px #444',
    },
  }));

  const classes = useStyles();

  return(<div className={classes.root}>Ben Newey - HeartBeats</div>);

}

export default StyledFooter