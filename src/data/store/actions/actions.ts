import { GetServerData } from '@/data/request/request';
import { Dispatch } from 'redux';
import { GET_SUGGESTIONS, GET_RESULTS, UPDATE_FILTER, SET_LOADING, UNSET_LOADING, REQUEST_ERROR } from './action-types';
import axios from 'axios';

const dataHandler = new GetServerData('http://localhost:5050', axios);

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
            throw new Error("ops, something went wrong");
        }
    }
    return returnedDispatchFunction;
}

export const getServerQuery = (query: any) => {
    return async (dispatch: Dispatch) => {        
        try {

            const data: any = await dataHandler.getResults(query);
            const stringedQuery = JSON.stringify(query);            
            
            dispatch({
                type: GET_RESULTS,
                payload: {
                    date: Date.now(),
                    query: stringedQuery,
                    candidates: data.results
                }
            });
            dispatch({
                type: UNSET_LOADING
            });
        } catch (error) {
            // console.log('ops, request error');
            dispatch({
                type: REQUEST_ERROR
            });            
        }
    }
}