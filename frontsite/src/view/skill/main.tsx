import React from 'react';
import { useDispatch } from "react-redux";
import { makeStyles,Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table';
import { Skill } from '../../state/skill/type';
import skillSlice from '../../state/skill/slice';
import { fetchAsyncList,fetchAsyncInsert,fetchAsyncUpdate } from '../../state/skill/operation';
import { useList,useSelected } from '../../state/skill/selector';
import { AppDispatch } from '../../app/store';
import DetailDialog from './EffectDialog';

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
    fonSize:'0.5em'
  }
}));

export const Main = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const dispatch:AppDispatch = useDispatch()
  React.useEffect(() => {
    const promise = async() => await dispatch(fetchAsyncList());
    promise();
  }, [dispatch])

  const list = useList().map((row) => {return({...row})}) as Skill[];
  const selected = useSelected() as Skill;

  const handleInsert = (rowData:Skill) => {
    const promise = async () => {
      await dispatch(fetchAsyncInsert(rowData));
      await dispatch(fetchAsyncList());
    }
    promise();
  }

  const handleUpdate = (rowData:Skill) => {
    const promise = async () => {
      await dispatch(fetchAsyncUpdate(rowData));
      await dispatch(fetchAsyncList());
    }
    promise();
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleDetailAdd = (selected:Skill) => {
    dispatch(skillSlice.actions.selected(selected))
    setOpen(true)
  }
  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={classes.paper}>
          <MaterialTable
            title="一覧"
            columns ={[
              { title: 'id', field: 'id', editable:'never' },
              { title: 'スキル名', field: 'name' },
            ]}
            data={ list }
            editable={{
              onRowAdd: newData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    handleInsert(newData);
                    resolve();
                  }, 1000)
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...list];
                    if(oldData === undefined){
                      reject();
                    }else{
                      const index = oldData.id;
                      dataUpdate[index] = newData;
                      handleUpdate(newData);
                      resolve();
                    }
                  }, 1000)
                })
            }}
            actions={[
              rowData => ({
                icon: 'add',
                tooltip: '詳細登録',
                onClick: (event, rowData) => handleDetailAdd(rowData as Skill),
              })
            ]}
            options={{
              actionsColumnIndex: -1
            }}
          />

          <DetailDialog skill={ selected } open={open} onClose={handleClose} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Main;