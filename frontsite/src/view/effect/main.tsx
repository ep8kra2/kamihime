import React from 'react';
import { useDispatch } from "react-redux";
import { makeStyles,Theme } from '@material-ui/core/styles'
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Effect } from '../../state/effect/type';
import { fetchAsyncList,fetchAsyncInsert,fetchAsyncUpdate } from '../../state/effect/operation';
import { 
  fetchAsyncDetailList as fetchAsyncCategoryDetailList
} from '../../state/category/operation';
import { useList } from '../../state/effect/selector';
import { useList as useCategoryList } from '../../state/category/selector';
import { useDetailList as useCategoryDetailList } from '../../state/category/selector';
import { AppDispatch } from '../../app/store';


const useStyles = makeStyles((theme:Theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(0)
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

export const Main = () => {
  const classes = useStyles();
  const dispatch:AppDispatch = useDispatch()
  React.useEffect(() => {
    const promise = async () => {
      await dispatch(fetchAsyncCategoryDetailList())
      await dispatch(fetchAsyncList())
    }
    promise();
  }, [dispatch])

  const effectList = useList().map((row) => {return({...row})}) as Effect[];

  const categoryList = useCategoryList();

  const lookupCategoryList = categoryList.reduce((result:any,row) => {
    result[row.id] = row.name
    return result
  },{});

  const categoryDetailList = useCategoryDetailList();
  console.log(categoryDetailList)

  const lookupCategoryDetailList = categoryDetailList.reduce((result:any,row) => {
      result[row.id] = row.name
      return result
    },{}
  );
  
  const handleInsert = (effectNew:Effect) => {
    const promise = async () => {
      await dispatch(fetchAsyncInsert(effectNew));
      await dispatch(fetchAsyncList());
    }
    promise();
  }

  const handleUpdate = (effectNew:Effect) => {
    const promise = async () => {
      await dispatch(fetchAsyncUpdate(effectNew));
      await dispatch(fetchAsyncList());
    }
    promise();
  }

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={classes.paper}>
          <MaterialTable
            title="効果一覧"
            columns ={[
              { title: 'id', field: 'id', editable:'never' },
              { title: '効果名', field: 'name' },
              { title: 'カテゴリ', field: 'categoryId', 
                lookup: lookupCategoryList,
                editComponent: (props) => {
                  console.log(props)
                  return <Select value={props.rowData.categoryId} onChange={e => {props.onRowDataChange({
                      ...props.rowData, categoryId: e.target.value as number, categoryDetailId:categoryDetailList.find((row) => row.categoryId === e.target.value as number)?.id as number
                  })}}>
                      {
                        categoryList.map((row) => <MenuItem value={row.id}>{row.name}</MenuItem>)
                      }
                      </Select>
                }
              },
              { title: 'カテゴリ詳細', field: 'categoryDetailId', 
                lookup: lookupCategoryDetailList,
                editComponent:(props) => {
                  console.log(props)
                  return <Select value={props.rowData.categoryDetailId} onChange={e => {props.onChange(e.target.value)}}>
                      {
                        categoryDetailList.filter((row) => row.categoryId === props.rowData.categoryId ).map((row) => <MenuItem value={row.id}>{row.name}</MenuItem>)
                      }
                      
                    </Select>
                } 
              }
            ]}
            data={ effectList }
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
                  console.log("OK")
                  setTimeout(() => {
                    const dataUpdate = [...effectList];
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

          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Main;