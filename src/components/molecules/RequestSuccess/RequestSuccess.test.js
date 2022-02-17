import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import {RequestSuccess} from './index';
import { StoreDialogProvider } from '../../../store/stores/StoreDialogProvider';
import { initialDialogState, dialogReducer } from '../../../store/reducers/dialogReducer';

describe("SuccessRequest", () => {
    it("should render SuccessRequest without render dialog", () => {
        const { queryByText } = render(
            <StoreDialogProvider initialState={initialDialogState} reducer={dialogReducer}>
                <RequestSuccess/>
            </StoreDialogProvider>);
        expect(queryByText("All Done")).not.toBeInTheDocument();
    });

    it("should render SuccessRequest with render dialog", () => {
        initialDialogState.successOpen = true;
        const { getByText } = render(
            <StoreDialogProvider initialState={initialDialogState} reducer={dialogReducer}>
                <RequestSuccess/>
            </StoreDialogProvider>);
        expect(getByText("All Done")).toBeInTheDocument();
    });

    it("should close dialog after clicking on OK", async() => {
        initialDialogState.successOpen = true;
        const { getByText, queryByText } = render(
            <StoreDialogProvider initialState={initialDialogState} reducer={dialogReducer}>
                <RequestSuccess/>
            </StoreDialogProvider>);
        fireEvent.click(getByText("Ok"));

        await waitFor(() => {
            expect(queryByText("All Done")).not.toBeInTheDocument();
        });
       
    });

    it("should render RequestSuccess with render dialog and click outside", async () => {
        initialDialogState.requestOpen = true;
        const {  getByTestId } = render(
            <StoreDialogProvider initialState={initialDialogState} reducer={dialogReducer}>
                <div> test </div>
                <RequestSuccess/>
            </StoreDialogProvider>
        );
        expect(screen.getByText("All Done")).toBeInTheDocument();
        expect(getByTestId("overlay")).toBeInTheDocument();
        fireEvent.click(screen.getByTestId("overlay"));
        await waitFor(() => {
            expect(screen.queryByText("All Done")).not.toBeInTheDocument();
        });
        
    });

});