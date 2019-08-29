
import React, { Component } from 'React';
import { Table, Input, Button, Popconfirm, Form, Select, Checkbox } from 'antd';

// import './EditableTable.css'

const { Option } = Select;




const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {


    getCp1 = () => {
        const { type, data } = this.props

        switch (type.toLowerCase()) {
            case 'input':
                return <Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />
                break;
            case 'select':
                return (
                    <Select defaultValue='str' style={{ width: 120 }} >
                        {data.map(item => <Option key={item} value={item}>{item}</Option>)}
                    </Select>
                )
                break;
            case 'check':
                return <div>check</div>
                break;
            default:
                return <div>default</div>
                break;
        }
    }


    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            handleSave({ ...record, ...values });
        });
    };

    handleSelectChange = (e, dataIndex) => {
        const { record, handleSave } = this.props
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            record[dataIndex] = e
            handleSave({ ...values, ...record });
        });
    }

    handleCheckChange = (e, dataIndex) => {
        const { record, handleSave } = this.props
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            record[dataIndex] = e.target.checked
            handleSave({ ...values, ...record });
        });
    }

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title, type, data } = this.props;
        switch (type.toLowerCase()) {
            case 'input':
                return (
                    <Form.Item style={{ margin: 0 }}>
                        {form.getFieldDecorator(dataIndex, {
                            initialValue: record[dataIndex],
                        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
                    </Form.Item>
                )
                break;
            case 'select':
                return (
                    <Form.Item style={{ margin: 0 }}>
                        {form.getFieldDecorator(dataIndex, {
                            initialValue: data[0],
                        })(
                            <Select onChange={(e) => this.handleSelectChange(e, dataIndex)} >
                                {data.map(item => <Option key={item} value={item}>{item}</Option>)}
                            </Select>)
                        }
                    </Form.Item >
                )
                break;
            case 'check':
                return (
                    <Form.Item style={{ margin: 0 }}>
                        {form.getFieldDecorator(dataIndex, {
                            initialValue: data,
                        })(
                            <Checkbox
                                defaultChecked={data}
                                onChange={(e) => this.handleCheckChange(e, dataIndex)}
                            >
                            </Checkbox>
                        )}
                    </Form.Item>
                )
                break;
            default:
                return <div>default</div>
                break;
        }
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;

        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                        {this.renderCell}
                    </EditableContext.Consumer>
                ) : (
                        children
                    )}
            </td>
        );
    }
}

// const editTableData = [
//     { "title": "名称", "name": "name", "type": "input" },
//     { "title": "标题", "name": "title", "type": "input" },
//     { "title": "类型", "name": "type", "type": "select", "data": ["君莫笑", "风梳烟沐", "寒烟柔", "小手冰凉", "包子入侵"] },
//     { "title": "必填", "name": "required", "type": "check", "data": false },
//     { "title": "必填1", "name": "required1", "type": "check", "data": true },
//     { "title": "默认", "name": "default", "type": "input" },
//     { "title": "规则", "name": "rule", "type": "input" },
//     { "title": "说明", "name": "notify", "type": "input" }
// ]

export default class HMEditTable extends React.Component {

    componentDidMount() {
        this.props.triggerRef(this)
    }

    constructor(props) {
        super(props);
        this.columns = []
        let ds = { key: 0 }
        props.editTableData.map(item => {
            let dsVal = ''
            switch (item.type) {
                case 'select':
                    dsVal = item.data[0]
                    break;
                case 'check':
                    dsVal = item.data
                    break;
                default:
                    break;
            }
            let col = {
                title: item.name,
                dataIndex: item.name,
                type: item.type,
                data: item.data,
                editable: true
            }
            ds[item.name] = dsVal
            this.columns.push(col)
        })

        this.state = {
            name: this.props.name,
            dataSource: [ds],
            count: 1,
        };

        this.columns.push({
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) =>
                this.state.dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        })
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    handleAdd = () => {
        const { count, dataSource } = this.state;
        let obj = {}
        this.props.editTableData.map(item => {
            let dsVal = ''
            switch (item.type) {
                case 'select':
                    dsVal = item.data[0]
                    break;
                case 'check':
                    dsVal = item.data
                    break;
                default:
                    break;
            }
            obj[item.name] = dsVal
        })
        const newData = {
            ...obj,
            key: count,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };

    handleSubmit = () => {
        console.log('submit==', this.state);
    }

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    };

    getEditTableValue = () => {
        return this.state
    }

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    type: col.type,
                    data: col.data,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    增行
        </Button>
                {/* <Button onClick={this.handleSubmit} type="primary" style={{ marginBottom: 16 }}>
                    提交
        </Button> */}
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}
