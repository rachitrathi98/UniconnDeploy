import * as actionTypes from "../actionTypes";
import { axiosInstance as axios } from "../../utils/helper";

export const failed = (err) => {
  let error;
  if (err.response && err.response.data.error) {
    error = err.response.data.error;
  }
  return {
    type: actionTypes.FAILED,
    error: error,
  };
};

export const success = (response) => {
  return {
    type: actionTypes.SUCCESS,
    response: response,
  };
};

export const loading = () => {
  return {
    type: actionTypes.LOADING,
  };
};

export const getAction = (route, next) => {
  return (dispatch) => {
    dispatch(loading());
    axios
      .get(route)
      .then((response) => {
        dispatch(success(response));
        if (next) next();
      })
      .catch((error) => {
        dispatch(failed(error));
      });
  };
};

// export const postAction = (route, data, callback) => {
//   return (dispatch) => {
//     dispatch(loading());
//     axios
//       .post(route, data)
//       .then((response) => {
//         callback(response);
//         dispatch(success(response));
//       })
//       .catch((error) => {
//         dispatch(failed(error));
//       });
//   };
// };

// export const patchAction = (route, data, callback) => {
//   return (dispatch) => {
//     dispatch(loading());
//     axios
//       .post(route, data)
//       .then((response) => {
//         callback(response);
//         dispatch(success(response));
//       })
//       .catch((error) => {
//         dispatch(failed(error));
//       });
//   };
// };

// export const deleteAction = (route, callback) => {
//   return (dispatch) => {
//     dispatch(loading());
//     axios
//       .post(route)
//       .then((response) => {
//         callback(response);
//         dispatch(success(response));
//         retu
//       })
//       .catch((error) => {
//         dispatch(failed(error));
//       });
//   };
// };

// getAction("/auth/login",()=>{});
// getAction("/auth/logout",null);
