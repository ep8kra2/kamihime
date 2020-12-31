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
import { fetchAsyncList as fetchAsyncEffectList} from '../../state/effect/operation';
import { useList as useEffectList} from '../../state/effect/selector';
import { fetchAsyncList as fetchAsyncPowerList} from '../../state/power/operation';
import { useList as usePowerList} from '../../state/power/selector';
import calculationSlice from '../../state/calculation/slice';
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
      await dispatch(fetchAsyncEffectList())
      await dispatch(fetchAsyncPowerList())
    }
    promise();
  }, [dispatch])

  const calcurateList = useList().map((row) => {return {...row}});
  const effectList = useEffectList();
  const powerList = usePowerList();

  const lookupEffectList = effectList.reduce((result:any,row) => {
    result[row.id] = row.name
    return result
  },{})
  
  const lookupPowerList = powerList.reduce((result:any,row) => {
    result[row.id] = row.name
    return result
  },{})

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
            title="計算式一覧 *そのうち即時反映出来るよう作り変えます"
            columns ={[
              { title: 'id', field: 'id', editable:'never' },
              { title: '計算名', field: 'name'},
              { title: '効果', field: 'effectId', lookup: lookupEffectList },
              { title: '威力', field: 'powerId', lookup: lookupPowerList },
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