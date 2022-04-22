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

    const selectAfter = (
        <Select defaultValue="1" className="select-after">
          <Option value="1">원</Option>
          <Option value="2">유로</Option>
        </Select>
      );

    return(
        <>
            <Space direction='vertical' size={18} className='main-layout'>
                {/* Page Header */}
                <Space direction='vertical' size={18}>
                    <Row justify='middle'>
                        <Col>
                            <label className='main-header-title'>할인/비용 등록</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/car/discount">
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
                        <TabPane tab="할인종류" key="1">
                            <Space direction='vertical' size={40}>
                                <Space direction='vertical' size={20}>
                                    <Row align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>정보 01</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>브랜드</label>
                                            </Col>
                                            <Col span={5} className='table-value-col-section'>
                                                <Select
                                                    suffixIcon={<CaretDownOutlined />}
                                                    placeholder="브랜드 선택"
                                                    style={{ width: 300 }}
                                                >
                                                    <Option value="jack">Jack</Option>
                                                    <Option value="lucy">Lucy</Option>
                                                    <Option value="Yiminghe">yiminghe</Option>
                                                </Select>
                                            </Col>
                                        </Row>
                                    </Space>
                                </Space>
                                <Space direction='vertical' size={20}>
                                    <Row align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>종류 01</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>상품 01</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={14}>
                                                    <Space size={6}>
                                                        <Input placeholder="할인 종류 이름" style={{ width: 300 }} />
                                                        <Input placeholder="세부 내용 입력" style={{ width: 900 }} />
                                                    </Space>
                                                    <Button className='white-button'>삭제</Button>
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>기간 01</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={6}>
                                                    <DatePicker placeholder='시작일' />
                                                    <label>~</label>
                                                    <DatePicker placeholder='종료일' />
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Space>
                                    <Space direction='vertical' size={0}>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>상품 02</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={14}>
                                                    <Space size={6}>
                                                        <Input placeholder="할인 종류 이름" style={{ width: 300 }} />
                                                        <Input placeholder="세부 내용 입력" style={{ width: 900 }} />
                                                    </Space>
                                                    <Button className='white-button'>삭제</Button>
                                                    <Button className='black-button'>추가</Button>
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>기간 02</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={6}>
                                                    <DatePicker placeholder='시작일' />
                                                    <label>~</label>
                                                    <DatePicker placeholder='종료일' />
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Space>
                                </Space>
                                <Row justify="center" gutter={[17, 0]}>
                                    <Col>
                                        <Button className='white-button rounded-button' icon={<PlusOutlined />}>할인종류 추가하기</Button>
                                    </Col>
                                </Row>
                            </Space>
                        </TabPane>
                        <TabPane tab="할인조건" key="2">
                            <Space direction='vertical' size={40}>
                                <Space direction='vertical' size={20}>
                                    <Row align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>정보 01</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>브랜드</label>
                                            </Col>
                                            <Col span={5} className='table-value-col-section'>
                                                <Space>
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
                                                        placeholder="할인종류 선택"
                                                        style={{ width: 300 }}
                                                    >
                                                        <Option value="jack">Jack</Option>
                                                        <Option value="lucy">Lucy</Option>
                                                        <Option value="Yiminghe">yiminghe</Option>
                                                    </Select>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Space>
                                </Space>
                                <Space direction='vertical' size={20}>
                                    <Row align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>조건 01</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>조건 01</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={600}>
                                                    <Space size={6}>
                                                        <Input placeholder="할인조건 입력" style={{ width: 400 }} />
                                                        <Input value={0} addonAfter={selectAfter} style={{ width: 250 }} />
                                                    </Space>
                                                    <Button className='white-button'>삭제</Button>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Space>
                                </Space>
                                <Row justify="center" gutter={[17, 0]}>
                                    <Col>
                                        <Button className='white-button rounded-button' icon={<PlusOutlined />}>할인조건 추가하기</Button>
                                    </Col>
                                </Row>
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