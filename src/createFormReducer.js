import {
  BLANK,
  SUCCESS,
  FAILED,
  IN_PROGRESS,
  FORM_UPDATE_FIELDS,
  FORM_IN_PROGRESS,
  FORM_FAILED,
  FORM_SUCCESS,
  FORM_RESET,
  FORM_UPDATE_ERRORS,
  FORM_CLEAR_ERRORS,
  FORM_CLEAR_FIELDS,
  UPDATE_NOTIFICATION,
} from "./constants";

const initialFormState = {
  details: {},
  fields: {},
  uiState: BLANK,
  error: {},
  validationErrors: {},
  notification: {},
};

const createFormReducer = (name) => {
  return (state = initialFormState, action) => {
    switch (action.type) {
      case `@${name}/${FORM_UPDATE_FIELDS}`:
        return {
          ...state,
          fields: {
            ...state.fields,
            ...action.payload,
          },
        };

      case `@${name}/${FORM_CLEAR_FIELDS}`:
        return {
          ...state,
          fields: initialFormState.fields,
        };
      case `@${name}/${FORM_IN_PROGRESS}`:
        return {
          ...state,
          uiState: IN_PROGRESS,
        };
      case `@${name}/${FORM_FAILED}`:
        return {
          ...state,
          uiState: FAILED,
          error: action.payload.error,
          validationErrors: action.payload.validationErrors,
          notification: { type: FAILED, ...action.payload.error },
        };
      case `@${name}/${FORM_UPDATE_ERRORS}`:
        return {
          ...state,
          uiState: FAILED,
          validationErrors: action.payload,
        };
      case `@${name}/${FORM_CLEAR_ERRORS}`:
        return {
          ...state,
          uiState: initialFormState.uiState,
          error: initialFormState.error,
          validationErrors: initialFormState.validationErrors,
          notification: initialFormState.notification,
        };
      case `@${name}/${FORM_SUCCESS}`:
        return {
          ...state,
          uiState: SUCCESS,
          details: action.payload.details,
        };
      case `@${name}/${UPDATE_NOTIFICATION}`:
        return {
          ...state,
          notification: action.notification,
        };
      case `@${name}/${FORM_RESET}`:
        return initialFormState;
      default:
        return state;
    }
  };
};

export default createFormReducer;