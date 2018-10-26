const themeReducer = (state = 'red', action) => {
  switch (action.type) {
    case 'CHANGE_COLOR':
      return action.themeColor;
    default:
      return state;
  }
};

export default themeReducer;
