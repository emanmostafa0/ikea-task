import { createGlobalStyle } from "styled-components";

export const Theme = {
    screenSize: {
        xsScreen: "600px",
        mobileMax: "767px",
        mobile: "600px",
        smallMobile: "420px",
        smallestMobile: "300px",
        tablet: "768px",
        tabletMax: "991px",
        tabletMaxPro: "1024px",
        desktop: "992px",
        desktopMax: "1126px",
        largeScreen: "1127px",
        xlScreen: "1436px",
    },
};
export const StyledGlobalBody = createGlobalStyle`
    html,
    body {
        height: 100%;
        padding: 0;
        margin: 0;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        font-family: "Open Sans", Arial, sans-serif;
    }
`;

