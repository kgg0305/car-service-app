import { Col, Divider, Row, Space, Select, Button, Input, Image, Upload, Modal, Tabs, DatePicker, Switch } from 'antd';
import { CaretDownOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import preview_default_image from '../../../assets/images/preview-default-image.png';
import '../../../assets/styles/pages/car/brand/Create.css';
import alert_icon from '../../../assets/images/alert-icon.png';

const { Option } = Select;
const { TabPane } = Tabs;

function Create() {
    const [showModal, setShowModal] = useState(false);

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
                            <label className='main-header-title'>트림 등록</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/car/trim">
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
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="상세가격표" key="1">
                            <Space direction='vertical' size={40}>
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
                                                <label>차량</label>
                                            </Col>
                                            <Col span={5} className='table-value-col-section'>
                                                <Space size={6}>
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
                                                    <Select
                                                        suffixIcon={<CaretDownOutlined />}
                                                        placeholder="라인업 선택"
                                                        style={{ width: 400 }}
                                                    >
                                                        <Option value="jack">Jack</Option>
                                                        <Option value="lucy">Lucy</Option>
                                                        <Option value="Yiminghe">yiminghe</Option>
                                                    </Select>
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>트림</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Space>
                                                    <div className=''>
                                                        <Input placeholder="트림명 입력" maxLength={15} style={{ width: 400 }} />
                                                        <label className='danger-alert'>이미 사용중인 이름 입니다.</label>
                                                    </div>
                                                    <Button className='black-button'>확인</Button>
                                                </Space>
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>변속기</label>
                                            </Col>
                                            <Col flex='auto' className='table-value-col-section'>
                                                <Select
                                                    suffixIcon={<CaretDownOutlined />}
                                                    placeholder="선택"
                                                    style={{ width: 150 }}
                                                >
                                                    <Option value="SK">현대</Option>
                                                </Select>
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>가격</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Input value={0} style={{ width: 150 }} />
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
                                    </Space>
                                </Space>
                                <Space direction='vertical' size={20}>
                                    <Row align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>사양</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                        <Col span={2} className='table-header-col-section'>
                                            <label>사양 01</label>
                                        </Col>
                                        <Col flex="auto" className='table-value-col-section'>
                                            <Row>
                                                <Col>
                                                    <Space size={6}>
                                                        <Select
                                                            suffixIcon={<CaretDownOutlined />}
                                                            placeholder="선택"
                                                            style={{ width: 200 }}
                                                        >
                                                            <Option value="SK">현대</Option>
                                                        </Select>
                                                        <Input placeholder="세부 내용 입력" style={{ width: 1050 }} />
                                                    </Space>
                                                </Col>
                                                <Col flex='auto' />
                                                <Col>
                                                    <Button className='black-button'>추가</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Space>
                                <Space direction='vertical' size={20}>
                                    <Row align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>트림 옵션</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>옵션 01</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Row>
                                                    <Col>
                                                        <Space size={6}>
                                                            <Input placeholder="옵션 이름" style={{ width: 300 }} />
                                                            <Input style={{ width: 200 }} value={1} />
                                                            <Input placeholder="세부 내용 입력" style={{ width: 700 }} />
                                                        </Space>
                                                    </Col>
                                                    <Col flex='auto' />
                                                    <Col>
                                                        <Space size={11}>
                                                            <Switch width={100} height={40} />
                                                            <label className='switch-label'>사용</label>
                                                        </Space>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>옵션 02</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Row>
                                                    <Col>
                                                        <Space size={6}>
                                                            <Input placeholder="옵션 이름" style={{ width: 300 }} />
                                                            <Input style={{ width: 200 }} value={1} />
                                                            <Input placeholder="세부 내용 입력" style={{ width: 700 }} />
                                                        </Space>
                                                    </Col>
                                                    <Col flex='auto' />
                                                    <Col>
                                                        <Space size={11}>
                                                            <Switch width={100} height={40} />
                                                            <label className='switch-label'>사용</label>
                                                        </Space>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Space>
                                </Space>
                            </Space>
                        </TabPane>
                        <TabPane tab="제원ㆍ사양/옵션" key="2">
                            <Space direction='vertical' size={40}>
                                <Space direction='vertical' size={20}>
                                    <Row align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>차량</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>모델정보</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={10}>
                                                    <Button className='gray-button large-button'>브랜드</Button>
                                                    <Button className='gray-button large-button'>모델그룹</Button>
                                                    <Button className='gray-button large-button'>모델</Button>
                                                    <Button className='gray-button large-button'>라인업</Button>
                                                    <Button className='gray-button large-button'>트림명</Button>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Space>
                                </Space>
                                <Space direction='vertical' size={20}>
                                    <Row gutter={[12]} align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>제원</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>연료</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Button className='gray-button big-button'>휘발유</Button>
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>연비 [km/l]</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Input value={0} style={{ width: 150 }} />
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>베기량 [CC]</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Input value={0} style={{ width: 150 }} />
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>엔진형식</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Input placeholder='엔진형식 입력' style={{ width: 200 }} />
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>최대토크 [kg.m/rpm]</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Space size={6}>
                                                    <Input value={0} style={{ width: 100 }} />
                                                    <label>/</label>
                                                    <Input value={0} style={{ width: 100 }} />
                                                </Space>
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>최고출력 [ps/rpm]</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={6}>
                                                    <Input value={0} style={{ width: 100 }} />
                                                    <label>/</label>
                                                    <Input value={0} style={{ width: 100 }} />
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>CO2배출량 [g/km]</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Input value={0} style={{ width: 150 }} />
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>타이어</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={6}>
                                                    <Input value={0} style={{ width: 100 }} />
                                                    <label>/</label>
                                                    <Input value={0} style={{ width: 60 }} />
                                                    <label>R</label>
                                                    <Input value={0} style={{ width: 60 }} />
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>구동방식</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Input placeholder='구동방식 입력' style={{ width: 200 }} />
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>변속기</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Input placeholder='변속기 입력' style={{ width: 200 }} />
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>연료탱크 [ l ]</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Input value={0} style={{ width: 150 }} />
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>공차중량 [kg]</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Input value={0} style={{ width: 150 }} />
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>승차정원 [명]</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Input value={0} style={{ width: 150 }} />
                                            </Col>
                                        </Row>
                                    </Space>
                                </Space>
                                <Space direction='vertical' size={20}>
                                    <Row gutter={[12]} align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>크기</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>전고 [mm]</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Input value={0} style={{ width: 150 }} />
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>전폭 [mm]</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Input value={0} style={{ width: 150 }} />
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>휠베이스 [mm]</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Input value={0} style={{ width: 150 }} />
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>전장 [mm]</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Input value={0} style={{ width: 150 }} />
                                            </Col>
                                        </Row>
                                    </Space>
                                </Space>
                            </Space>
                        </TabPane>
                    </Tabs>
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