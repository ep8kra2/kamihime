import React from 'react';
import MaterialTable from 'material-table';
import PhantomListDialog from './WeaponListDialog';
import {useListPhantom, useSelectedPhantom } from '../../state/calcurate/selector';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { calcurateSlice } from '../../state/calcurate/slice';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme:Theme) => ({
  paper: {
    padding:theme.spacing(1)
  },
  typography: {
    width:'100%',
    height:'48px',
    color:'#FFFFFF',
    fontSize:'0.9rem',
    paddingTop:'14px',
    paddingLeft:theme.spacing(2),
    backgroundColor: '#7b1fa2'
  }
}));

export const SelectedPhantomList = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const dispatch:AppDispatch = useDispatch();
  const phantomList = useListPhantom();
  const selected = useSelectedPhantom();

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (slot?:number) => {
    dispatch(calcurateSlice.actions.selectedPhantom(slot as number))
    setOpen(true);
  };

  return (
    <React.Fragment>
      <MaterialTable
        columns ={[
          { title: 'slot', field: 'slot' },
          { title: 'id', field: 'id', hidden:true},
          { title: '幻獣', field: 'name' },
          { title: 'メインスキル', field: 'skill1'},
          { title: 'サブスキル', field: 'skill2'},
          { title: 'HP', field: 'hp'},
          { title: 'AT', field:'at'},
          { title: 'level',field: 'level'},
          { title: '備考', field:'marks'}
        ]}
          data={ phantomList.map((row) => {return {
            slot:row.slot,
            id:row.phantom?.id,
            name:row.phantom?.name,
            skill1:'',
            skill2:'',
            hp:row.phantom?.maxHp,
            at:row.phantom?.maxAt,
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
      <PhantomListDialog open={open} slot={selected.slot}  onClose={handleClose} />
    </React.Fragment>
    
  );
}

export default SelectedPhantomList;