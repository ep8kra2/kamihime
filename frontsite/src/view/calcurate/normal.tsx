import React from 'react';
import MaterialTable from 'material-table';
import { useAttackNormal } from '../../state/calcurate/selector';
import { AttackNormal } from '../../state/calcurate/type';

const resultValue = (rowData:AttackNormal) => {
  return rowData.attack * (1 + (rowData.assault / 100)) * (1 + (rowData.element / 100)) * (1 + (rowData.vigorous / 100)) * ( 1 + (rowData.rebellion / 100)) * (1 + (rowData.special/100)) * (1 + (rowData.technica/100))
}

export const Normal = () => {
  const attackNormal = useAttackNormal() as AttackNormal[];


  return(
      <MaterialTable
      title="通常攻撃"
      columns ={[
        { title: '属性', field:'elementName'},
        { title: '総合', field: 'result',render: (rowData) => {return resultValue(rowData).toFixed(0) }},
        { title: '攻撃', field: 'attack' ,render:(rowData) => {return rowData.attack.toFixed(2)}},
        { title: 'ｱｻﾙﾄ', field: 'assault',render:(rowData) => {return rowData.assault.toFixed(2)}},
        { title: '属性', field: 'element',render:(rowData) => {return rowData.element.toFixed(2)}},
        { title: 'ｳﾞｨｺﾞﾗｽ', field: 'vigorous',render:(rowData) => {return rowData.vigorous.toFixed(2)}},
        { title: 'ﾘﾍﾞﾘｵﾝ', field: 'rebellion',render:(rowData) => {return rowData.rebellion.toFixed(2)}},
        { title: '特殊', field: 'special',render:(rowData) => {return rowData.special.toFixed(2)}},
        { title: 'ﾃｸﾆｶ', field: 'technica',render:(rowData) => {return rowData.technica.toFixed(2)}}
      ]}
      data={ attackNormal.map((row) => {return {...row}}) }
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

export default Normal;