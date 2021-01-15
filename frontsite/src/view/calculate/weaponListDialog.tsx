import React from 'react';
import {useDispatch} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import { useList as useWeaponList } from '../../state/weapon/selector';
import { Weapon } from '../../state/weapon/type';
import calcurateSlice from '../../state/calculate/slice';

type DialogProps = {
  open:boolean,
  slot:number,
  onClose: () => void
}

export const WeaponListDialog = (props:DialogProps) => {
  const {open,slot,onClose} = props;
  const dispatch = useDispatch();
  const weaponList = useWeaponList();

  const displayWeaponList = weaponList.map((weapon:Weapon) => {
    return(
      {
        id:weapon.id,
        name:(weapon.weaponIdBeforeLimitBreak > 0 ? '☆' : '') + weapon.name,
        elementName:weapon.elementName,
        rarityName:weapon.rarityName,
        skill1:weapon.slot1PowerName + weapon.slot1SkillName,
        skill2:weapon.slot2PowerName + weapon.slot2SkillName,
        maxHp:weapon.maxHp,
        maxAt:weapon.maxAt
      }
    )
  })

  const handleSetWeapon = (weaponid:number) => {
    const selectedweapon = weaponList.find((row) =>{
      return(row.id === weaponid);
    }) as Weapon
    dispatch(calcurateSlice.actions.changedWeapon({slot:slot,weapon:selectedweapon}));
    onClose();
  }

  const handleDelete = () => {
    dispatch(calcurateSlice.actions.deleteWeapon(slot));
    onClose();
  }

  const handleClose = () => {
    onClose();
  }
  

  return (
    <React.Fragment>
      <Dialog
          open={open}
          onClose={() => handleClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"武器選択画面"}</DialogTitle>
        <DialogContent>
          <MaterialTable
            title="武器一覧"
            columns ={[
              { title: 'id', field: 'id',hidden:true },
              { title: '武器', field: 'name' },
              { title: '属性', field: 'elementName'},
              { title: 'レア', field: 'rarityName'},
              { title: 'スキル1', field: 'skill1'},
              { title: 'スキル2', field: 'skill2'},
              { title: 'HP', field: 'maxHp' },
              { title: 'AT', field:'maxAt'},
            ]}
            data={ displayWeaponList }
            options={{
              headerStyle: {
                fontSize:'0.5em',
                whiteSpace:'nowrap',
                wordBreak:'keep-all',
              },
              rowStyle: {
                fontSize:'0.5em',
                whiteSpace:'nowrap',
                wordBreak:'keep-all'
              },
              searchFieldStyle:{
                fontSize:'0.5em'
              }
            }}
            onRowClick={(event,rowData) => {handleSetWeapon(rowData?.id as number)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            武器削除
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>      
    </React.Fragment>
  );
}

export default WeaponListDialog;