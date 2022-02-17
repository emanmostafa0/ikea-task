/* eslint-disable react/prop-types */
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { StoreProductProvider } from '../../store/stores/StoreProductProvider';
import { initialStateProduct, pageReducer } from '../../store/reducers/pageReducer';
import Products from './index';
import Api from '../../service/api';
import {products, articles} from "../../__mocks__/pageState";


jest.mock('react-virtualized-auto-sizer', () => {
    const width = 1024;
    const height = 768;
   
    // eslint-disable-next-line react/display-name
    return ({ children }) =>
        <div>{children({ width, height })}</div>;
});

describe("Products", () => {
    it("should show Products page with loading until the api response with error", async () => {
        Api.fetchPage = jest.fn(() => Promise.resolve({error: 503, error_message: "api error"}));
        const { getByTestId, getByText} = render(
            <StoreProductProvider initialState={initialStateProduct} reducer={pageReducer}>
                <Products></Products>
            </StoreProductProvider>);
        expect(getByTestId('loader')).toBeInTheDocument();

        await waitFor(() => {
            expect(getByText("api error")).toBeInTheDocument();
        });  

    });

    it("should show Products page with loading until the api response with success", async () => {
        Api.fetchPage = jest.fn(() => Promise.resolve({}));
        const { getByTestId, queryByText} = render(
            <StoreProductProvider initialState={initialStateProduct} reducer={pageReducer}>
                <Products></Products>
            </StoreProductProvider>);
        expect(getByTestId('loader')).toBeInTheDocument();

        await waitFor(() => {
            expect(queryByText("api error")).not.toBeInTheDocument();
        });  

    });

    it("should show Products page with loading until the api response with products and articles", async () => {
        Api.fetchPage = jest.fn(() => Promise.resolve({
            products: products,
            articles: articles
        }));
        const { getByTestId, getAllByText} = render(
            <StoreProductProvider initialState={initialStateProduct} reducer={pageReducer}>
                <Products></Products>
            </StoreProductProvider>);
        expect(getByTestId('loader')).toBeInTheDocument();

        await waitFor(() => {
            expect(getAllByText("Available: 1").length).toBe(2);
        });  

    });

   
});