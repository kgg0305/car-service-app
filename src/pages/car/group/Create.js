import { Col, Divider, Row, Space, Select, Button, Input } from 'antd';
import { CaretDownOutlined, PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetBrandOptionListAPI } from '../../../api/Brand';
import { CheckGroupNameAPI, CreateGroupAPI } from '../../../api/Group';
import { GetCarKindOptionListAPI } from '../../../api/CarKind';
import { Constants } from '../../../constants/Constants';
import AlertModal from '../../../components/AlertModal';

const { Option } = Select;

// 등록페지
function Create() {
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [validationList, setValidationList] = useState([]);
    const [brandOptionList, setBrandOptionList] = useState([]);
	const [carKindOptionList, setCarKindOptionList] = useState([]);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [bodyList, setBodyList] = useState([
        {
            number: 1,
            brand_id: null,
            group_name: '',
            car_kind_id: null,
            is_use: '0',
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
                is_use: '0'
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

    const onSaveClick = async(url) => {
        const validation = [];
        bodyList.map((body, index) => {
            if(body.brand_id === null) {
                validation.push({
                    title: '정보 ' + ((index + 1) < 10 ? '0' + (index + 1) : (index + 1)),
                    name: '브랜드'
                })
            }
            if(body.group_name === '') {
                validation.push({
                    title: '정보 ' + ((index + 1) < 10 ? '0' + (index + 1) : (index + 1)),
                    name: '모델그룹'
                })
            }
            if(body.car_kind_id === null) {
                validation.push({
                    title: '정보 ' + ((index + 1) < 10 ? '0' + (index + 1) : (index + 1)),
                    name: '차종'
                })
            }
        });

        setValidationList(validation);

        if(validation.length > 0) {
            setShowModal(true);
        } else {
            await CreateGroupAPI(bodyList);
            navigate(url);
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
                                        <label>브랜드</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                    <Select
                                        name='brand_id' 
                                        value={body.brand_id} 
                                        onChange={value => {
                                            onChangeComponent(body.number, 'brand_id', value);
                                        }}
                                        size='large'
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
                                            <div style={{position: 'relative'}}>
                                                <Input 
                                                    name='group_name' 
                                                    value={body.group_name} 
                                                    onChange={e => {
                                                        onChangeComponent(body.number, e.target.name, e.target.value);
                                                    }} 
                                                    size='large'
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
                                            <Button className='black-button' onClick={() => checkName(body.number, body.group_name)} size='large'>확인</Button>
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
                                            size='large'
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
                                            size='large'
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
                                    <Button className='white-button' size='large'>취소</Button>
                                </Link>
                                <Button className='white-button' size='large' onClick={() => onSaveClick('/car/group')}>저장하고 나가기</Button>
                                
                                <Button className='black-button' size='large' onClick={() => onSaveClick('/car/model')}>저장하고 모델 등록하기</Button>
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
            <AlertModal visible={showModal} onConfirmClick={() => setShowModal(false)} validationList={validationList} />
        </>
    );
}

export default Create;