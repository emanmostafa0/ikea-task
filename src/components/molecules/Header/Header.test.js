import React from "react";
import { render } from "@testing-library/react";
import {Header} from './index';

describe("Header", () => {
    it("should render Header", () => {
        const { container, getByText } = render(<Header/>);
        expect(container.querySelector("img[alt*='logo']")).toBeInTheDocument();
        expect(getByText("Ikea")).toBeInTheDocument();
    });
});