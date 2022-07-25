import * as actionTypes from "../actionTypes";
import { axiosInstance as axios } from "../../utils/helper";

const success = (res) => {
  if (res && res.status === 200 && res.data.user)
    return {
      type: actionTypes.GET_CHANNELS_SUCCESS,
      channels: res.data.user.channels,
    };
  else
    return {
      type: actionTypes.GET_CHANNELS_FAILED,
      channels: null,
    };
};

export const getChannels = (next) => {
  return (dispatch) => {
    axios
      .get("/auth/me")
      .then((response) => {
        dispatch(success(response));
        if (next) next(response);
      })
      .catch((error) => {
        // dispatch(failed(error));
        console.log("error", error);
      });
  };
};
