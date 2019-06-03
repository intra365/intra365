import {ADD_ARTICLE,SET_SERVICE} from "../constants/action-types"
export const addArticle = article => ({
  type: ADD_ARTICLE,
  payload: article
});


export const setService = service => ({
  type: SET_SERVICE,
  payload: service
});


