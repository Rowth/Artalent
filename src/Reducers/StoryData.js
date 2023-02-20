// import * as actionTypes from '@actions/actionTypes';
const initialState = {
  data: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'ADD_STORY':
      return {
        data: action.data,
      };
    case 'CLEAR':
      return {
        data: null,
      };
    default:
      return state;
  }
};
