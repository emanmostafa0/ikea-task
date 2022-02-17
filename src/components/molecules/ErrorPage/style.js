import styled from "styled-components";
import { Theme } from "../../../style";


export const StyledError = styled.div`
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const StyledErrorMessage = styled.h3`
    overflow-wrap: break-word;
    @media (max-width: ${Theme.screenSize.mobileMax}) {
        max-width: 300px;   
    }
    @media (max-width: ${Theme.screenSize.smallestMobile}) {
        max-width: 200px;   
    }
`;
