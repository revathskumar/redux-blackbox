import {
  BLANK,
  SUCCESS,
  FAILED,
  IN_PROGRESS,
  FETCH,
  FETCH_FAILED,
  FETCH_SUCCESS,
  UPDATE_FIELDS,
  RESET,
} from "./constants";

const initialState = {
  listing: [],
  uiState: BLANK,
  error: {},
};

const createReducer = (name) => {
  return (state = initialState, action) => {
    switch (action.type) {
      case `@${name}/${UPDATE_FIELDS}`:
        return {
          ...state,
          ...action.payload,
        };
      case `@${name}/${FETCH}`:
        return {
          ...state,
          uiState: IN_PROGRESS,
        };
      case `@${name}/${FETCH_FAILED}`:
        return {
          ...state,
          uiState: FAILED,
          error: action.payload.error,
        };
      case `@${name}/${FETCH_SUCCESS}`:
        return {
          ...state,
          uiState: SUCCESS,
          listing: action.payload.listing,
        };
      case `@${name}/${RESET}`:
        return initialState;
      default:
        return state;
    }
  };
};

export default createReducer;