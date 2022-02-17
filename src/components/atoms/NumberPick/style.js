import styled from "styled-components";
//import { Theme } from "../../../style";


export const StyledSelect = styled.div`
    display: flex;
    justify-content: center;
    div[class*="rw-widget-picker"] {
        display: grid;
        overflow: hidden;
        min-height: 38px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        outline: 0;
        grid-template: 1fr/1fr 1.9em;
        width: 100%;
    }

    div[class*="rw-state-focus"] {
        border-color: #80bdff;
        box-shadow: 1px 0 0px 3px rgb(0 123 255 / 25%);
        transition: box-shadow .15s ease-in-out;
        border-radius: 4px;
    }

    input[class*="rw-widget-input"] {
        color: #495057;
        background-color: #fff;
        box-shadow: 1.3px 1px 1px rgb(0 0 0 / 8%);
        background-clip: padding-box;
    
        margin: 0;
        border: none;
        touch-action: manipulation;
        outline: 0;
        padding: 0em 0px 0px 0.857em;
        
    }


    span[class*="rw-number-picker-spinners"] {
        display: flex;
        flex-direction: column;
    }
    button[class*="rw-btn"] {
        flex: 1 1 0;
        padding: 0;
        margin: 0;
        border: none;
        color: inherit;
        background: padding-box none;
        line-height: inherit;
        touch-action: manipulation;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }


`;  
// div[class*="dropdown-select__menu"] {
//     max-height: 95px;
//     height: 95px;

//     @media (max-width: ${Theme.screenSize.tabletMax}) {
//         max-height: 130px;
//         height: 130px;
//     }
//     @media (max-width: ${Theme.screenSize.smallestMobile}) {
//         max-height: 80px;
//         height: 80px;
//     }
// }