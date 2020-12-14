import React from 'react';
import { useDispatch } from "react-redux";
import { makeStyles,Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
  fetchAsyncList,
  fetchAsyncInsert,
  fetchAsyncUpdate
} from '../../state/weapon/operation';
import {
  fetchAsyncList as fetchAsyncWeaponTypeList
} from '../../state/weapontype/operation';
import {useList} from '../../state/weapon/selector';
import { useList as useWeaponTypeList } from '../../state/weapontype/selector';
import { AppDispatch } from '../../app/store';
import {Weapon} from '../../state/weapon/type';
import { elementList } from '../../state/element/paramenter';
import { fetchAsyncList as fetchAsyncRarityList } from '../../state/rarity/operation';
import { useList as useRarityList } from '../../state/rarity/selector';
import { fetchAsyncList as fetchAsyncPowerList } from '../../state/power/operation';
import { useList as usePowerList } from '../../state/power/selector';
import { fetchAsyncList as fetchAsyncSkillList } from '../../state/skill/operation';
import { useList as useSkillList } from '../../state/skill/selector';


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
  const weaponList = useList().map((row) => {return {...row}})
  const weaponTypeList = useWeaponTypeList();
  const dispatch:AppDispatch = useDispatch()

  // ルックアップ
  const lookupWeaponTypeList = weaponTypeList.reduce((result:any,row) => {
    result[row.id] = row.name
    return result
  },{})

  const lookupElementList = elementList.reduce((result:any,row) => {
    result[row.id] = row.name
    return result
  },{})

  const lookupRarityList = useRarityList().reduce((result:any,row) => {
    result[row.id] = row.name
    return result
  },{0:'-'})
  
  const lookupPowerList = usePowerList().reduce((result:any,row) => {
    result[row.id] = row.name
    return result
  },{0:'-'})

  const lookupSkillList = useSkillList().reduce((result:any,row) => {
    result[row.id] = row.name
    return result
  },{0:'-'})

  const lookupWeaponList = weaponList.reduce((result:any,row) => {
    result[row.id] = row.name
    return result
  },{0:'-'})

  React.useEffect(() => {
    const promise = async () => {
      await dispatch(fetchAsyncList())
      await dispatch(fetchAsyncWeaponTypeList())
      await dispatch(fetchAsyncRarityList())
      await dispatch(fetchAsyncPowerList())
      await dispatch(fetchAsyncSkillList())
    }
    promise();
  }, [dispatch])

  const handleInsert = (rowData:Weapon) => {
    const promise = async () => {
      await dispatch(fetchAsyncInsert(rowData));
    }
    promise();
  }

  const handleUpdate = (rowData:Weapon) => {
    const promise = async () => {
      await dispatch(fetchAsyncUpdate(rowData));
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
              { title: '名称', field: 'name',render:rowData => rowData.weaponIdBeforeLimitBreak > 0 ? '☆覚醒☆' + rowData.name : rowData.name },
              { title: '武器種', field: 'typeId', lookup:lookupWeaponTypeList },
              { title: '属性', field: 'elementId', lookup:lookupElementList },
              { title: 'ﾚｱﾘﾃｨ', field: 'rarityId', lookup:lookupRarityList },
              { title: `スキル1威力`, field: 'slot1PowerId', lookup:lookupPowerList },
              { title: 'スキル1', field: 'slot1SkillId', lookup:lookupSkillList },
              { title: 'スキル2威力', field: 'slot2PowerId', lookup:lookupPowerList },
              { title: 'スキル2', field: 'slot2SkillId' , lookup:lookupSkillList},
              { title: 'HP', field: 'maxHp',type:"numeric"},
              { title: 'AT', field: 'maxAt',type:"numeric"},
              { title: '覚醒',field: 'weaponIdBeforeLimitBreak', 
                lookup:lookupWeaponList,
                editComponent:(props) => {
                  return <Select value={props.rowData.weaponIdBeforeLimitBreak} onChange={e => {props.onChange(e.target.value)}}>
                    <MenuItem value={0}>-</MenuItem>
                    {
                      weaponList.filter((row) => row.name === props.rowData.name ).map((row) => <MenuItem value={row.id}>{row.name}</MenuItem>)
                    }
                    </Select>
                }
              } 
            ]}
            data={ weaponList }
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
                    const dataUpdate = [...weaponList];
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