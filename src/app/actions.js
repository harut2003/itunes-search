import { history } from "../helpers/history";
import request from "../helpers/request";
import * as actionTypes from "./actionTypes";

export const addData = (query, setSubmitting) => {
  
  return (dispatch) => {
    dispatch({type: actionTypes.LOADING})
    dispatch({ type: actionTypes.SUBMIT_FORM });
    history.push("/");
    request(`/search?${query}`).then((data) => {
      dispatch({ type: actionTypes.ADD_DATA, data: data.results });
    });
  };
};

export const search = (filteredData)=>{
  return dispatch => {
    dispatch({type: actionTypes.SEARCH, filteredData})
  }
}