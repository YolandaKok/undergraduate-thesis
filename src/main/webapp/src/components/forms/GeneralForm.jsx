import React, {Component, Fragment} from 'react';
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
const axios = require('axios');

const styles = theme => ({
    buttonStyle: {
        backgroundColor: "#6f5a36",
        color: "#fff",
        margin: 8,
        '&:hover': {
            backgroundColor: '#9f8761',
            color: "#000"
        }
    }
})

export class GeneralForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validate: true
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("General props: " + nextProps.validateGeneral);
        this.setState({ validate: nextProps.validateGeneral});
    }

    render() {
        const {classes} = this.props;
        console.log(this.props);
        return(
            <Fragment>
                <FormControl>
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={6} xl={6}>
                                <TextField
                                    error={this.props.data.userInfoErrors.firstname != '' ? true : false}
                                    onKeyUp={this.props.validateData}
                                    onChange={this.props.handlePostChange}
                                    name="firstname"
                                    id="outlined-full-width"
                                    label="Firstname"
                                    style={{ margin: 8 }}
                                    value={this.props.data.item.firstname}
                                    placeholder="Enter your firstname"
                                    helperText={this.props.data.userInfoErrors.firstname != '' ? this.props.data.userInfoErrors.firstname : "Should not be empty"}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={6} xl={6}>
                                <TextField
                                    error={this.props.data.userInfoErrors.lastname != '' ? true : false}
                                    onKeyUp={this.props.validateData}
                                    onChange={this.props.handlePostChange}
                                    name="lastname"
                                    id="outlined-full-width"
                                    label="Lastname"
                                    value={this.props.data.item.lastname}
                                    style={{ margin: 8 }}
                                    placeholder="Enter your lastname"
                                    helperText={this.props.data.userInfoErrors.lastname != '' ? this.props.data.userInfoErrors.lastname : "Should not be empty"}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={6} xl={6}>
                                <TextField
                                    onKeyUp={this.props.validateData}
                                    onChange={this.props.handlePostChange}
                                    name="company"
                                    id="outlined-full-width"
                                    label="Company"
                                    value={this.props.data.item.company}
                                    style={{ margin: 8 }}
                                    placeholder="Enter your company name"
                                    helperText="Should not be empty"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={6} xl={6}>
                                <TextField
                                    onKeyUp={this.props.validateData}
                                    onChange={this.props.handlePostChange}
                                    name="profession"
                                    id="outlined-full-width"
                                    label="Role"
                                    value={this.props.data.item.profession}
                                    style={{ margin: 8 }}
                                    placeholder="Enter your professional role"
                                    helperText="Should not be empty"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={this.props.data.userInfoErrors.email != '' ? true : false}
                                    onKeyUp={this.props.validateData}
                                    onChange={this.props.handlePostChange}
                                    name="email"
                                    id="outlined-full-width"
                                    label="email"
                                    value={this.props.data.item.email}
                                    style={{ margin: 8 }}
                                    placeholder="Enter your email"
                                    helperText={this.props.data.userInfoErrors.email != '' ? this.props.data.userInfoErrors.email : "Should not be empty"}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onKeyUp={this.props.validateData}
                                    onChange={this.props.handlePostChange}
                                    name="summary"
                                    id="outlined-full-width"
                                    label="Summary"
                                    value={this.props.data.item.summary}
                                    style={{ margin: 8 }}
                                    placeholder="Write a summary about yourself"
                                    helperText="Max characters: 500"
                                    fullWidth
                                    multiline
                                    rows="4"
                                    marginTop="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} alignItems={'flex-end'}>
                                <Button disabled={this.state.validate} onClick={this.props.handleSubmit} className={classes.buttonStyle}>Save Changes</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </FormControl>
            </Fragment>
        );
    }
}

export default withStyles(styles)(GeneralForm);