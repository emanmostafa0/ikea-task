
import React from 'react';
import { shape } from "prop-types";
import { Dialog } from '../../atoms/Dialog';
import { SaleForm } from '../SaleForm';
import { StyledDialogTitle, StyledDialogContainer } from './style';
import { OPENREQUEST } from '../../../store/actionTypes';
import { useDialogStore } from '../../../store/stores/StoreDialogProvider';

export function RequestSale({item}) {
    const [ globalDialogState, dispatchDialog ] = useDialogStore(); 

    return (
        <div >
            <Dialog open={globalDialogState?.requestOpen} form
                toggleModal={() => dispatchDialog({ type: OPENREQUEST , payload: !globalDialogState?.requestOpen })} >
                <StyledDialogContainer>
                    <StyledDialogTitle data-testid="form-title" >Register a sale</StyledDialogTitle>
                    <SaleForm product={item} ></SaleForm>
                </StyledDialogContainer>
            </Dialog>
        </div>
    );
}


RequestSale.propTypes = {
    item: shape({})

};