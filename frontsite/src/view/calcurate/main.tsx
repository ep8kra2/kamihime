import React from 'react';
import { useDispatch } from "react-redux";
import { makeStyles,Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { AppDispatch } from '../../app/store';
import { fetchAsyncList as fetchAsyncWeaponList } from '../../state/weapon/operation';
import { fetchAsyncList as fetchAsyncCategoryList } from '../../state/category/operation';
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

export const Main = () => {
  const classes = useStyles();

  const dispatch:AppDispatch = useDispatch()
  React.useEffect(() => {
    const promise = () => {
      dispatch(fetchAsyncWeaponList());
      dispatch(fetchAsyncCategoryList());
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