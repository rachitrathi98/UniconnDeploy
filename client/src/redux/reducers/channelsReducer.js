import * as aT from "../actionTypes";

const initialState = null;

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    // case aT.GET_CHANNELS_FAILED:
    //   return channelsA.failed(state, action);
    case aT.GET_CHANNELS_SUCCESS:
      console.log("sdadasawsd", action);
      return action.channels;
    default:
      return state;
  }
};

export default Reducer;
