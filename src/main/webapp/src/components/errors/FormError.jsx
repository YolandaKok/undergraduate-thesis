import React from 'react';
import styles from "../../static/signup.module.css";

export const FormError = ({formError}) =>
{
    if(formError != null) {
        return (
            <p className={styles.textError}>{formError}</p>
        )
    } else {
        return ('')
    }
}
