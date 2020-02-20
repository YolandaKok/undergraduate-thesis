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

const styles = theme => ({
    list: {
        overflow: 'auto',
        height: 500,
        backgroundColor: 'beige',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
    },
    listItem: {
        backgroundColor: 'beige',
        paddingBottom: 150
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
                                <ListItem>
                                    Hello
                                </ListItem>
                                <Divider/>
                                <ListItem className={classes.listItem}>
                                    Hello
                                </ListItem>
                                <Divider/>
                                <ListItem className={classes.listItem}>
                                    Hello
                                </ListItem>
                                <Divider/>
                            </List>
                        </Grid>
                        <Grid item xs={10}>
                            <CustomTab/>
                        </Grid>
                    </Grid>
                </Container>
            </Fragment>
        );
    }
}

export default withStyles(styles)(ManageProfile);