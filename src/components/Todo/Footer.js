import React from 'react';
import FilterLink from '~/containers/Todo/FilterLink';
import { VisibilityFilters } from '~/store/actions/todo';

const Footer = () => (
  <div className="todo-filter">
    <span>Show: </span>
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>
      All
    </FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
      Active
    </FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
      Completed
    </FilterLink>
  </div>
);

export default Footer;
