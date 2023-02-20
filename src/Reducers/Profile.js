// import * as actionTypes from '@actions/actionTypes';
const initialState = {user_data: []};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return action.data;
    case 'CLEAR':
      return {};
    default:
      return state;
  }
};
