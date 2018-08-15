import React, { Component } from 'react';
import Card from '~/components/Card';
import message from '~/components/Message';
import Radio from '~/components/Radio/Radio';
import Checkbox from '~/components/Checkbox/Checkbox';
import Uploader from '~/components/Upload/Upload';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const optionsWithDisabled = [
  { value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false },
];

const previewFile = (file, callback) => {
  const reader = new FileReader();
  reader.onloadend = () => callback(reader.result);
  reader.readAsDataURL(file);
};
class ComponentPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      radio: 2,
      checkbox: [1],
      thumbUrl: ''
    };
  }

  handleClick = () => {
    message.success('hello');
  }

  handleRadioChange = (ev) => {
    this.setState({
      radio: ev.target.value
    });
  }

  handleCheckboxChange = (value) => {
    console.log('checkbox', value);
    this.setState({
      checkbox: value
    });
  }

  handleIframeLoad = () => {
    console.log('iframe loaded');
  }

  render () {

    const uploadProps = {
      name: 'file',
      action: '/ueditor/index?action=uploadimage',
      accept: 'image/*',
      onProgress: (e, file) => {
        this.setState({
          uploadProgress: e.percent
        });
      },
      onSuccess: (res, file) => {
        const reg = /<\/script>/;
        reg.test(res) && ([, res] = res.split('</script>'));
        res = JSON.parse(res);
        previewFile(file, (result) => {
          this.setState({
            thumbUrl: result
          });
        });
        console.log(file);
        message.success('上传成功！');
      },
      onError (error, res, file) {
        message.error(error);
        console.log(error);
      }
    };

    return (
      <div>
        <Card>
          <h2>message组件</h2>
          <button onClick={this.handleClick}>点击</button>
        </Card>
        <Card>
          <h2>单选框组件</h2>
          <RadioGroup onChange={this.handleRadioChange} value={this.state.radio}>
            <Radio value={1}>hello</Radio>
            <Radio value={2}>shen</Radio>
          </RadioGroup>
          <RadioGroup options={optionsWithDisabled}  defaultValue={'Apple'}/>
        </Card>
        <Card>
          <h2>复选框组件</h2>
          <CheckboxGroup onChange={this.handleCheckboxChange} value={this.state.checkbox}>
            <Checkbox value={1}>hello</Checkbox>
            <Checkbox value={2}>shen</Checkbox>
          </CheckboxGroup>
          <CheckboxGroup  options={optionsWithDisabled} defaultValue={['Apple']}/>
        </Card>
        <Card>
          <h2>上传组件</h2>
          <Uploader {...uploadProps}>
            <button>上传</button>
          </Uploader>
          <div>
            {this.state.thumbUrl ? <img alt="preview" width="200px" height="300px" src={this.state.thumbUrl}/> : null}
          </div>
        </Card>
      </div>
    );
  }
}

export default ComponentPage;
