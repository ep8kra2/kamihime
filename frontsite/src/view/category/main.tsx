import React from 'react';
import { useDispatch } from "react-redux";
import { makeStyles,Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table';
import { Category } from '../../state/category/type';
import categorySlice from '../../state/category/slice';
import { 
  fetchAsyncList,
  fetchAsyncInsert,
  fetchAsyncUpdate } from '../../state/category/operation';
import { useList,useSelected } from '../../state/category/selector';
import { AppDispatch } from '../../app/store';
import DetailDialog from './categorydetaildialog';

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
  }
}));

export const Main = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const dispatch:AppDispatch = useDispatch()
  React.useEffect(() => {
    const promise = dispatch(fetchAsyncList())
    return () => {
      // `createAsyncThunk` attaches an `abort()` method to the promise
      promise.abort()
    }
  }, [dispatch])

  const list = useList().map((row) => {return({...row})});
  const selected = useSelected();

  const handleInsert = (categoryNew:Category) => {
    const promise = async () => {
      await dispatch(fetchAsyncInsert(categoryNew));
      await dispatch(fetchAsyncList());
    }
    promise();
  }

  const handleUpdate = (categoryNew:Category) => {
    const promise = async () => {
      await dispatch(fetchAsyncUpdate(categoryNew));
      await dispatch(fetchAsyncList());
    }
    promise();
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleDetailAdd = (categorySelected:Category) => {
    dispatch(categorySlice.actions.selected(categorySelected))
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
              { title: '効果分類', field: 'name' },
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
                onClick: (event, rowData) => handleDetailAdd(rowData as Category),
              })
            ]}
            options={{
              actionsColumnIndex: -1
            }}
          />

          <DetailDialog category={ selected } open={open} onClose={handleClose} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Main;