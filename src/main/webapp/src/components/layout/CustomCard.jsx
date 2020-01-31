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

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 120,
    },
});

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
                <CardMedia
                    className={classes.media}
                    title={title}
                    src="c"
                />
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
                    Learn More
                </Button>
                <Button>
                    {date}
                </Button>
            </CardActions>
        </Card>
    );
}

CustomCard.defaultProps = {
    date: ''
}

export default withRouter(CustomCard);
