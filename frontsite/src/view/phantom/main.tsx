import React from 'react';
import { useDispatch } from "react-redux";
import { makeStyles,Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table';
import {
  fetchAsyncList,
  fetchAsyncInsert,
  fetchAsyncUpdate
} from '../../state/phantom/operation';
import {useList} from '../../state/phantom/selector';
import {Phantom} from '../../state/phantom/type';
import { elementList } from '../../state/element/paramenter';
import { fetchAsyncList as fetchAsyncRarityList } from '../../state/rarity/operation';
import { useList as useRarityList } from '../../state/rarity/selector';
import { fetchAsyncList as fetchAsyncSkillList } from '../../state/skill/operation';
import { usePhantomList as useSkillList } from '../../state/skill/selector';

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
  const phantomList = useList().map((row) => {return {...row}})
  const dispatch = useDispatch()

  const lookupElementList = elementList.reduce((result:any,row) => {
    result[row.id] = row.name
    return result
  },{})

  const lookupRarityList = useRarityList().reduce((result:any,row) => {
    result[row.id] = row.name
    return result
  },{0:'-'})
  
  const lookupSkillList = useSkillList().reduce((result:any,row) => {
    result[row.id] = row.name
    return result
  },{0:'-'})

  const lookupLimitBreak =  {
    0: '無',
    1: '有'
  }

  React.useEffect(() => {
    const promise = async () => {
      await dispatch(fetchAsyncList())
      await dispatch(fetchAsyncRarityList())
      await dispatch(fetchAsyncSkillList())
    }
    promise();
  }, [dispatch])

  const handleInsert = (rowData:Phantom) => {
    const promise = async () => {
      await dispatch(fetchAsyncInsert(rowData));
      await dispatch(fetchAsyncList())
    }
    promise();
  }

  const handleUpdate = (rowData:Phantom) => {
    const promise = async () => {
      await dispatch(fetchAsyncUpdate(rowData));
      await dispatch(fetchAsyncList())
    }
    promise();
  }

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={classes.paper}>
          <MaterialTable
            title="一覧"
            columns ={[
              { title: 'id', field: 'id', editable:'never' },
              { title: '名称', field: 'name',render:rowData => rowData.limitBreak > 0 ? '☆' + rowData.name : rowData.name },
              { title: '属性', field: 'elementId', lookup:lookupElementList },
              { title: 'ﾚｱﾘﾃｨ', field: 'rarityId', lookup:lookupRarityList },
              { title: 'メインスキル', field: 'mainSkillId', lookup:lookupSkillList },
              { title: 'サブスキル', field: 'subSkillId' , lookup:lookupSkillList},
              { title: 'minHP', field: 'minHp',type:"numeric"},
              { title: 'maxHP', field: 'maxHp',type:"numeric"},
              { title: 'minAt', field: 'minAt',type:"numeric"},
              { title: 'maxAt', field: 'maxAt',type:"numeric"},
              { title: '覚醒',field: 'limitBreak', lookup:lookupLimitBreak}
            ]}
            data={ phantomList }
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
                    const dataUpdate = [...phantomList];
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
              actionsColumnIndex: -1,
              headerStyle: { whiteSpace: 'nowrap' }
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Main;