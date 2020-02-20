import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Route , withRouter} from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    media: {
        height: 120,
    },
    menuButton: {
        color: "red",
    },
    cardStyle: {
        backgroundColor: "#d1b78f"
    },
    cardAction: {
        backgroundColor: "#9f8761",
        color: "black"
    },
    styleButton: {
        backgroundColor: "#d1b78f",
        color: 'black'
    }
})

export class CustomCard extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        /* Get props for custom cards */
        let title = this.props.title;
        let content = this.props.content;
        let href = this.props.href;
        let date = this.props.date;
        const {classes} = this.props;
        return (
            <Card className={classes.cardStyle}>
                <CardActionArea className={classes.cardAction} onClick={(event) => {this.props.history.push(href);}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.title}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {this.props.content}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.styleButton}>
                    <Button size="small" color="black">
                        Read More
                    </Button>
                    <Button size="small" color="black">
                        {date}
                    </Button>
                    {this.props.removeIcon ? <IconButton onClick={() => this.props.deleteFunction(this.props.id, this.props.functionToCall, this.props.passThis)} className={classes.menuButton} aria-label="delete">
                        <DeleteIcon />
                    </IconButton> : ''}
                </CardActions>
            </Card>
        );
    }
}

CustomCard.defaultProps = {
    date: ''
}

export default withRouter((withStyles(styles)(CustomCard)))