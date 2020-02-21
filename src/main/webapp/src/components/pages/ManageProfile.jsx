import React, {Component, Fragment} from 'react';
import Grid from "@material-ui/core/Grid";
import styles1 from "../../static/signup.module.css";
import Container from "@material-ui/core/Container";
import CustomTab from "../layout/CustomTab";
import CustomBreadCrumb from "../layout/CustomBreadCrumb";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import {grey} from "@material-ui/core/colors";
import dog from '../layout/corgi-and-terrier-running.jpg'
import GeneralForm from "../forms/GeneralForm";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    list: {
        overflow: 'auto',
        height: 550,
        backgroundColor: '#9f8761',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
    },
    listItem: {
        backgroundColor: "#9f8761",
        paddingBottom: 30,
        paddingLeft: 20,
        paddingRight: 10,
        color: "black",
        fontWeight: "600"
    },
    textItem: {
        marginTop: 0,
        fontSize: 12,
        color: "#000"
    }
})

export class ManageProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const {classes} = this.props;
        return(
            <Fragment>
                <Container fixed>
                    <Grid container spacing={2} className={styles1.gridPadding}>
                        <Grid item xs={12}>
                            <CustomBreadCrumb name="Home,Manage Profile" title="Profile" />
                        </Grid>
                        <Grid item xs={2}>
                            <List className={classes.list}>
                                {/*style ={ { backgroundImage: "url('https://lh3.googleusercontent.com/MOf9Kxxkj7GvyZlTZOnUzuYv0JAweEhlxJX6gslQvbvlhLK5_bSTK6duxY2xfbBsj43H=w300')" } }*/}
                                <div>

                                </div>
                                {/*<Divider/>*/}
                                <Typography className={classes.listItem}>
                                    <Typography variant="h6" style={{fontWeight: 530}}>General</Typography>
                                    <Typography variant="body1" className={classes.textItem}>Firstname: Yolanda</Typography>
                                    <Typography variant="body1" className={classes.textItem}>Lastname: Kokkinou</Typography>
                                </Typography>
                                <Divider/>
                                <Typography className={classes.listItem}>
                                    <Typography variant="h6">Summary</Typography>
                                    <Typography variant="body1" className={classes.textItem}>Software Engineer - Specialized in Building web applications</Typography>
                                </Typography>
                                <Divider/>
                            </List>
                        </Grid>
                        <Grid item xs={8}>
                            <Container>
                                <Grid container justify={'center'}>
                                    <Grid item xs={12} component={Paper}>
                                        <CustomTab first={<GeneralForm/>}/>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>
                    </Grid>
                </Container>
            </Fragment>
        );
    }
}

export default withStyles(styles)(ManageProfile);