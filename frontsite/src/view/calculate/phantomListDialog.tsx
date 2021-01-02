import React from 'react';
import {useDispatch} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import { useList as usePhantomList } from '../../state/phantom/selector';
import calcurateSlice from '../../state/calculate/slice';

type DialogProps = {
  open:boolean,
  slot:number,
  onClose: () => void
}

export const PhantomListDialog = (props:DialogProps) => {
  const {open,slot,onClose} = props;
  const dispatch = useDispatch();
  const phantomList = usePhantomList().map((row) => {return{ ...row}});

  const handelSelectedPhantom = (phantomId:number) => {
    const rowData = phantomList.find((row) => row.id === phantomId);
    if(rowData !== undefined) {
      dispatch(calcurateSlice.actions.changedPhantom({slot:slot,phantom:rowData})); 
    }
    onClose();
  }

  const handleDelete = () => {
    dispatch(calcurateSlice.actions.deletePhantom(slot));
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
        <DialogTitle id="alert-dialog-title">{"幻獣選択画面"}</DialogTitle>
        <DialogContent>
          <MaterialTable
            title="武器一覧"
            columns ={[
              { title: 'id', field: 'id',hidden:true },
              { title: '幻獣', field: 'name' },
              { title: '属性', field: 'elementName'},
              { title: 'レア', field: 'rarityName'},
              { title: 'メイン効果', field: 'mainSkillName'},
              { title: 'サブ効果', field: 'subSkillName'}
            ]}
            data={ phantomList }
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
            onRowClick={(event,rowData) => {handelSelectedPhantom(rowData?.id as number)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            幻獣削除
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>      
    </React.Fragment>
  );
}

export default PhantomListDialog;