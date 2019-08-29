import React, { Component } from 'React';
import { Input } from 'antd';
const { TextArea } = Input;

/**
 * { "title": "备注", "name": "description", "type": "textarea" }
 */
export default class HMTextarea extends Component {
  render() {
    return (
      <div>
        <TextArea {...this.props} />
      </div>
    )
  }

}