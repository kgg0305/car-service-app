import { Col, Divider, Row, Space, Select, Button, Input, Image, Upload, Modal, Tabs, DatePicker, Switch } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetBrandOptionListAPI } from '../../../api/Brand';
import { GetGroupOptionListAPI } from '../../../api/Group';
import { GetModelOptionListAPI } from '../../../api/Model';
import { CheckLineupNameAPI, DeleteLineupInfoAPI, UpdateLineupAPI, GetLineupInfoAPI } from '../../../api/Lineup';
import alert_icon from '../../../assets/images/alert-icon.png';
import { Constants } from '../../../constants/Constants';
import AlertModal from '../../../components/AlertModal';
import AlertDeleteModal from '../../../components/AlertDeleteModal';
import { GetModelLineupListAPI } from '../../../api/ModelLinup';
import { GetModelColorListAPI } from '../../../api/ModelColor';

const { Option } = Select;
const { TabPane } = Tabs;

// 수정페지
function Edit() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [validationList, setValidationList] = useState([]);
    const [brandOptionList, setBrandOptionList] = useState([]);
	const [groupOptionList, setGroupOptionList] = useState([]);
    const [modelOptionList, setModelOptionList] = useState([]);
    const [modelLineupBodyList, setModelLineupBodyList] = useState([]);
    const [modelColorBodyList, setModelColorBodyList] = useState([]);
    const [bodyInfo, setBodyInfo] = useState(
        {
            title: '정보 ',
            brand_id: null,
            group_id: null,
            model_id: null,
            model_lineup_ids: '',
            model_color_ids: '',
            lineup_name: '',
            fule_kind: null,
            year_type: new Date().getFullYear(),
            is_use: '0',
            is_use_lineup: '',
            is_use_color: '',
            created_date: new Date(),
            check_name: ''
        }
    );

    const initComponent = async () => {
        const initBrandOptionList = await GetBrandOptionListAPI();
		const initGroupOptionList = await GetGroupOptionListAPI();
        const initModelOptionList = await GetModelOptionListAPI();
        const initBodyInfo = await GetLineupInfoAPI(id);
        const initModelLineupBodyList = await GetModelLineupListAPI(0, {
            model_id: initBodyInfo.model_id
        });
        const initModelColorBodyList = await GetModelColorListAPI(0, {
            model_id: initBodyInfo.model_id
        });
        
		setBrandOptionList(initBrandOptionList);
		setGroupOptionList(initGroupOptionList);
        setModelOptionList(initModelOptionList);
		setBodyInfo(initBodyInfo);
        setModelLineupBodyList(initModelLineupBodyList.map(lineupBody => (
            {
                ...lineupBody,
                is_use: initBodyInfo.model_lineup_ids.split(',').some(item => item === lineupBody.idx.toString()) ? '0' : '1'
            }
        )));
        setModelColorBodyList(initModelColorBodyList.map(colorBody => (
            {
                ...colorBody,
                is_use: initBodyInfo.model_color_ids.split(',').some(item => item === colorBody.idx.toString()) ? '0' : '1'
            }
        )));
	}

	useEffect(() => {
		initComponent();
	}, []);

    async function checkName(name) {
        const result = await CheckLineupNameAPI(name);
        onChangeComponent('check_name', result ? 'exist' : 'not-exist');
    }

    const onChangeModelLineupComponent = (lineup_idx, name, value) => {
        setModelLineupBodyList(modelLineupBodyList.map(item => (
            item.idx === lineup_idx ?
            {
                ...item,
                [name]: value
            }
            : item
        )))
    };

    const onChangeModelColorComponent = (color_idx, name, value) => {
        setModelColorBodyList(modelColorBodyList.map(item => (
            item.idx === color_idx ?
            {
                ...item,
                [name]: value
            }
            : item
        )))
    };

    const onChangeComponent = async(name, value) => {
        setBodyInfo(
            { 
                ...bodyInfo,
                group_id: name == 'brand_id' ? null : bodyInfo.group_id,
                model_id: (name == 'brand_id' || name == 'group_id') ? null : bodyInfo.model_id,
                [name]: value
            }
        );

        if(name === 'brand_id' || name === 'group_id') {
            setModelLineupBodyList([]);
            setModelColorBodyList([]);
        }

        if(name === 'model_id') {
            const initModelLineupBodyList = await GetModelLineupListAPI(0, {
                model_id: value
            });
            setModelLineupBodyList(initModelLineupBodyList.map(item => (
                {
                    ...item,
                    is_use: '0'
                }
            )));

            const initModelColorBodyList = await GetModelColorListAPI(0, {
                model_id: value
            });
            setModelColorBodyList(initModelColorBodyList.map(item => (
                {
                    ...item,
                    is_use: '0'
                }
            )));
        }
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
        if(bodyInfo.lineup_name === '') {
            validation.push({
                title: '정보 ',
                name: '라인업'
            })
        }
        if(bodyInfo.fule_kind === null) {
            validation.push({
                title: '정보 ',
                name: '연료'
            })
        }
        if(bodyInfo.year_type === '') {
            validation.push({
                title: '정보 ',
                name: '연식'
            })
        }

        setValidationList(validation);

        if(validation.length > 0) {
            setShowModal(true);
        } else {
            await UpdateLineupAPI({
                ...bodyInfo,
                model_lineup_ids: modelLineupBodyList.filter(item => item.is_use === '0').map(item => item.idx).join(','),
                model_color_ids: modelColorBodyList.filter(item => item.is_use === '0').map(item => item.idx).join(','),
            });
            navigate(url);
        }
    };

    const onDeleteClick = async() => {
        setShowDeleteModal(true);
    };

    const deleteInfo = async() => {
        await DeleteLineupInfoAPI(id);
        navigate('/car/lineup');
    };

    const renderModelLineupBodyList = () => {
        return (
            modelLineupBodyList.length > 0 ?
            modelLineupBodyList.map((body, index) => (
                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                    <Col span={2} className='table-header-col-section'>
                        <label>공통옵션 {(index + 1) < 10 ? '0' + (index + 1) : (index + 1)}</label>
                    </Col>
                    <Col flex="auto" className='table-value-col-section'>
                        <Row>
                            <Col>
                                <Space size={6}>
                                    <Input value={body.name} readOnly={true} size='large' style={{ width: 300 }} />
                                    <Input value={body.price} readOnly={true} size='large' style={{ width: 200 }} />
                                    <Input value={body.detail} readOnly={true} size='large' style={{ width: 700 }} />
                                </Space>
                            </Col>
                            <Col flex='auto' />
                            <Col>
                                <Space size={11}>
                                    <Switch 
                                        checked={
                                            body.is_use === '0' ? false : true
                                        } 
                                        onClick={checked => onChangeModelLineupComponent(body.idx, 'is_use', checked ? '1' : '0')}
                                    />
                                    <label className='switch-label'>
                                        {
                                            Constants.availableOptions.filter(item => item.value === body.is_use)[0].label
                                        }
                                    </label>
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            ))
            : '선택된 정보가 없습니다.'
        );
    };

    const renderModelColorBodyList = () => {
        return (
            modelColorBodyList.length > 0 ?
            modelColorBodyList.map((body, index) => (
                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                    <Col span={2} className='table-header-col-section'>
                        <label>색상 {(index + 1) < 10 ? '0' + (index + 1) : (index + 1)}</label>
                    </Col>
                    <Col flex="auto" className='table-value-col-section'>
                        <Row>
                            <Col>
                                <Space size={6}>
                                    <Input value={body.name} readOnly={true} size='large' style={{ width: 300 }} />
                                    <Input value={body.price} readOnly={true} size='large' style={{ width: 200 }} />
                                </Space>
                            </Col>
                            <Col flex='auto' />
                            <Col>
                                <Space size={11}>
                                    <Switch 
                                        checked={
                                            body.is_use === '0' ? false : true
                                        } 
                                        onClick={checked => onChangeModelColorComponent(body.idx, 'is_use', checked ? '1' : '0')}
                                    />
                                    <label className='switch-label'>
                                        {
                                            Constants.availableOptions.filter(item => item.value === body.is_use)[0].label
                                        }
                                    </label>
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            ))
            : '선택된 정보가 없습니다.'
        );
    };
    
    return(
        <>
            <Space direction='vertical' size={18} className='main-layout'>
                {/* Page Header */}
                <Space direction='vertical' size={18}>
                    <Row justify='middle'>
                        <Col>
                            <label className='main-header-title'>라인업 수정</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/car/trim">
                                    <Button className='white-button' size='large'>취소</Button>
                                </Link>
                                <Button className='black-button' size='large' onClick={() => onSaveClick('/car/lineup')}>저장하고 나가기</Button>
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
                                            size='large' 
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
                                            size='large' 
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
                                    </Col>
                                    <Col flex='auto' className='table-value-col-section'>
                                        <Select
                                            name='model_id' 
                                            value={bodyInfo.model_id} 
                                            onChange={value => {
                                                onChangeComponent('model_id', value);
                                            }} 
                                            size='large' 
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
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>라인업</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                        <Space>
                                            <div style={{position: 'relative'}}>
                                                <Input 
                                                    name='lineup_name' 
                                                    value={bodyInfo.lineup_name} 
                                                    onChange={e => {
                                                        onChangeComponent(e.target.name, e.target.value);
                                                    }} 
                                                    size='large' 
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
                                            <Button className='black-button' onClick={() => checkName(bodyInfo.lineup_name)} size='large'>확인</Button>
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
                                            size='large' 
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
                                        <Input 
                                            name='year_type' 
                                            value={bodyInfo.year_type} 
                                            onChange={e => {
                                                onChangeComponent(e.target.name, e.target.value);
                                            }} 
                                            size='large' 
                                            maxLength={6} style={{ width: 150 }} 
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
                                            size='large' 
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
                            {renderModelLineupBodyList()}
                        </Space>
                        <Space direction='vertical' size={20}>
                            <Row align='middle'>
                                <Col>
                                    <label className='main-sub-title'>모델/라인업 색상 (견적 메뉴에서만 노출)</label>
                                </Col>
                                <Col flex="auto" />
                            </Row>
                            {renderModelColorBodyList()}
                        </Space>
                    </Space>

                    <Row justify="center" gutter={[17, 0]}>
                        <Col>
                            <Button className='white-button rounded-button' onClick={() => onDeleteClick()} size='large'>삭제하기</Button>
                        </Col>
                    </Row>
                </Space>
            </Space>
            <AlertModal visible={showModal} onConfirmClick={() => setShowModal(false)} validationList={validationList} />
            <AlertDeleteModal visible={showDeleteModal} onConfirmClick={() => deleteInfo(bodyInfo.idx)} onCancelClick={() => setShowDeleteModal(false)} />
        </>
    );
}

export default Edit;