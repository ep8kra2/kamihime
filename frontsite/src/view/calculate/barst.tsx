import React from 'react';
import MaterialTable from 'material-table';
import { useAttackBarst, useParameter } from '../../state/calculate/selector';
import { useList as useImpactList } from '../../state/impact/selector';
import { Attack } from '../../state/calculate/type';
import { getUncontrolledValue } from '../../domain/calculate/service';
import { getRealValue } from '../../domain/calculate/barst/service';


export const Barst = () => {
  const attackBarst = useAttackBarst() as Attack[];
  const parameter = useParameter();
  const impactList = useImpactList();

  const filterList = Object.keys(attackBarst[0]).filter((key) => key !== 'elementId' && key !== 'elementName' && key !== 'attack' && key !== 'バースト' && key !== 'バースト上限UP')
      
  const columnList = filterList.map((key) => {
    return { title: key,field:key,render:((rowData:Attack) => {return Number(rowData[key]).toFixed(2)})}
  } )

  // 総合攻撃力
  const resultValue = (rowData:Attack) => {
    const result = Object.entries(rowData).filter(([key]) =>{ 
      return (impactList.find((row) => row.name === key && row.impactTypeId === 1) !== undefined) || key === 'attack'
    }).reduce((result,[key, value]) => {
      result = result * (key === "attack"? Number(value) :1 + Number(value) / 100)
      return result
    },1 )

    return result
  }

  const uncontrolledValue = (rowData:Attack):number => {
    return getUncontrolledValue(resultValue(rowData),parameter)
  }

  const realValue = (rowData:Attack):number => {
    const limitBreak = Object.entries(rowData).find(([key]) =>{ 
      return impactList.find((row) => row.name === key && row.impactTypeId === 3) !== undefined
    })
  
    const limitBreakValue = (limitBreak === undefined)? 0 : Number(limitBreak[1])
    return getRealValue(uncontrolledValue(rowData),limitBreakValue)
  }



  const columns =
    [
      { title: '属性', field:'elementName'},
      { title: 'バースト威力', field: 'real',render: ((rowData:Attack) => {return realValue(rowData).toFixed(0)})},
      { title: '減衰前', field: 'uncontroll',render: ((rowData:Attack) => {return uncontrolledValue(rowData).toFixed(0)})},
      { title: '総合', field: 'result',render: ((rowData:Attack) => {return resultValue(rowData).toFixed(0)})},
      { title: '攻撃力', field: 'attack',render: ((rowData:Attack) => {return Number(rowData.attack).toFixed(2)})},
      { title: 'バースト', field: 'バースト',render: ((rowData:Attack) => {return Number(rowData["バースト"]).toFixed(2) })},
      { title: 'バースト上限UP', field: 'バースト上限UP',render: ((rowData:Attack) => {return (Number(rowData["バースト上限UP"])).toFixed(2) })},
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