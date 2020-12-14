import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import { 
  fetchAsyncSelectedListEffect,
  fetchAsyncInsertEffect,
  fetchAsyncUpdateEffect 
} from '../../state/skill/operation';
import { fetchAsyncList as fetchAsyncListEffect } from '../../state/effect/operation';
import { useSelectedListEffect } from '../../state/skill/selector';
import { useList as useListEffect } from '../../state/effect/selector';
import { Skill,SkillEffect } from '../../state/skill/type';

export interface DialogProps {
  open: boolean;
  skill:Skill,
  onClose: () => void;
}

const DetailDialog = (props: DialogProps) => {
  const { onClose, skill, open } = props;
  const dispatch:AppDispatch = useDispatch();
  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => {
    if (skill.id !== undefined) {
      const promise = async () => { 
        await dispatch(fetchAsyncSelectedListEffect(skill));
        await dispatch(fetchAsyncListEffect());
      }
      promise();
    }
  }, [skill,dispatch])

  const selectedList = useSelectedListEffect().map((row) => {return {...row}}) as SkillEffect[]

  const listEffect = useListEffect();

  const lookupListEffect = listEffect.reduce((result:any,row) => {
    result[row.id] = row.name
    return result
  },{})

  const handleInsert = (rowData:SkillEffect) => {
    const promise = async () => {
      await dispatch(fetchAsyncInsertEffect({...rowData,skillId:skill.id}))
      await dispatch(fetchAsyncSelectedListEffect(skill));
    }
    promise();
  }

  const handleUpdate = (rowData:SkillEffect) => {
    const promise = async () => {
      await dispatch(fetchAsyncUpdateEffect({...rowData,skillId:skill.id}))
      await dispatch(fetchAsyncSelectedListEffect(skill));
    }
    promise();
  }


  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <MaterialTable
        title={skill.name + "詳細"}
        columns ={[
          { title: 'id', field: 'id', editable:'never' },
          { title: '効果', field: 'effectId', lookup:lookupListEffect},
        ]}
        data={ selectedList }
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
                const dataUpdate = [...selectedList];
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
          search:false
        }}
      />
      <Button onClick={() => handleClose()} color='primary'>
        閉じる
      </Button>
    </Dialog>
  );
}

export default DetailDialog;