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

export class SecurityForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validate: false
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("Hello world." + nextProps.validate);
        this.setState({ validate: nextProps.validate});
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
                                    error={this.props.security.errors.password != '' ? true : false}
                                    onChange={this.props.handleSecurityChange}
                                    onKeyUp={this.props.validateData}
                                    type="password"
                                    name="password"
                                    id="outlined-full-width"
                                    label="Old Password"
                                    style={{ margin: 8 }}
                                    value={this.props.security.security.password}
                                    placeholder="Enter your password"
                                    helperText={this.props.security.errors.password != '' ? this.props.security.errors.password : "Should not be empty"}
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
                                    error={this.props.security.errors.newPassword != '' ? true : false}
                                    onChange={this.props.handleSecurityChange}
                                    onKeyUp={this.props.validateData}
                                    type="password"
                                    name="newPassword"
                                    id="outlined-full-width"
                                    label="New Password"
                                    style={{ margin: 8 }}
                                    value={this.props.security.security.newPassword}
                                    placeholder="Enter your new password"
                                    helperText={this.props.security.errors.newPassword != '' ? this.props.security.errors.newPassword : "Should not be empty"}
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
                                    error={this.props.security.errors.repeatNewPassword != '' ? true : false}
                                    onChange={this.props.handleSecurityChange}
                                    onKeyUp={this.props.validateData}
                                    type="password"
                                    name="repeatNewPassword"
                                    id="outlined-full-width"
                                    label="Repeat New Password"
                                    style={{ margin: 8 }}
                                    value={this.props.security.security.repeatNewPassword}
                                    placeholder="Repeat your new password"
                                    helperText={this.props.security.errors.repeatNewPassword != '' ? this.props.security.errors.repeatNewPassword : "Should not be empty"}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} alignItems={'flex-end'}>
                                <Button disabled={this.state.validate} onClick={this.props.handleSubmit}
                                        className={classes.buttonStyle}>Save Changes</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </FormControl>
            </Fragment>
        );
    }
}

export default withStyles(styles)(SecurityForm);