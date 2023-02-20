const initialState = {music_List: []};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'GETMUSIC':
      return action.data;
    case 'CLEAR':
      return {};
    default:
      return state;
  }
};
