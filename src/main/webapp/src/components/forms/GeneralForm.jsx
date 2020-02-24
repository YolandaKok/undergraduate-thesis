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
    }

    render() {
        const {classes} = this.props;
        console.log(this.props);
        return(
            <Fragment>
                <FormControl>
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    onChange={this.props.handlePostChange}
                                    name="firstname"
                                    id="outlined-full-width"
                                    label="Firstname"
                                    style={{ margin: 8 }}
                                    value={this.props.item.firstname}
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
                                    onChange={this.props.handlePostChange}
                                    name="lastname"
                                    id="outlined-full-width"
                                    label="Lastname"
                                    value={this.props.item.lastname}
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
                                    onChange={this.props.handlePostChange}
                                    name="company"
                                    id="outlined-full-width"
                                    label="Company"
                                    value={this.props.item.company}
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
                                    onChange={this.props.handlePostChange}
                                    name="profession"
                                    id="outlined-full-width"
                                    label="Role"
                                    value={this.props.item.profession}
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
                                    onChange={this.props.handlePostChange}
                                    name="email"
                                    id="outlined-full-width"
                                    label="email"
                                    value={this.props.item.email}
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
                                    onChange={this.props.handlePostChange}
                                    name="summary"
                                    id="outlined-full-width"
                                    label="Summary"
                                    value={this.props.item.summary}
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
                                <Button onClick={this.props.handleSubmit} className={classes.buttonStyle}>Save Changes</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </FormControl>
            </Fragment>
        );
    }
}

export default withStyles(styles)(GeneralForm);