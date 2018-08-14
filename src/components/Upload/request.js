function getBody (xhr) {
  const res = xhr.responseText || xhr.response;
  return res;
}

function getError (options, xhr) {
  const msg = `cannot post ${options.action} ${xhr.status}'`;
  const err = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = options.action;
  return err;
}

const request = function (options) {
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  const { data, headers } = options;

  formData.append(options.filename, options.file);

  for (let key in data) {
    formData.append(key, data[key]);
  }

  if (options.onProgress && xhr.upload) {
    xhr.upload.onprogress = (e) => {
      if (e.total) {
        e.percent = e.loaded / e.total * 100;
      }
      options.onProgress(e);
    };
  }

  xhr.onerror = (e) => {
    options.onError(e);
  };

  xhr.onload = () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      options.onError(getError(options, xhr), getBody(xhr));
    }
    options.onSuccess(getBody(xhr), xhr);
  };

  xhr.open('post', options.action, true);

  if (options.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  for (const h in headers) {
    if (headers.hasOwnProperty(h) && headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h]);
    }
  }

  xhr.send(formData);

  return {
    bort () {
      xhr.bort();
    }
  };
};

export default request;
