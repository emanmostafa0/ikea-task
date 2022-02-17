import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import {SaleForm} from './index';
import { StoreDialogProvider } from '../../../store/stores/StoreDialogProvider';
import { initialDialogState, dialogReducer } from '../../../store/reducers/dialogReducer';
import { StoreProductProvider } from '../../../store/stores/StoreProductProvider';
import { initialStateProduct, pageReducer } from '../../../store/reducers/pageReducer';
import Api from '../../../service/api';
import {products} from "../../../__mocks__/pageState";


describe("SaleForm", () => {
    it("should render SaleForm", () => {
        const { container } = render(
            <StoreProductProvider initialState={initialStateProduct} reducer={pageReducer}>
                <StoreDialogProvider initialState={initialDialogState} reducer={dialogReducer}>
                    <SaleForm/>
                </StoreDialogProvider>
            </StoreProductProvider>
        );
        expect(container.querySelector("div[class*='rw-widget-picker']")).toBeInTheDocument();
    });

    it("change inputs with valid number of items but not responding api", async () => {
        Api.registerSale = jest.fn(() => Promise.resolve({error: 503, error_message: "api error"}));
        const { container, getByText, getByTestId} = render(
            <StoreProductProvider initialState={initialStateProduct} reducer={pageReducer}>
                <StoreDialogProvider initialState={initialDialogState} reducer={dialogReducer}>
                    <SaleForm/>
                </StoreDialogProvider>
            </StoreProductProvider>
        );

        fireEvent.change(container.querySelector("input[class*='rw-widget-input']"), { target: { value: "2" } });
        fireEvent.blur(container.querySelector("input[class*='rw-widget-input']"));
       
        fireEvent.click(getByText("submit"));
        expect(getByText('sending ...')).toBeInTheDocument();
        await waitFor(() => {
            expect(getByTestId("errorSubmit")).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(getByText("Api is not responding")).toBeInTheDocument();
        });  

    });

    it("change inputs with 0 number of items", async () => {
        const { container, getByTestId, queryByText, getByText } = render(
            <StoreProductProvider initialState={initialStateProduct} reducer={pageReducer}>
                <StoreDialogProvider initialState={initialDialogState} reducer={dialogReducer}>
                    <SaleForm/>
                </StoreDialogProvider>
            </StoreProductProvider>
        );

        fireEvent.change(container.querySelector("input[class*='rw-widget-input']"), { target: { value: "0" } });
        fireEvent.blur(container.querySelector("input[class*='rw-widget-input']"));
       
        fireEvent.click(getByText("submit"));
        expect(queryByText('sending ...')).not.toBeInTheDocument();
        await waitFor(() => {
            expect(getByTestId("errorSubmit")).toBeInTheDocument();
        });
        
        await waitFor(() => {
            expect(getByText("please select a number")).toBeInTheDocument();
        });

    });

    it("change inputs with valid number of items and a good responding api", async () => {
        Api.registerSale = jest.fn(() => Promise.resolve({}));
        const { container, queryByTestId, getByText } = render(
            <StoreProductProvider initialState={initialStateProduct} reducer={pageReducer}>
                <StoreDialogProvider initialState={initialDialogState} reducer={dialogReducer}>
                    <SaleForm product={products[0]}/>
                </StoreDialogProvider>
            </StoreProductProvider>
        );

        fireEvent.change(container.querySelector("input[class*='rw-widget-input']"), { target: { value: "1" } });
        fireEvent.blur(container.querySelector("input[class*='rw-widget-input']"));
     
        fireEvent.click(getByText("submit"));
        expect(getByText('sending ...')).toBeInTheDocument();
        await waitFor(() => {
            expect(queryByTestId("errorSubmit")).not.toBeInTheDocument();
        });  

    });


});