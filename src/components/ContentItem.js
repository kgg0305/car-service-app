import React from "react";
import { Select, Button, DatePicker, Input, Space } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import { Constants } from '../constants/Constants';

function ContentItem(props) {
    switch (props.item.type) {
        case Constants.inputTypes.select:
            return (
                <Select
                    key={props.key}
                    size={'large'}
                    suffixIcon={<CaretDownOutlined />}
                    placeholder={props.item.placeholder}
                    style={{ width: props.item.width }}
                >
                    {
                        props.item.data 
                        ? props.item.data.map((optionItem, optionIndex) => (
                            <Select.Option key={optionIndex} value={optionItem.value}>
                                {optionItem.label}
                            </Select.Option>
                        )) 
                        : ''
                    }
                </Select>
            );
            break;

        case Constants.inputTypes.button:
            return (
                <Button key={props.key} 
                    size={'large'}
                    className={ props.item.style }
                >
                    {props.item.label}
                </Button>
            );
            break;

        case Constants.inputTypes.datePicker:
            return (
                <DatePicker key={props.key} size={'large'} placeholder={props.item.placeholder} />
            );
            break;

        case Constants.inputTypes.label:
            return (
                props.item.icon
                ?
                <Space>
                    {props.item.icon}
                    <label key={props.key}>{props.item.label}</label>
                </Space>
                :
                <label key={props.key}>{props.item.label}</label>
            );
            break;

        case Constants.inputTypes.input:
            return (
                <Input key={props.key} size={'large'} style={{ width: props.item.width }} placeholder={props.item.placeholder} disabled={props.item.disabled} value={props.item.value} />
            );
            break;
    
        default:
            break;
    }
}

export default ContentItem;