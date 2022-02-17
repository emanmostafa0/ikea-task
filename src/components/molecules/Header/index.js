import React from 'react';
import { StyledHeader, StyledAppName,StyledLogo, StyledAppTitle } from './style';

export function Header() {
    return (
        <StyledHeader data-testid="header" >
            <StyledLogo src="/ikea-logo.png" alt="logo"></StyledLogo>
            <StyledAppTitle>
                <StyledAppName >Ikea</StyledAppName>
            </StyledAppTitle>
        </StyledHeader>
    );
}
