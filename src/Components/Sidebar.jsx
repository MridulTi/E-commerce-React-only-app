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
import Tooltip from '@mui/material/Tooltip';
import { Avatar, useMediaQuery } from '@mui/material';
import { DashboardCustomize, DashboardCustomizeOutlined, Logout, LogoutOutlined, ShoppingCart, ShoppingCartOutlined } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { useAuth } from '../Context/AuthContext.jsx';
import { BiBell, BiNotification } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import useAxios from '../Hooks/useAxios.js';
import { FaRegUserCircle } from 'react-icons/fa';
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
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userInfo, update, setUserInfo } = useAuth();
  const location = useLocation();

  const isTablet = useMediaQuery(theme.breakpoints.down('md')); // Tablet screens
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Mobile screens

  const [open, setOpen] = React.useState(false);


  const handleDrawer = () => {
    setOpen(!open);
  };

  const [query, setQuery] = React.useState("");
  const [data, setData] = React.useState(null);
  const { response, loading, error } = useAxios({
    method: 'get',
    url: `/products/search?q=${query}`,
  });

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      navigate(`/app/search?q=${query}`);
    }
  };

  React.useEffect(() => {
    if (response !== null) {
      setData(response);
      console.log(response);
    }
  }, [response]);

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          className={`fixed z-20 bg-white border-b ${
            isMobile ? 'px-4 h-12' : isTablet ? 'px-8 h-14' : 'px-20 h-16'
          } flex justify-between items-center`}
        >
          <div className="flex items-center gap-2">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawer}
              edge="start"
              sx={{
                marginRight: 2,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            {!open && (
              <Typography
                variant={isMobile ? "body1" : isTablet ? 'h6' : 'h5'}
                sx={{ fontWeight: 'bold', flexGrow: 1 ,display:isMobile?"none":"block"}}
              >
                ORDER APP
              </Typography>
            )}
          </div>
          <div
            className={`border rounded-full flex items-center ${
              isMobile ? 'w-[70vw] h-8 px-4' : isTablet ? 'w-[50vw] h-10 px-5' : 'w-[30vw] h-10 px-6'
            } bg-gray-100`}
          >
            <BsSearch className="text-grey-1" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search Input"
              className="bg-inherit text-black p-2 w-full h-full outline-0"
            />
          </div>
          <div className="flex items-center gap-4">
            <Tooltip title="Notification" className="z-20">
              <BiBell className="text-2xl text-grey-1" />
            </Tooltip>
            <Tooltip title={userInfo?.name || "My User"} className="z-20">
              {userInfo?.picture ? (
                <Avatar sizes="sm" src={userInfo.picture} />
              ) : (
                <FaRegUserCircle className="text-2xl text-grey-1" />
              )}
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={open}
        onClose={handleDrawer}
      >
        <DrawerHeader>
          {open && (
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', flexGrow: 1, ml: '5%' }}
            >
              ORDER APP
            </Typography>
          )}
          <IconButton onClick={handleDrawer}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            {
              name: 'Dashboard',
              icons: [
                <DashboardCustomize className="text-2xl text-orange-500" />,
                <DashboardCustomizeOutlined className="text-2xl" />,
              ],
            },
            {
              name: 'Cart',
              icons: [
                <ShoppingCart className="text-2xl text-orange-500" />,
                <ShoppingCartOutlined className="text-2xl" />,
              ],
            },
          ].map((item) => (
            <Link to={`/app/${item.name.toLowerCase()}`} key={item.name}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <Tooltip title={item.name} arrow placement="right">
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {location.pathname === `/app/${item.name.toLowerCase()}`
                        ? item.icons[0]
                        : item.icons[1]}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="Logout" arrow placement="right">
              <ListItemButton
                onClick={() => {
                  googleLogout();
                  update(false);
                  setUserInfo(null);
                  navigate('/');
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <LogoutOutlined className="text-red-800" />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
