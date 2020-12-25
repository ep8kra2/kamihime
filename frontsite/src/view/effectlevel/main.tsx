import React from 'react';
import { useDispatch } from "react-redux";
import { makeStyles,Theme } from '@material-ui/core/styles'
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { EffectLevel } from '../../state/effectlevel/type';
import { 
  fetchAsyncList,
  fetchAsyncInsert,
  fetchAsyncUpdate 
} from '../../state/effectlevel/operation';
import { useList,useSelected } from '../../state/effectlevel/selector';
import { fetchAsyncList as fetchAsyncEffectList} from '../../state/effect/operation';
import { useList as useEffectList} from '../../state/effect/selector';
import { fetchAsyncList as fetchAsyncPowerList} from '../../state/power/operation';
import { useList as usePowerList} from '../../state/power/selector';
import { AppDispatch } from '../../app/store';
import DetailDialog from './DetailDialog';
import effectLevelSlice from '../../state/effectlevel/slice';

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
    const promise = async () => {
      await dispatch(fetchAsyncList())
      await dispatch(fetchAsyncEffectList())
      await dispatch(fetchAsyncPowerList())
    }
    promise();
  }, [dispatch])

  const effectLevelList = useList().map((row) => {return {...row}});
  const selected = useSelected();
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

  const handleInsert = (rowData:EffectLevel) => {
    const promise = async () => {
      await dispatch(fetchAsyncInsert(rowData));
      await dispatch(fetchAsyncList());
    }
    promise();
  }

  const handleUpdate = (rowData:EffectLevel) => {
    const promise = async () => {
      await dispatch(fetchAsyncUpdate(rowData));
      await dispatch(fetchAsyncList());
    }
    promise();
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleDetailAdd = (selected:EffectLevel) => {
    dispatch(effectLevelSlice.actions.selected(selected))
    setOpen(true)
  }

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={classes.paper}>
          <MaterialTable
            title="効果一覧"
            columns ={[
              { title: 'id', field: 'id', editable:'never' },
              { title: '効果', field: 'effectId', 
                lookup: lookupEffectList
              },
              { title: '威力', field: 'powerId', 
                lookup: lookupPowerList
              }
            ]}
            data={ effectLevelList }
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
                  console.log("OK")
                  setTimeout(() => {
                    const dataUpdate = [...effectLevelList];
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
                onClick: (event, rowData) => handleDetailAdd(rowData as EffectLevel),
              })
            ]}
            options={{
              actionsColumnIndex: -1
            }}
          />
          <DetailDialog effectLevel={ selected } open={open} onClose={handleClose} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Main;