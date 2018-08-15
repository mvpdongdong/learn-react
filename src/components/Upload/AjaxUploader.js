import React, { Component } from 'react';
import getUid from './uid';
import request from './request';
import PropTypes from 'prop-types';
import attrAccept from './attr-accept';

class AjaxUploader extends Component {
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

  constructor (props) {
    super(props);
    this.reqs = {};
    this.state = {
      uid: getUid()
    };
  }

  onClick = () => {
    this.fileInput.click();
  }

  onFileDrop = (ev) => {
    ev.preventDefault();
    if (ev.type === 'dragover') {
      return;
    }
    const files = Array.from(ev.dataTransfer.files).filter(file => {
      return attrAccept(file, this.props.accept);
    });
    this.uploadFiles(files);
  }

  onChange = (ev) => {
    const files = ev.target.files;
    this.uploadFiles(files);
    this.reset();
  }

  uploadFiles = (files) => {
    const fileList = Array.from(files);
    fileList.forEach(file => {
      file.uid = getUid();
      this.upload(file, fileList);
    });
  }

  upload = (file, fileList) => {
    const { props } = this;
    if (!props.beforeUpload) {
      return setTimeout(() => {
        this.post(file);
      }, 0);
    }

    const before = props.beforeUpload(file, fileList);
    if (before && before.then) {
      before.then((processedFile) => {
        const processedFileType = Object.prototype.toString.call(processedFile);
        if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
          return this.post(processedFile);
        }
        return this.post(file);
      }).catch(e => {
        console && console.log(e); // eslint-disable-line
      });
    } else if (before !== false) {
      setTimeout(() => {
        this.post(file);
      }, 0);
    }
  }

  post = (file) => {
    if (!this._isMounted) {
      return;
    }
    const { props } = this;
    let { data } = props;
    const { onStart, onProgress } = props;
    if (typeof data === 'function') {
      data = data(file);
    }
    new Promise(resolve => {
      const { action } = props;
      if (typeof action === 'function') {
        resolve(action(file));
      }
      resolve(action);
    }).then(action => {
      const { uid } = file;
      this.reqs[uid] = request({
        filename: props.name,
        file,
        data,
        action,
        headers: props.headers,
        onProgress: onProgress ? (e) => {
          onProgress(e, file);
        } : null,
        onSuccess: (res, xhr) => {
          delete this.reqs[uid];
          props.onSuccess(res, file, xhr);
        },
        onError: (err, res) => {
          delete this.reqs[uid];
          props.onError(err, res, file);
        }
      });
      onStart(file);
    });
  }

  reset = () => {
    this.setState({
      uid: getUid()
    });
  }

  saveFileInput = (node) => {
    this.fileInput = node;
  }

  abort = (file) => {
    const { reqs } = this;
    if (file) {
      const uid = file.uid;
      reqs[uid] && reqs[uid].abort();
      delete reqs[uid];
    } else {
      Object.keys(reqs).forEach(uid => {
        reqs[uid] && reqs[uid].abort();
        delete reqs[uid];
      });
    }
  }

  render () {
    const { component: Tag, name, multiple, accept, style } = this.props;
    return (
      <Tag
        style={style}
        onClick={this.onClick}
        onDrop={this.onFileDrop}
        onDragOver={this.onFileDrop}
      >
        <input
          key={this.state.uid}
          ref={this.saveFileInput}
          style={{ display: 'none' }}
          name={name}
          accept={accept}
          multiple={multiple}
          type="file"
          onChange={this.onChange}
        />
        {this.props.children}
      </Tag>
    );
  }

  componentDidMount () {
    this._isMounted = true;
  }

  componentWillUnmount () {
    this._isMounted = false;
    this.abort();
  }
}

export default AjaxUploader;
