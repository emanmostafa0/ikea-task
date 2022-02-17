import React from "react";
import { render } from "@testing-library/react";
import Layout from './index';
import { StoreProductProvider } from '../../../store/stores/StoreProductProvider';
import { initialStateProduct, pageReducer } from '../../../store/reducers/pageReducer';
import {products} from "../../../__mocks__/pageState";


describe("Layout", () => {
    it("should render Layout with loading", () => {
        initialStateProduct.loading = true;
        const { getByTestId } = render(
            <StoreProductProvider initialState={initialStateProduct} reducer={pageReducer}>
                <Layout/>
            </StoreProductProvider>);
        expect(getByTestId('loader')).toBeInTheDocument();

    });

    it("should render Layout with error", () => {
        initialStateProduct.error = "api not responding";
        const { getByTestId } = render(
            <StoreProductProvider initialState={initialStateProduct} reducer={pageReducer}>
                <Layout/>
            </StoreProductProvider>);
        expect(getByTestId('error-api')).toBeInTheDocument();
    });

    it("should render Layout with resultList", () => {
        initialStateProduct.products = products;
        const { getByTestId } = render(
            <StoreProductProvider initialState={initialStateProduct} reducer={pageReducer}>
                <Layout/>
            </StoreProductProvider>);
        expect(getByTestId('list')).toBeInTheDocument();
    });

});