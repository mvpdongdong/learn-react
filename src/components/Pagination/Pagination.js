import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pager from './Pager';
import './Pagination.scss';

function noop () {
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

  handleChange = (page) => {
    this.setState({
      current: page
    });
    if (this.props.onChange) {
      this.props.onChange(page);
    }
  }

  handleClick = (page) => {
    if (this.state.current !== page) {
      this.handleChange(page);
    }
  }

  handleKeyPress = (e, clickHanlder, page) => {
    if (e.key === 'Enter' || e.charCode === 13) {
      clickHanlder(page);
    }
  }

  handleKeyPressPrev = (e) => {
    if (e.key === 'Enter' || e.charCode === 13) {
      this.prev();
    }
  }

  handleKeyPressNext = (e) => {
    if (e.key === 'Enter' || e.charCode === 13) {
      this.next();
    }
  }

  getJumpPrevPage = () => {
    return Math.max(1, this.state.current - 5);
  }

  getJumpNextPage = () => {
    return Math.min(this.caculatePage(), this.state.current + 5);
  }

  prev = () => {
    if (this.hasPrev()) {
      this.handleChange(this.state.current - 1);
    }
  }

  next = () => {
    if (this.hasNext()) {
      this.handleChange(this.state.current + 1);
    }
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

  hasPrev () {
    return this.state.current !== 1;
  }

  hasNext () {
    return this.state.current !== this.caculatePage();
  }

  render () {
    if (this.props.hideOnSinglePage && this.caculatePage() === 1) {
      return null;
    }

    const { props } = this;
    const { current } = this.state;
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
          onKeyPress={this.handleKeyPress}
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
          onKeyPress={this.handleKeyPress}
          key={1}
          page={1}
          active={false}
          showTitle={props.showTitle}
          itemRender={props.itemRender}
        />
      );
      let left = Math.max(1, current - pageBufferSize);
      let right = left + 2 * pageBufferSize;
      if (right > allPages) {
        right = allPages;
        left = right - 2 * pageBufferSize;
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
            onKeyPress={this.handleKeyPress}
          />
        );
      }
      if (left > 1) {
        pagerList[0] = React.cloneElement(pagerList[0], {
          className: `${prefixCls}-item-after-jump-prev`,
        });
        pagerList.unshift(jumpPrev);
        pagerList.unshift(firstPager);
      }
      if (right < allPages) {
        pagerList[pagerList.length - 1] = React.cloneElement(pagerList[pagerList.length - 1], {
          className: `${prefixCls}-item-before-jump-next`,
        });
        pagerList.push(jumpNext);
        pagerList.push(lastPager);
      }
    }
    const prevDisabled = !this.hasPrev();
    const nextDisabled = !this.hasNext();
    return (
      <ul className={prefixCls}>
        <li
          title={props.showTitle ? '上一页' : null}
          tabIndex={prevDisabled ? null : 0}
          onKeyPress={this.handleKeyPressPrev}
          onClick={this.prev}
          className={`${prevDisabled && `${prefixCls}-prev-disabled`} ${prefixCls}-prev`}
        >
          {props.itemRender(prevPage, 'prev', <a className={`${prefixCls}-item-link`}>{'<'}</a>)}
        </li>
        { pagerList }
        <li
          title={props.showTitle ? '下一页' : null}
          tabIndex={nextDisabled ? null : 0}
          onKeyPress={this.handleKeyPressNext}
          onClick={this.next}
          className={`${nextDisabled && `${prefixCls}-next-disabled`} ${prefixCls}-next`}
        >
          {props.itemRender(nextPage, 'next', <a className={`${prefixCls}-item-link`}>{'>'}</a>)}
        </li>
      </ul>
    );
  }
}

export default Pagination;
