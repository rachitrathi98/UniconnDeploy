import {
    isAuth,
    setLocalStorage,
    removeLocalStorage,
    axiosInstance as axios,
  } from "../../utils/helper";
  import * as actionTypes from "../actionTypes";
  import * as action from "./actions";
  
  const Logout = () => {
    return {
      type: actionTypes.AUTH_LOGOUT,
    };
  };
  
  export const logout = (next) => {
    removeLocalStorage("user");
    removeLocalStorage("expirationDate");
    return (dispatch) => {
      dispatch(action.getAction("/auth/logout", next));
      dispatch(Logout);
    };
  };
  
  export const auth = () => {
    return (dispatch) => {
      dispatch(action.loading());
      axios
        .get("/auth/me")
        .then((response) => {
          setLocalStorage("user", response.data.user);
          dispatch(action.success(response));
        })
        .catch((err) => {
          dispatch(action.failed(err));
        });
    };
  };
  
  export const authCheckState = () => {
    return (dispatch) => {
      const user = isAuth();
      if (user) {
        dispatch(action.success());
      } else {
        dispatch(auth());
      }
    };
  };
  