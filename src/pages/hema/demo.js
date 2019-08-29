
import React, { Component } from 'React';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva';
import HMInput from '../../components/hema/HMInput/index'
import HMSelect from '../../components/hema/HMSelect/index'
import HMCheck from '../../components/hema/HMCheck/index'
import HMTextarea from '../../components/hema/HMTextarea/index'
import HMEditTable from '../../components/hema/HMEditTable/index'

const FormItem = Form.Item;

const mock = [
    { "title": "名称", "name": "name", "type": "input", 'default': 'test007' },
    { "title": "请求方式", "name": "method", "type": "select", "data": ["GET", "POST", "PUT", "DELETE"] },
    { "title": "是否验证", "name": "auth", "type": "check", "data": true },
    { "title": "备注", "name": "description", "type": "textarea", 'data': '备注' },
    {
        "title": "运行规则", "name": "run_type", "type": "select", "data": [
            { "name": "内置函数", "value": 2 },
            { "name": "数据表", "value": 3 },
            { "name": "SQL", "value": 1 }
        ]
    },
    // { "title": "上级接口", "name": "parent", "type": "select", "url": "manager/api?parent=0" },
    {
        "title": "参数", "name": "parameters", "type": "table", "data": [
            { "title": "名称", "name": "name", "type": "input" },
            { "title": "标题", "name": "title", "type": "input" },
            { "title": "类型", "name": "type", "type": "select", "data": ["int", "str"] },
            { "title": "必填", "name": "required", "type": "check", "data": false },
            { "title": "默认", "name": "default", "type": "input" },
            { "title": "规则", "name": "rule", "type": "input" },
            { "title": "说明", "name": "notify", "type": "input" }
        ]
    }
]


class Demo extends React.Component {

    okHandler = () => {
        const { dispatch } = this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const editTableData = this.child.getEditTableValue()
                console.log('editTableData=-=', editTableData)
                dispatch({
                    type: 'hema/submit',
                    payload: {
                        ...values,
                        [editTableData.name]: editTableData.dataSource
                    }
                })
            }
        });
    };

    onChangeSelectValue = (m, val) => {
        this.props.form.setFieldsValue({
            [m.name]: val,
        });
    }

    onChangeCheckValue = (m, val) => {
        this.props.form.setFieldsValue({
            [m.name]: val,
        });
    }

    bindRef = ref => { this.child = ref }

    getCp = (m) => {
        const { getFieldDecorator } = this.props.form;
        switch (m.type.toLowerCase()) {
            case 'input':
                return (
                    getFieldDecorator(m.name, {
                        initialValue: m.default,
                    })(<HMInput {...m} />)
                )
                break;
            case 'select':
                return (
                    getFieldDecorator(m.name, {
                        initialValue: m.data[0].value || m.data[0] || '',
                    })(<HMSelect {...m} onChangeSelectValue={val => this.onChangeSelectValue(m, val)} />)
                )
                break;
            case 'check':
                return (
                    getFieldDecorator(m.name, {
                        initialValue: m.default || '',
                    })(<HMCheck {...m} onChangeCheckValue={val => this.onChangeCheckValue(m, val)} />)
                )
                break;
            case 'textarea':
                return (
                    getFieldDecorator(m.name, {
                        initialValue: m.default || '',
                    })(<HMTextarea {...m} />)
                )
                break;
            case 'table':
                return (
                    getFieldDecorator(m.name, {
                        initialValue: m.default || '',
                    })(<HMEditTable
                        name={m.name}
                        triggerRef={this.bindRef}
                        editTableData={m.data}
                    />)
                )
                break;
            default:
                break;
        }
    }


    render() {
        // const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <div>
                <Form layout="horizontal" onSubmit={this.okHandler}>
                    {
                        mock.map(m => {
                            return (
                                <FormItem {...formItemLayout} label={m.title} >
                                    {this.getCp(m)}
                                </FormItem>
                            )
                        })
                    }
                </Form>
                <Button type="primary" onClick={this.okHandler}>提交</Button>
            </div>
        )
    }
}


Demo = Form.create()(Demo);

function mapStateToProps(state) {
    return { ...state.hema };
}

export default connect(mapStateToProps)(Demo);
