import { Col, Divider, Row, Space, Select, Button, Input, Modal } from 'antd';
import { CaretDownOutlined, PlusOutlined } from '@ant-design/icons'
import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { CheckUserNameAPI, DeleteUserInfoAPI, GetUserInfoAPI, UpdateUserAPI } from '../../../api/User';
import { GetGroupOptionListAPI } from '../../../api/Group';
import alert_icon from '../../../assets/images/alert-icon.png';
import { Constants } from '../../../constants/Constants';
import AlertModal from '../../../components/AlertModal';
import AlertDeleteModal from '../../../components/AlertDeleteModal';

const { Option } = Select;

function Create({ match }) {
    let { id } = useParams();
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [validationList, setValidationList] = useState([]);
    const [bodyInfo, setBodyInfo] = useState(
        {
            number: 1,
            name: '',
            user_id: '',
            type_id: null,
            group_id: null,
            password: '',
            check_name: ''
        }
    );

    const initComponent = async () => {
		const initBodyInfo = await GetUserInfoAPI(id);
		setBodyInfo(initBodyInfo);
	}

	useEffect(() => {
		initComponent();
	}, []);

    async function checkName(name) {
        const result = await CheckUserNameAPI(name);
        onChangeComponent('check_name', result ? 'exist' : 'not-exist');
    }

    const onChangeComponent = (name, value) => {
        setBodyInfo(
            { 
                ...bodyInfo,
                group_id: (name == 'type_id') ? null : bodyInfo.group_id,
                [name]: value
            }
        );
    }

    const onSaveClick = async() => {
        const validation = [];
        if(bodyInfo.name === '') {
            validation.push({
                title: '정보',
                name: '이름'
            })
        }
        if(bodyInfo.user_id === '') {
            validation.push({
                title: '정보',
                name: '아이디'
            })
        }
        if(bodyInfo.type_id === null) {
            validation.push({
                title: '정보',
                name: '구분'
            })
        }
        if(bodyInfo.group_id === null) {
            validation.push({
                title: '정보',
                name: '그룹'
            })
        }
        if(bodyInfo.password === '') {
            validation.push({
                title: '정보',
                name: '비밀번호'
            })
        }

        setValidationList(validation);

        if(validation.length > 0) {
            setShowModal(true);
        } else {
            await UpdateUserAPI(bodyInfo);
        
        navigate('/user/manage');
        }
    };

    const onDeleteClick = async() => {
        setShowDeleteModal(true);
    };

    const deleteInfo = async() => {
        await DeleteUserInfoAPI(id);
        navigate('/user/manage');
    };

    return(
        <>
            <Space direction='vertical' size={18} className='main-layout'>
                {/* Page Header */}
                <Space direction='vertical' size={18}>
                    <Row justify='middle'>
                        <Col>
                            <label className='main-header-title'>사용자 수정</label>
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
                                    <Col span={10} className='table-value-col-section'>
                                        <Input 
                                            name='name' 
                                            value={bodyInfo.name} 
                                            onChange={e => {
                                                onChangeComponent(e.target.name, e.target.value);
                                            }}
                                            placeholder="이름 입력" 
                                            style={{ width: 150 }} 
                                        />
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>아이디</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Input 
                                            name='user_id' 
                                            value={bodyInfo.user_id} 
                                            onChange={e => {
                                                onChangeComponent(e.target.name, e.target.value);
                                            }}
                                            placeholder="아이디 입력" 
                                            style={{ width: 150 }} 
                                        />
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>그룹</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                        <Space size={6}>
                                            <Select
                                                name='type_id' 
                                                value={bodyInfo.type_id} 
                                                onChange={value => {
                                                    onChangeComponent('type_id', value);
                                                }}
                                                suffixIcon={<CaretDownOutlined />}
                                                placeholder="구분"
                                                style={{ width: 150 }}
                                            >
                                                {
                                                    Constants.userTypeOptions.map((optionItem, optionIndex) => (
                                                        <Select.Option key={optionIndex} value={optionItem.value}>
                                                            {optionItem.label}
                                                        </Select.Option>
                                                    ))
                                                }
                                            </Select>
                                            <Select
                                                name='group_id' 
                                                value={bodyInfo.group_id} 
                                                onChange={value => {
                                                    onChangeComponent('group_id', value);
                                                }}
                                                suffixIcon={<CaretDownOutlined />}
                                                placeholder="그룹"
                                                style={{ width: 150 }}
                                            >
                                                {
                                                    bodyInfo.type_id === '0' ? 
                                                    Constants.userTeamGroupOptions.map((optionItem, optionIndex) => (
                                                        <Select.Option key={optionIndex} value={optionItem.value}>
                                                            {optionItem.label}
                                                        </Select.Option>
                                                    ))
                                                    : bodyInfo.type_id === '1' ? 
                                                    Constants.userAreaGroupOptions.map((optionItem, optionIndex) => (
                                                        <Select.Option key={optionIndex} value={optionItem.value}>
                                                            {optionItem.label}
                                                        </Select.Option>
                                                    ))
                                                    : ''
                                                }
                                            </Select>
                                        </Space>
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>임시 비밀번호</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space size={6}>
                                            <div className=''>
                                                <Input 
                                                    name='password' 
                                                    value={bodyInfo.password} 
                                                    onChange={e => {
                                                        onChangeComponent(e.target.name, e.target.value);
                                                    }}
                                                    placeholder="비밀번호 입력" 
                                                    maxLength={15} style={{ width: 250 }} 
                                                />
                                                <label className='danger-alert'>이미 사용중인 이름 입니다.</label>
                                            </div>
                                            <label className='description-label' style={{width: 350}}>{'공백없이 8~15글자의 영문 대소문자, 숫자, 일부 특수기호만 조합해 사용(사용가능한 특수기호 : !@#$%^&*()_+=><)'}</label>
                                        </Space>
                                    </Col>
                                </Row>
                            </Space>
                        </Space>
                    </Space>
                    
                    <Row justify="center" gutter={[17, 0]}>
                        <Col>
                            <Button className='white-button rounded-button' icon={<PlusOutlined />} onClick={onDeleteClick}>삭제하기</Button>
                        </Col>
                    </Row>
                </Space>
            </Space>
            <AlertModal visible={showModal} onConfirmClick={() => setShowModal(false)} validationList={validationList} />
            <AlertDeleteModal visible={showDeleteModal} onConfirmClick={() => deleteInfo()} onCancelClick={() => setShowDeleteModal(false)} />
        </>
    );
}

export default Create;