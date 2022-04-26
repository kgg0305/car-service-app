import { Col, Divider, Row, Space, Select, Button, Input, Modal } from 'antd';
import { CaretDownOutlined, PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import preview_default_image from '../../../assets/images/preview-default-image.png';
import '../../../assets/styles/pages/car/brand/Create.css';
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

    const renderBodyList = () => {
        return (
            <>
                {bodyList.map((body, index) => {
                    return (
                        <Space direction='vertical' size={20} key={index}>
                            <Row align='middle'>
                                <Col>
                                    <label className='main-sub-title'>정보 { body.number !== 10 ? '0' + body.number : body.number }</label>
                                </Col>
                                <Col flex="auto" />
                                <Col>
                                    { showDeleteButton ? <Button className='white-button big-button' style={{width: 129, fontWeight: 500}} onClick={() => onDeleteComponentClick(body.number)}>정보삭제</Button> : <></> }
                                </Col>
                            </Row>
                            <Space direction='vertical' size={0}>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>브랜드</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                    <Select
                                        suffixIcon={<CaretDownOutlined />}
                                        placeholder="브랜드 선택"
                                        style={{ width: 400 }}
                                    >
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </Select>
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>모델그룹</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space>
                                            <div className=''>
                                                <Input placeholder="모델 그룹명 입력" maxLength={15} style={{ width: 400 }} />
                                                <label className='danger-alert'>이미 사용중인 이름 입니다.</label>
                                            </div>
                                            <Button className='black-button'>확인</Button>
                                        </Space>
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>차종</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Select
                                            suffixIcon={<CaretDownOutlined />}
                                            placeholder="선택"
                                            style={{ width: 150 }}
                                        >
                                            <Option value="1">경차</Option>
                                            <Option value="2">경습합</Option>
                                            <Option value="3">경트럭</Option>
                                            <Option value="4">대형</Option>
                                            <Option value="5">대형MPV</Option>
                                            <Option value="6">대형SUV</Option>
                                            <Option value="7">소형</Option>
                                            <Option value="8">소형MPV</Option>
                                            <Option value="9">소형SUV</Option>
                                            <Option value="10">소형버스</Option>
                                            <Option value="11">소형버스</Option>
                                            <Option value="12">소형트럭</Option>
                                            <Option value="13">스포츠카</Option>
                                            <Option value="14">승합</Option>
                                            <Option value="15">준대형</Option>
                                            <Option value="16">준중형</Option>
                                            <Option value="17">중형</Option>
                                            <Option value="18">중형SUV</Option>
                                            <Option value="19">중형트럭</Option>
                                            <Option value="20">픽업/밴</Option>
                                        </Select>
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
                    );
                })}
            </>
        );
    };

    const onAddComponentClick = event => {
        if(bodyList.length < 10){
            setShowDeleteButton(true);
            setBodyList([...bodyList, {
                number: bodyList[bodyList.length - 1].number + 1
            }]);
        }
    };

    const onDeleteComponentClick = (number) => {
        if(bodyList.length > 1){
            if(bodyList.length === 2){
                console.log(bodyList.length);
                setShowDeleteButton(false);
            }
            setBodyList(bodyList.filter((body) => body.number !== number));
        }
    };

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
                            <label className='main-header-title'>모델그룹 등록</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/car/group">
                                    <Button className='white-button medium-button'>취소</Button>
                                </Link>
                                <Button className='white-button medium-button' onClick={onSaveClick}>저장하고 나가기</Button>
                                
                                <Button className='black-button medium-button'>저장하고 모델 등록하기</Button>
                            </Space>
                        </Col>
                    </Row>
                    <Divider className='main-body-divider' />
                </Space>

                {/* Body Section */}
                <Space direction='vertical' size={20} style={{paddingBottom: 117}}>
                    <Space direction='vertical' size={72} split={<Divider />}>
                        {renderBodyList()}
                    </Space>
                    
                    <Row justify="center" gutter={[17, 0]}>
                        <Col>
                            <Button className='white-button rounded-button' icon={<PlusOutlined />} onClick={onAddComponentClick}>그룹 추가하기</Button>
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