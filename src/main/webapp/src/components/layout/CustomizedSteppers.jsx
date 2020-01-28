import React, {Fragment} from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import SettingsIcon from "@material-ui/icons/Settings";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import ResultCompleted from "./ResultCompleted";

const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: "calc(-50% + 16px)",
        right: "calc(50% + 16px)"
    },
    active: {
        "& $line": {
            borderColor: "#784af4"
        }
    },
    completed: {
        "& $line": {
            borderColor: "#784af4"
        }
    },
    line: {
        borderColor: "#eaeaf0",
        borderTopWidth: 3,
        borderRadius: 1
    }
})(StepConnector);

const styles = {

    largeIcon: {
        width: 60,
        height: 60,
    },

};

const useQontoStepIconStyles = makeStyles({
    root: {
        color: "#eaeaf0",
        display: "flex",
        height: 22,
        alignItems: "center"
    },
    active: {
        color: "#784af4"
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "currentColor"
    },
    completed: {
        color: "#784af4",
        zIndex: 1,
        fontSize: 18
    }
});

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active
            })}
        >
            {completed ? (
                <Check className={classes.completed} />
            ) : (
                <div className={classes.circle} />
            )}
        </div>
    );
}

QontoStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool
};

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22
    },
    active: {
        "& $line": {
            backgroundImage:
                "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
        }
    },
    completed: {
        "& $line": {
            backgroundImage:
                "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
        }
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: "#eaeaf0",
        borderRadius: 1
    }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: "#ccc",
        zIndex: 1,
        color: "#fff",
        width: 50,
        height: 50,
        display: "flex",
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center"
    },
    active: {
        backgroundImage:
            "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
    },
    completed: {
        backgroundImage:
            "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)"
    }
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <SettingsIcon />,
        2: <SettingsIcon />,
        3: <SettingsIcon />
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node
};

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

function getSteps() {
    return ["Upload File", "Show Initial Data", "Show Results"];
}

function getStepContent(step, first, second, third, fourth, fifth, completed) {
    switch (step) {
        case 0:
            return (
                <Fragment>
                    <Container>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} lg={6} xl={6}>{first}</Grid>
                            <Grid item xs={12} md={12} lg={6} xl={6}>{fifth}</Grid>
                            <Grid item xs={12}>{third}</Grid>
                        </Grid>
                    </Container>
                </Fragment>);
        case 1:
            return (
                <Fragment>
                    <Container>
                        <Grid container spacing={2}>
                            <Grid xs={12} md={12} lg={6} xl={6}>{second}</Grid>
                            <Grid xs={12} md={12} lg={6} xl={6}>{third}</Grid>
                        </Grid>
                    </Container>
                </Fragment>);
        case 2:
            return <div>{fourth}</div>;
        case 3:
            return <div>{completed}</div>
        default:
            return "Unknown step";
    }
}

export default function CustomizedSteppers(props) {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const save = () => {
        props.finish();
    };

    return (
        <div className={classes.root}>
            <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<ColorlibConnector />}
            >
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            {getStepContent(activeStep, props.first, props.second, props.third, props.fourth, props.fifth, props.completed)}
                        </Typography>
                        <Button onClick={handleReset} className={classes.button}>
                            Reset
                        </Button>
                        <Button onClick={save} className={classes.button} color="primary" className="float-right" variant="contained">
                            Save Experiment
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>
                            {getStepContent(activeStep, props.first, props.second, props.third, props.fourth, props.fifth, props.completed)}
                        </Typography>
                        <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.button}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                                className="float-right"
                            >
                                {activeStep === steps.length - 1 ? "Finish" : "Next"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
