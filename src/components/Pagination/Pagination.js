import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Pager from './Pager';
import './Pagination.scss';

function noop () {
}

function isInteger (value) {
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value;
}

function defaultItemRender (page, type, element) {
  return element;
}

class Pagination extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    pageSize: PropTypes.number,
    defaultPageSize: PropTypes.number,
    total: PropTypes.number,
    current: PropTypes.number,
    defaultCurrent: PropTypes.number,
    onChange: PropTypes.func,
    itemRender: PropTypes.func,
    style: PropTypes.object,
    showTitle: PropTypes.bool,
    hideOnSinglePage: PropTypes.bool
  }

  static defaultProps = {
    prefixCls: 'sd-pagination',
    defaultPageSize: 10,
    defaultCurrent: 1,
    total: 0,
    onChange: noop,
    itemRender: defaultItemRender,
    showTitle: true,
    hideOnSinglePage: false,
    style: {},
    className: '',
  }

  constructor (props) {
    super(props);
    let current = ('current' in props) ? props.current : props.defaultCurrent;
    let pageSize = ('pageSize' in props) ? props.pageSize : props.defaultPageSize;
    this.state = {
      current,
      pageSize
    };
  }

  componentWillReceiveProps (nextProps) {
    if ('current' in nextProps) {
      this.setState({
        current: nextProps.current
      });
    }

    if ('pageSize' in nextProps) {
      const newState = {};
      let current = this.state.current;
      let newCurrent = this.caculatePage(nextProps.pageSize);
      current = newCurrent < current ? newCurrent : current;
      if (!('current' in nextProps)) {
        newState.current = current;
      }
      newState.pageSize = nextProps.pageSize;
      this.setState(newState);
    }
  }

  caculatePage (p) {
    let pageSize = p;
    if (typeof pageSize === 'undefined') {
      pageSize = this.state.pageSize;
    }
    return Math.ceil(this.props.total / pageSize);
  }

  handleClick = (page) => {
    if (this.state.current !== page) {
      this.setState({
        current: page
      });
      if (this.props.onChange) {
        this.props.onChange(page);
      }
    }
  }

  getJumpPrevPage = () => {
    return Math.max(1, this.state.current - 5);
  }

  getJumpNextPage = () => {
    return Math.min(this.caculatePage(), this.state.current + 5);
  }

  prev = () => {

  }

  next = () => {

  }

  jumpPrev = () => {
    this.setState({
      current: this.getJumpPrevPage()
    });
  }

  jumpNext = () => {
    this.setState({
      current: this.getJumpNextPage()
    });
  }

  render () {
    const { props } = this;
    const { current, pageSize } = this.state;
    const { prefixCls } = props;
    const allPages = this.caculatePage();
    const pageBufferSize = 2;
    const pagerList = [];
    const prevPage = Math.max(1, current - 1);
    const nextPage = Math.min(allPages, current + 1);
    if (allPages <= 5 + pageBufferSize * 2) {
      for (let i = 1; i <= allPages; i ++) {
        const active = i === current;
        pagerList.push(
          <Pager
            page={i}
            active={active}
            rootPrefixCls={prefixCls}
            key={i}
            showTitle={props.showTitle}
            itemRender={props.itemRender}
            onClick={this.handleClick}
          />
        );
      }
    } else {
      const jumpPrev = (
        <li
          title={props.showTitle ? '向前5页' : null}
          key="prev"
          onClick={this.jumpPrev}
          tabIndex="0"
          className={`${prefixCls}-jump-prev`}
        >
          {props.itemRender(
            this.getJumpPrevPage(), 'jump-prev', <a className={`${prefixCls}-item-link`}>...</a>
          )}
        </li>
      );
      const jumpNext = (
        <li
          title={props.showTitle ? '向后5页' : null}
          key="next"
          tabIndex="0"
          onClick={this.jumpNext}
          className={`${prefixCls}-jump-next`}
        >
          {props.itemRender(
            this.getJumpNextPage(), 'jump-next', <a className={`${prefixCls}-item-link`}>...</a>
          )}
        </li>
      );
      const lastPager = (
        <Pager
          last
          rootPrefixCls={prefixCls}
          onClick={this.handleChange}
          key={allPages}
          page={allPages}
          active={false}
          showTitle={props.showTitle}
          itemRender={props.itemRender}
        />
      );
      const firstPager = (
        <Pager
          rootPrefixCls={prefixCls}
          onClick={this.handleChange}
          key={1}
          page={1}
          active={false}
          showTitle={props.showTitle}
          itemRender={props.itemRender}
        />
      );
      let left = Math.max(1, current - pageBufferSize);
      let right = Math.min(allPages, current + pageBufferSize);
      if (current - pageBufferSize <= 1) {
        right= 1 + pageBufferSize * 2;
      }
      if (current + pageBufferSize >= allPages) {
        left = allPages - pageBufferSize * 2;
      }
      for (let i = left; i <= right; i ++) {
        const active = i === current;
        pagerList.push(
          <Pager
            page={i}
            active={active}
            rootPrefixCls={prefixCls}
            key={i}
            showTitle={props.showTitle}
            itemRender={props.itemRender}
            onClick={this.handleClick}
          />
        );
      }
      if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
        pagerList[0] = React.cloneElement(pagerList[0], {
          className: `${prefixCls}-item-after-jump-prev`,
        });
        pagerList.unshift(jumpPrev);
      }
      if (allPages - current >= pageBufferSize * 2 && current !== allPages - 2) {
        pagerList[pagerList.length - 1] = React.cloneElement(pagerList[pagerList.length - 1], {
          className: `${prefixCls}-item-before-jump-next`,
        });
        pagerList.push(jumpNext);
      }

      if (left !== 1) {
        pagerList.unshift(firstPager);
      }
      if (right !== allPages) {
        pagerList.push(lastPager);
      }
    }
    return (
      <ul className={prefixCls}>
        <li
          title={props.showTitle ? '上一页' : null}
          onClick={this.prev}
          className={`${prefixCls}-prev`}
        >
          {props.itemRender(prevPage, 'prev', <a className={`${prefixCls}-item-link`}>{'<'}</a>)}
        </li>
        { pagerList }
        <li
          title={props.showTitle ? '下一页' : null}
          onClick={this.next}
          className={`${prefixCls}-next`}
        >
          {props.itemRender(nextPage, 'next', <a className={`${prefixCls}-item-link`}>{'>'}</a>)}
        </li>
      </ul>
    );
  }
}

export default Pagination;
