import * as actionTypes from "./actionTypes";

const defaultState = {
  data: [],
  filteredData: null,
  loading: false,
  isSubmittedForm: false,
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.LOADING: {
      return { ...state, loading: true };
    }
    case actionTypes.ADD_DATA: {
      return { ...state, data: action.data, loading: false };
    }
    case actionTypes.SUBMIT_FORM: {
      return { ...state, isSubmittedForm: true };
    }
    case actionTypes.SEARCH: {
      return { ...state, filteredData: action.filteredData, loading: false };
    }
    default:
      return state;
  }
}

export default reducer;
