import React from 'react';
import MaterialTable from 'material-table';
import { useAttackNormal } from '../../state/calcurate/selector';

export const Normal = () => {
  const attackNormal = useAttackNormal();

  return(
      <MaterialTable
      title="通常攻撃"
      columns ={[
        { title: '属性', field:'elementName'},
        { title: '最終威力', field: 'result' },
        { title: '攻撃', field: 'attack' },
        { title: 'ｱｻﾙﾄ', field: 'assault'},
        { title: '属性', field: 'element'},
        { title: 'ｳﾞｨｺﾞﾗｽ', field: 'vigorous'},
        { title: 'ﾘﾍﾞﾘｵﾝ', field: 'rebellion'},
        { title: '特殊', field: 'special'},
        { title: 'ﾃｸﾆｶ', field: 'technica'}
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