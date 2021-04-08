import React from "react";
import { Button } from "./button";
import { fireEvent, render, RenderResult } from "@testing-library/react";

class ButtonSpy {
  triggered: boolean;
  constructor() {
    this.triggered = false;
  }
  triggerButton() {
    this.triggered = true;
  }
}

const makeSut = (
  innerText: string = "button",
  disabled: boolean = false
): {
  sut: RenderResult;
  spy: ButtonSpy;
  button: HTMLButtonElement;
} => {
  const testid: string = "test-button";
  const spy = new ButtonSpy();
  const sut = render(
    <div>
      <Button
        testid={testid}
        disabled={disabled}
        variant="proceed"
        action={() => spy.triggerButton()}
      >
        {innerText}
      </Button>
    </div>
  );

  const button = sut.getByTestId(testid) as HTMLButtonElement;
  return {
    sut,
    spy,
    button,
  };
};

describe("Testing button basic functionalities", () => {
  it("Renders correctly", () => {
    const buttonText = "BUTTON";
    const { button } = makeSut(buttonText);
    expect(button).toBeTruthy();
    expect(button.innerHTML).toEqual(buttonText);
  });

  it("Triggers the target action button", () => {
    const { button, spy } = makeSut();
    fireEvent.click(button);
    expect(spy.triggered).toEqual(true);
    expect(button.disabled).toEqual(false);
  });

  it("Triggers the target action button", () => {
    const { button, spy } = makeSut("button", true);
    fireEvent.click(button);
    expect(spy.triggered).toEqual(false);
    expect(button.disabled).toEqual(true);
  });
});
