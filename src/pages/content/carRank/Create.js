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
                            <label className='main-header-title'>자동차 인기순위 등록</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/content/carRank">
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
                    <Space direction='vertical' size={0} split={<Divider />}>
                        <Row align='middle'>
                            <Col>
                                <label className='main-sub-title'>콘텐츠  선택</label>
                            </Col>
                            <Col flex="auto" />
                        </Row>
                        <Space direction='vertical' size={20}>
                            <Row gutter={[30]}>
                                <Col>
                                    <Space size={10}>
                                        <label>최소 등록수량</label>
                                        <Input size='large' style={{width: 130}} value={'1 / 20'} disabled />
                                    </Space>
                                </Col>
                                <Col>
                                    <Space size={10}>
                                        <label>국내</label>
                                        <Input size='large' style={{width: 130}} value={'1 / 20'} disabled />
                                    </Space>
                                </Col>
                                <Col>
                                    <Space size={10}>
                                        <label>수입</label>
                                        <Input size='large' style={{width: 130}} value={'0 / 20'} disabled />
                                    </Space>
                                </Col>
                            </Row>
                            <Space direction='vertical' size={0}>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>순서 1</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space size={10}>
                                            <Select
                                                suffixIcon={<CaretDownOutlined />}
                                                placeholder="브랜드 선택"
                                                style={{ width: 300 }}
                                            >
                                                <Option value="jack">Jack</Option>
                                                <Option value="lucy">Lucy</Option>
                                                <Option value="Yiminghe">yiminghe</Option>
                                            </Select>
                                            <Select
                                                suffixIcon={<CaretDownOutlined />}
                                                placeholder="모델그룹 선택"
                                                style={{ width: 300 }}
                                            >
                                                <Option value="jack">Jack</Option>
                                                <Option value="lucy">Lucy</Option>
                                                <Option value="Yiminghe">yiminghe</Option>
                                            </Select>
                                            <Select
                                                suffixIcon={<CaretDownOutlined />}
                                                placeholder="모델 선택"
                                                style={{ width: 300 }}
                                            >
                                                <Option value="jack">Jack</Option>
                                                <Option value="lucy">Lucy</Option>
                                                <Option value="Yiminghe">yiminghe</Option>
                                            </Select>
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