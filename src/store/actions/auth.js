import * as actionTypes from "./actionTypes";
import axios from "axios";



export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}
export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  }
}
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    const apiKey = process.env.REACT_APP_FIREBASE_API_KEY
    let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + apiKey;
    if (!isSignup) {
      url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + apiKey;
    }
    console.log(authData)
    axios.post(url, authData)
      .then(response => {
        console.log(response)
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      }).catch(error => {
        console.log(error);
        dispatch(authFail(error));
      })
  }
}