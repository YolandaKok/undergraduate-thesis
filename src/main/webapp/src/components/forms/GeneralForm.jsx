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
            item: {
                id: '',
                firstname: '',
                lastname: '',
                email: '',
                company: '',
                profession: '',
                summary: ''
            }
        }
        this.handlePostChange = this.handlePostChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(SERVICE_URL + '/users/' + localStorage.getItem("username_info"), {
            headers: {"Authorization": localStorage.getItem('authorization')}
        })
        .then((response) => {
            console.log(response.data);
            this.setState({"item": response.data});
        }, (error) => {
            console.log(error);
        });
    }

    handlePostChange(event) {
        let nam = event.target.name;
        let val = event.target.value;

        let newState = Object.assign({}, this.state);
        newState.item[nam] = val;
        this.setState(newState);

        console.log(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.put(SERVICE_URL + '/users/' + this.state.item.id, this.state.item, {
            headers: {"Authorization": localStorage.getItem('authorization')}
        })
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    }

    render() {
        const {classes} = this.props;
        return(
            <Fragment>
                <FormControl>
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    onChange={this.handlePostChange}
                                    name="firstname"
                                    id="outlined-full-width"
                                    label="Firstname"
                                    style={{ margin: 8 }}
                                    value={this.state.item.firstname}
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
                                    onChange={this.handlePostChange}
                                    name="lastname"
                                    id="outlined-full-width"
                                    label="Lastname"
                                    value={this.state.item.lastname}
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
                                    onChange={this.handlePostChange}
                                    name="company"
                                    id="outlined-full-width"
                                    label="Company"
                                    value={this.state.item.company}
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
                                    onChange={this.handlePostChange}
                                    name="profession"
                                    id="outlined-full-width"
                                    label="Role"
                                    value={this.state.item.profession}
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
                                    onChange={this.handlePostChange}
                                    name="email"
                                    id="outlined-full-width"
                                    label="email"
                                    value={this.state.item.email}
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
                                    onChange={this.handlePostChange}
                                    name="summary"
                                    id="outlined-full-width"
                                    label="Summary"
                                    value={this.state.item.summary}
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
                                <Button onClick={this.handleSubmit} className={classes.buttonStyle}>Save Changes</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </FormControl>
            </Fragment>
        );
    }
}

export default withStyles(styles)(GeneralForm);