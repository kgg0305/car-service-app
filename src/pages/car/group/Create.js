import { Col, Divider, Row, Space, Select, Button, Input, Modal } from 'antd';
import { CaretDownOutlined, PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetBrandOptionListAPI } from '../../../api/Brand';
import { CheckGroupNameAPI, CreateGroupAPI } from '../../../api/Group';
import { GetCarKindOptionListAPI } from '../../../api/CarKind';
import alert_icon from '../../../assets/images/alert-icon.png';
import { Constants } from '../../../constants/Constants';

const { Option } = Select;

function Create() {
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [brandOptionList, setBrandOptionList] = useState([]);
	const [carKindOptionList, setCarKindOptionList] = useState([]);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [bodyList, setBodyList] = useState([
        {
            number: 1,
            brand_id: null,
            group_name: '',
            car_kind_id: null,
            is_use: null,
            check_name: ''
        }
    ]);

    const initComponent = async () => {
		const initBrandOptionList = await GetBrandOptionListAPI();
		const initCarKindOptionList = await GetCarKindOptionListAPI();
		
		setBrandOptionList(initBrandOptionList);
		setCarKindOptionList(initCarKindOptionList);
	};

    useEffect(() => {
		initComponent();
	}, []);

    async function checkName(number, name) {
        const result = await CheckGroupNameAPI(name);
        onChangeComponent(number, 'check_name', result ? 'exist' : 'not-exist');
    }

    const onAddComponentClick = event => {
        if(bodyList.length < 10){
            setShowDeleteButton(true);
            setBodyList([...bodyList, {
                number: bodyList[bodyList.length - 1].number + 1,
                brand_id: null,
                group_name: '',
                car_kind_id: null,
                is_use: null
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
        setBodyList(bodyList.map(body => body.number === number ? {...body, [name]: value} : body));
    }

    const onSaveClick = async() => {
        await CreateGroupAPI(bodyList);
        // setShowModal(true);
        navigate('/car/group');
    };

    const onSaveAndOtherClick = async() => {
        await CreateGroupAPI(bodyList);
        // setShowModal(true);
        navigate('/car/model');
    };

    const onCloseModalClick = () => {
        setShowModal(false);
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
                                        <label>브랜드</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                    <Select
                                        name='brand_id' 
                                        value={body.brand_id} 
                                        onChange={value => {
                                            onChangeComponent(body.number, 'brand_id', value);
                                        }}
                                        suffixIcon={<CaretDownOutlined />}
                                        placeholder="브랜드 선택"
                                        style={{ width: 400 }}
                                    >
                                        {
                                            brandOptionList.map((optionItem, optionIndex) => (
                                                <Select.Option key={optionIndex} value={optionItem.value}>
                                                    {optionItem.label}
                                                </Select.Option>
                                            ))
                                        }
                                    </Select>
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>모델그룹</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space>
                                            <div className=''>
                                                <Input 
                                                    name='group_name' 
                                                    value={body.group_name} 
                                                    onChange={e => {
                                                        onChangeComponent(body.number, e.target.name, e.target.value);
                                                    }} 
                                                    placeholder="모델 그룹명 입력" 
                                                    maxLength={15} style={{ width: 400 }} 
                                                />
                                                {
                                                    body.check_name == 'exist'
                                                    ? <label className='danger-alert'>이미 사용중인 이름 입니다.</label>
                                                    : body.check_name == 'not-exist'
                                                    ? <label className='successful-alert'>사용 가능한 이름 입니다.</label>
                                                    : ''
                                                }
                                            </div>
                                            <Button className='black-button' onClick={() => checkName(body.number, body.group_name)}>확인</Button>
                                        </Space>
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>차종</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Select
                                            name='car_kind_id' 
                                            value={body.car_kind_id} 
                                            onChange={value => {
                                                onChangeComponent(body.number, 'car_kind_id', value);
                                            }}
                                            suffixIcon={<CaretDownOutlined />}
                                            placeholder="선택"
                                            style={{ width: 150 }}
                                        >
                                            {
                                                carKindOptionList.map((optionItem, optionIndex) => (
                                                    <Select.Option key={optionIndex} value={optionItem.value}>
                                                        {optionItem.label}
                                                    </Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>사용여부</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Select
                                            name='is_use' 
                                            value={body.is_use} 
                                            onChange={value => {
                                                onChangeComponent(body.number, 'is_use', value);
                                            }}
                                            suffixIcon={<CaretDownOutlined />}
                                            placeholder="선택"
                                            style={{ width: 150 }}
                                        >
                                            {
                                                Constants.availableOptions.map((optionItem, optionIndex) => (
                                                    <Select.Option key={optionIndex} value={optionItem.value}>
                                                        {optionItem.label}
                                                    </Select.Option>
                                                ))
                                            }
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
                                
                                <Button className='black-button medium-button' onClick={onSaveAndOtherClick}>저장하고 모델 등록하기</Button>
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