import React from "react";
import { Select, Button, DatePicker, Input, Space, Upload } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import { Constants } from '../constants/Constants';
import { Link } from "react-router-dom";

function ContentItem({ item, key, value, onChange}) {
    switch (item.type) {
        case Constants.inputTypes.select:
            return (
                <Select
                    key={key}
                    size='large'
                    value={value}
                    onChange={value => {
                        onChange(item.name ,value);
                    }}
                    suffixIcon={<CaretDownOutlined />}
                    placeholder={item.placeholder}
                    style={{ width: item.width }}
                >
                    {
                        item.data 
                        ? item.data.map((optionItem, optionIndex) => (
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
            if(item.link) {
                return (
                    <Link to={item.link}>
                        <Button key={key} 
                            size='large'
                            className={ item.style }
                        >
                            {item.label}
                        </Button>
                    </Link>
                );
            } else {
                return (
                    <Button key={key} 
                        size='large'
                        className={ item.style }
                    >
                        {item.label}
                    </Button>
                );
            }
            

            break;

        case Constants.inputTypes.upload:
            return (
                <Upload>
                    <Button key={key} 
                        size='large'
                        className={ item.style }
                    >
                        {item.label}
                    </Button>
                </Upload>
                
            );
            break;

        case Constants.inputTypes.datePicker:
            return (
                <DatePicker key={key} size='large' placeholder={item.placeholder} />
            );
            break;

        case Constants.inputTypes.label:
            return (
                item.icon
                ?
                <Space>
                    {item.icon}
                    <label key={key}>{item.label}</label>
                </Space>
                :
                <label key={key}>{item.label}</label>
            );
            break;

        case Constants.inputTypes.input:
            return (
                <Input 
                    key={key} 
                    size='large' 
                    value={value}
                    onChange={e => {
                        onChange(item.name, e.target.value);
                    }}
                    style={{ width: item.width }} placeholder={item.placeholder} disabled={item.disabled} />
            );
            break;
    
        default:
            break;
    }
}

export default ContentItem;