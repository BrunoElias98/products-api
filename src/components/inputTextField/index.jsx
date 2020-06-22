import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function InputTextField({ variant, id, name, className, label, onChange, fullWidth, defaultValue, autoFocus }) {
    return (
        <TextField 
            variant={variant}
            id={id} 
            name={name} 
            className={className} 
            label={label} 
            onChange={onChange} 
            fullWidth={fullWidth} 
            defaultValue={defaultValue}
            autoFocus={autoFocus}
        />
    );
}