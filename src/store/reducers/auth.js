import * as actionsTypes from "../actions/actionsTypes";
const INITIAL_STATE = {
  idToken: null,
  localId: null,
  error: null,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.AUTH_START:
      return { ...state, error: null, loading: true };
    case actionsTypes.AUTH_SUCCESS:
      return {
        ...state,
        idToken: action.payload.idToken,
        localId: action.payload.localId,
        loading: false
      };
    case actionsTypes.CHECK_AUTH_TIMEOUT:
      return { ...state, idToken: null, localId: null };
    case actionsTypes.AUTH_FAIL:
      return { ...state, error: action.payload, loading: false };
    case actionsTypes.ON_LOG_OUT_CLICK:
      return { ...state, idToken: null, localId: null };
    default:
      return state;
  }
};
