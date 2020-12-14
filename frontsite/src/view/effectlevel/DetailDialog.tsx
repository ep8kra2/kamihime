import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import { EffectLevel,EffectLevelDetail } from '../../state/effectlevel/type';
import {
  fetchAsyncDetailList,
  fetchAsyncDetailInsert,
  fetchAsyncDetailUpdate
} from '../../state/effectlevel/operation';
import {
  useDetailList
} from '../../state/effectlevel/selector';

export interface DialogProps {
  open: boolean
  effectLevel:EffectLevel
  onClose: () => void
}

const DetailDialog = (props: DialogProps) => {
  const { onClose, effectLevel, open } = props;
  const dispatch:AppDispatch = useDispatch();

  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => {
    const promise = async () => {
      await dispatch(fetchAsyncDetailList(effectLevel))
    }
    promise();
  }, [effectLevel,dispatch])

  const handleInsert = (rowData:EffectLevelDetail) => {
    const promise = async () => {
      await dispatch(fetchAsyncDetailInsert({...rowData,effectLevelId:effectLevel.id}))
      await dispatch(fetchAsyncDetailList(effectLevel))
    }
    promise();
  }

  const handleUpdate = (rowData:EffectLevelDetail) => {
    const promise = async () => {
      console.log(rowData)
      await dispatch(fetchAsyncDetailUpdate(rowData))
      await dispatch(fetchAsyncDetailList(effectLevel))
    }
    promise();
  }

  const rowData = useDetailList();
  console.log(rowData)

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <MaterialTable
        title={effectLevel.categoryDetailName + effectLevel.effectName + effectLevel.powerName + "詳細"}
        columns ={[
          { title: 'id', field: 'id', editable:'never' },
          { title: 'LEVEL', field: 'level', type: 'numeric' },
          { title: '効果値', field: 'value', type: 'numeric' },
          
        ]}
        data={ rowData.map((row) =>{return {...row}}) }
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
                const dataUpdate = [...rowData];
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