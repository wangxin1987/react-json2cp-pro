import React, { Component } from 'React';
import { Checkbox } from 'antd';


/**
 * 
 *  { "title": "是否验证", "name": "auth", "type": "check", "default": true },
 */
export default class HMCheck extends Component {

    handleCheckChange = (e) => {
        this.props.onChangeCheckValue(e.target.checked)
    }

    render() {
        const { title, data: defFlag } = this.props
        return (
            <div>
                <Checkbox
                    defaultChecked={defFlag}
                    onChange={this.handleCheckChange}>
                    {title}
                </Checkbox>
            </div >
        )
    }

}