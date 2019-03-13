import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";

// Register User
export const registerUser = (userData, history) => dispacth => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispacth({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - GEt User token

export const loginUser = userData => dispacth => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to LocalStorage
      const { token } = res.data;
      // Set token to LocalStorage
      localStorage.setItem("jwtToken", token);
      // Set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispacth(setCurrentUser(decoded));
    })
    .catch(err =>
      dispacth({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Set log user out
export const logoutUser = () => dispacth => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispacth(setCurrentUser({}));
};
