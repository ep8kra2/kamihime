import React from 'react';
import { useDispatch } from "react-redux";
import { makeStyles,Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useParameter } from '../../state/calcurate/selector';
import { Parameter } from '../../state/calcurate/type';
import calcurateSlice from '../../state/calcurate/slice';
import { elementList } from '../../state/element/paramenter';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import FormControl from '@material-ui/core/FormControl/FormControl';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Input from '@material-ui/core/Input/Input';

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

export const Etc = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const parameter = useParameter() as Parameter;

  const handleOnChange = (name:string,value:string) => {
    const newParameter = {
      ...parameter,
      [name]:Number(value)
    } as Parameter
    dispatch(calcurateSlice.actions.setParameter(newParameter))
  }

  return(
    <React.Fragment>
      <Paper className={classes.paper}>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="labelElementShinki">神姫属性</InputLabel>
          <Select
            id="selectElementShinki"
            value={parameter.elementShinki}
            onChange={e => {handleOnChange('elementShinki',e.target.value as string)}}
            displayEmpty
            className={classes.selectEmpty}
          >
            {elementList.map((row) => <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="labelAttackShinki">神姫基礎攻撃力</InputLabel>
          <Input 
            className={classes.selectEmpty}
            id="inputAttackShinki" 
            type="number"
            value={parameter.attackShinki}
            onChange={e => handleOnChange('attackShinki',e.target.value)}  
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="labelHpShinki">神姫基礎HP</InputLabel>
          <Input 
            className={classes.selectEmpty}
            id="inputHpShinki" 
            value={parameter.hpShinki}
            onChange={e => handleOnChange('hpShinki',e.target.value)}  
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="labelHpRate">残HP(%)</InputLabel>
          <Input 
            className={classes.selectEmpty}
            id="inputHpRate" 
            value={parameter.hpRate}
            onChange={e => handleOnChange('hpRate',e.target.value)}  
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="labelEnemyDefence">敵防御値</InputLabel>
          <Input 
            className={classes.selectEmpty}
            id="inputEnemyDefence" 
            value={parameter.hpRate}
            onChange={e => handleOnChange('enemyDefence',e.target.value)}  
          />
        </FormControl>
      </Paper>
    </React.Fragment>
  )
}

export default Etc;