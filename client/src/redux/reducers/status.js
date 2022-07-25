import { updateObject } from "../../utils/helper";

export const failed = (state, action) => {
  console.error("ERROR 💥 Failed", action.error);
  return updateObject(state, { error: true, loading: false });
};
export const success = (state, action) => {
  return updateObject(state, { error: false, loading: false });
};

export const loading = (state, action) => {
  return updateObject(state, { loading: true });
};

export const socketConn = (state, action) => {
  console.log("socketconn", state, action);
  return updateObject(state, { socket: action.socket });
};
