/* eslint-disable indent */
import styled from "styled-components";
import { Theme } from "../../../style";


export const StyledButton = styled.button`
    background: ${props => {
      return props.buttonType ==='primary' ? "palevioletred" : "white";
   }};

   color: ${props => {
      if(props.disabled) return "#f0c5d3";
      else return props.buttonType ==='primary' ? "white" : "palevioletred";
    }};

    width: ${props => {
      return props.buttonType ==='primary' ? "max-content" : "50%";
    }};

    font-size: ${props => {
      return props.buttonType ==='primary' ? "24px" : "15px";
    }};

    margin-top: 15px;
    margin-bottom: 20px;
    padding: 4px 16px;

    border: ${props => {
      if(props.disabled) return " 2px solid #f0c5d3";
      else return "2px solid palevioletred";
    }};
    border-radius: 3px;

    @media (max-width: ${Theme.screenSize.tabletMax}) {
      height: 40px;

    }

    @media (max-width: ${Theme.screenSize.mobileMax}) {
      font-size: 17px;
      width: ${props => {
        return props.buttonType ==='primary' ? "max-content" : "50%";
      }};
    }
    @media (max-width: ${Theme.screenSize.smallestMobile}) {
      font-size: 18px;
      width: ${props => {
        return props.buttonType ==='primary' ? "max-content" : "70%";
      }};
    }
`;