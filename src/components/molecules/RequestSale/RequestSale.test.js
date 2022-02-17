import React from "react";
import { screen, fireEvent, render, waitFor } from "@testing-library/react";
import {RequestSale} from './index';
import { StoreDialogProvider } from '../../../store/stores/StoreDialogProvider';
import { initialDialogState, dialogReducer } from '../../../store/reducers/dialogReducer';
import { StoreProductProvider } from '../../../store/stores/StoreProductProvider';
import { initialStateProduct, pageReducer } from '../../../store/reducers/pageReducer';


describe("RequestSale", () => {
    it("should render RequestSale without render dialog", () => {
        const { queryByText } = render(
            <StoreProductProvider initialState={initialStateProduct} reducer={pageReducer}>
                <StoreDialogProvider initialState={initialDialogState} reducer={dialogReducer}>
                    <RequestSale/>
                </StoreDialogProvider>
            </StoreProductProvider>
        );
        expect(queryByText("Register a sale")).not.toBeInTheDocument();
    });

    it("should render RequestSale with render dialog", () => {
        initialDialogState.requestOpen = true;
        const { getByText } = render(
            <StoreProductProvider initialState={initialStateProduct} reducer={pageReducer}>
                <StoreDialogProvider initialState={initialDialogState} reducer={dialogReducer}>
                    <RequestSale/>
                </StoreDialogProvider>
            </StoreProductProvider>
        );
        expect(getByText("Register a sale")).toBeInTheDocument();
    });

    it("should render RequestSale with render dialog and click outside", async () => {
        initialDialogState.requestOpen = true;
        const {  getByTestId } = render(
            <StoreProductProvider initialState={initialStateProduct} reducer={pageReducer}>
                <StoreDialogProvider initialState={initialDialogState} reducer={dialogReducer}>
                    <div> test </div>
                    <RequestSale/>
                </StoreDialogProvider>
            </StoreProductProvider>
        );
        expect(screen.getByText("Register a sale")).toBeInTheDocument();
        expect(getByTestId("overlay")).toBeInTheDocument();
        fireEvent.click(screen.getByTestId("overlay"));
        await waitFor(() => {
            expect(screen.queryByText("Register a sale")).not.toBeInTheDocument();
        });
        
    });
});