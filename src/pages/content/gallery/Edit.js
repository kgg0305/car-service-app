import { Col, Divider, Row, Space, Select, Button, Input, Image, Upload, Modal } from 'antd';
import { CaretDownOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import preview_default_image from '../../../assets/images/preview-default-image.png';
import '../../../assets/styles/pages/car/brand/Create.css';
import alert_icon from '../../../assets/images/alert-icon.png';

const { Option } = Select;

function Edit() {
    
    return(
        <>
            <Space direction='vertical' size={18} className='main-layout'>
                {/* Page Header */}
                <Space direction='vertical' size={18}>
                    <Row justify='middle'>
                        <Col>
                            <label className='main-header-title'>포토갤러리 수정</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/car/brand">
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
                                        <label>차량검색</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space size={6}>
                                            <Select
                                                suffixIcon={<CaretDownOutlined />}
                                                placeholder="브랜드 선택"
                                                style={{ width: 250 }}
                                            >
                                                <Option value="jack">Jack</Option>
                                                <Option value="lucy">Lucy</Option>
                                                <Option value="Yiminghe">yiminghe</Option>
                                            </Select>
                                            <Select
                                                suffixIcon={<CaretDownOutlined />}
                                                placeholder="모델그룹 선택"
                                                style={{ width: 250 }}
                                            >
                                                <Option value="jack">Jack</Option>
                                                <Option value="lucy">Lucy</Option>
                                                <Option value="Yiminghe">yiminghe</Option>
                                            </Select>
                                            <Select
                                                suffixIcon={<CaretDownOutlined />}
                                                placeholder="모델 선택"
                                                style={{ width: 250 }}
                                            >
                                                <Option value="jack">Jack</Option>
                                                <Option value="lucy">Lucy</Option>
                                                <Option value="Yiminghe">yiminghe</Option>
                                            </Select>
                                        </Space>
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:174 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>사진</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space direction='horizontal' align='end' size={20}>
                                            <Image src={ preview_default_image } width={150} height={150} />
                                            <Space direction='vertical' size={34}>
                                                <label className='logo-description-label'>
                                                    이미지 권장 크기는 90 * 60이며, *.png로 등록하셔야 합니다. <br/>
                                                    이미지를 새로 등록 하기 위해선 등록된 이미지 [삭제]후 재 등록 하시면 됩니다.
                                                </label>
                                                <Upload>
                                                    <Button className='black-button'>등록</Button>
                                                </Upload>
                                            </Space>
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

export default Edit;