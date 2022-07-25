import * as aT from "../actionTypes";

import * as statusA from "./status";

const initialState = {
  socket: null,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case aT.FAILED:
      return statusA.failed(state, action);
    case aT.SET_SOCKET_SUCCESS:
      return statusA.socketConn(state, action);
    default:
      return state;
  }
};

export default Reducer;
