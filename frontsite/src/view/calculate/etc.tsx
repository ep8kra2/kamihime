import React from 'react';
import { useDispatch } from "react-redux";
import { makeStyles,Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useParameter } from '../../state/calculate/selector';
import { Parameter } from '../../state/calculate/type';
import calcurateSlice from '../../state/calculate/slice';
import { useListWithOutPhantom as useElementList } from '../../state/element/selector';
import { useList as useWeaponTypeList } from '../../state/weapontype/selector';
import { fetchAsyncList as fetchAsyncWeaponTypeList } from '../../state/weapontype/operation';
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
  const elementList = useElementList();
  const weaponTyleList = useWeaponTypeList();

  React.useEffect(() => {
    const promise = async() => {
      await dispatch(fetchAsyncWeaponTypeList());
    }
    promise();
  },[dispatch])

  const parameter = useParameter() as Parameter;

  const handleOnChange = (name:string,value:string) => {
    const newParameter = {
      ...parameter,
      [name]:{...parameter[name],value:Number(value)}
    } as Parameter
    console.log(newParameter)
    dispatch(calcurateSlice.actions.setParameter(newParameter))
  }

  return(
    <React.Fragment>
      <Paper className={classes.paper}>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="labelElementId">神姫属性</InputLabel>
          <Select
            id="selectElementId"
            value={parameter.elementId.value}
            onChange={e => {handleOnChange('elementId',e.target.value as string )}}
            displayEmpty
            className={classes.selectEmpty}
          >
            {elementList.map((row) => <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="labelgoodAtWeapon1">神姫得意武器1</InputLabel>
          <Select
            id="selectgoodAtWeapon1"
            value={parameter.goodAtWeapon1.value}
            onChange={e => {handleOnChange('goodAtWeapon1',e.target.value as string)}}
            displayEmpty
            className={classes.selectEmpty}
          >
            {weaponTyleList.map((row) => <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="labelgoodAtWeapon2">神姫得意武器2</InputLabel>
          <Select
            id="selectgoodAtWeapon2"
            value={parameter.goodAtWeapon2.value}
            onChange={e => {handleOnChange('goodAtWeapon2',e.target.value as string)}}
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem key={0} value={0}>{''}</MenuItem>
            {weaponTyleList.map((row) => <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="labelAttack">神姫基礎攻撃力</InputLabel>
          <Input 
            className={classes.selectEmpty}
            id="inputAttack" 
            type="number"
            value={parameter.attack.value === 0? "" : parameter.attack.value}
            onChange={e => handleOnChange('attack',e.target.value )}  
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="labelHp">神姫基礎HP</InputLabel>
          <Input 
            className={classes.selectEmpty}
            id="inputHp" 
            type="number"
            value={parameter.hp.value === 0? "" : parameter.hp.value }
            onChange={e => handleOnChange('hp',e.target.value )}  
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="labelBarstRate">バースト倍率(%)</InputLabel>
          <Input 
            className={classes.selectEmpty}
            id="inputBarstRate" 
            type="number"
            value={parameter.barstRate.value === 0? "" : parameter.barstRate.value }
            onChange={e => handleOnChange('barstRate',e.target.value )}  
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="labelBarstLimitUp">バースト上限</InputLabel>
          <Input 
            className={classes.selectEmpty}
            id="inputBarstLimitUp" 
            type="number"
            value={parameter.barstLimitUp.value === 0? "" : parameter.barstLimitUp.value }
            onChange={e => handleOnChange('barstLimitUp',e.target.value )}  
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="labelHpRate">残HP(%)</InputLabel>
          <Input 
            className={classes.selectEmpty}
            id="inputHpRate"
            type="number" 
            value={parameter.hpRate.value === 0? "" : parameter.hpRate.value }
            onChange={e => handleOnChange('hpRate',e.target.value )}  
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="labelEnemyDefence">敵防御値</InputLabel>
          <Input 
            className={classes.selectEmpty}
            id="inputEnemyDefence"
            type="number" 
            value={parameter.enemyDefence.value === 0? "" : parameter.enemyDefence.value }
            onChange={e => handleOnChange('enemyDefence',e.target.value )}  
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="labelDebuf">防御デバフ値</InputLabel>
          <Input 
            className={classes.selectEmpty}
            id="inputDebuf"
            type="number" 
            value={parameter.debufferDefence.value === 0? "" : parameter.debufferDefence.value }
            onChange={e => handleOnChange('debufferDefence',e.target.value )}  
          />
        </FormControl>
      </Paper>
    </React.Fragment>
  )
}

export default Etc;