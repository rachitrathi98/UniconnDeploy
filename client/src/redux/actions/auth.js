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

const socketfn = (socket) => {
  return { type: actionTypes.SET_SOCKET_SUCCESS, socket: socket };
};
export const logout = (next) => {
  removeLocalStorage("user");
  removeLocalStorage("expirationDate");
  return (dispatch) => {
    dispatch(action.getAction("/auth/logout", next));
    dispatch(Logout);
  };
};

export const auth = (callback) => {
  return (dispatch) => {
    dispatch(action.loading());
    axios
      .get("/auth/me")
      .then((response) => {
        setLocalStorage("user", response.data.user);
        const expirationDate = new Date(
          new Date().getTime() + 60 * 60 * 10 * 1000,
        );
        localStorage.setItem("expirationDate", expirationDate);
        if (callback) callback();
        dispatch(action.success(response));
      })
      .catch((err) => {
        console.log("err", err);
        dispatch(action.failed(err));
      });
  };
};

export const authCheckState = (callback) => {
  return (dispatch) => {
    const user = isAuth();
    if (user) {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        if (callback) callback();

        dispatch(action.success());
      }
    } else {
      dispatch(auth(callback));
    }
  };
};

export const setSocket = (socket) => {
  return (dispatch) => {
    dispatch(socketfn(socket));
  };
};
