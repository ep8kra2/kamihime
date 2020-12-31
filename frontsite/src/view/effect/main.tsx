import React from 'react';
import { useDispatch } from "react-redux";
import { makeStyles,Theme } from '@material-ui/core/styles'
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Effect } from '../../state/effect/type';
import { fetchAsyncList,fetchAsyncInsert,fetchAsyncUpdate } from '../../state/effect/operation';
import { fetchAsyncList as fetchAsyncCategoryList } from '../../state/category/operation';
import { useList } from '../../state/effect/selector';
import { useList as useCategoryList } from '../../state/category/selector';
import { useList as useImpactList } from '../../state/impact/selector';
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
      await dispatch(fetchAsyncList())
      await dispatch(fetchAsyncCategoryList())
    }
    promise();
  }, [dispatch])

  const effectList = useList().map((row) => {return({...row})}) as Effect[];

  const categoryList = useCategoryList();
  console.log(categoryList)
  const impactList = useImpactList();
  const lookupCategoryList = categoryList.reduce((result:any,row) => {
    result[row.id] = row.name
    return result
  },{});
  const lookupImpactList = impactList.reduce((result:any,row) => {
    result[row.id] = row.name
    return result
  },{});

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
                lookup: lookupCategoryList
              },
              { title: '影響', field: 'impactId', 
                lookup: lookupImpactList, 
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