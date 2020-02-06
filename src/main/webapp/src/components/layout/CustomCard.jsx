import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Route , withRouter} from 'react-router-dom';
import Moment from "react-moment";
import styles from '../../static/modal.module.css';
import {red} from "@material-ui/core/colors";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";

const useStyles = makeStyles({
    media: {
        height: 120,
    },
    menuButton: {
        color: "red",
    }
});

const style = {
    pointerEvents: 'none',
};

const style1 = {
    pointerEvents: 'pointer',
};

export function CustomCard(props) {
    /* Get props for custom cards */
    let title = props.title;
    let content = props.content;
    let href = props.href;
    let date = props.date;
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea onClick={(event) => {props.history.push(href);}}>
                {/*<CardMedia className={classes.media}*/}
                {/*                           title={title}*/}
                {/*                           src="c">*/}
                {/*</CardMedia>*/}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.content}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Read More
                </Button>
                <Button size="small" color="primary">
                    {date}
                </Button>
                {props.removeIcon ? <IconButton onClick={() => props.deleteFunction(props.id, props.functionToCall, props.passThis)} className={classes.menuButton} aria-label="delete">
                    <DeleteIcon />
                </IconButton> : ''}
            </CardActions>
        </Card>
    );
}

CustomCard.defaultProps = {
    date: ''
}

export default withRouter(CustomCard);
