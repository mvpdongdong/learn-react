import { createStore } from 'redux';

const themeReducer = (state, action) => {
  if (!state) {
    return {
      themeColor: 'red'
    };
  }
  switch (action.type) {
  case 'CHANGE_COLOR':
    return { ...state, themeColor: action.themeColor };
  default:
    return state;
  }
};

export const store = createStore(themeReducer);
