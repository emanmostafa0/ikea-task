import React from 'react';
import { object, func, node } from "prop-types";


const Store = React.createContext();

export const useDialogStore = () => React.useContext(Store);

export const StoreDialogProvider = ({ children, initialState, reducer }) => {
    const [globalDialogState, dispatchDialog] = React.useReducer(reducer, initialState);
    
    return (
        <Store.Provider value={[globalDialogState, dispatchDialog]}>{children}</Store.Provider>
    );
};

StoreDialogProvider.propTypes = {
    initialState: object,
    reducer: func,
    children: node
};
