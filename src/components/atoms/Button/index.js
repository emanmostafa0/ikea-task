import React from 'react';
import { func, string, bool } from "prop-types";
import {StyledButton} from './style';

export function Button({onClick, label, disable, className}) {
    return (
        <StyledButton data-testid="button" 
            onClick={onClick} disabled={disable} buttonType={className}>{label}
        </StyledButton>
    );
}


Button.propTypes = {
    onClick: func,
    label: string,
    disable: bool,
    className: string
};
