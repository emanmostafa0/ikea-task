import styled from "styled-components";

export const StyledItem = styled.div`
    list-style-type: none; 
    margin: 10px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 60%;
    border-radius: 10px ;
    padding: 8px;
    cursor: ${props => {
        return props.enable ? "pointer" : "not-allowed";
    }};
    background-color: ${props => {
        return props.enable ? "#fff" : "#DCDCDC";
    }};

    ${props => {
        if(props.enable){
            return `&:hover{
                box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
            }
            `;
        }
    }};
    
`;

export const StyledTitle = styled.h4`
    font-size: 20px;
    color: #425468;
    margin: 5px 0px;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis; 
`;

export const StyledSubTitle = styled.h5`
    font-size: 13px;
    color: #425468;
    margin: 5px 0px;
`;


export const StyledArticle = styled.p`
    color: #7a8795;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis; 
`;
