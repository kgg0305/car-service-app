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
                            <label className='main-header-title'>브랜드 수정</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/car/model">
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
                        <TabPane tab="모델정보" key="1">
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
                                                <Select
                                                    suffixIcon={<CaretDownOutlined />}
                                                    placeholder="선택"
                                                    style={{ width: '100%' }}
                                                >
                                                    <Option value="SK">국산</Option>
                                                    <Option value="US">미국</Option>
                                                    <Option value="EU">유럽</Option>
                                                    <Option value="JP">일본</Option>
                                                    <Option value="CH">중국</Option>
                                                </Select>
                                            </Col>
                                            <Col span={5} className='table-value-col-section'>
                                                <Select
                                                    suffixIcon={<CaretDownOutlined />}
                                                    placeholder="선택"
                                                    style={{ width: '100%' }}
                                                >
                                                    <Option value="SK">국산</Option>
                                                    <Option value="US">미국</Option>
                                                    <Option value="EU">유럽</Option>
                                                    <Option value="JP">일본</Option>
                                                    <Option value="CH">중국</Option>
                                                </Select>
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>모델</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                            <Space>
                                                    <div className=''>
                                                        <Input placeholder="모델명 입력" maxLength={15} style={{ width: 400 }} />
                                                        <label className='danger-alert'>이미 사용중인 이름 입니다.</label>
                                                    </div>
                                                    <Button className='black-button'>확인</Button>
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>신차여부</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Select
                                                    suffixIcon={<CaretDownOutlined />}
                                                    placeholder="선택"
                                                    style={{ width: 150 }}
                                                >
                                                    <Option value="1">예</Option>
                                                    <Option value="2">아니오</Option>
                                                </Select>
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>출시일</label>
                                            </Col>
                                            <Col flex='auto' className='table-value-col-section'>
                                                <DatePicker />
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>순서</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Space>
                                                    <Input maxLength={6} value={1} style={{ width: 150 }} />
                                                    <label className='order-description-label'>숫자가 낮을수록 먼저 노출이 됩니다.</label>
                                                </Space>
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
                                        <Row gutter={[0]} align="middle" style={{ height:369 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>사진</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space direction='vertical' align='start' size={37}>
                                                    <label className='logo-description-label'>
                                                        이미지 권장 크기는 90 * 60이며, *.png로 등록하셔야 합니다. <br/>
                                                        이미지를 새로 등록 하기 위해선 등록된 이미지 [삭제]후 재 등록 하시면 됩니다.
                                                    </label>
                                                    <Row gutter={[8]}>
                                                        <Col>
                                                            <label className='picture-header-label'>사진 01(대표)</label>
                                                            <Space direction='vertical' align='center' size={6}>
                                                                <Image src={ preview_default_image } width={150} height={150} />
                                                                <Upload>
                                                                    <Button className='black-button'>등록</Button>
                                                                </Upload>
                                                            </Space>
                                                        </Col>
                                                        <Col>
                                                            <label className='picture-header-label'>사진 01(대표)</label>
                                                            <Space direction='vertical' align='center' size={6}>
                                                                <Image src={ preview_default_image } width={150} height={150} />
                                                                <Upload>
                                                                    <Button className='black-button'>등록</Button>
                                                                </Upload>
                                                            </Space>
                                                        </Col>
                                                        <Col>
                                                            <label className='picture-header-label'>사진 01(대표)</label>
                                                            <Space direction='vertical' align='center' size={6}>
                                                                <Image src={ preview_default_image } width={150} height={150} />
                                                                <Upload>
                                                                    <Button className='black-button'>등록</Button>
                                                                </Upload>
                                                            </Space>
                                                        </Col>
                                                        <Col>
                                                            <label className='picture-header-label'>사진 01(대표)</label>
                                                            <Space direction='vertical' align='center' size={6}>
                                                                <Image src={ preview_default_image } width={150} height={150} />
                                                                <Upload>
                                                                    <Button className='black-button'>등록</Button>
                                                                </Upload>
                                                            </Space>
                                                        </Col>
                                                    </Row>
                                                </Space>
                                                
                                            </Col>
                                        </Row>
                                    </Space>
                                </Space>
                                <Space direction='vertical' size={20}>
                                    <Row align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>모델/라인업 공통 옵션 (튜닝/액세서리)</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                        <Col span={2} className='table-header-col-section'>
                                            <label>공통옵션 01</label>
                                        </Col>
                                        <Col flex="auto" className='table-value-col-section'>
                                            <Row>
                                                <Col>
                                                    <Space size={6}>
                                                        <Input placeholder="옵션 이름" style={{ width: 300 }} />
                                                        <Input style={{ width: 200 }} value={1} />
                                                        <Input placeholder="세부 내용 입력" style={{ width: 750 }} />
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
                                            <label className='main-sub-title'>모델/라인업 색상 (견적 메뉴에서만 노출)</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                        <Col span={2} className='table-header-col-section'>
                                            <label>색상 01</label>
                                        </Col>
                                        <Col flex="auto" className='table-value-col-section'>
                                            <Row>
                                                <Col>
                                                    <Space size={6}>
                                                        <Input placeholder="색상 이름" style={{ width: 300 }} />
                                                        <Input style={{ width: 200 }} value={1} />
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
                                            <label className='main-sub-title'>트림 통합 옵션</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
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
                                                        <Input placeholder="세부 내용 입력" style={{ width: 750 }} />
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
                            </Space>
                        </TabPane>
                        <TabPane tab="모델할인" key="2">
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
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={10}>
                                                    <Button className='gray-button large-button'>브랜드</Button>
                                                    <Button className='gray-button large-button'>모델그룹</Button>
                                                    <Button className='gray-button large-button'>모델</Button>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Space>
                                </Space>
                                <Space direction='vertical' size={20}>
                                    <Row gutter={[12]} align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>블루멤버스 포인트 선사용</label>
                                        </Col>
                                        <Col>
                                            <label className='sub-description'>개인 및 개인사업자 중 현대차 2회 이상 재구매 고객(신규 고객 제외)</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>할인 01</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={10}>
                                                    <Input value={'2회 이상 재구매 고객'} style={{ width: 300 }} />
                                                    <Input value={'-10만원'} style={{ width: 200 }} />
                                                    <Space size={11}>
                                                        <Switch width='100' height={40} />
                                                        <label className='switch-label'>사용</label>
                                                    </Space>
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>할인 01</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={10}>
                                                    <Input value={'2회 이상 재구매 고객'} style={{ width: 300 }} />
                                                    <Input value={'-10만원'} style={{ width: 200 }} />
                                                    <Space size={11}>
                                                        <Switch width='100' height={40} />
                                                        <label className='switch-label'>사용</label>
                                                    </Space>
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>할인 01</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={10}>
                                                    <Input value={'2회 이상 재구매 고객'} style={{ width: 300 }} />
                                                    <Input value={'-10만원'} style={{ width: 200 }} />
                                                    <Space size={11}>
                                                        <Switch width='100' height={40} />
                                                        <label className='switch-label'>사용</label>
                                                    </Space>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Space>
                                </Space>
                                <Space direction='vertical' size={20}>
                                    <Row gutter={[12]} align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>10년 이상/15년 이상 노후차조건</label>
                                        </Col>
                                        <Col>
                                            <label className='sub-description'>노후차 차량의 본의명의 최초 등록일이 21년 12월 31일 이전 고객 한정정</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>할인 01</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={10}>
                                                    <Input value={'2회 이상 재구매 고객'} style={{ width: 300 }} />
                                                    <Input value={'-10만원'} style={{ width: 200 }} />
                                                    <Space size={11}>
                                                        <Switch width='100' height={40} />
                                                        <label className='switch-label'>사용</label>
                                                    </Space>
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>할인 01</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={10}>
                                                    <Input value={'2회 이상 재구매 고객'} style={{ width: 300 }} />
                                                    <Input value={'-10만원'} style={{ width: 200 }} />
                                                    <Space size={11}>
                                                        <Switch width='100' height={40} />
                                                        <label className='switch-label'>사용</label>
                                                    </Space>
                                                </Space>
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