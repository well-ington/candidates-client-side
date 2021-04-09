import { GetServerData } from "@/data/request/request";
import { Dispatch } from "redux";
import { GET_SUGGESTIONS, GET_RESULTS, UPDATE_FILTER, SET_LOADING, UNSET_LOADING, REQUEST_ERROR, CLEAR_ERROR } from "./action-types";
import axios from "axios";

const dataHandler = new GetServerData("https://candidates-server-side.herokuapp.com", axios);

export const getServerSuggestions = () => {
    const returnedDispatchFunction = async (dispatch: Dispatch) => {
        try {
            const data = await dataHandler.getSuggestions();
            if (data.error) {
                setTimeout(() => {
                    returnedDispatchFunction(dispatch);
                }, 500);
            } else {
                dispatch({
                    type: GET_SUGGESTIONS,
                    payload: data
                });
            }
        } catch (error) {
            setTimeout(() => {
                returnedDispatchFunction(dispatch);
            }, 500);
        }
    };
    return returnedDispatchFunction;
}

export const getServerQuery = (query: any) => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: CLEAR_ERROR
        });

        try {
            dispatch({
                type: SET_LOADING
            });
            const data: any = await dataHandler.getResults(query);
            const stringedQuery = JSON.stringify(query);

            if (data.results.length === 0) {
                dispatch({
                    type: REQUEST_ERROR,
                    payload: "no results"
                });

            } else {
                dispatch({
                    type: GET_RESULTS,
                    payload: {
                        date: Date.now(),
                        query: stringedQuery,
                        candidates: data.results
                    }
                });
            }

            dispatch({
                type: UNSET_LOADING
            });
        } catch (error) {
            dispatch({
                type: UNSET_LOADING
            });

            dispatch({
                type: REQUEST_ERROR,
                payload: "something went wrong"
            });
        }
    }
}