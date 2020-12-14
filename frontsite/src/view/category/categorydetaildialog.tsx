import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import { useDetailList } from '../../state/category/selector';
import { fetchAsyncDetailInsert,fetchAsyncDetailUpdate,fetchAsyncDetailList } from '../../state/category/operation';
import { Category,CategoryDetail } from '../../state/category/type';

export interface DialogProps {
  open: boolean;
  category:Category,
  onClose: () => void;
}

const DetailDialog = (props: DialogProps) => {
  const { onClose, category, open } = props;
  const dispatch:AppDispatch = useDispatch();
  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => {
    if (category.id !== undefined) {
      dispatch(fetchAsyncDetailList())
    }
  }, [category,dispatch])

  const list = useDetailList().filter((row) => row.categoryId === category.id).map((row) => {return {...row}}) as CategoryDetail[]

  const handleInsert = (categoryDetailNew:CategoryDetail) => {
    const promise = async () => {
      await dispatch(fetchAsyncDetailInsert({...categoryDetailNew,categoryId:category.id,categoryName:category.name }))
      await dispatch(fetchAsyncDetailList())
    }
    promise();
  }

  const handleUpdate = (categoryDetailNew:CategoryDetail) => {
    const promise = async () => {
      await dispatch(fetchAsyncDetailUpdate(categoryDetailNew))
      await dispatch(fetchAsyncDetailList())
    }
    promise();
  }


  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <MaterialTable
        title={category.name + "詳細"}
        columns ={[
          { title: 'id', field: 'id', editable:'never' },
          { title: '詳細', field: 'name' },
          { title: 'カテゴリID', field: 'categoryId', hidden:true},
          { title: 'カテゴリ名', field: 'categoryName', hidden:true }
        ]}
        data={ list }
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
                const dataUpdate = [...list];
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