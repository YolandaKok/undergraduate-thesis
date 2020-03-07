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
        color: "black",
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
        color: 'black',
    }
})

export class CustomCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    addOne(month) {
        return month + 1;
    }

    formatNumber(date) {
        if(date < 10)
            return '0' + date;
        else
            return date;
    }



    render() {
        /* Get props for custom cards */
        let title = this.props.title;
        let content = this.props.content;
        let href = this.props.href;
        let date = this.props.date;
        let link = this.props.link;
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
                    <Button href={link} target="_blank" size="small" color="black">
                        Read More
                    </Button>
                    <Typography variant="h6" component="p" style={{fontSize: '0.9rem'}}>
                        {date !== '' ? this.formatNumber((new Date(date)).getHours()) + ':' + this.formatNumber((new Date(date)).getMinutes()) + '  ' : ''}
                        {date !== '' ? this.formatNumber(new Date(date).getDate()) + '/' + this.formatNumber(this.addOne((new Date(date)).getMonth())) + '/' + (new Date(date)).getFullYear() : ''}
                    </Typography>
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