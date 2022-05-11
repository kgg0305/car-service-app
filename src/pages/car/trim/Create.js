import { Col, Divider, Row, Space, Select, Button, Input, Modal, Tabs, Switch, InputNumber } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetBrandOptionListAPI } from '../../../api/Brand';
import { GetGroupOptionListAPI } from '../../../api/Group';
import { GetModelOptionListAPI } from '../../../api/Model';
import { GetLineupOptionListAPI } from '../../../api/Lineup';
import { CreateTrimAPI, CheckTrimNameAPI } from '../../../api/Trim';
import alert_icon from '../../../assets/images/alert-icon.png';
import { Constants } from '../../../constants/Constants';
import AlertModal from '../../../components/AlertModal';

const { Option } = Select;
const { TabPane } = Tabs;

// 등록페지
function Create() {
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [validationList, setValidationList] = useState([]);
    const [brandOptionList, setBrandOptionList] = useState([]);
	const [groupOptionList, setGroupOptionList] = useState([]);
    const [modelOptionList, setModelOptionList] = useState([]);
    const [lineupOptionList, setLineupOptionList] = useState([]);
    const [bodyInfo, setBodyInfo] = useState(
        {
            title: '정보 ',
            brand_id: null,
            group_id: null,
            model_id: null,
            lineup_id: null,
            trim_name: '',
            gearbox_type: null,
            price: 0,
            is_use: '0',
            check_name: ''
        }
    );

    const initComponent = async () => {
		const initBrandOptionList = await GetBrandOptionListAPI();
		const initGroupOptionList = await GetGroupOptionListAPI();
        const initModelOptionList = await GetModelOptionListAPI();
        const initLineupOptionList = await GetLineupOptionListAPI();
		
		setBrandOptionList(initBrandOptionList);
		setGroupOptionList(initGroupOptionList);
        setModelOptionList(initModelOptionList);
        setLineupOptionList(initLineupOptionList);
	};

    useEffect(() => {
		initComponent();
	}, []);

    async function checkName(name) {
        const result = await CheckTrimNameAPI(name);
        onChangeComponent('check_name', result ? 'exist' : 'not-exist');
    }

    const onChangeComponent = (name, value) => {
        setBodyInfo(
            { 
                ...bodyInfo,
                group_id: name == 'brand_id' ? null : bodyInfo.group_id,
                model_id: (name == 'brand_id' || name == 'group_id') ? null : bodyInfo.model_id,
                lineup_id: (name == 'brand_id' || name == 'group_id' || name == 'model_id') ? null : bodyInfo.lineup_id,
                [name]: value
            }
        );        
    }

    const onSaveClick = async(url) => {
        const validation = [];
        if(bodyInfo.brand_id === null) {
            validation.push({
                title: '정보 ',
                name: '차량(브랜드)'
            })
        }
        if(bodyInfo.group_id === null) {
            validation.push({
                title: '정보 ',
                name: '차량(모델그룹)'
            })
        }
        if(bodyInfo.model_id === null) {
            validation.push({
                title: '정보 ',
                name: '차량(모델)'
            })
        }
        if(bodyInfo.lineup_id === null) {
            validation.push({
                title: '정보 ',
                name: '차량(라인업)'
            })
        }
        if(bodyInfo.trim_name === '') {
            validation.push({
                title: '정보 ',
                name: '트림'
            })
        }
        if(bodyInfo.gearbox_type === null) {
            validation.push({
                title: '정보 ',
                name: '변속기'
            })
        }
        if(bodyInfo.price === '') {
            validation.push({
                title: '정보 ',
                name: '가격'
            })
        }

        setValidationList(validation);

        if(validation.length > 0) {
            setShowModal(true);
        } else {
            await CreateTrimAPI(bodyInfo);
            navigate(url);
        }
    };

    return(
        <>
            <Space direction='vertical' size={18} className='main-layout'>
                {/* Page Header */}
                <Space direction='vertical' size={18}>
                    <Row justify='middle'>
                        <Col>
                            <label className='main-header-title'>트림 등록</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/car/trim">
                                    <Button className='white-button medium-button'>취소</Button>
                                </Link>
                                <Button className='black-button medium-button' onClick={() => onSaveClick('/car/trim')}>저장하고 나가기</Button>
                            </Space>
                        </Col>
                    </Row>
                    <Divider className='main-body-divider' />
                </Space>

                {/* Body Section */}
                <Space direction='vertical' size={20} style={{paddingBottom: 117}}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="상세가격표" key="1">
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
                                                <Space size={6}>
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
                                                            groupOptionList.filter(item => item.brand_id === bodyInfo.brand_id).map((optionItem, optionIndex) => (
                                                                <Select.Option key={optionIndex} value={optionItem.value}>
                                                                    {optionItem.label}
                                                                </Select.Option>
                                                            ))
                                                        }
                                                    </Select>
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
                                                            modelOptionList.filter(item => item.group_id === bodyInfo.group_id).map((optionItem, optionIndex) => (
                                                                <Select.Option key={optionIndex} value={optionItem.value}>
                                                                    {optionItem.label}
                                                                </Select.Option>
                                                            ))
                                                        }
                                                    </Select>
                                                    <Select
                                                        name='lineup_id' 
                                                        value={bodyInfo.lineup_id} 
                                                        onChange={value => {
                                                            onChangeComponent('lineup_id', value);
                                                        }}
                                                        suffixIcon={<CaretDownOutlined />}
                                                        placeholder="라인업 선택"
                                                        style={{ width: 400 }}
                                                    >
                                                        {
                                                            lineupOptionList.filter(item => item.model_id === bodyInfo.model_id).map((optionItem, optionIndex) => (
                                                                <Select.Option key={optionIndex} value={optionItem.value}>
                                                                    {optionItem.label}
                                                                </Select.Option>
                                                            ))
                                                        }
                                                    </Select>
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>트림</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Space>
                                                    <div className=''>
                                                        <Input 
                                                            name='trim_name' 
                                                            value={bodyInfo.trim_name} 
                                                            onChange={e => {
                                                                onChangeComponent(e.target.name, e.target.value);
                                                            }} 
                                                            placeholder="트림명 입력" 
                                                            maxLength={15} style={{ width: 400 }} 
                                                        />
                                                        {
                                                            bodyInfo.check_name == 'exist'
                                                            ? <label className='danger-alert'>이미 사용중인 이름 입니다.</label>
                                                            : bodyInfo.check_name == 'not-exist'
                                                            ? <label className='successful-alert'>사용 가능한 이름 입니다.</label>
                                                            : ''
                                                        }
                                                    </div>
                                                    <Button className='black-button' onClick={() => checkName(bodyInfo.trim_name)}>확인</Button>
                                                </Space>
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>변속기</label>
                                            </Col>
                                            <Col flex='auto' className='table-value-col-section'>
                                                <Select
                                                    name='gearbox_type' 
                                                    value={bodyInfo.gearbox_type} 
                                                    onChange={value => {
                                                        onChangeComponent('gearbox_type', value);
                                                    }}
                                                    suffixIcon={<CaretDownOutlined />}
                                                    placeholder="선택"
                                                    style={{ width: 150 }}
                                                >
                                                    {
                                                        Constants.gearBoxTypeOptions.map((optionItem, optionIndex) => (
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
                                                <label>가격</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <InputNumber 
                                                    name='price' 
                                                    value={bodyInfo.price} 
                                                    onChange={number => {
                                                        onChangeComponent('price', number);
                                                    }} 
                                                    controls={false}
                                                    maxLength={9}
                                                    style={{ width: 150 }} 
                                                />
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
                                            <label className='main-sub-title'>사양</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                        <Col span={2} className='table-header-col-section'>
                                            <label>사양 01</label>
                                        </Col>
                                        <Col flex="auto" className='table-value-col-section'>
                                            <Row>
                                                <Col>
                                                    <Space size={6}>
                                                        <Select
                                                            suffixIcon={<CaretDownOutlined />}
                                                            placeholder="선택"
                                                            style={{ width: 200 }}
                                                        >
                                                            <Option value="SK">현대</Option>
                                                        </Select>
                                                        <Input placeholder="세부 내용 입력" style={{ width: 1050 }} />
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
                                            <label className='main-sub-title'>트림 옵션</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
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
                                                            <Input placeholder="세부 내용 입력" style={{ width: 700 }} />
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
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>옵션 02</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Row>
                                                    <Col>
                                                        <Space size={6}>
                                                            <Input placeholder="옵션 이름" style={{ width: 300 }} />
                                                            <Input style={{ width: 200 }} value={1} />
                                                            <Input placeholder="세부 내용 입력" style={{ width: 700 }} />
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
                        </TabPane>
                        <TabPane tab="제원ㆍ사양/옵션" key="2">
                            <Space direction='vertical' size={40}>
                                <Space direction='vertical' size={20}>
                                    <Row align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>차량</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>모델정보</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={10}>
                                                    <Button className='gray-button large-button'>브랜드</Button>
                                                    <Button className='gray-button large-button'>모델그룹</Button>
                                                    <Button className='gray-button large-button'>모델</Button>
                                                    <Button className='gray-button large-button'>라인업</Button>
                                                    <Button className='gray-button large-button'>트림명</Button>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Space>
                                </Space>
                                <Space direction='vertical' size={20}>
                                    <Row gutter={[12]} align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>제원</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>연료</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Button className='gray-button big-button'>휘발유</Button>
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>연비 [km/l]</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Input value={0} style={{ width: 150 }} />
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>베기량 [CC]</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Input value={0} style={{ width: 150 }} />
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>엔진형식</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Input placeholder='엔진형식 입력' style={{ width: 200 }} />
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>최대토크 [kg.m/rpm]</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Space size={6}>
                                                    <Input value={0} style={{ width: 100 }} />
                                                    <label>/</label>
                                                    <Input value={0} style={{ width: 100 }} />
                                                </Space>
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>최고출력 [ps/rpm]</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={6}>
                                                    <Input value={0} style={{ width: 100 }} />
                                                    <label>/</label>
                                                    <Input value={0} style={{ width: 100 }} />
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>CO2배출량 [g/km]</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Input value={0} style={{ width: 150 }} />
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>타이어</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={6}>
                                                    <Input value={0} style={{ width: 100 }} />
                                                    <label>/</label>
                                                    <Input value={0} style={{ width: 60 }} />
                                                    <label>R</label>
                                                    <Input value={0} style={{ width: 60 }} />
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>구동방식</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Input placeholder='구동방식 입력' style={{ width: 200 }} />
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>변속기</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Input placeholder='변속기 입력' style={{ width: 200 }} />
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>연료탱크 [ l ]</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Input value={0} style={{ width: 150 }} />
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>공차중량 [kg]</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Input value={0} style={{ width: 150 }} />
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>승차정원 [명]</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Input value={0} style={{ width: 150 }} />
                                            </Col>
                                        </Row>
                                    </Space>
                                </Space>
                                <Space direction='vertical' size={20}>
                                    <Row gutter={[12]} align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>크기</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>전고 [mm]</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Input value={0} style={{ width: 150 }} />
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>전폭 [mm]</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Input value={0} style={{ width: 150 }} />
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>휠베이스 [mm]</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Input value={0} style={{ width: 150 }} />
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>전장 [mm]</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Input value={0} style={{ width: 150 }} />
                                            </Col>
                                        </Row>
                                    </Space>
                                </Space>
                            </Space>
                        </TabPane>
                    </Tabs>
                </Space>
            </Space>
            <AlertModal visible={showModal} onConfirmClick={() => setShowModal(false)} validationList={validationList} />
        </>
    );
}

export default Create;