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
                                        <label>이름</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                        <Input placeholder="이름 입력" style={{ width: 150 }} />
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>아이디</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Input placeholder="이름 입력" style={{ width: 150 }} />
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>그룹</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                        <Space size={6}>
                                            <Select
                                                suffixIcon={<CaretDownOutlined />}
                                                placeholder="구분"
                                                style={{ width: 150 }}
                                            >
                                                <Option value="SK">국산</Option>
                                                <Option value="US">미국</Option>
                                                <Option value="EU">유럽</Option>
                                                <Option value="JP">일본</Option>
                                                <Option value="CH">중국</Option>
                                            </Select>
                                            <Select
                                                suffixIcon={<CaretDownOutlined />}
                                                placeholder="그룹"
                                                style={{ width: 150 }}
                                            >
                                                <Option value="SK">국산</Option>
                                                <Option value="US">미국</Option>
                                                <Option value="EU">유럽</Option>
                                                <Option value="JP">일본</Option>
                                                <Option value="CH">중국</Option>
                                            </Select>
                                        </Space>
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>임시 비밀번호</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space size={6}>
                                            <div className=''>
                                                <Input placeholder="브랜드 입력" maxLength={15} style={{ width: 250 }} />
                                                <label className='danger-alert'>이미 사용중인 이름 입니다.</label>
                                            </div>
                                            <label className='description-label' style={{width: 350}}>{'공백없이 8~15글자의 영문 대소문자, 숫자, 일부 특수기호만 조합해 사용(사용가능한 특수기호 : !@#$%^&*()_+=><)'}</label>
                                        </Space>
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
                            <label className='main-header-title'>사용자 등록</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/user/manage">
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
                        {renderBodyList()}
                    </Space>
                    
                    <Row justify="center" gutter={[17, 0]}>
                        <Col>
                            <Button className='white-button rounded-button' icon={<PlusOutlined />} onClick={onAddComponentClick}>브랜드 추가하기</Button>
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