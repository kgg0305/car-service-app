import { Col, Divider, Row, Space, Select, Button, Input, Image, Upload, Modal, Tabs, DatePicker, Switch } from 'antd';
import { CaretDownOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetBrandOptionListAPI } from '../../../api/Brand';
import { GetGroupOptionListAPI } from '../../../api/Group';
import { GetModelOptionListAPI } from '../../../api/Model';
import { CheckLineupNameAPI, CreateLineupAPI } from '../../../api/Lineup';
import alert_icon from '../../../assets/images/alert-icon.png';
import { Constants } from '../../../constants/Constants';

const { Option } = Select;
const { TabPane } = Tabs;

function Create() {
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [brandOptionList, setBrandOptionList] = useState([]);
	const [groupOptionList, setGroupOptionList] = useState([]);
    const [modelOptionList, setModelOptionList] = useState([]);
    const [bodyInfo, setBodyInfo] = useState(
        {
            number: 1,
            brand_id: null,
            group_id: null,
            model_id: null,
            model_lineup_ids: '',
            model_color_ids: '',
            lineup_name: '',
            fule_kind: '',
            year_type: '2022',
            is_use: '',
            is_use_lineup: '',
            is_use_color: '',
            check_name: ''
        }
    );

    const initComponent = async () => {
		const initBrandOptionList = await GetBrandOptionListAPI();
		const initGroupOptionList = await GetGroupOptionListAPI();
        const initModelOptionList = await GetModelOptionListAPI();
		
		setBrandOptionList(initBrandOptionList);
		setGroupOptionList(initGroupOptionList);
        setModelOptionList(initModelOptionList);
	};

    useEffect(() => {
		initComponent();
	}, []);

    async function checkName(name) {
        const result = await CheckLineupNameAPI(name);
        onChangeComponent('check_name', result ? 'exist' : 'not-exist');
    }

    const onChangeComponent = (name, value) => {
        setBodyInfo(
            { 
                ...bodyInfo,
                [name]: value
            }
        );        
    }

    const onSaveClick = async() => {
        await CreateLineupAPI(bodyInfo);
        // setShowModal(true);
        navigate('/car/lineup');
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
                            <label className='main-header-title'>라인업 등록</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/car/lineup">
                                    <Button className='white-button medium-button'>취소</Button>
                                </Link>
                                <Button className='white-button medium-button' onClick={onSaveClick}>저장하고 나가기</Button>
                                
                                <Button className='black-button medium-button'>저장하고 모델그룹 등록하기</Button>
                            </Space>
                        </Col>
                    </Row>
                    <Divider className='main-body-divider' />
                </Space>

                {/* Body Section */}
                <Space direction='vertical' size={20} style={{paddingBottom: 117}}>
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
                                            name='brand_id' 
                                            value={bodyInfo.brand_id} 
                                            onChange={value => {
                                                onChangeComponent('brand_id', value);
                                            }}
                                            suffixIcon={<CaretDownOutlined />}
                                            placeholder="브랜드 선택"
                                            style={{ width: 300 }}
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
                                    <Col span={5} className='table-value-col-section'>
                                        <Select
                                            name='group_id' 
                                            value={bodyInfo.group_id} 
                                            onChange={value => {
                                                onChangeComponent('group_id', value);
                                            }}
                                            suffixIcon={<CaretDownOutlined />}
                                            placeholder="모델그룹 선택"
                                            style={{ width: 300 }}
                                        >
                                            {
                                                groupOptionList.map((optionItem, optionIndex) => (
                                                    <Select.Option key={optionIndex} value={optionItem.value}>
                                                        {optionItem.label}
                                                    </Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </Col>
                                    <Col flex='auto' className='table-value-col-section'>
                                        <Select
                                            name='model_id' 
                                            value={bodyInfo.model_id} 
                                            onChange={value => {
                                                onChangeComponent('model_id', value);
                                            }}
                                            suffixIcon={<CaretDownOutlined />}
                                            placeholder="모델 선택"
                                            style={{ width: 300 }}
                                        >
                                            {
                                                modelOptionList.map((optionItem, optionIndex) => (
                                                    <Select.Option key={optionIndex} value={optionItem.value}>
                                                        {optionItem.label}
                                                    </Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>라인업</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                        <Space>
                                            <div className=''>
                                                <Input 
                                                    name='lineup_name' 
                                                    value={bodyInfo.lineup_name} 
                                                    onChange={e => {
                                                        onChangeComponent(e.target.name, e.target.value);
                                                    }} 
                                                    placeholder="라인업 입력" maxLength={15} style={{ width: 400 }} 
                                                />
                                                {
                                                    bodyInfo.check_name == 'exist'
                                                    ? <label className='danger-alert'>이미 사용중인 이름 입니다.</label>
                                                    : bodyInfo.check_name == 'not-exist'
                                                    ? <label className='successful-alert'>사용 가능한 이름 입니다.</label>
                                                    : ''
                                                }
                                            </div>
                                            <Button className='black-button' onClick={() => checkName(bodyInfo.lineup_name)}>확인</Button>
                                        </Space>
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>연료</label>
                                    </Col>
                                    <Col flex='auto' className='table-value-col-section'>
                                        <Select
                                            name='fule_kind' 
                                            value={bodyInfo.fule_kind} 
                                            onChange={value => {
                                                onChangeComponent('fule_kind', value);
                                            }}
                                            suffixIcon={<CaretDownOutlined />}
                                            placeholder="선택"
                                            style={{ width: 150 }}
                                        >
                                            {
                                                Constants.fuelTypeOptions.map((optionItem, optionIndex) => (
                                                    <Select.Option key={optionIndex} value={optionItem.value}>
                                                        {optionItem.label}
                                                    </Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>연식</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                        <Space>
                                            <Input 
                                                name='year_type' 
                                                value={bodyInfo.year_type} 
                                                onChange={e => {
                                                    onChangeComponent(e.target.name, e.target.value);
                                                }} 
                                                maxLength={6} style={{ width: 150 }} 
                                            />
                                        </Space>
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>사용여부</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Select
                                            name='is_use' 
                                            value={bodyInfo.is_use} 
                                            onChange={value => {
                                                onChangeComponent('is_use', value);
                                            }}
                                            suffixIcon={<CaretDownOutlined />}
                                            placeholder="선택"
                                            defaultValue="true"
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
                                            <Space size={11}>
                                                <Switch width='100' height={40} />
                                                <label className='switch-label'>사용</label>
                                            </Space>
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