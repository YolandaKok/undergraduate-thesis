import React, {Component, Fragment} from 'react';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import styles from "../../static/signup.module.css";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import * as PropTypes from "prop-types";

export default function CustomBreadCrumb(props) {
    let names = props.name.split(',');

    return (
        <Fragment>
            <Breadcrumbs aria-label="breadcrumb" className={styles.breadCrumbStyle}>
                {
                    names.map((text)=>(
                        <Link color="inherit" href="/">
                            {text}
                        </Link>
                    ))
                }
            </Breadcrumbs>
            <h5>{props.title}</h5>
            <hr className={styles.marginHr}></hr>
        </Fragment>
    );
}

/* CustomBreadCrumb.propTypes = {
    name: PropTypes.string.isRequired, // must be a string and defined
    age: PropTypes.number.isRequired, // must be a number and defined
    occupation: PropTypes.string.isRequired  // must be a string and defined
}; */