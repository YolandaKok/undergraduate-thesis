import React, {Component, Fragment} from 'react';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import styles from "../../static/signup.module.css";
import Link from "@material-ui/core/Link";

export default function CustomBreadCrumb(props) {
    let links = props.links;
    return (
        <Fragment>
            <Breadcrumbs aria-label="breadcrumb" className={styles.breadCrumbStyle}>
                {
                    links.map((item, index)=>(
                        <Link color="inherit" href={item.url} key={index}>
                            {item.title}
                        </Link>
                    ))
                }
            </Breadcrumbs>
            <h5>{props.title}</h5>
            <hr className={styles.marginHr}></hr>
        </Fragment>
    );
}