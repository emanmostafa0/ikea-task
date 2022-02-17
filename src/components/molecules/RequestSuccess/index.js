
import React from 'react';
import { Dialog } from '../../atoms/Dialog';
import { Button } from '../../atoms/Button';
import { OPENSUCCESS } from '../../../store/actionTypes';
import { useDialogStore } from '../../../store/stores/StoreDialogProvider';
import { StyledDialogContainer, StyledDialogTitle, StyledDialogContent } from './style';

export function RequestSuccess() {
    const [ globalDialogState, dispatchDialog ] = useDialogStore(); 
    return (
        <div >
            <Dialog open={globalDialogState.successOpen}
                toggleModal={() =>  dispatchDialog({ type: OPENSUCCESS , payload: !globalDialogState?.successOpen })}>
                <StyledDialogContainer>
                    <StyledDialogTitle data-testid="success-title">All Done</StyledDialogTitle>
                    <StyledDialogContent> your registration Sale is done </StyledDialogContent>
                    <Button 
                        onClick={() => dispatchDialog({ type: OPENSUCCESS , 
                            payload: !globalDialogState?.successOpen })} 
                        label="Ok">
                    </Button>
                </StyledDialogContainer>
            </Dialog>
        </div>
    );
};

