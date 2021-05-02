import React from 'react';
import MaterialTable from 'material-table';
import { useParameter } from '../../state/calculate/selector';
import { Attack } from '../../state/calculate/type';
import {  realValue, resultValue, uncontrolledValue } from '../../domain/calculate/barst/service';
import { AttackProps } from './type';

export const Barst = (attackProps:AttackProps) => {
  const attackBarst = attackProps.attackList;
  const parameter = useParameter();

  const columnList = attackBarst[0].values.filter((row) => row.name !== "攻撃" ).map((row) => {
    return { title: row.name,field:row.name,render:((rowData:Attack) => {return Number(rowData.values.find((line) => line.name === row.name)?.value).toFixed(2)} )}
  } )

  const columns =
    [
      { title: '属性', field:'elementName'},
      { title: 'バースト威力', field: 'real',render: ((rowData:Attack) => {return realValue(rowData,parameter).toFixed(0)})},
      { title: '減衰前', field: 'uncontroll',render: ((rowData:Attack) => {return uncontrolledValue(rowData,parameter).toFixed(0)})},
      { title: '総合', field: 'result',render: ((rowData:Attack) => {return resultValue(rowData).toFixed(0)})},
      { title: '攻撃',field:'攻撃',render:((rowData:Attack) => {return Number(rowData.values.find((line) => line.name === '攻撃')?.value).toFixed(0)})},
    ].concat(
      columnList
    )

  return(
      <MaterialTable
      title="バースト"
      columns ={columns}
      data={ attackBarst.map((row) => {return {...row}}) }
      options={{        
        toolbar:false,
        filtering: false,
        search: false,
        pageSize: 10,
        pageSizeOptions:[10],
        paging:false,
        headerStyle: {
          whiteSpace:'nowrap',
          wordBreak:'keep-all',
          fontSize:'0.9em'
        },
        rowStyle: {
          whiteSpace:'nowrap',
          wordBreak:'keep-all'
        },
        searchFieldStyle:{
          fontSize:'0.9em'
        }
      }}
    />
  )
}

export default Barst;