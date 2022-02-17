import React from "react";
import ReactDOM from "react-dom";
import Products from './pages/Products';

import { StoreProductProvider } from './store/stores/StoreProductProvider';
import {initialStateProduct, pageReducer} from './store/reducers/pageReducer';

jest.mock("react-dom", () => ({ render: jest.fn() }));

describe("Application root", () => {
    it("should render without crashing", () => {
        const div = document.createElement("div");
        div.id = "root";
        document.body.appendChild(div);
        require("./index.js");
        expect(ReactDOM.render).toHaveBeenCalledWith( 
            <React.StrictMode>
                <StoreProductProvider initialState={initialStateProduct} reducer={pageReducer}>
                    <Products />
                </StoreProductProvider>
   
            </React.StrictMode>, 
            div);
    });
});