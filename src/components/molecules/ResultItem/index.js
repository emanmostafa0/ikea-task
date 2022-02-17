import React, {memo} from "react";
import { shape, string } from "prop-types";
import { RequestSale } from "../RequestSale";
import { RequestSuccess } from "../RequestSuccess";
import { useDialogStore } from '../../../store/stores/StoreDialogProvider';
import { OPENREQUEST } from '../../../store/actionTypes';
import {StyledItem, StyledTitle, StyledArticle, StyledSubTitle} from './style';



const ResultItem = ({item})=> {
    const [ globalDialogState, dispatchDialog ] = useDialogStore();
    const articles = item.articles?.map(article => `${article.name}: ${article.amountRequired} `);

    return (
        <StyledItem enable={!!item.quantity}>
            <div role="presentation" data-testid="item-content"
                onClick={() => !!item.quantity && 
                    dispatchDialog({ type: OPENREQUEST , payload: !globalDialogState?.requestOpen })} >
                
                <StyledTitle data-testid="item-name">{item.name}</StyledTitle> 
                <StyledSubTitle data-testid="item-available">Available: {item.quantity}</StyledSubTitle> 
                <StyledArticle >{articles?.toString()}</StyledArticle>

            </div>
            
            {!!item.quantity && globalDialogState?.requestOpen && <RequestSale item={item}></RequestSale>}
            {globalDialogState?.successOpen && <RequestSuccess></RequestSuccess>}
        </StyledItem>
    );
};


function areEqual(prevProps, nextProps) {
    return prevProps.item.quantity === nextProps.item.quantity;
}

export default memo(ResultItem, areEqual);

ResultItem.propTypes = {
    item: shape({name: string})
};