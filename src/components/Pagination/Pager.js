import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function Pager (props) {
  const prefixCls = `${props.rootPrefixCls}-item`;
  const classString = classNames(prefixCls, `${prefixCls}-${props.page}`, {
    [`${prefixCls}-active`]: props.active,
    [props.className]: props.className
  });

  const handleClick = () => {
    props.onClick(props.page);
  };

  const handleKeyPress = e => {
    props.onKeyPress(e, props.onClick, props.page);
  };

  return (
    <li
      title={props.showTitle ? props.page : null}
      className={classString}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex="0"
    >
      {props.itemRender(props.page, 'page', <a>{props.page}</a>)}
    </li>
  );
}

Pager.propTypes = {
  page: PropTypes.number,
  active: PropTypes.bool,
  className: PropTypes.string,
  showTitle: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  itemRender: PropTypes.func,
  rootPrefixCls: PropTypes.string,
};

export default Pager;
