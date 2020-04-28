import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import { ListItem, ListItemText, responsiveFontSizes, Box } from '@material-ui/core';
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
import QrReader from 'react-qr-reader'
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';

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
    fixedHeight: {
        height: 240,
    },
    sendthemeHeight: {
        height: 600,
    },
    boldFont: {
        fontWeight: 900
    },
    tableRow: {
        "&$hover:hover": {
            backgroundColor: "#3F51B5"
        }
    },
    tableCell: {
        "$hover:hover &": {
            color: "white"
        }
    },
    hover: {},
    themeBackground: {
        // backgroundColor: "#3F51B5",
        color: "#3F51B5",
        fontWeight: "bold"
    },
    sendthemeContent: {
        width: 600,
        padding: 100
    }

}));

class SendTokens extends React.Component {
    constructor(props) {
        super(props);


        this.createData = this.createData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSendTokens = this.handleSendTokens.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        const userDetails = JSON.parse(localStorage.getItem('userDetails'))
        if (localStorage.getItem('userDetails') ==null) {
            console.log("ssss")
           this.props.history.push("/signin");
        }
        this.state = {
            open: true,
            profileName: userDetails.firstName[0] + userDetails.lastName[0],     
            senderAddress: "",
            tokens: 0,
            comments:"",
            transactionType: ""
        }

    }
    createData(from, to, createdAt, transactionType, comments) {
        return { from, to, createdAt, transactionType, comments };
    }
    handleChange(e) {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            console.log(this.state)
        })
    }
    handleLogout(){
        localStorage.clear()
        console.log("here")
        this.props.history.push("/signin");
    }

    handleSendTokens(){
        const userDetails = JSON.parse(sessionStorage.getItem('userDetails'))
        const urlTransactions = 'http://localhost:4000/send/'
        var data = {
            "fromAddress": userDetails.publicKey,
            "toAddress": this.state.senderAddress,
            "tokens": this.state.tokens,
            "comments": this.state.comments,
            "transactionType": this.state.transactionType
        }
        Axios.post(urlTransactions, data)

            .then(response => {
                console.log(response)
                if(response.data.success){
                    alert(response.data.message)
                    this.setState({
                        open: true,
                        profileName: "",
                        senderAddress: "",
                        tokens: 0,
                        comments:"",
                        transactionType: ""
                    },()=>{
                        console.log(this.state)
                    })
                }
                else{
                    alert(response.data.message)
                }
            })
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <Typography component="h1" variant="h4" color="inherit" noWrap className={classes.title}>
                            Send / Pay
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
                        <ListItemText className={classes.themeBackground} onClick={() => this.props.history.push("/send")}   primary="Send / Pay" />
                    </ListItem>
                        <ListItem button>
                            <ListItemText onClick={() => this.props.history.push("/recieve")}  primary="Receive" />
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
                        <ListItemText  onClick={() => this.props.history.push("/transactions")} primary="Transactions" />
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
                        <ListItem button>
                            <ListItemText primary="Integrations" />
                        </ListItem></List>      </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container justify="center">
                            {/* main */}

                            <Grid item xs={12} md={1} lg={1} />

                            <Grid item xs={12} md={8} lg={10}>
                                <Paper className={classes.sendthemeHeight}>
                                    
                                    <Grid container style={{paddingTop:100}}>
                                        <Grid item xs={12} md={1} lg={2} />
                                        <Grid item xs={12} md={10} lg={8} >
                                            <div>
                                            <SendIcon color="primary" style={{fontSize:"60px"}}></SendIcon>

                                            <form noValidate id="sendTokens">
                                                <TextField
                                                    onChange={this.handleChange}
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="senderPublicKey"
                                                    label="Sender Public Key"
                                                    name="senderAddress"
                                                    autoFocus
                                                    value={this.state.senderAddress}
                                                />
                                                 <TextField
                                                    onChange={this.handleChange}
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="tokens"
                                                    label="Tokens"
                                                    name="tokens"
                                                    type="number"
                                                    value={this.state.tokens}
                                                />
                                                  <TextField
                                                    onChange={this.handleChange}
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="commetns"
                                                    label="Comments"
                                                    name="comments"
                                                    value={this.state.comments}
                                                />
                                                  <TextField
                                                    onChange={this.handleChange}
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="transactionType"
                                                    label="Transaction Type"
                                                    name="transactionType"
                                                    value={this.state.transactionType}
                                                />
                                                <Button
                                                    onClick={this.handleSendTokens}
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.submit}
                                                >
                                                            Send Tokens
                                                </Button>
                                            </form>
                                            
                                            <br></br>
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

export default withStyles(useStyles)(SendTokens);
