import React from "react";
import { App } from "./app";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { initialState } from "@/data/store/reducer/store";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

const getLastSuggestion = (testid: string, sut: RenderResult) =>
  sut.getByTestId(testid);

const makeSut = (
  store: typeof initialState = initialState
): {
  sut: RenderResult;
  mockedStore: any;
} => {
  const mockedStore = configureStore([thunk])(store);
  mockedStore.dispatch = jest.fn();
  const sut = render(
    <Provider store={mockedStore}>
      <App />
    </Provider>
  );

  return {
    sut,
    mockedStore,
  };
};

describe("Testing App main wrapper component", () => {
  beforeEach(() => {
    cleanup();
  });
  it("Renders correctly and dispatches a redux action to call for suggestions, also should render the search bar", () => {
    const { sut, mockedStore } = makeSut();
    const appElement = sut.getByTestId("app-wrapper");
    expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);

    expect(appElement).toBeTruthy();
    const searchBarInput = sut.getByTestId(
      "test-searchbar"
    ) as HTMLInputElement;
    expect(searchBarInput).toBeTruthy();
    expect(searchBarInput.disabled).toEqual(true);

    const proceedButton = sut.getByTestId("test-proceed") as HTMLButtonElement;
    expect(proceedButton.disabled).toEqual(true);
  });

  it("Should dispatch an action to load a new query", () => {
    const { sut, mockedStore } = makeSut({
      ...initialState,
      suggestion: {
        city: ["São José dos Campos - SP"],
        experience: ["2", "3"],
        technologies: ["Java", "AngularJS"],
      },
      suggestionsLoaded: true,
    });

    expect(mockedStore.dispatch).toHaveBeenCalledTimes(0);

    const proceedButton = sut.getByTestId("test-proceed") as HTMLButtonElement;
    const searchBarInput = sut.getByTestId(
      "test-searchbar"
    ) as HTMLInputElement;

    fireEvent.input(searchBarInput, { target: { value: "s" } });

    const firstSuggestionID = "suggestion-0";

    fireEvent.click(getLastSuggestion(firstSuggestionID, sut));

    fireEvent.input(searchBarInput, { target: { value: "2" } });

    fireEvent.click(getLastSuggestion(firstSuggestionID, sut));

    fireEvent.input(searchBarInput, { target: { value: "j" } });

    fireEvent.click(getLastSuggestion(firstSuggestionID, sut));

    expect(proceedButton.disabled).toEqual(false);

    fireEvent.click(proceedButton);

    expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it("Should render results if results are available", () => {
    const { sut } = makeSut({
      ...initialState,
      suggestion: {
        city: ["São José dos Campos - SP"],
        experience: ["2", "3"],
        technologies: ["Java", "AngularJS"],
      },
      suggestionsLoaded: true,
      lastResult: {
        date: 0,
        query: "",
        candidates: [
          {
            id: 999,
            experience: "1.5",
            mainTech: ["Java"],
            tech: ["Java", "Kotlin"],
            city: "Rio de Janeiro - RJ",
            techScore: 1,
            mainTechScore: 0,
            matched: ["Kotlin"],
          },
          {
            id: 222,
            experience: "1",
            mainTech: ["Java"],
            tech: ["JavaScript", "Kotlin"],
            city: "São Paulo - SP",
            techScore: 1,
            mainTechScore: 0,
            matched: ["Kotlin"],
          },
        ],
      },
    });

    const resultElement = sut.getByTestId("test-result-container");

    expect(resultElement).toBeTruthy();

    expect(resultElement.childElementCount).toEqual(2);
  });
});
