import React from "react";

import { SearchSuggestion } from "./search-suggestion";
import { cleanup, render, RenderResult } from "@testing-library/react";

class searchSuggestionSpy {
    value: string;
    constructor() {
        this.value = "";
    }  
    changeValue(str: string) {
        this.value = str;
    }
}

const makeSut = (testid: string = "test-suggestions",options: string[] = ["house", "mouse", "close"], value: string = "cl"): {
    sut: RenderResult,
    spy: searchSuggestionSpy
} => {
    const spy = new searchSuggestionSpy();
    
    const sut = render(
        <SearchSuggestion testid={testid} value={value} change={spy.changeValue} options={options} ></SearchSuggestion>
        );
    
    return {
        sut,
        spy
    }
}

describe("Testing Search Suggestion basic functionalities", () => {
    beforeEach(() => {
        cleanup();
    });
    
    it("Renders correctly", () => {
        const testid = "mytest";
        const { sut } = makeSut(testid);
        const searchComponent = sut.getByTestId(testid);
        expect(searchComponent).toBeTruthy();
    });

    it("Returns the correct option as the unique option", () => {
        const options = ["house", "mouse", "ball"];
        const value = "h";
        const testid = "mytest";
        const { sut } = makeSut(testid, options, value);

        const firstSuggestion = "suggestion-0";

        const firstSuggestionNode = sut.getByTestId(firstSuggestion);

        const domNode = sut.getByTestId(testid);

        expect(firstSuggestionNode.innerHTML).toEqual(options[0]);
        //suggestion + UI text
        expect(domNode.childElementCount).toEqual(2);
    });

    it("Return three options", () => {
        const options = ["car", "carousel", "call", "cyborg"];
        const value = "ca";
        const testid = "mytest";
        const { sut } = makeSut(testid, options, value);

        const firstSuggestion = "suggestion-0";

        const firstSuggestionNode = sut.getByTestId(firstSuggestion);

        const domNode = sut.getByTestId(testid);

        expect(firstSuggestionNode.innerHTML).toEqual(options[0]);
        //suggestion + UI text
        expect(domNode.childElementCount).toEqual(4);
    });

    it("Return no options when there is no match", () => {
        const options = ["car", "carousel", "call", "cyborg"];
        const value = "1";
        const testid = "mytest";
        const { sut } = makeSut(testid, options, value);

        const domNode = sut.getByTestId(testid);
        
        expect(domNode.childElementCount).toEqual(0);
    });
    
});