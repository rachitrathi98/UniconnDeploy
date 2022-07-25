import { applyMiddleware, combineReducers, createStore } from "redux";
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import statusReducer from "./reducers/statusReducer";
import channelsReducer from "./reducers/channelsReducer";

import notificationReducer from "./reducers/notification/notificationReducer";
import socketReducer from "./reducers/socketReducer";
// import listReducer from "./reducers/listReducer"
//check what happens without combine reducers

const reducer = combineReducers({
  status: statusReducer,
  socket: socketReducer,
  notification: notificationReducer,
  channels: channelsReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
