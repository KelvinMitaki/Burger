import * as actionsTypes from "./actionsTypes";
import axios from "axios";
export const authStart = (email, password, isSignUp) => {
  return dispatch => {
    dispatch({ type: actionsTypes.AUTH_START });
    const postData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let URL =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_0j2YnucqDTqklLk8Zun-jylOWeNqIMY";
    if (!isSignUp) {
      URL =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_0j2YnucqDTqklLk8Zun-jylOWeNqIMY";
    }
    axios
      .post(URL, postData)
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("idToken", response.data.idToken);
        localStorage.setItem("localId", response.data.localId);
        localStorage.setItem("expirationDate", expirationDate);

        dispatch({ type: actionsTypes.AUTH_SUCCESS, payload: response.data });
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        dispatch({
          type: actionsTypes.AUTH_FAIL,
          payload: err.response.data.error.message
        });
        console.log(err.response);
      });
  };
};

export const onLogOutClick = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("localId");
  localStorage.removeItem("expirationDate");
  return {
    type: actionsTypes.ON_LOG_OUT_CLICK
  };
};

export const checkAuthTimeout = expiresIn => {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: actionsTypes.CHECK_AUTH_TIMEOUT });
    }, expiresIn * 1000);
  };
};
export const checkAuthViaLocalStorage = () => {
  return dispatch => {
    const token = localStorage.getItem("idToken");
    if (!token) {
      dispatch(onLogOutClick());
    } else {
      const localId = localStorage.getItem("localId");
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        dispatch({
          type: actionsTypes.AUTH_SUCCESS,
          payload: { idToken: token, localId: localId }
        });
        dispatch(
          checkAuthTimeout(
            expirationDate.getTime() / 1000 - new Date().getTime() / 1000
          )
        );
      } else {
        dispatch(onLogOutClick());
      }
    }
  };
};
