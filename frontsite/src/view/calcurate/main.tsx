import React from 'react';
import { useDispatch } from "react-redux";
import { makeStyles,Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { AppDispatch } from '../../app/store';
import { fetchAsyncList as fetchAsyncWeaponList } from '../../state/weapon/operation';
import { fetchAsyncList as fetchImpactList } from '../../state/impact/operation';
import { fetchAsyncList as fetchAsyncEffectList } from '../../state/effect/operation';
import { fetchAsyncListEffect as fetchAsyncSkillEffectList } from '../../state/skill/operation';
import { fetchAsyncList as fetchEffectLevelList } from '../../state/effectlevel/operation';
import { fetchAsyncDetailList as fetchEffectLevelDetailList } from '../../state/effectlevel/operation';
import { useListEffect as useSkillEffectList } from '../../state/skill/selector';
import { useList as useImpactList } from '../../state/impact/selector';
import { useList as useEffectList }  from '../../state/effect/selector';
import { useList as useEffectlevelList } from '../../state/effectlevel/selector';
import { useDetailList as useEffectLevelDetailList } from '../../state/effectlevel/selector';
import Summary from './summary';
import Setting from './setting';
import calcurateSlice from '../../state/calcurate/slice';
import { SkillEffect } from '../../state/skill/type';

const useStyles = makeStyles((theme:Theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(0)
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height:'100%'
  }
}));

export const Main = () => {
  const classes = useStyles();
  const dispatch:AppDispatch = useDispatch()

  React.useEffect(() => {
    const promise = async() => {
      await dispatch(fetchAsyncWeaponList());
      await dispatch(fetchImpactList());
      await dispatch(fetchAsyncEffectList());
      await dispatch(fetchAsyncSkillEffectList());
      await dispatch(fetchEffectLevelList());
      await dispatch(fetchEffectLevelDetailList());
    }
    promise();
  }, [dispatch])

  const skillEffectList = useSkillEffectList() as SkillEffect[];
  const impactList = useImpactList();
  const effectList = useEffectList();
  const effectLevelList = useEffectlevelList();
  const effectLevelDetailList = useEffectLevelDetailList();

  React.useEffect(() => {
    dispatch(calcurateSlice.actions.setParams(
      {
        effectList:effectList,
        skillEffectList:skillEffectList,
        effectLevelList:effectLevelList,
        effectLevelDetailList:effectLevelDetailList,
        impactList:impactList
      }
    ))
  },[skillEffectList,effectList,effectLevelList,effectLevelDetailList,impactList,dispatch])

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={classes.paper}>
          <Summary />
        </Paper>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={classes.paper}>
          <Setting />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Main;