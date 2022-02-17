import React from "react";
import { render } from "@testing-library/react";
import {Dialog} from './index';

describe("Dialog", () => {
    it("should render dialog to the document", () => {
        const { getByRole, getByText } = render(<Dialog open><div>test</div></Dialog>);
        expect(getByRole('dialog')).toBeInTheDocument();
        expect(getByText("test")).toBeInTheDocument();
    });

    it("should not render dialog", () => {
        const toggleModal = jest.fn();
        const { queryByRole, queryByText } = render(
            <Dialog open={false} toggleModal= {toggleModal} ><div>test</div></Dialog>
        );
        expect(queryByRole('dialog')).not.toBeInTheDocument();
        expect(queryByText("test")).not.toBeInTheDocument();
    });
});