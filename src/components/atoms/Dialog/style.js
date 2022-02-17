import styled from "styled-components";
import { Theme } from "../../../style";


export const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 30%;
    height: ${props => {
        return props.form ? "50%" : "30%";
    }};
  
    border: 1px solid #ccc;
    background: #fff;
    overflow: auto;
    border-radius: 4px;
    outline: none;
    padding: 20px;
    @media (max-width: ${Theme.screenSize.tabletMax}) {
        width: 40%;
        height: ${props => { return props.form ? "40%" : "30%"; }};
      }

    @media (max-width: ${Theme.screenSize.mobileMax}) {
        width: 65%;
        height: ${props => {
        return props.form ? "40%" : "30%"; }};
      }
      @media (max-width: ${Theme.screenSize.smallestMobile}) {
        width: ${props => { return props.form ? "65%" : "80%";}};
        height: ${props => { return props.form ? "50%" : "30%";}};
      }
    
`;
export const StyledOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);

    &.ReactModal__Overlay {
        opacity: 0;
        transition: opacity 500ms ease-in-out;
    }
    
    &.ReactModal__Overlay--after-open {
        opacity: 1;
    }
    
    &.ReactModal__Overlay--before-close {
        opacity: 0;
    }
`;
