import * as aT from "../../actionTypes";

const initialState = null;

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case aT.GET_NOTIFICATION_SUCCESS:
            console.log("Notification", action);
            return action.notification;
        default:
            return state;
    }
};

export default Reducer;
