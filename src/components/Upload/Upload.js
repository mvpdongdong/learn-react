import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AjaxUploader from './AjaxUploader';
import IframeUploader from './IframeUploader';

function noop () {}

class Upload extends Component {
  static propTypes = {
    component: PropTypes.string,
    name: PropTypes.string,
    action: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),
    style: PropTypes.object,
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func
    ]),
    multiple: PropTypes.bool,
    headers: PropTypes.object,
    accept: PropTypes.string,
    disabled: PropTypes.bool,
    withCredentials: PropTypes.bool,
    beforeUpload: PropTypes.func,
    onStart: PropTypes.func,
    onProgress: PropTypes.func,
    onSuccess: PropTypes.func,
    onError: PropTypes.func
  }

  static defaultProps = {
    component: 'span',
    name: 'file',
    data: {},
    headers: {},
    multiple: false,
    withCredentials: false,
    beforeUpload: null,
    onStart: noop,
    onProgress: noop,
    onSuccess: noop,
    onError: noop,
  }

  getComponent () {
    return typeof File ? AjaxUploader : IframeUploader;
    // return IframeUploader;
  }

  abort (file) {
    this.uploader.abort(file);
  }

  saveUploader = (node) => {
    this.uploader = node;
  }

  render () {
    const Component = this.getComponent();
    return (
      <Component {...this.props} ref={this.saveUploader}/>
    );
  }
}

export default Upload;
