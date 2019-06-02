import { ADD_ARTICLE,SET_SERVICE } from "../constants/action-types";

const articleReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default articleReducer;
