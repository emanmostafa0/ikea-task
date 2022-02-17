import React, {memo} from "react";
import { array, number, shape } from "prop-types";
import ResultItem  from "../../molecules/ResultItem";
import {initialDialogState, dialogReducer} from '../../../store/reducers/dialogReducer';
import { StoreDialogProvider } from '../../../store/stores/StoreDialogProvider';
import {StyledItemContainer} from './style';

const ResultItemContainer = ({data, index, style})=> {
    return (
        <StyledItemContainer style={style} key={data[index].id}  data-testid="item-container" >
            <StoreDialogProvider initialState={initialDialogState} reducer={dialogReducer}>
                <ResultItem item={data[index]}></ResultItem>
            </StoreDialogProvider>
        </StyledItemContainer>
    );
};


function areEqual(prevProps, nextProps) {
    return prevProps.data[prevProps.index].quantity === nextProps.data[nextProps.index].quantity;
}

export default memo(ResultItemContainer, areEqual);

ResultItemContainer.propTypes = {
    data: array,
    index: number,
    style: shape({})
};