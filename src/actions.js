import {
  FETCH,
  FETCH_FAILED,
  FETCH_SUCCESS,
  RESET,
  FORM_IN_PROGRESS,
  FORM_FAILED,
  FORM_SUCCESS,
  FORM_UPDATE_FIELDS,
  FORM_UPDATE_ERRORS,
  FORM_CLEAR_ERRORS,
  FORM_CLEAR_FIELDS,
  UPDATE_NOTIFICATION,
  FORM_RESET,
} from "./constants";

export const updateNotification = (
  name,
  notification = initialNotification
) => {
  return {
    type: `@${name}/${UPDATE_NOTIFICATION}`,
    notification,
  };
};

export const setInProgress = (name, type = FETCH) => {
  return {
    type: `@${name}/${type}`,
  };
};

export const setError = (name, error) => {
  return {
    type: `@${name}/${FETCH_FAILED}`,
    payload: { error },
  };
};

export const setFormError = (
  name,
  error,
  validationErrors
) => {
  return {
    type: `@${name}/${FORM_FAILED}`,
    payload: { error, validationErrors },
  };
};

export const setListing = (name, listing = []) => {
  return {
    type: `@${name}/${FETCH_SUCCESS}`,
    payload: {
      listing,
    },
  };
};

export const setDetails = (name, details = {}) => {
  return {
    type: `@${name}/${FORM_SUCCESS}`,
    payload: {
      details,
    },
  };
};

export const reset = (name) => {
  return {
    type: `@${name}/${RESET}`,
  };
};

export const updateFields = (name, payload) => {
  return {
    type: `@${name}/${FORM_UPDATE_FIELDS}`,
    payload,
  };
};

export const clearFormFields = (name) => {
  return {
    type: `@${name}/${FORM_CLEAR_FIELDS}`,
  };
};

export const fetchListingAction = async (
  name,
  dispatch,
  service,
  params = {}
) => {
  dispatch(setInProgress(name));
  try {
    const { data } = await service(params);
    dispatch(setListing(name, data));
    return data;
  } catch (err) {
    let message;
    if (err.response) {
      if (err.response.data) {
        message = err.response.data.message;
      }
      message = message || err.response.statusText;
    }
    const error = {
      message: message || err.message,
    };
    dispatch(setError(name, error));
  }
};

export const formAction = async (
  name,
  dispatch,
  service,
  params
) => {
  dispatch(setInProgress(name, FORM_IN_PROGRESS));
  try {
    const { data } = await service(params);
    dispatch(setDetails(name, data));
    return data;
  } catch (err) {
    let validationErrors = {};
    if (err.response) {
      if (err.response.data) {
        validationErrors = err.response.data;
      }
    }
    let message;
    if (err.response) {
      if (err.response.data) {
        message = err.response.data.message;
      }
      message = message || err.response.statusText;
    }
    const error = {
      message: message || err.message,
    };
    dispatch(setFormError(name, error, validationErrors));
    throw err;
  }
};

export const updateFormErrors = (name, payload = {}) => {
  return {
    type: `@${name}/${FORM_UPDATE_ERRORS}`,
    payload,
  };
};

export const clearFormErrors = (name) => {
  return {
    type: `@${name}/${FORM_CLEAR_ERRORS}`,
  };
};

export const resetForm = (name) => {
  return {
    type: `@${name}/${FORM_RESET}`,
  };
};