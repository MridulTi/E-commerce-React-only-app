import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { listItemSecondaryActionClasses, Tooltip } from '@mui/material';
import { MdDashboard, MdSpaceDashboard } from 'react-icons/md';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { DashboardCustomize, DashboardCustomizeOutlined, Logout, LogoutOutlined, SettingsAccessibility, SettingsAccessibilityOutlined, SettingsApplications, SettingsApplicationsOutlined, ShoppingCart, ShoppingCartOutlined } from '@mui/icons-material';
import { googleLogout } from '@react-oauth/google';
import { useAuth } from '../Context/AuthContext.jsx';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function Sidebar() {
  const theme = useTheme();
  const navigate=useNavigate();
  const {userInfo,update,setUserInfo}=useAuth();
  const [open, setOpen] = React.useState(false);
  const location=useLocation();

  const handleDrawer = () => {
    setOpen(!open);
    console.log(userInfo)
  };


  return (
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{display:"flex",justifyContent:"center"}}>
          {open&&<Typography variant='h5' sx={{fontWeight:"bold"}}>ORDER APP</Typography>}
          <IconButton onClick={handleDrawer}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            {
             name:'Dashboard',
             icons:[<DashboardCustomize className='text-3xl text-blue-500'/>,<DashboardCustomizeOutlined className='text-3xl'/>],
            },
            {
              name:'Cart',
              icons:[<ShoppingCart className='text-3xl text-blue-500'/>,<ShoppingCartOutlined className='text-3xl'/>],
             }].map((item, index) => (
            <Link to={`/app/${item.name.toLowerCase()}`}>
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <Tooltip title={item.name} arrow placement="right">
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                  {location?.pathname === `/app/${item.name.toLowerCase()}` ? item.icons[0] : item.icons[1]}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
              </Tooltip>
            </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {['LogOut'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <Tooltip title={text} arrow placement='right'>
              <ListItemButton
              onClick={()=>{
                googleLogout();
                update(false);
                setUserInfo(null)
                navigate("/")
              }}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                  {index % 2 === 0 ? <Logout className='text-red-600'/> : <LogoutOutlined className='text-red-800'/>}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Drawer>
  );
}