import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { StoreProductProvider, useStore as mockStore } from '../../../store/stores/StoreProductProvider';
import { initialStateProduct, pageReducer } from '../../../store/reducers/pageReducer';
import { ErrorPage } from "./index";
import { PAGERETRY } from '../../../store/actionTypes';

const dispatch = jest.fn({ type: PAGERETRY, payload: true });
jest.mock('../../../store/stores/StoreProductProvider', () => ({
    ...(jest.requireActual('../../../store/stores/StoreProductProvider')),
    useStore: jest.fn()
}));

describe("ErrorPage", () => {
    it("should retry the api call", () => {
        mockStore.mockImplementation(() => [ initialStateProduct, dispatch ]);

        const { getByTestId } = render(
            < StoreProductProvider initialState={initialStateProduct} reducer={pageReducer}>
                <ErrorPage></ErrorPage>
            </StoreProductProvider>
        );

        fireEvent.click(getByTestId("button"));
        expect(dispatch).toBeCalledTimes(1);
    });


    
});