import styled from "styled-components";
import { Theme } from "../../../style";


export const StyledHeader = styled.div`
    background: #34495e;
    color: #fff;
    padding: 20px 0;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
`;

export const StyledLogo = styled.img`
    margin-left: 20px;
    width: 200px;
    height: 100px;
    @media (max-width: ${Theme.screenSize.mobileMax}) {
        width: 100px;
        height: 50px;
        margin: auto 0px auto 10px;
    }
`;

export const StyledAppTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;


export const StyledAppName = styled.h1`
    font-family: auto;
    color: #ffff;
    margin-left: 20px;
    font-size: 35px;
    font-weight: 700;
   
`;