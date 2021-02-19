import { IProject } from "../../interfaces";
import * as projectActions from "./actions";

const initialState: IProject[] = [];

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case projectActions.SET_PROJECTS:
      return [...action.payload];
    case projectActions.ADD_PROJECTS:
      return [...state, action.item];
    case projectActions.GET_PROJECTS:
      return state;
    case projectActions.UPDATE_PROJECTS:
      return [...action.data];
    default:
      return state;
  }
};
