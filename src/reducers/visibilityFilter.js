const INIT_VISIBILITY_FILTER = localStorage.getItem('filter') || 'SHOW_ALL';
const visibilityFilter = (state=INIT_VISIBILITY_FILTER, action) => {
  switch (action.type) {
  case 'SET_VISIBILITY_FILTER':
    localStorage.setItem('filter', action.filter);
    return action.filter;
  default:
    return state;
  }
};
export default visibilityFilter;
