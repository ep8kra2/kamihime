import React from 'react';
import { makeStyles,Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme:Theme) => ({
  paper: {
    fontsize:'0.8em',
    padding:theme.spacing(0)
  },
  text: {
    maxWidth:'120px',
    lineHeight:'0.8em',
    paddingRight:theme.spacing(1)
  },
  typography: {
    width:'100%',
    height:'48px',
    color:'#FFFFFF',
    fontSize:'0.9rem',
    paddingTop:'14px',
    paddingLeft:theme.spacing(2),
    backgroundColor: '#7b1fa2'
  }
}));

export const Etc = () => {
  const classes = useStyles();

  return(
    <React.Fragment>
      <Paper className={classes.paper}>
        <TextField id="playerRank"
          label="Rank"
          type="number"
          className={classes.text}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField id="at"
          label="神姫攻撃力"
          type="number"
          className={classes.text}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField id="hp"
          label="神姫HP"
          type="number"
          className={classes.text}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField id="hpRate"
          label="残HP(%)"
          type="number"
          className={classes.text}
          InputLabelProps={{
            shrink: true,
          }}
        />  
      </Paper>
    </React.Fragment>
  )
}

export default Etc;