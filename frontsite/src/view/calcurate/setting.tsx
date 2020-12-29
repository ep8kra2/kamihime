import React from 'react';
import { makeStyles,Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Etc from './etc';
import SelectedWeaponList from './selectedweaponlist';
import SelectedPhantomList from './selectedPhantomList';

const useStyles = makeStyles((theme:Theme) => ({
  paper: {
    padding:theme.spacing(0)
  },
  appbar: {
    backgroundColor:'#8e24aa',
    padding: theme.spacing(0),
    minHeight:'36px'
    
  },
  box: {
    padding:theme.spacing(0)
  }
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`summary${index}`}
      aria-labelledby={`summaryTabpanel${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} className={classes.box}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `summary${index}`,
    'aria-controls': `summaryTabpanel${index}`,
  };
}

export const Summary = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return(
    <Paper className={classes.paper}>
      <AppBar position="static" className={classes.appbar}>
        <Tabs value={value} onChange={handleChange} aria-label="summaryLabel">
          <Tab label="各設定" {...a11yProps(0)} />
          <Tab label="武器選択" {...a11yProps(1)} />
          <Tab label="幻獣選択" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Etc />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SelectedWeaponList/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SelectedPhantomList/>
      </TabPanel>

    </Paper>
  )
}

export default Summary;