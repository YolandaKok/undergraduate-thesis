import React from 'react';

export const FormError = ({formError}) =>
{
    if(formError != null) {
        return (
            <p>{formError}</p>
        )
    } else {
        return ('')
    }
}
