import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import { ListItem, ListItemText, responsiveFontSizes, Box, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import { Avatar } from '@material-ui/core';
import CallReceivedIcon from '@material-ui/icons/CallReceived';

import QRCode from 'react-qr-code';

const drawerWidth = 240;

const useStyles = ((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24,
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
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    themeBackground: {
        // backgroundColor: "#3F51B5",
        color: "#3F51B5",
        fontWeight: "bold"
    },
    fixedHeight: {
        height: 240,
    },
    sendthemeHeight: {
        height: 500,
    },
    boldFont: {
        fontWeight: 900
    },
    hover: {},


}));


class ReceiveTokens extends React.Component {
    constructor(props) {
        super(props);

        const userDetails = JSON.parse(localStorage.getItem('userDetails'))
        this.handleLogout = this.handleLogout.bind(this)

    
        console.log(userDetails)

        if (localStorage.getItem('userDetails')==null) {
            this.props.history.push("/signin")
        }
        this.state = {
            open: true,
            profileName: userDetails.firstName[0] + userDetails.lastName[0],
            publicAddress: userDetails.publicKey,
        }
    }
    handleLogout(){
        this.props.history.push("/signin")
    }
    

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <Typography component="h1" variant="h4" color="inherit" noWrap className={classes.title}>
                            Receive
                    </Typography>
                        <IconButton color="inherit">
                            {/* <AccountBoxRoundedIcon style={{ height: 40, width: 40 }} /> */}
                            
                            <Avatar style={{backgroundColor:"white", color:"#3F51B5"}}>{this.state.profileName}</Avatar>
                            <Button
                            style={{marginLeft:20, color:"#3F51B5", backgroundColor:"white"}}
                            onClick={this.handleLogout}
                            fullWidth
                            variant="contained"

                            className={classes.submit}
                        >LOGOUT
                            </Button>                           
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <Divider />
                    <List ><ListItem button>
                        <ListItemText onClick={() => this.props.history.push("/send")} primary="Send / Pay" />
                    </ListItem>
                        <ListItem button>
                            <ListItemText className={classes.themeBackground} onClick={() => this.props.history.push("/recieve")} primary="Receive" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Offers" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Contests" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Gift Cards" />
                        </ListItem></List>
                    <Divider />

                    <List><ListItem button>
                        <ListItemText onClick={() => this.props.history.push("/transactions")} primary="Transactions" />
                    </ListItem>
                        <ListItem button>
                            <ListItemText primary="Graphs" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Customers" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Reports" />
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container justify="center">
                            {/* main */}

                            <Grid item xs={12} md={1} lg={1} />

                            <Grid item xs={12} md={8} lg={10}>
                                <Paper className={classes.sendthemeHeight}>

                                    <Grid container style={{ paddingTop: 100 }}>
                                        <Grid item xs={12} md={1} lg={2} />
                                        <Grid item xs={12} md={10} lg={8} >
                                            <div>

                                                <QRCode value={this.state.publicAddress} />
                                                <br /><br />
                                                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                                                    {this.state.publicAddress}
                                                </Typography>
                                                <CallReceivedIcon color="primary" style={{ fontSize: "90px" }}></CallReceivedIcon>

                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={1} lg={2} />
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={1} lg={1} />


                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}

export default withStyles(useStyles)(ReceiveTokens);
