import { Col, Divider, Row, Space, Select, Button, Input, Modal, DatePicker } from 'antd';
import { CaretDownOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import alert_icon from '../../../assets/images/alert-icon.png';

const { Option } = Select;

function Create() {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [bodyList, setBodyList] = useState([
        {
            number: 1
        }
    ]);

    const onSaveClick = event => {
        setShowModal(true);
    };

    const onCloseModalClick = () => {
        setShowModal(false);
    };

    return(
        <>
            <Space direction='vertical' size={18} className='main-layout'>
                {/* Page Header */}
                <Space direction='vertical' size={18}>
                    <Row justify='middle'>
                        <Col>
                            <label className='main-header-title'>견적신청 상세보기</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/car/group">
                                    <Button className='white-button medium-button'>취소</Button>
                                </Link>
                                <Button className='black-button medium-button' onClick={onSaveClick}>저장하고 나가기</Button>
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
                                <Col>
                                    { showDeleteButton ? <Button className='white-button big-button' style={{width: 129, fontWeight: 500}}>정보삭제</Button> : <></> }
                                </Col>
                            </Row>
                            <Space direction='vertical' size={0}>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>구입방법</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                        <Input size='large' style={{width: 150}} value={'렌트'} disabled />
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>등록일</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space size={6}>
                                            <Input size='large' style={{width: 150}} value={'2022-03-31'} disabled />
                                            <Input size='large' style={{width: 150}} value={'04:19:36'} disabled />
                                        </Space>
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>이름</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                        <Input size='large' style={{width: 150}} value={'김철수'} disabled />
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>연락처</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space size={6}>
                                            <Input size='large' style={{width: 150}} value={'010-1234-5678'} disabled />
                                        </Space>
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>차량정보</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space size={6}>
                                            <Input size='large' style={{width: 150}} value={'가야'} disabled />
                                            <Input size='large' style={{width: 180}} value={'쏘렌토 (4세대)'} disabled />
                                            <Input size='large' style={{width: 124}} value={'가솔린 터보 2.5 4WD'} disabled />
                                            <Input size='large' style={{width: 250}} value={'그래비티 7인승'} disabled />
                                        </Space>
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>상담여부</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                        <Select
                                            size='large'
                                            suffixIcon={<CaretDownOutlined />}
                                            placeholder="선택"
                                            style={{ width: 150 }}
                                        >
                                            <Option value="1">예</Option>
                                            <Option value="2">아니오</Option>
                                        </Select>
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>계약여부</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space size={6}>
                                            <Select
                                                size='large'
                                                suffixIcon={<CaretDownOutlined />}
                                                placeholder="선택"
                                                style={{ width: 150 }}
                                            >
                                                <Option value="1">예</Option>
                                                <Option value="2">아니오</Option>
                                            </Select>
                                            <DatePicker size='large' />
                                        </Space>
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>출고여부</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                        <Space size={6}>
                                            <Select
                                                size='large'
                                                suffixIcon={<CaretDownOutlined />}
                                                placeholder="선택"
                                                style={{ width: 150 }}
                                            >
                                                <Option value="1">예</Option>
                                                <Option value="2">아니오</Option>
                                            </Select>
                                            <DatePicker size='large' />
                                        </Space>
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>종료여부</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space size={6}>
                                            <Select
                                                size='large'
                                                suffixIcon={<CaretDownOutlined />}
                                                placeholder="선택"
                                                style={{ width: 150 }}
                                            >
                                                <Option value="1">예</Option>
                                                <Option value="2">아니오</Option>
                                            </Select>
                                        </Space>
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>비고</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space size={6}>
                                            <Input size='large' style={{width: 600}} placeholder={'내용을 입력해 주세요'} />
                                        </Space>
                                    </Col>
                                </Row>
                            </Space>
                        </Space>
                    </Space>
                    
                    <Row justify="center" gutter={[17, 0]}>
                        <Col>
                            <Button className='white-button rounded-button'>삭제하기</Button>
                        </Col>
                    </Row>
                </Space>
            </Space>
            <Modal
                centered
                width={325}
                closable={false}
                visible={showModal}
                footer={[
                    <Button className='alert-button' onClick={onCloseModalClick}>확인</Button>
                ]}
            >
                <Space direction='vertical' size={10} align='center' style={{width:'100%'}}>
                    <img src={alert_icon} />
                    <label className='alert-content-label'>[정보이름] - [필드이름]</label>
                    <label className='alert-content-label'>작성되지 않은 정보가 있습니다.</label>
                </Space>
                
            </Modal>
        </>
    );
}

export default Create;