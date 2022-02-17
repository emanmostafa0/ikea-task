/* eslint-disable react/prop-types */
import React from "react";
import {  render } from "@testing-library/react";
import { StoreProductProvider } from '../../../store/stores/StoreProductProvider';
import { initialStateProduct, pageReducer } from '../../../store/reducers/pageReducer';
import ResultList from './index';
import {products} from "../../../__mocks__/pageState";



jest.mock('react-virtualized-auto-sizer', () => {
    const width = 1024;
    const height = 768;
   
    // eslint-disable-next-line react/display-name
    return ({ children }) =>
        <div>{children({ width, height })}</div>;
});

describe("ResultList", () => {
    it("should show ResultList with the list with mocked AutiSizer height", () => {
        initialStateProduct.products = products;
        const { getAllByTestId} = render(
            <StoreProductProvider initialState={initialStateProduct} reducer={pageReducer}>
                <ResultList></ResultList>
            </StoreProductProvider>);
        expect(getAllByTestId('item-container').length).toBe(2);

    });

   
});