import React from "react";
import { Button } from "./button";

import { fireEvent, render, RenderResult } from "@testing-library/react";

class buttonSpy {
    triggered: boolean;
    constructor() {
        this.triggered = false;
    }  
    triggerButton() {
        this.triggered = true;
    }
}

const makeSut = (innerText: string = "button", disabled: boolean = false): {
    sut: RenderResult,
    spy: buttonSpy,
    button: HTMLButtonElement
} => {   

    const testid: string = "test-button";

    const spy = new buttonSpy();

    const sut = render(<div>
        <Button testid={testid} disabled={disabled} variant="proceed" action={() => spy.triggerButton()}>{innerText}</Button>
        </div>);
    
    const button = sut.getByTestId(testid) as HTMLButtonElement;

    return {
        sut,
        spy,
        button
    }
}

describe("Testing button basic functionalities", () => {
    it("Renders correctly", () => {
        const { button } = makeSut();
        expect(button).toBeTruthy();
    });

    it("Triggers the target action button", () => {
        const { button, spy } = makeSut();
        fireEvent.click(button);
        expect(spy.triggered).toEqual(true);
    });

    it("Triggers the target action button", () => {
        const { button, spy } = makeSut("button", true);
        fireEvent.click(button);
        expect(spy.triggered).toEqual(false);
    });
    
});