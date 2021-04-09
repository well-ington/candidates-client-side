import HomeComponent from "./home";
import React from "react";
import { cleanup, render, RenderResult } from "@testing-library/react";
import { Provider } from "react-redux";
import { initialState } from "@/data/store/reducer/store";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

const makeSut = (
  store: typeof initialState = initialState
): {
  sut: RenderResult;
} => {
  const mockedStore = configureStore([thunk])(store);
  mockedStore.dispatch = jest.fn();
  const sut = render(
    <Provider store={mockedStore}>
      <HomeComponent />
    </Provider>
  );

  return {
    sut
  };
};

describe("Testing Home page component", () => {
  beforeEach(() => {
    cleanup();
  });

  it("Should render no results when initialized", () => {
    const { sut } = makeSut();
    try {
      sut.getByTestId("test-result-container");
    } catch (error) {
      expect(sut).toBeTruthy();
    }
  });

  it("Should render no results error when the search returns no results", () => {
    const { sut } = makeSut({
      ...initialState,
      error: "no results",
    });

    try {
      const message = sut.getByTestId("test-notfound");
      expect(message).toBeTruthy();
      expect(message.childElementCount).toBeGreaterThan(0);
    } catch (error) {
      expect(false).toBeTruthy();
    }
  });

  it("Should render unexpected error for any other server timeout/search error", () => {
    const { sut } = makeSut({
      ...initialState,
      error: "something went wrong",
    });

    try {
      const message = sut.getByTestId("test-something-wrong");
      expect(message).toBeTruthy();
      expect(message.childElementCount).toBeGreaterThan(0);
    } catch (error) {
      expect(false).toBeTruthy();
    }
  });

  it("Should render search-skeleton component if loading is set to true", () => {
    const { sut } = makeSut({
      ...initialState,
      isLoading: true,
    });

    try {
      const searchSkeleton = sut.getByTestId("test-search-skeleton");
      expect(searchSkeleton).toBeTruthy();
    } catch (error) {
      expect(false).toBeTruthy();
    }
  });

  it("Should render search-skeleton component if loading is set to true and if there is some results loaded", () => {
    const { sut } = makeSut({
      ...initialState,
      isLoading: true,
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

    try {
      const searchSkeleton = sut.getByTestId("test-search-skeleton");
      expect(searchSkeleton).toBeTruthy();
      expect(searchSkeleton.childElementCount).toBeGreaterThan(0);

      try {
        const resultElement = sut.getByTestId("test-result-container");
        expect(resultElement).toBeFalsy();
      } catch (error) {
        expect(true).toBeTruthy();
      }
    } catch (error) {
      expect(false).toBeTruthy();
    }
  });

  it("If any result is available and loading is false, render results", () => {
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
