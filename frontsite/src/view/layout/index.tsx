import React from 'react';
import clsx from 'clsx';
import {useDispatch} from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, makeStyles,Theme, ThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {pageList} from '../../state/page/parameter';
import pageSlice from '../../state/page/slice';
import { AppDispatch } from '../../app/store';

interface ComponentProps {
  mainElement:JSX.Element,
  title:string
}

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
     root: {
        padding: '2px'
      }
    },
    MuiTypography:{
      body1:{
        fontSize:'0.9rem'
      }
    },
    MuiFormLabel:{
      root: {
        marginTop: '2px',
        fontSize:'0.9rem',
        color:'#000000'
      }
    }
  }
});

const drawerWidth = 120;

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    display: 'flex',
    fontSize:'0.5rem'
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor:"#6a1b9a",
    marginRight: theme.spacing(0),
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    backgroundClolor:"#4a148c"
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(0),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0)
  },
  containerShift: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
  },
  content: {
    flexGrow: 1,
    overflow: 'none',
    paddingTop: theme.spacing(4)
  },
  leftMenu: {
    fontSize:'0.5em',
    height:'100%'
  }
}));

export const Index = (componentProps:ComponentProps) => {
  const { mainElement,title } = componentProps
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const dispatch:AppDispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <ThemeProvider theme={theme}>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)}}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List className={classes.leftMenu}>
        {
          pageList.map((page) => {
            return(
              <ListItem key={page.id} button onClick={() => dispatch(pageSlice.actions.selected(page) )}>
                <ListItemText primary={page.title} />
              </ListItem>
            )
          })
        };
        </List>
      </Drawer>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="xl" className={clsx(classes.container, open && classes.containerShift)}>
        <main className={classes.content}>          
            {mainElement}
        </main>
      </Container>
    </div>
    </ThemeProvider>
  );
}

export default Index;