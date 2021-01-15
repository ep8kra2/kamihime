import React from 'react';
import { useDispatch } from "react-redux";
import { makeStyles,Theme } from '@material-ui/core/styles'
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { 
  fetchAsyncList,
  fetchAsyncInsert,
  fetchAsyncUpdate 
} from '../../state/calculation/operation';
import { useList } from '../../state/calculation/selector';
import { Calculation } from '../../state/calculation/type';

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
  const dispatch = useDispatch()
  React.useEffect(() => {
    const promise = async () => {
      await dispatch(fetchAsyncList())
    }
    promise();
  }, [dispatch])

  const calcurateList = useList().map((row) => {return {...row}});

  const handleInsert = (rowData:Calculation) => {
    const promise = async () => {
      await dispatch(fetchAsyncInsert(rowData));
      await dispatch(fetchAsyncList());
    }
    promise();
  }

  const handleUpdate = (rowData:Calculation) => {
    const promise = async () => {
      await dispatch(fetchAsyncUpdate(rowData));
      await dispatch(fetchAsyncList());
    }
    promise();
  }

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={classes.paper}>
          <MaterialTable
            title="計算式一覧"
            columns ={[
              { title: 'id', field: 'id', editable:'never' },
              { title: '計算名', field: 'name'},
              { title: '式名', field : 'expressionName' },
              { title: '式'  ,field: 'expression'},
              { title: '備考'  ,field: 'marks'},
            ]}
            data={ calcurateList }
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
                    const dataUpdate = [...calcurateList];
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
            options={{
              actionsColumnIndex: -1
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Main;