import React, { useState } from "react";
import { Col, Row, Space, Button } from 'antd';
import ContentItem from './ContentItem';
import styles from "../assets/styles/components/SearchPanel.module.css";

function SearchPanel({ dataSource, onSearch }) {

    var initSearchData = {};

    dataSource.map((item) => {
        item.columns.map((subItem) => {
            subItem.contentItems.map((contentItem) => {
                initSearchData[contentItem.name] = null;
            })
        })
    });
    
    const [searchData, setSearchData] = useState(initSearchData);
    
    const onContentItemChange = (itemName, itemValue) => {
        setSearchData({
            ...searchData,
            [itemName]: itemValue
        });
    };

    const onReset = () => {
        setSearchData(initSearchData);
        onSearch(initSearchData);
    };

    return (
        <Space direction='vertical' size={20}>
            <label key={0} className={styles.titleLabel}>검색</label>
            <div key={1}>
                {
                    dataSource.map((item, index) => (
                        <Row key={index} gutter={[0]} align="middle" style={{ height: item.height }} className={styles.table}>
                            {
                                item.columns.map((subItem, subIndex) => (
                                    <>
                                        <Col key={subIndex + "_1"} flex={subItem.titleWidth} className={styles.tableHeader}>
                                            <label className={styles.tableHeaderLabel}>{subItem.titleText}</label>
                                        </Col>
                                        <Col key={subIndex + "_2"} flex="auto" className={styles.tableValue}>
                                            <Space size={6}>
                                                {
                                                    subItem.contentItems.map((contentItem, contentIndex) => (
                                                        <ContentItem item={contentItem} key={contentIndex} value={searchData[contentItem.name]} onChange={onContentItemChange} />
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
                    <Button className='white-button big-button' onClick={onReset}>초기화</Button>
                </Col>
                <Col>
                    <Button className='black-button big-button' onClick={() => onSearch(searchData)}>검색</Button>
                </Col>
            </Row>
        </Space>
    );
}

export default SearchPanel;