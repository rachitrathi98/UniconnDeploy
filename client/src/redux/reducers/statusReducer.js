import * as aT from "../actionTypes";

import * as statusA from "./status";

const initialState = {
    loading: false,
    error: null,
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case aT.FAILED:
            return statusA.failed(state, action);
        case aT.SUCCESS:
            return statusA.success(state, action);
        case aT.LOADING:
            return statusA.loading(state, action);
        default:
            return state;
    }
};

export default Reducer;
