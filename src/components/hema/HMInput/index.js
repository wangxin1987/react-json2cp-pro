import React, { Component } from 'React';
import { Input } from 'antd';

/**
 *  文本框
 *  
 *  { "title": "名称", "placeholder": "哈哈哈", "type": "input" }
 */
export default class HMInput extends Component {
  render() {
    return (
      <div>
        <Input {...this.props} />
      </div>
    )
  }

}