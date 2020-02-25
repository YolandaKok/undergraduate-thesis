import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {AccountCircle, Archive, ExpandLess, ExpandMore, LocalLibrary, StarBorder} from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import styles from '../../static/modal.module.css';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    grow: {
        flexGrow: 1
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    centerItem: {
        justify: "center"
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        justifyContent: "flex-end"},
    avatarStyle: {
        cursor: "pointer",
    }
}));

function ResponsiveDrawer(props) {
    const { history } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openLibrary, setLibraryOpen] = React.useState(false);

    // menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    // mobile menu
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleLibraryClick = () => {
        console.log("open library.");
        setLibraryOpen(!openLibrary);
    };

    // menu
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    // mobile menu
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleSignOut = () => {
        localStorage.setItem('authorization', null);
        localStorage.setItem('username_info', null);
        history.push("/");
    };

    /* Handle Drawer Open */
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const goToExperiments = () => {
        history.push('/myexperiments');
    }

    const goToProfile = () => {
        history.push('/profile');
    }

    const drawer = (
        <div>
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                <Fragment>
                    <ListItem button key={'Overview'} href='/' component="a">
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Overview'} />
                    </ListItem>
                    <Divider />
                </Fragment>
                <Fragment>
                    <ListItem button key={'My Experiments'} href='/myexperiments' component="a">
                        <ListItemIcon>
                            <Archive/>
                        </ListItemIcon>
                        <ListItemText primary={'My Experiments'} />
                    </ListItem>
                    <Divider />
                </Fragment>
            </List>
            <List>
                <ListItem button  onClick={handleClick}>
                    <ListItemIcon>
                        <LibraryBooksIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Libraries"} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested} onClick={handleLibraryClick}>
                            <ListItemIcon>
                                <LocalLibrary />
                            </ListItemIcon>
                            <ListItemText primary="Google OR Tools" />
                            {openLibrary ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openLibrary} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {props.algorithmLinks.map((text) => (
                                    <ListItem button className={classes.nested} key={text.title} href={text.url} component="a">
                                        <ListItemIcon>
                                            <ChevronRightIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={text.title} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </List>
                </Collapse>
            </List>
            <Divider />
        </div>
    );

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <div className={styles.modal}>
                <span className={styles.dot}></span>
                <p className={styles.modalItem}>{props.firstname + " " + props.lastname}</p>
            </div>
            <hr></hr>
            <MenuItem className={styles.buttonStyle} onClick={goToProfile}>Manage your Profile</MenuItem>
            <hr></hr>
            <MenuItem onClick={goToExperiments}>Saved Experiments</MenuItem>
            <hr></hr>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

        </Menu>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                style={{backgroundColor: '#9f8761', color: 'white'}}
                position="fixed"
                            className={clsx(classes.appBar, {
                                [classes.appBarShift]: openDrawer
                            })}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, openDrawer && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        <a className={styles.logoStyle} href={'/'}>Visualize Zone</a>
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Avatar className={classes.avatarStyle}
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit">{props.firstname.charAt(0) + props.lastname.charAt(0)}</Avatar>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
            {renderMobileMenu}
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={openDrawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                {drawer}
            </Drawer>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default withRouter( ResponsiveDrawer );
