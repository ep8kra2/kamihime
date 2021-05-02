import React from 'react';
import { useDispatch } from "react-redux";
import { makeStyles,Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { fetchAsyncList as fetchAsyncWeaponTypeList } from '../../state/weapontype/operation';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { useParameter } from '../../state/calculate/selector';
import { Attack } from '../../state/calculate/type';
import { AttackProps } from './type';
import { realValue as resultNormal } from '../../domain/calculate/normal/service';
import { realValue as resultBarst  } from '../../domain/calculate/barst/service';
import { resultValue as resultHp } from '../../domain/calculate/hp/service';
import { resultAscension, resultAscensionLimit } from '../../domain/calculate/ascension/service';
import { InputAdornment } from '@material-ui/core';

const useStyles = makeStyles((theme:Theme) => ({
  paper: {
    fontsize:'0.8em',
    padding:theme.spacing(1)
  },
  text: {
    lineHeight:'0.75em',
    padding:0,
    marginTop:theme.spacing(1),
    marginBottom:theme.spacing(1),
  },
  typography: {
    width:'100%',
    height:'48px',
    color:'#FFFFFF',
    fontSize:'0.9rem',
    paddingTop:'14px',
    paddingLeft:theme.spacing(2),
    backgroundColor: '#8e24aa'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const Result = (attackProps:AttackProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const parameter = useParameter();

  const attack = attackProps.attackList.find((row) => row.elementId === parameter.elementId.value) as Attack;

  React.useEffect(() => {
    const promise = async() => {
      await dispatch(fetchAsyncWeaponTypeList());
    }
    promise();
  },[dispatch])

  return(
    <React.Fragment>
      <Paper className={classes.paper}>
        <TextField
          className={classes.text}
          id="HpId"
          label="HP"
          type="number"
          value={attack? resultHp(attack).toFixed(0) : 0}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />                
        <TextField
          className={classes.text}
          id="totalRecoverId"
          label="回復性能"
          type="number"
            value={attack? resultAscension(attack).toFixed(0) : 0}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
              readOnly: true,
            }}
            variant="outlined"
        />   
        <TextField
          className={classes.text}
          id="totalRecoverId"
          label="回復上限"
          type="number"
          value={attack? resultAscensionLimit(attack).toFixed(0) : 0}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
            readOnly: true,
          }}
          variant="outlined"
        />  
        <br />
        <TextField
          className={classes.text}
          id="normalAttackId"
          label="通常攻撃"
          type="number"
          value={ resultNormal(attack,parameter).toFixed(0)}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          className={classes.text}
          id="barstAttackId"
          label="バースト威力"
          type="number"
          value={resultBarst(attack,parameter).toFixed(0)}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />

      </Paper>
    </React.Fragment>
  )
}

export default Result;