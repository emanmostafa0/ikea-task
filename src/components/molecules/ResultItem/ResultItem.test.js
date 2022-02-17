import React from "react";
import {  fireEvent, render, waitFor } from "@testing-library/react";
import ResultItem from './index';
import { StoreDialogProvider } from '../../../store/stores/StoreDialogProvider';
import { initialDialogState, dialogReducer } from '../../../store/reducers/dialogReducer';
import { StoreProductProvider } from '../../../store/stores/StoreProductProvider';
import { initialStateProduct, pageReducer } from '../../../store/reducers/pageReducer';
import Api from '../../../service/api';
import {products} from "../../../__mocks__/pageState";

describe("ResultItem", () => {
    it("should render ResultItem without dialogs", () => {
        const { getByText, queryByText} = render(
            <StoreDialogProvider initialState={initialDialogState} reducer={dialogReducer}>
                <ResultItem item={products[0]}></ResultItem>
            </StoreDialogProvider>);
        expect(getByText("Available: 1")).toBeInTheDocument();
        expect(queryByText("Register a sale")).not.toBeInTheDocument();
        expect(queryByText("All Done")).not.toBeInTheDocument();
    });

    it("should render ResultItem with RequestForm dialog", () => {
        const { getByText, queryByText} = render(
            <StoreProductProvider initialState={initialStateProduct} reducer={pageReducer}>
                <StoreDialogProvider initialState={initialDialogState} reducer={dialogReducer}>
                    <ResultItem item={products[0]}></ResultItem>
                </StoreDialogProvider>
            </StoreProductProvider>
        );
        expect(getByText("Available: 1")).toBeInTheDocument();
        fireEvent.click(getByText("Available: 1"));
        expect(getByText("Register a sale")).toBeInTheDocument();
        expect(queryByText("All Done")).not.toBeInTheDocument();
    });

    it("should render ResultItem with success dialog", async () => {
        Api.registerSale = jest.fn(() => Promise.resolve({}));
        const { getByText, queryByTestId} = render(
            <StoreProductProvider initialState={initialStateProduct} reducer={pageReducer}>
                <StoreDialogProvider initialState={initialDialogState} reducer={dialogReducer}>
                    <ResultItem item={products[0]}></ResultItem>
                </StoreDialogProvider>
            </StoreProductProvider>
        );
        expect(getByText("Available: 1")).toBeInTheDocument();
        fireEvent.click(getByText("Available: 1"));
        expect(getByText("Register a sale")).toBeInTheDocument();
     
        fireEvent.click(getByText("submit"));
        expect(getByText('sending ...')).toBeInTheDocument();
        await waitFor(() => {
            expect(queryByTestId("errorSubmit")).not.toBeInTheDocument();
        });  
        await waitFor(() => {
            expect(getByText("All Done")).toBeInTheDocument();
        });  

    });

    it("should render ResultItem with product quantity 0", async () => {
        Api.registerSale = jest.fn(() => Promise.resolve({}));
        let product = {...products[0]};
        product.quantity = 0;
        const { getByText, queryByText} = render(
            <StoreProductProvider initialState={initialStateProduct} reducer={pageReducer}>
                <StoreDialogProvider initialState={initialDialogState} reducer={dialogReducer}>
                    <ResultItem item={product}></ResultItem>
                </StoreDialogProvider>
            </StoreProductProvider>
        );
        expect(getByText("Available: 0")).toBeInTheDocument();
        fireEvent.click(getByText("Available: 0"));
        expect(queryByText("Register a sale")).not.toBeInTheDocument();
     

    });

});