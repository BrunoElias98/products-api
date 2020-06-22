import React from 'react';
import Button from '@material-ui/core/Button';

export default function ButtonComponent({ color, ariaLabel, size, onClick, text, variant }) {
    return (
        <div>
            <Button
                variant={variant}
                color={color}
                aria-label={ariaLabel}
                onClick={onClick}
                size={size}
            >
                {text}
            </Button>
        </div>
    );
}