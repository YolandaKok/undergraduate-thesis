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
        minWidth: 100,
        margin: 4,
        color: 'blue',
    },
    selectStyle: {
        boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    },
    inputStyle: {
        padding: 3
    }
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
                <InputLabel id="demo-controlled-open-select-label" className={classes.inputStyle}>{this.props.label}</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={this.state.open}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    value={this.props.library}
                    onChange={this.props.passedFunction}
                    className={classes.selectStyle}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        this.props.data.map((text, index)=>(
                            <MenuItem value={text} key={index}>{text}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        );
    }
}

export default withStyles(styles)(SelectItemList)