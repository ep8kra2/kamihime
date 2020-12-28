import React from 'react';
import MaterialTable from 'material-table';
import WeaponListDialog from './WeaponListDialog';
import {useListWeapon, useSelectedWeapon } from '../../state/calcurate/selector';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { calcurateSlice } from '../../state/calcurate/slice';

export const SelectedWeaponList = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch:AppDispatch = useDispatch();
  const weaponList = useListWeapon();
  const selected = useSelectedWeapon();

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (slot?:number) => {
    dispatch(calcurateSlice.actions.selectedWeapon(slot as number))
    setOpen(true);
  };

  return (
    <React.Fragment>
      <MaterialTable
        columns ={[
          { title: 'slot', field: 'slot' },
          { title: 'id', field: 'id', hidden:true},
          { title: '武器', field: 'name' },
          { title: 'スキル1', field: 'skill1'},
          { title: 'スキル2', field: 'skill2'},
          { title: 'HP', field: 'hp'},
          { title: 'AT', field:'at'},
          { title: 'level',field: 'level'},
          { title: '備考', field:'marks'}
        ]}
          data={ weaponList.map((row) => {return {
            slot:row.slot,
            id:row.weapon?.id,
            name: row.weapon === undefined ? '' : (row.weapon.weaponIdBeforeLimitBreak > 0 ? '☆覚醒☆' : '')  + row.weapon.name,
            skill1:row.weapon === undefined ? '' : row.weapon.slot1PowerName + row.weapon.slot1SkillName,
            skill2:row.weapon === undefined ? '' : row.weapon.slot2PowerName + row.weapon.slot2SkillName,
            hp:row.weapon?.maxHp,
            at:row.weapon?.maxAt,
            level:row.level,
            marks:row.marks
          }})
        }
        options={{
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