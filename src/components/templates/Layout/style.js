import styled from "styled-components";


export const StyledContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const StyledMain = styled.main`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    justify-content: center;
    overflow:auto;
`;

export const StyledLoader = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    background: #21242d url('/loader.gif') no-repeat center;
    opacity: 0.5;
    z-index: 999;
`;

