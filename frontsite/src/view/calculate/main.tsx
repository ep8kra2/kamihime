import React from 'react';
import { useDispatch } from "react-redux";
import { makeStyles,Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { AppDispatch } from '../../app/store';
import { fetchAsyncList as fetchAsyncWeaponList } from '../../state/weapon/operation';
import { fetchAsyncList as fetchAsyncPhantomList } from '../../state/phantom/operation';
import { fetchAsyncList as fetchImpactList } from '../../state/impact/operation';
import { fetchAsyncList as fetchCalculationList } from '../../state/calculation/operation';
import { fetchAsyncList as fetchAsyncEffectList } from '../../state/effect/operation';
import { fetchAsyncListEffect as fetchAsyncSkillEffectList } from '../../state/skill/operation';
import { fetchAsyncList as fetchAsyncSkillList } from '../../state/skill/operation';
import Summary from './summary';
import Setting from './setting';

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

export const Main = ():JSX.Element => {
  const classes = useStyles();
  const dispatch:AppDispatch = useDispatch()

  React.useEffect(() => {
    const promise = async() => {
      await dispatch(fetchAsyncWeaponList());
      await dispatch(fetchAsyncPhantomList());
      await dispatch(fetchImpactList());
      await dispatch(fetchCalculationList());
      await dispatch(fetchAsyncEffectList());
      await dispatch(fetchAsyncSkillList());
      await dispatch(fetchAsyncSkillEffectList());
    }
    promise();
  }, [dispatch])

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