import { useEffect } from "react";
import Api from '../../service/api';
import { PAGELIST, PAGEERROR, PAGELOAD, PAGERETRY } from '../../store/actionTypes';
import Layout from "../../components/templates/Layout";
import { useStore } from '../../store/stores/StoreProductProvider';
import {StyledGlobalBody} from '../../style';
import { StyledContainer } from './style.js';

function Products() {
    const [ globalState, dispatch ] = useStore();

    useEffect(() => {
        if(globalState?.retry){
            dispatch({ type: PAGELOAD });
            Api.fetchPage()
                .then(list => {
                    if(list.error){
                        dispatch({ type: PAGEERROR , payload: list.error_message });
                    }
                    else {
                        dispatch({ type: PAGELIST , payload: list });
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            dispatch({ type: PAGERETRY , payload: false });
        }
    }, [globalState?.retry]);
    return (
        <StyledContainer>
            <StyledGlobalBody />
            <Layout></Layout>
        </StyledContainer>
        
    );
}

export default Products;
