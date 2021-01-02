import React from 'react';
import MaterialTable from 'material-table';
import PhantomListDialog from './phantomListDialog';
import {useListPhantom, useSelectedPhantom } from '../../state/calculate/selector';
import { useDispatch } from 'react-redux';
import { calcurateSlice } from '../../state/calculate/slice';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { SelectedPhantom } from '../../state/calculate/type';
import { getPhantomHp,getPhantomAt } from '../../domain/phantom/service';

export const SelectedPhantomList = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const phantomList = useListPhantom().map((row) => {return{...row}})
  const selected = useSelectedPhantom();

  const lookupRank = {
    1:1,
    2:2,
    3:3,
    4:4,
    5:5,
    6:6
  }

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


  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = (rowData:SelectedPhantom) => {
    dispatch(calcurateSlice.actions.editPhantom(rowData))
  }

  const handleClickOpen = (slot:number | undefined) => {
    if(slot=== undefined) {return}
    dispatch(calcurateSlice.actions.selectedPhantom(slot as number))
    setOpen(true);
  };

  return (
    <React.Fragment>
      <MaterialTable
        columns ={[
          { title: 'slot', field: 'slot', editable:'never'},
          { title: 'id', field: 'phantom.id', hidden:true},
          { title: '幻獣', field: 'phantom.name', editable:'never' },
          { title: '属性', field: 'phantom.elementName', editable:'never' },
          { title: 'レアリティ', field: 'phantom.rarityName', editable:'never' },
          { title: 'メインスキル', field: 'phantom.mainSkillName', editable:'never'},
          { title: 'サブスキル', field: 'phantom.subSkillName', editable:'never'},
          { title: 'HP', field: 'hp', editable:'never', render: ((rowData:SelectedPhantom) => {return getPhantomHp(rowData.phantom,rowData.level).toFixed(0)})},
          { title: 'AT', field:'at', editable:'never', render: ((rowData:SelectedPhantom) => {return getPhantomAt(rowData.phantom,rowData.level).toFixed(0)})},
          { title: '限界突破',field: 'rank', type:'numeric',lookup: lookupRank,
            editComponent:(props) => {
              return <Select value={props.rowData.rank} onChange={e => {props.onChange(e.target.value)}}>
                {
                  Object.values(lookupRank).filter((value) => value <= (props.rowData.phantom.limitBreak === 1 ? 6 : 5)).map((value) => {
                    return(<MenuItem key={value} value={value}>{value}</MenuItem>)
                  })
                }
              </Select>              

            }
          },        
          { title: 'level',field: 'level', type:'numeric', lookup: lookupLevelList,
            editComponent:(props) => {
              return <Select value={props.rowData.level} onChange={e => {props.onChange(e.target.value)}}>
                {
                  Object.values(lookupLevelList).filter((value) => value <= (props.rowData.rank === 6 ? 150 : props.rowData.rank * 15 + 25)).map((value) => {
                    return(<MenuItem key={value} value={value}>{value}</MenuItem>)
                  })
                }
              </Select>
            }
          },
          { title: '備考', field:'marks',align:'center', editable:'never'}
        ]}
        data={ phantomList }
        editable={{
          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...phantomList];
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
      <PhantomListDialog open={open} slot={selected.slot}  onClose={handleClose} />
    </React.Fragment>
    
  );
}

export default SelectedPhantomList;