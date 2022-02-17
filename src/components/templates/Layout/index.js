import { string } from "prop-types";
import React, {memo} from "react";
import ResultList from '../../organisms/ResultList';
import {Footer} from '../../molecules/Footer';
import {Header} from '../../molecules/Header';
import {ErrorPage} from '../../molecules/ErrorPage';
import {StyledContainer, StyledMain, StyledLoader} from './style';
import { useStore } from '../../../store/stores/StoreProductProvider';

function Layout() {
    const [ globalState ] = useStore();
    return (
        <StyledContainer >
            { globalState?.loading && <StyledLoader data-testid="loader" ></StyledLoader> }
            <Header></Header>
            <StyledMain>
                { globalState?.products?.length && <ResultList ></ResultList> }
                { globalState?.error && <ErrorPage></ErrorPage> }
            </StyledMain>
            <Footer></Footer>
        </StyledContainer>
    );
}
export default memo(Layout);


Layout.propTypes = {
    type: string
};

