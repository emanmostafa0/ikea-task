import React from "react";
import {  render } from "@testing-library/react";
import ResultItemContainer from './index';
import {products} from "../../../__mocks__/pageState";

describe("ResultItem", () => {
    it("should memo ResultItem  if the quantity are the same", () => {
        const { rerender, getByText, queryByText} = render(
            <ResultItemContainer data= {products} index={0}></ResultItemContainer>);
        let productsCopiedTest1 = products.map(product => ({...product}));
        productsCopiedTest1[0].name = 'change name';

        rerender( <ResultItemContainer data= {productsCopiedTest1} index={0}></ResultItemContainer>);
        expect(getByText("test1")).toBeInTheDocument();
        expect(queryByText("change name")).not.toBeInTheDocument();
        

        let productsCopiedTest2 = products.map(product => ({...product}));
        productsCopiedTest2[0].name = 'change name2';
        productsCopiedTest2[0].quantity = 2;
        rerender( <ResultItemContainer data= {productsCopiedTest2} index={0}></ResultItemContainer>);
        expect(queryByText("test1")).not.toBeInTheDocument();
        expect(getByText("change name2")).toBeInTheDocument();
    });

   
});