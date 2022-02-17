import React, {useState} from "react";
import { NumberPick } from "../../atoms/NumberPick";
import { useStore } from '../../../store/stores/StoreProductProvider';
import { Button } from "../../atoms/Button";
import {  shape } from "prop-types";
import {  PAGEUPDATE, OPENSUCCESS } from '../../../store/actionTypes';
import Api from '../../../service/api';
import { useDialogStore } from '../../../store/stores/StoreDialogProvider';
import {StyledTitle, StyledAction, StyledFormContainer, StyledErrorMessage} from './style';


export const SaleForm = ({product})=> {
    const [ globalState, dispatch ] = useStore();
    const [ globalDialogState, dispatchDialog ] = useDialogStore(); 
    const [numberItems, setNumberItems] = useState(1);
    const [buttonLabel, setButtonLabel] = useState('submit');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [errorSubmit, setErrorSubmit] = useState('');
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(numberItems){
            setButtonLabel("sending ...");
            setButtonDisabled(true);
            setErrorSubmit('');
            Api.registerSale(product, numberItems, globalState.articles)
                .then(res => {
                    if(res.error){
                        setErrorSubmit("Api is not responding");
                        setButtonLabel("submit");
                        setButtonDisabled(false);
                    }
                    else {
                        setButtonLabel("submit");
                        setButtonDisabled(false);
                        dispatch({ type: PAGEUPDATE , payload: {updatedArticles: res}});
                        dispatchDialog({ type: OPENSUCCESS , payload: !globalDialogState?.successOpen });
                       
                    }
                });
        }
        else  setErrorSubmit("please select a number");
    };

    const onDropDownChange = (item) => {
        if(item) {
            setNumberItems(item);
            setErrorSubmit("");
        }
        else setNumberItems(0);
    };
    
    return (
        <StyledFormContainer>
            <StyledTitle> Order: {product?.name} </StyledTitle>
            
            <NumberPick   
                max={product?.quantity} 
                onChangeHandle={(item) => onDropDownChange(item)} 
            >
            </NumberPick>
            
            <StyledAction>
                {errorSubmit &&<StyledErrorMessage  data-testid="errorSubmit" >{ errorSubmit }</StyledErrorMessage> }
                <Button onClick={handleSubmit} label={buttonLabel} disable={buttonDisabled} ></Button>
            </StyledAction>

        </StyledFormContainer>
       
    );
    
};
SaleForm.propTypes = {
    product: shape({})

};
    