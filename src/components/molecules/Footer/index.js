import React from 'react';
import { StyledFooter , StyledIcon, StyledFollow, StyledFollowText} from './style';


export function Footer() {
    return (
        <StyledFooter data-testid="footer">
            <StyledFollow>
                <StyledFollowText>Follow us on</StyledFollowText>
                <StyledIcon src="/facebook.png" alt="facebook"></StyledIcon>
                <StyledIcon src="/twitter.png" alt="twitter"></StyledIcon>
            </StyledFollow>
            <p>@ 2022 Ikea. All Rights Reserved</p>
        </StyledFooter>
    );
}
