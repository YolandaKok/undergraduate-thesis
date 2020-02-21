import React, {Component, Fragment} from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import {AccountCircle} from "@material-ui/icons";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

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

    }

    render() {
        const {classes} = this.props;
        return(
            <Fragment>
                <FormControl>
                    <Container>
                        <Grid container spacing={3} alignItems={'center'} justify={'center'}>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-full-width"
                                    label="Firstname"
                                    style={{ margin: 8 }}
                                    placeholder="Enter your firstname"
                                    helperText="Should not be empty"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-full-width"
                                    label="Lastname"
                                    style={{ margin: 8 }}
                                    placeholder="Enter your lastname"
                                    helperText="Should not be empty"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-full-width"
                                    label="Company"
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
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-full-width"
                                    label="Role"
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
                                    id="outlined-full-width"
                                    label="email"
                                    style={{ margin: 8 }}
                                    placeholder="Enter your email"
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
                                    id="outlined-full-width"
                                    label="Summary"
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
                                <Button className={classes.buttonStyle}>Save Changes</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </FormControl>
            </Fragment>
        );
    }
}

export default withStyles(styles)(GeneralForm);