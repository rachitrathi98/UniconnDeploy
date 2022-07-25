import * as actionTypes from "../actionTypes";
import { axiosInstance as axios, isAuth } from "../../utils/helper";

const success = (res) => {
    console.log("notification", res);
    if (res && res.status === 200 && res.data.data.data[0])
        return {
            type: actionTypes.GET_NOTIFICATION_SUCCESS,
            notification: res.data.data.data[0][0],
        };
    else
        return {
            type: actionTypes.GET_NOTIFICATION_SUCCESS,
            notification: null,
        };
};

// const failed = (res) => {
//   console.log("getNotification error", res);
// };

export const getNotification = (next) => {
    return (dispatch) => {
        try {
            axios
                .get(`/notification/${isAuth().notificationId}`)
                .then((response) => {
                    dispatch(success(response));
                    if (next) next();
                });
        } catch (error) {
            console.log("notification action error", error);
            // dispatch(failed(error));
        }
    };
};
