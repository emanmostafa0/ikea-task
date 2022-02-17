import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { NumberPick } from "./index";
describe("NumberPick", () => {
    
    it("should show a NumberPick", () => {
        const { container } = render(
            <NumberPick max={3}  onChangeHandle= {() => {}}/>
        );
        expect(container.querySelector("div[class*='rw-widget-picker']")).toBeInTheDocument();
    });


    it("should call the function provided to onChangeHandle when it is provided", async () => {
        const onChange = jest.fn();
        const { container } = render(
            <NumberPick
                max={3}
                onChangeHandle={()=> onChange()}
            />
        );

        expect(onChange).toHaveBeenCalledTimes(0);
        fireEvent.change(container.querySelector("input[class*='rw-widget-input']"), { target: { value: "2" } });
        fireEvent.blur(container.querySelector("input[class*='rw-widget-input']"));
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(container.querySelector("input[class*='rw-widget-input']").value).toBe('2');

    });

    it("Number picker shouldn't exceed the max", async () => {
        const onChange = jest.fn();
        const { container } = render(
            <NumberPick
                max={3}
                onChangeHandle={()=> onChange()}
            />
        );

        expect(onChange).toHaveBeenCalledTimes(0);
        fireEvent.change(container.querySelector("input[class*='rw-widget-input']"), { target: { value: "4" } });
        fireEvent.blur(container.querySelector("input[class*='rw-widget-input']"));
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(container.querySelector("input[class*='rw-widget-input']").value).toBe('3');
    });
});