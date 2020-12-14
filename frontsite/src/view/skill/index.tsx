import React from 'react';
import * as Layout from '../layout/index';
import Main from './main';

export const Index = () => {
  return(
    <React.Fragment>
      <Layout.Index 
        mainElement = {<Main />}
        title = {"スキル登録"}
      />
    </React.Fragment>
  )
}

export default Index;
