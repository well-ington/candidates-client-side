import React from "react";
import SearchBar from "./search-bar";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { initialState } from "@/data/store/reducer/store";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const loadQuerySpy = () => {
  return {
    setLoad: jest.fn(),
  };
};

const makeSut = (
  store: typeof initialState = initialState
): {
  sut: RenderResult;
  loadSpy: { setLoad: () => void };
  mockedStore: any;
} => {
  const loadSpy = loadQuerySpy();

  const mockedStore = configureStore([thunk])(store);

  mockedStore.dispatch = jest.fn();

  const sut = render(
    <Provider store={mockedStore}>
      <SearchBar setQuery={loadSpy.setLoad} />
    </Provider>
  );

  return {
    sut,
    loadSpy,
    mockedStore,
  };
};

describe("Testing search bar basic functionalities", () => {
  beforeEach(() => {
    cleanup();
  });

  it("Renders correctly with search bar disabled and proceed button disabled", () => {
    const { sut } = makeSut();
    const searchBarInput = sut.getByTestId(
      "test-searchbar"
    ) as HTMLInputElement;
    expect(searchBarInput).toBeTruthy();
    expect(searchBarInput.disabled).toEqual(true);
    const proceedButton = sut.getByTestId("test-proceed") as HTMLButtonElement;
    expect(proceedButton.disabled).toEqual(true);
  });

  it("Should be enabled if suggestions are loaded, should show suggestions when the user input something", async () => {
    const { sut, mockedStore } = makeSut({
      ...initialState,
      suggestion: {
        city: ["Sao Paulo - SP"],
        experience: ["1.5"],
        technologies: ["Java"],
      },
      suggestionsLoaded: true,
    });

    const searchBarInput = sut.getByTestId(
      "test-searchbar"
    ) as HTMLInputElement;

    expect(searchBarInput).toBeTruthy();
    expect(searchBarInput.disabled).toEqual(false);

    expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
    fireEvent.input(searchBarInput, { target: { value: "s" } });

    const getSuggestions = sut.getByTestId("test-suggestions");

    expect(searchBarInput.value).toEqual("s");
    expect(getSuggestions.childElementCount).toEqual(2);
    const proceedButton = sut.getByTestId("test-proceed") as HTMLButtonElement;
    expect(proceedButton.disabled).toEqual(true);
  });

  it("Should start a query with the first suggestions", async () => {
    const { sut, mockedStore } = makeSut({
      ...initialState,
      suggestion: {
        city: ["Sao Paulo - SP"],
        experience: ["1.5"],
        technologies: ["Java"],
      },
      suggestionsLoaded: true,
    });

    const searchBarInput = sut.getByTestId(
      "test-searchbar"
    ) as HTMLInputElement;

    expect(searchBarInput).toBeTruthy();
    expect(searchBarInput.disabled).toEqual(false);

    const proceedButton = sut.getByTestId("test-proceed") as HTMLButtonElement;
    expect(proceedButton.disabled).toEqual(true);
    expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
    fireEvent.input(searchBarInput, { target: { value: "s" } });

    expect(proceedButton.disabled).toEqual(true);

    const firstSuggestionID = "suggestion-0";

    const firstCitySuggestion = sut.getByTestId(firstSuggestionID);

    fireEvent.click(firstCitySuggestion);

    fireEvent.input(searchBarInput, { target: { value: "1" } });

    expect(proceedButton.disabled).toEqual(true);

    const firstExperienceSuggestion = sut.getByTestId(firstSuggestionID);

    fireEvent.click(firstExperienceSuggestion);

    fireEvent.input(searchBarInput, { target: { value: "j" } });

    expect(proceedButton.disabled).toEqual(true);

    const firstTechSuggestion = sut.getByTestId(firstSuggestionID);

    fireEvent.click(firstTechSuggestion);

    expect(proceedButton.disabled).toEqual(false);

    fireEvent.click(proceedButton);

    expect(mockedStore.dispatch).toBeCalledTimes(2);
  });
});
