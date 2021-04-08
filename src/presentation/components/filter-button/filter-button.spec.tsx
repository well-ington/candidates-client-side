import React from "react";
import { FilterButton } from "./filter-button";
import { cleanup, fireEvent, render, RenderResult } from "@testing-library/react";


const makeSut = (initialFilter: any = {
    city: "Sao Paulo",
    experience: "de 0 a 1 ano",
    technologies: ["test"]
}): {
    sut: RenderResult,
    spy: jest.Mock
} => {    

    const spy = jest.fn();

    const sut = render(
        <FilterButton filter={initialFilter} setFilter={spy} />
        );
    
    return {
        sut,
        spy
    }
}

describe("Testing filter function basic functionalities", () => {
    beforeEach(() => {
        cleanup();
    });
    
    it("Renders correctly", () => {
        const { sut } = makeSut();
        const filterButtonTest = sut.getByTestId("filter-button-test");
        expect(filterButtonTest).toBeTruthy();
    });

    it("Delete every option", () => {
        const { sut, spy } = makeSut();
        const getTechOption = sut.getByTestId("tech-0");
        fireEvent.click(getTechOption);
        expect(spy).toHaveBeenCalledTimes(1);

        const getExperienceOption = sut.getByTestId("opt-1");
        fireEvent.click(getExperienceOption);

        expect(spy).toHaveBeenCalledTimes(2);
        const getCityOption = sut.getByTestId("opt-0");
        fireEvent.click(getCityOption);

        expect(spy).toHaveBeenCalledTimes(3);
    });

});
