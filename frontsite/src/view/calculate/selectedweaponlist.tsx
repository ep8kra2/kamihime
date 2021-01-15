import React from 'react';
import MaterialTable from 'material-table';
import WeaponListDialog from './weaponListDialog';
import {useListWeapon, useSelectedWeapon } from '../../state/calculate/selector';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { calcurateSlice } from '../../state/calculate/slice';
import { SelectedWeapon } from '../../state/calculate/type';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { getWeaponAt, getWeaponHp } from '../../domain/weapon/service';

export const SelectedWeaponList = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch:AppDispatch = useDispatch();
  const weaponList = useListWeapon();
  const selected = useSelectedWeapon();

  const levelList = ():number[] => {
    var item = [];
    for (let i = 1; i <= 150 ; i++){
      item.push(i)
    }
    return item;
  }

  const lookupLevelList = levelList().reduce((result:{[index: number] : number},row) => {
    result[row] = Number(row)
    return result
  },{})

  const skilllevelList = ():number[] => {
    var item = [];
    for (let i = 1; i <= 30 ; i++){
      item.push(i)
    }
    return item;
  }

  const lookupSkillLevelList = skilllevelList().reduce((result:{[index: number] : number},row) => {
    result[row] = Number(row)
    return result
  },{})


  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = (rowData:SelectedWeapon) => {
    dispatch(calcurateSlice.actions.editWeapon(rowData))
  }

  const handleClickOpen = (slot?:number) => {
    dispatch(calcurateSlice.actions.selectedWeapon(slot as number))
    setOpen(true);
  };

  return (
    <React.Fragment>
      <MaterialTable
        columns ={[
          { title: 'slot', field: 'slot', editable:'never' },
          { title: 'id', field: 'id', hidden:true},
          { title: '武器', field: 'weapon.name', editable:'never', render: ((rowData:SelectedWeapon) => {return (((rowData.weapon? rowData.weapon.weaponIdBeforeLimitBreak > 0 : false)? "☆" : "") + (rowData.weapon? rowData.weapon.name : ""))})},
          { title: 'スキル1', field: 'weapon.slot1SkillName', editable:'never', render: ((rowData:SelectedWeapon) => {return (rowData.weapon? rowData.weapon.slot1PowerName + rowData.weapon.slot1SkillName : 0  )})},
          { title: 'スキル2', field: 'weapon.slot2SkillName', editable:'never', render: ((rowData:SelectedWeapon) => {return (rowData.weapon? rowData.weapon.slot2PowerName + rowData.weapon.slot2SkillName : 0  )})},
          { title: 'HP', field: 'weapon.maxHp', editable:'never', render: ((rowData:SelectedWeapon) => {return getWeaponHp(rowData.weapon,rowData.level).toFixed(0)})},
          { title: 'AT', field:'weapon.maxAt', editable:'never', render: ((rowData:SelectedWeapon) => {return getWeaponAt(rowData.weapon,rowData.level).toFixed(0)})},
          { title: 'スキルlv', field:'skillLevel',lookup: lookupSkillLevelList,
            editComponent:(props) => {
              return <Select value={props.rowData.skillLevel} onChange={e => {props.onChange(e.target.value)}}>
              {
                Object.values(lookupSkillLevelList).filter((value) => value <= (props.rowData.weapon?.weaponIdBeforeLimitBreak > 0 ? 30 : 20)).map((value) => {
                  return(<MenuItem key={value} value={value}>{value}</MenuItem>)
                })
              }
              </Select>              
            }
          },   
          { title: 'level',field: 'level', lookup: lookupLevelList,
            editComponent:(props) => {
              return <Select value={props.rowData.level} onChange={e => {props.onChange(e.target.value)}}>
              {
                Object.values(lookupLevelList).filter((value) => value <= (props.rowData.weapon?.weaponIdBeforeLimitBreak > 0 ? 150 :  125)).map((value) => {
                  return(<MenuItem key={value} value={value}>{value}</MenuItem>)
                })
              }
              </Select>
            }
          },
          { title: '備考', field:'marks', editable:'never'}
        ]}
          data={ weaponList.map((row) => {return {
            ...row
          }})
        }
        editable={{
          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...weaponList];
              if(oldData === undefined){
                reject();
              }else{
                const index = oldData.slot;
                dataUpdate[index] = newData;
                handleUpdate(newData);
                resolve();
              }
            }, 1000)
          })
        }}
        options={{
          actionsColumnIndex: -1,
          toolbar:false,
          filtering: false,
          search: false,
          pageSize: 10,
          pageSizeOptions:[10],
          paging:false,
          headerStyle: {
            fontSize:'0.8rem',
            whiteSpace:'nowrap',
            wordBreak:'keep-all',
            padding:0
          },
          rowStyle: {
            fontSize:'0.8rem',
            padding:0,
            margin:0,
            whiteSpace:'nowrap',
            wordBreak:'keep-all'
          },
          searchFieldStyle:{
            fontSize:'0.5em'
          }
        }}
        onRowClick={(event,rowData) => {handleClickOpen(rowData?.slot)}}
      />
      <WeaponListDialog open={open} slot={selected.slot}  onClose={handleClose} />
    </React.Fragment>
    
  );
}

export default SelectedWeaponList;