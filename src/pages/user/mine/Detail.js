import { Col, Divider, Row, Space, Select, Button, Input, Image, Upload, Modal } from 'antd';
import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetUserInfoAPI, UpdateUserAPI } from '../../../api/User';

const { Option } = Select;

function Create() {
    let { id } = useParams(1);
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [bodyInfo, setBodyInfo] = useState(
        {
            idx: id,
            type_id: null,
            type_name: '',
            group_id: null,
            group_name: '',
            name: '',
            user_id: '',
            phone: '',
            email: ''
        }
    );

    const initComponent = async () => {
		const initBodyInfo = await GetUserInfoAPI(id);

		setBodyInfo(initBodyInfo);
	}

	useEffect(() => {
		initComponent();
	}, []);

    const onChangeComponent = (name, value) => {
        setBodyInfo(
            { 
                ...bodyInfo,
                [name]: value
            }
        );
    }

    const onSaveClick = async() => {
        await UpdateUserAPI(bodyInfo);
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
                            <label className='main-header-title'>내 정보</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Button className='black-button medium-button' onClick={onSaveClick}>저장하기</Button>
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
                                        <Input 
                                            name='name' 
                                            value={bodyInfo.name} 
                                            onChange={e => {
                                                onChangeComponent(e.target.name, e.target.value);
                                            }} 
                                            placeholder="이름" 
                                            maxLength={15} style={{ width: 150 }} 
                                        />
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>아이디</label>
                                    </Col>
                                    <Col span={4} className='table-value-col-section'>
                                        <Input 
                                            name='user_id' 
                                            value={bodyInfo.user_id} 
                                            onChange={e => {
                                                onChangeComponent(e.target.user_id, e.target.value);
                                            }} 
                                            maxLength={15} 
                                            style={{ width: 150 }} disabled />
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>그룹</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Input 
                                            name='group_name' 
                                            value={bodyInfo.group_name} 
                                            onChange={e => {
                                                onChangeComponent(e.target.name, e.target.value);
                                            }} 
                                            maxLength={15} 
                                            style={{ width: 150 }} disabled 
                                        />
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>연락처</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Input 
                                            name='phone' 
                                            value={bodyInfo.phone} 
                                            onChange={e => {
                                                onChangeComponent(e.target.name, e.target.value);
                                            }} 
                                            placeholder="공백없이 - 제외한 숫자 입력" 
                                            style={{ width: 200 }} 
                                        />
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>비밀번호 변경</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                        <Input 
                                            name='password' 
                                            value={bodyInfo.password} 
                                            onChange={e => {
                                                onChangeComponent(e.target.name, e.target.value);
                                            }} 
                                            placeholder="비밀번호 입력" 
                                            style={{ width: 250 }} 
                                        />
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>이메일</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Input 
                                            name='email' 
                                            value={bodyInfo.email} 
                                            onChange={e => {
                                                onChangeComponent(e.target.name, e.target.value);
                                            }} 
                                            placeholder="이메일 입력" 
                                            style={{ width: 250 }} 
                                        />
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