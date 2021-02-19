import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
import { reducer } from "./project/reducer";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore: MakeStore = (context: Context) =>
  createStore(reducer, bindMiddleware([thunk]));

export const wrapper = createWrapper(makeStore, { debug: true });
