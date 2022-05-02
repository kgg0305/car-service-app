import { Col, Divider, Row, Space, Select, Button, Input } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const { Option } = Select;

function Create() {

    return(
        <>
            <Space direction='vertical' size={18} className='main-layout'>
                {/* Page Header */}
                <Space direction='vertical' size={18}>
                    <Row justify='middle'>
                        <Col>
                            <label className='main-header-title'>포토뉴스 수정 </label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/content/recommendation">
                                    <Button className='white-button medium-button'>취소</Button>
                                </Link>
                                <Button className='black-button medium-button'>저장하고 나가기</Button>
                            </Space>
                        </Col>
                    </Row>
                    <Divider className='main-body-divider' />
                </Space>

                {/* Body Section */}
                <Space direction='vertical' size={20} style={{paddingBottom: 117}}>
                    <Space direction='vertical' size={72} split={<Divider />}>
                        <Space direction='vertical' size={20}>
                            <Row align='middle'>
                                <Col>
                                    <label className='main-sub-title'>정보</label>
                                </Col>
                                <Col flex="auto" />
                            </Row>
                            <Space direction='vertical' size={0}>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>카테고리</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Input size='large' style={{ width:600 }} />
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>사용여부</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Select
                                            suffixIcon={<CaretDownOutlined />}
                                            placeholder="선택"
                                            defaultValue="true"
                                            style={{ width: 150 }}
                                        >
                                            <Option value="true">사용</Option>
                                            <Option value="false">미사용</Option>
                                        </Select>
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>태그</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Input size='large' style={{ width:600 }} placeholder={'콤마 ( , )로 구분해서 작성해 주세요  예시) 현대, 제네시스'} />
                                    </Col>
                                </Row>
                            </Space>
                        </Space>
                        <Space direction='vertical' size={20}>
                            <Row align='middle'>
                                <Col>
                                    <label className='main-sub-title'>콘텐츠  선택</label>
                                </Col>
                                <Col flex="auto" />
                            </Row>
                            <Space direction='vertical' size={0}>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>순서 1</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space size={10}>
                                            <Input placeholder='콘텐츠 번호 또는 줌 자동차 뉴스의 URL 입력' style={{ width:500 }} />
                                            <Input placeholder='콘텐츠 번호 또는 줌 자동차 뉴스의 URL 입력' style={{ width:500 }} />
                                        </Space>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space size={10}>
                                            <Button className='white-button medium-button'>삭제</Button>
                                            <Button className='black-button medium-button'>추가</Button>
                                        </Space>
                                    </Col>
                                </Row>
                            </Space>
                        </Space>
                    </Space>
                </Space>
            </Space>
        </>
    );
}

export default Create;