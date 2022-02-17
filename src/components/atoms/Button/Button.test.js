import React from "react";
import { render, fireEvent } from "@testing-library/react";
import {Button} from './index';

describe("Button", () => {
    it("should render button to the document", () => {
        const { getByTestId, getByText } = render(<Button className="primary" label="submit" />);
        expect(getByTestId("button")).toBeInTheDocument();
        expect(getByText("submit")).toBeInTheDocument();
    });

    it("should trigger function when onClick is provided", () => {
        const onClick = jest.fn();
        const { getByTestId } = render(
            <Button className="primary" label="button" onClick={onClick} />
        );
        expect(onClick).toHaveBeenCalledTimes(0);
        fireEvent.click(getByTestId("button"));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
