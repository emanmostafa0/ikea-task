import styled from "styled-components";

import { Theme } from "../../../style";

export const StyledDialogTitle = styled.h1`
    margin-top: 20px;
    margin-bottom: 10px;
    color: #425468;
    text-align: center;
    
  
    @media (max-width: ${Theme.screenSize.smallestMobile}) {
    text-align: left;
    font-size: 25px;
    }
`;

export const StyledDialogContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`;




