import React, {Fragment} from 'react'
import Alert from "react-bootstrap/Alert";

export const CustomizedAlert = ({value, message}) =>
{
    if(value == null) {
        return (
            ''
        )
    } else {
        return (
            <Alert variant={value}>
                {message}
            </Alert>
        )
    }
}
