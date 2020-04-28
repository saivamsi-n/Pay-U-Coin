import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import { ListItem, ListItemText, responsiveFontSizes } from '@material-ui/core';
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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
    boldFont:{
        fontWeight:900
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
      hover: {}
}));

class Dashboard extends React.Component {
    constructor(props) {
        super(props);


        this.createData = this.createData.bind(this);
        const userDetails = JSON.parse(localStorage.getItem('userDetails'))
        this.state = {
            open: true,
            profileName: userDetails.firstName[0] + userDetails.lastName[0],
            tokenBalance: "--",
            transactions: []
        }
        const url = 'http://localhost:4000/balance/' + userDetails.publicKey
        Axios.get(url)
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        tokenBalance: response.data.data
                    })
                }
            })

        const urlTransactions = 'http://localhost:4000/transactions/'
        var data = {
            "publicKey": userDetails.publicKey
        }
        Axios.post(urlTransactions, data)
        
            .then(response => {
                var dataRows=[]
                response.data.data.forEach((item, i) => {
                    dataRows.push(this.createData(item.from, item.to, item.createdAt, item.transactionType,item.comments));
                });
                this.setState({ 
                    transactions: dataRows.splice(0,5)
                })
            })

    }
    createData(from,to,createdAt,transactionType,comments) {
        return {from,to,createdAt,transactionType,comments};
    }
    render() {
        const { classes } = this.props;

        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Dashboard
                    </Typography>
                        <IconButton color="inherit">
                            {/* <AccountBoxRoundedIcon style={{ height: 40, width: 40 }} /> */}
                            <Avatar>{this.state.profileName}</Avatar>
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
                            <ListItemText onClick={() => this.props.history.push("/recieve")} primary="Receive" />
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
                        <ListItemText primary="Transactions" />
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
                        <Grid container spacing={3}>
                            {/* Chart */}
                            <Grid item xs={12} md={8} lg={7}>
                                <Paper className={fixedHeightPaper}>
                                    {/* <Chart /> */}
                                    <br/><br/>
                                    <Typography component="p" variant="h5" color="inherit">
                                        <span style={{color:"#3F51B5"}}>Pay U Coin </span>is a platform to send,receive and manage your transactions. You can also recieve awards, tokens by participating in the contests. Please contact us for buying tokens, we would love to send them to you.
                                    </Typography>

                            </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={12} md={4} lg={5}>
                                <Paper className={fixedHeightPaper}>
                                    {/* <Deposits /> */}
                                    <br />
                                    <br />
                                    <Typography component="p" variant="h5" >
                                        Total Balance
                                    </Typography>
                                    <Typography component="p" variant="h4" color="primary">
                                        {this.state.tokenBalance}
                                    </Typography>
                                    <br></br>
                                    <Typography color="textSecondary" variant='p'>
                                        on {new Date().toLocaleString()}
                                    </Typography>
                                </Paper>
                            </Grid>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    {/* <Orders /> */}
                                    <Typography component="p" variant="h5" color="primary">
                                        Recent Transactions
                                    </Typography>    
                                    <br/>         
  
                                                         <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="simple table" color="primary">
                                            <TableHead > 
                                                <TableRow>
                                                    <TableCell className={classes.boldFont}>From</TableCell>
                                                    <TableCell className={classes.boldFont}>To</TableCell>
                                                    <TableCell className={classes.boldFont}>Comments</TableCell>
                                                    <TableCell className={classes.boldFont}>Transaction Type</TableCell>
                                                    <TableCell className={classes.boldFont}>createdAt</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.transactions.map((row) => (
                                                    <TableRow hover classes={{ hover: classes.hover }} className={classes.tableRow} key={row._id}>
                                                        <TableCell  className={classes.tableCell}>{row.from}</TableCell>
                                                        <TableCell className={classes.tableCell}>{row.to}</TableCell>
                                                        <TableCell className={classes.tableCell}>{row.comments}</TableCell>
                                                        <TableCell className={classes.tableCell}>{row.transactionType}</TableCell>
                                                        <TableCell className={classes.tableCell}>{new Date(row.createdAt).toLocaleString()}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </Grid>

                    </Container>
                </main>
            </div>
        );
    }
}

export default withStyles(useStyles)(Dashboard);
