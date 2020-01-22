import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    button: {
        display: 'block',
    },
    formControl: {
        minWidth: 120,
    },
});

export class SelectItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "open": false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleChange(event) {
        console.log("Value: " + event.target.value);
    }

    handleClose() {
        this.setState({"open": false});
    }

    handleOpen() {
        this.setState({"open": true});
    }

    componentDidMount() {

    }

    render() {
        const { classes } = this.props;

        return (
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Library</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={this.state.open}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    value={this.props.library}
                    onChange={this.props.passedFunction}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"ORTools"}>ORTools</MenuItem>
                    <MenuItem value={"py"}>py</MenuItem>
                </Select>
            </FormControl>
        );
    }
}

export default withStyles(styles)(SelectItemList)