import { Col, Divider, Row, Space, Select, Button, Input, Image, Upload, Modal } from 'antd';
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
                            <label className='main-header-title'>내 정보</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Button className='black-button medium-button'>저장하기</Button>
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
                                        <label>이름</label>
                                    </Col>
                                    <Col span={4} className='table-value-col-section'>
                                        <Input placeholder="이름" value={'김철수'} maxLength={15} style={{ width: 150 }} />
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>아이디</label>
                                    </Col>
                                    <Col span={4} className='table-value-col-section'>
                                        <Input value={'[아이디]'} maxLength={15} style={{ width: 150 }} disabled />
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>그룹</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Input value={'[그룹명]'} maxLength={15} style={{ width: 150 }} disabled />
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>연락처</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Input placeholder="공백없이 - 제외한 숫자 입력" style={{ width: 200 }} />
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>비밀번호 변경</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                        <Input placeholder="비밀번호 입력" style={{ width: 250 }} />
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>이메일</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Input placeholder="이메일 입력" style={{ width: 250 }} />
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