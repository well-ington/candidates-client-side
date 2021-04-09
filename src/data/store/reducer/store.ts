import { createStore, applyMiddleware, Action } from "redux";
import { GET_SUGGESTIONS, GET_RESULTS, UPDATE_FILTER, SET_LOADING, UNSET_LOADING, REQUEST_ERROR, CLEAR_ERROR } from "../actions/action-types";
import thunk from "redux-thunk";

export type TremoteSuggestions = {
    city: string[];
    experience: string[];
    technologies: string[];
};

export type TcandidateObject = {
    id: number;
    experience: string;
    mainTech: string[];
    tech: string[];
    city: string;
    techScore: number;
    mainTechScore: number;
    matched: string[];
};


export type TqueryObject = {
    date: number;
    query: string;
    candidates: TcandidateObject[];
};

type TuserQueryObject = {
    city: string;
    experience: string;
    technologies: string[];
};

type TmainStateObject = {
   user: TuserQueryObject;
   suggestion: TremoteSuggestions;
   queries: TqueryObject[];
   lastResult: TqueryObject;
   isLoading: boolean;
   error: string;
   suggestionsLoaded: boolean;
};

export const initialState: TmainStateObject = {
    user: {
        city: "",
        experience: "",
        technologies: []
    },
    suggestion: {
        city: [],
        experience: [],
        technologies: []
    },
    queries: [],
    lastResult: {
        date: 0,
        query: "",
        candidates: []
    },
    isLoading: false,
    error: "",
    suggestionsLoaded: false
};



export const reducer = (state = initialState, action): TmainStateObject => {
    switch(action.type) {
        case GET_SUGGESTIONS:  
            return {
                ...state,
                suggestion: action.payload,
                suggestionsLoaded: true
            }
        case GET_RESULTS:
            const newQueries = [...state.queries];
            newQueries.push(state.lastResult);
            return {
                ...state,
                queries: newQueries,
                lastResult: action.payload
                
            }
        case UPDATE_FILTER:
            return {
                ...state
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case UNSET_LOADING:
            return {
                ...state,
                isLoading: false
            }
        case REQUEST_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        case CLEAR_ERROR: {
            return {
                ...state,
                error: ""
            }
        }
        default:
            return state;
    }
}

export default createStore(reducer, applyMiddleware(thunk));