import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

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
        let data = this.props.data.split(',');

        return (
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">{this.props.label}</InputLabel>
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
                    {
                        data.map((text, index)=>(
                            <MenuItem value={text} key={index}>{text}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        );
    }
}

export default withStyles(styles)(SelectItemList)