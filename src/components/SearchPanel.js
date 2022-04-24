import React from "react";
import { Col, Row, Space, Select, Button, DatePicker } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import { Constants } from '../constants/Constants';

function ShowContentItem(contentItem, contentIndex) {
    switch (contentItem.type) {
        case Constants.inputTypes.select:
            return (
                <Select
                    key={contentIndex}
                    suffixIcon={<CaretDownOutlined />}
                    placeholder={contentItem.placeholder}
                    style={{ width: contentItem.width }}
                >
                    {
                        contentItem.data 
                        ? contentItem.data.map((optionItem, optionIndex) => (
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
                <Button key={contentIndex} className={ contentItem.selected ? 'black-button smallest-button' : 'smallest-button' }>{contentItem.label}</Button>
            );
            break;

        case Constants.inputTypes.datePicker:
            return (
                <DatePicker key={contentIndex} placeholder={contentItem.placeholder} />
            );
            break;

        case Constants.inputTypes.label:
            return (
                <label key={contentIndex}>{contentItem.label}</label>
            );
            break;
    
        default:
            break;
    }
}

function SearchPanel(props) {
    return (
        <Space direction='vertical' size={20}>
            <label key={0} className='main-sub-title'>검색</label>
            <div key={1}>
                {
                    props.dataSource.map((item, index) => (
                        <Row key={index} gutter={[0]} align="middle" style={{ height: item.height }} className='table-layout'>
                            {
                                item.columns.map((subItem, subIndex) => (
                                    <>
                                        <Col key={subIndex + "_1"} flex={subItem.titleWidth} className='table-header-col-section'>
                                            <label>{subItem.titleText}</label>
                                        </Col>
                                        <Col key={subIndex + "_2"} flex="auto" className='table-value-col-section'>
                                            <Space size={6}>
                                                {
                                                    subItem.contentItems.map((contentItem, contentIndex) => (
                                                        ShowContentItem(contentItem, contentIndex)
                                                    ))
                                                }
                                            </Space>
                                        </Col>
                                    </>
                                ))
                            }
                        </Row>
                    ))
                }
            </div>
            <Row key={2} justify="center" gutter={[17, 0]}>
                <Col>
                    <Button className='white-button big-button'>초기화</Button>
                </Col>
                <Col>
                    <Button className='black-button big-button'>검색</Button>
                </Col>
            </Row>
        </Space>
    );
}

export default SearchPanel;