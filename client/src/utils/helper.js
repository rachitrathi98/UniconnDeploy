import axios from "axios";

//set in localStorage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
//remove in localStorage
export const removeLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const onAuth = (callback) => {
  axios
    .get("/api/auth/me")
    .then((response) => {
      setLocalStorage("user", response.data.user);
      const expirationDate = new Date(
        new Date().getTime() + 60 * 60 * 10 * 1000,
      );
      localStorage.setItem("expirationDate", expirationDate);
      callback(response);
    })
    .catch((err) => {
      console.log("err", err);
    });
};

//get data from localstorage
export const isAuth = () => {
  if (window !== "undefined") {
    if (localStorage.getItem("user") !== "undefined") {
      return JSON.parse(localStorage.getItem("user"));
    } else {
      return false;
    }
  }
};

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const updateArray = (oldArray, newArray) => {
  return [...oldArray, ...newArray];
};
let url = `http://localhost:${process.env.PORT}/api`;
if (process.env.NODE_ENV === "production") url = `/api`;

export const axiosInstance = axios.create({
  baseURL: url,
  withCredentials: true,
  crossdomain: true,
});
