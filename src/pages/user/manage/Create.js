import { Col, Divider, Row, Space, Select, Button, Input, Modal } from 'antd';
import { CaretDownOutlined, PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetGroupOptionListAPI } from '../../../api/Group';
import { CheckUserNameAPI, CreateUserAPI } from '../../../api/User';
import alert_icon from '../../../assets/images/alert-icon.png';
import { Constants } from '../../../constants/Constants';
import AlertModal from '../../../components/AlertModal';

const { Option } = Select;

// 등록페지
function Create() {
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [validationList, setValidationList] = useState([]);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [bodyList, setBodyList] = useState([
        {
            number: 1,
            name: '',
            user_id: '',
            type_id: null,
            group_id: null,
            password: '',
            check_name: ''
        }
    ]);

    const initComponent = async () => {

	};

	useEffect(() => {
		initComponent();
	}, []);

    async function checkName(number, name) {
        const result = await CheckUserNameAPI(name);
        onChangeComponent(number, 'check_name', result ? 'exist' : 'not-exist');
    }

    const onAddComponentClick = event => {
        if(bodyList.length < 10){
            setShowDeleteButton(true);
            setBodyList([...bodyList, {
                number: bodyList[bodyList.length - 1].number + 1,
                name: '',
                user_id: '',
                type_id: null,
                group_id: null,
                password: '',
                check_name: ''
            }]);
        }
    };

    const onDeleteComponentClick = (number) => {
        if(bodyList.length > 1){
            if(bodyList.length === 2){
                setShowDeleteButton(false);
            }
            setBodyList(bodyList.filter((body) => body.number !== number));
        }
    };

    const onChangeComponent = (number, name, value) => {
        setBodyList(bodyList.map(
            body => body.number === number ? 
            {
                ...body, 
                group_id: (name == 'type_id') ? null : body.group_id,
                [name]: value
            } 
            : body
        ));
    };

    const onSaveClick = async() => {
        const validation = [];
        bodyList.map((body, index) => {
            if(body.name === '') {
                validation.push({
                    title: '정보 ' + ((index + 1) < 10 ? '0' + (index + 1) : (index + 1)),
                    name: '이름'
                })
            }
            if(body.user_id === '') {
                validation.push({
                    title: '정보 ' + ((index + 1) < 10 ? '0' + (index + 1) : (index + 1)),
                    name: '아이디'
                })
            }
            if(body.type_id === null) {
                validation.push({
                    title: '정보 ' + ((index + 1) < 10 ? '0' + (index + 1) : (index + 1)),
                    name: '구분'
                })
            }
            if(body.group_id === null) {
                validation.push({
                    title: '정보 ' + ((index + 1) < 10 ? '0' + (index + 1) : (index + 1)),
                    name: '그룹'
                })
            }
            if(body.password === '') {
                validation.push({
                    title: '정보 ' + ((index + 1) < 10 ? '0' + (index + 1) : (index + 1)),
                    name: '비밀번호'
                })
            }
        });

        setValidationList(validation);

        if(validation.length > 0) {
            setShowModal(true);
        } else {
            await CreateUserAPI(bodyList);
        
            navigate('/user/manage');
        }
    };

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
                                        <Input 
                                            name='name' 
                                            value={body.name} 
                                            onChange={e => {
                                                onChangeComponent(body.number, e.target.name, e.target.value);
                                            }} 
                                            placeholder="이름 입력" 
                                            maxLength={10}
                                            style={{ width: 150 }} 
                                        />
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>아이디</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Input 
                                            name='user_id' 
                                            value={body.user_id} 
                                            onChange={e => {
                                                onChangeComponent(body.number, e.target.name, e.target.value);
                                            }} 
                                            placeholder="아이디 입력" 
                                            maxLength={10}
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
                                                value={body.type_id} 
                                                onChange={value => {
                                                    onChangeComponent(body.number, 'type_id', value);
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
                                                value={body.group_id} 
                                                onChange={value => {
                                                    onChangeComponent(body.number, 'group_id', value);
                                                }}
                                                suffixIcon={<CaretDownOutlined />}
                                                placeholder="그룹"
                                                style={{ width: 150 }}
                                            >
                                                {
                                                    body.type_id === '0' ? 
                                                    Constants.userTeamGroupOptions.map((optionItem, optionIndex) => (
                                                        <Select.Option key={optionIndex} value={optionItem.value}>
                                                            {optionItem.label}
                                                        </Select.Option>
                                                    ))
                                                    : body.type_id === '1' ? 
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
                                                    value={body.password} 
                                                    onChange={e => {
                                                        onChangeComponent(body.number, e.target.name, e.target.value);
                                                    }} 
                                                    placeholder="비밀번호 입력" 
                                                    maxLength={15} style={{ width: 250 }} 
                                                />
                                                <label className='danger-alert'>사용할 수 없는 비밀번호 입니다.</label>
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
                            <Button className='white-button rounded-button' icon={<PlusOutlined />} onClick={onAddComponentClick}>사용자 추가하기</Button>
                        </Col>
                    </Row>
                </Space>
            </Space>
            <AlertModal visible={showModal} onConfirmClick={() => setShowModal(false)} validationList={validationList} />
        </>
    );
}

export default Create;