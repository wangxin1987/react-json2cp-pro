import React, { Component } from 'React';
import { Select } from 'antd';

const { Option } = Select;

/**
   { "title": "请求方式", "name": "method", "type": "select", "data": ["GET", "POST", "PUT", "DELETE"] },
   {
      "title": "运行规则", "name": "run_type", "type": "select", "data": 
      [
        { "name": "内置函数", "value": 2 },
        { "name": "数据表", "value": 3 },
        { "name": "SQL", "value": 1 }
      ]
    },
    { "title": "上级接口", "name": "parent", "type": "select", "url": "manager/api?parent=0" },
 */
export default class HMSelect extends Component {

  handleSelectChange = val => {
    this.props.onChangeSelectValue(val);
  }


  dataConvertComponent(d) {
    // 包含URL: 请求URL，数据赋值
    if (d.hasOwnProperty('url')) {
      console.log("url=", d)
    }
    // 静态数据
    else {
      let arr = d.data
      let obj = arr[0]
      //default
      if (Object.prototype.toString.call(obj) === '[object String]') {
        return (
          <Select defaultValue={obj} onChange={this.handleSelectChange}>
            {arr.map(item => <Option value={item}>{item}</Option>)}
          </Select>
        )
      }
      else if (Object.prototype.toString.call(obj) === '[object Object]') {
        return (
          <Select defaultValue={obj.value} onChange={this.handleSelectChange}>
            {arr.map(item => <Option value={item.value}>{item.name}</Option>)}
          </Select>
        )
      }
    }
  }

  render() {
    return (
      <div>
        {this.dataConvertComponent(this.props)}
      </div>
    )
  }

}