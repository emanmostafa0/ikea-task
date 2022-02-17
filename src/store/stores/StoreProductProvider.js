import React from 'react';
import { object, func, node } from "prop-types";


export const Store = React.createContext();

export const useStore = () => React.useContext(Store);


export const StoreProductProvider = ({ children, initialState, reducer }) => {
    const [globalState, dispatch] = React.useReducer(reducer, initialState);
    
    return (
        <Store.Provider value={[globalState, dispatch]}>{children}</Store.Provider>
    );
};

StoreProductProvider.propTypes = {
    initialState: object,
    reducer: func,
    children: node
};
