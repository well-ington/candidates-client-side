import { reducer, initialState } from "./store";
import * as types from "../actions/action-types";
import faker from "faker";



describe("Testing the store reducer", () => {
    it("It should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it("It should set an error message using REQUEST_ERROR action and clear using ", () => {
        const errorMessage = faker.random.words();
        const store = reducer(undefined, {
            type: types.REQUEST_ERROR,
            payload: errorMessage
        });
        expect(store.error).toEqual(errorMessage);

        const nextStore = reducer(store, {
            type: types.CLEAR_ERROR            
        });

        expect(nextStore.error.length).toEqual(0);
    });


    it("It should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });


});