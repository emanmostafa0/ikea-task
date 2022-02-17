import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProductProvider } from './store/stores/StoreProductProvider';
import {initialStateProduct, pageReducer} from './store/reducers/pageReducer';

import Products from './pages/Products';

ReactDOM.render(
    <React.StrictMode>
        <StoreProductProvider initialState={initialStateProduct} reducer={pageReducer}>
            <Products />
        </StoreProductProvider>
   
    </React.StrictMode>,
    document.getElementById('root')
);
