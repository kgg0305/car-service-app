import { Col, Divider, Row, Space, Select, Button, Input, Modal, Tabs, DatePicker } from 'antd';
import { CaretDownOutlined, PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { GetBrandOptionListAPI } from '../../../api/Brand';
import alert_icon from '../../../assets/images/alert-icon.png';
import { CreateDiscountKindAPI } from '../../../api/DiscountKind';
import { Constants } from '../../../constants/Constants';
import { CreateDiscountConditionAPI } from '../../../api/DiscountCondition';
import AlertModal from '../../../components/AlertModal';

const { Option } = Select;
const { TabPane } = Tabs;

// 등록페지
function Create() {
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [validationList, setValidationList] = useState([]);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [brandOptionList, setBrandOptionList] = useState([]);
    const [bodyList, setBodyList] = useState([
        {
            number: 1,
            brand_id: null,
            kindBodyList: [
                {
                    number: 1,
                    kind_name: '',
                    kind_detail: '',
                    s_date: new Date(),
                    e_date: new Date(),
                    conditionBodyList: [
                        {
                            number: 1,
                            condition_name: '',
                            discount_price: 0,
                            price_unit: '0'
                        }
                    ]
                }
            ]
        }
    ]);

    const initComponent = async () => {
		const initBrandOptionList = await GetBrandOptionListAPI();
		
		setBrandOptionList(initBrandOptionList);
	};

    useEffect(() => {
		initComponent();
	}, []);

    const onAddComponentClick = event => {
        if(bodyList.length < 10){
            setShowDeleteButton(true);
            setBodyList([...bodyList, {
                number: bodyList[bodyList.length - 1].number + 1,
                brand_id: null,
                kindBodyList: [
                    {
                        number: 1,
                        kind_name: '',
                        kind_detail: '',
                        s_date: new Date(),
                        e_date: new Date(),
                        conditionBodyList: [
                            {
                                number: 1,
                                condition_name: '',
                                discount_price: 0,
                                price_unit: '0'
                            }
                        ]
                    }
                ]
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

    const onAddKindComponentClick = (number) => {
        setBodyList(bodyList.map(body => body.number === number ? {
            ...body, 
            ['kindBodyList']: [
                ...body.kindBodyList,
                {
                    number: body.kindBodyList[body.kindBodyList.length - 1].number + 1,
                    kind_name: '',
                    kind_detail: '',
                    s_date: new Date(),
                    e_date: new Date(),
                    conditionBodyList: [
                        {
                            number: 1,
                            condition_name: '',
                            discount_price: 0,
                            price_unit: 0
                        }
                    ]
                }
            ]
        } : body));
    };

    const onDeleteKindComponentClick = (number, kindNumber) => {
        setBodyList(bodyList.map(body => body.number === number ? {
            ...body, 
            kindBodyList: [
                ...body.kindBodyList.filter((kindBody) => kindBody.number !== kindNumber)
            ]
        } : body));
    };

    const onChangeKindComponent = (number, kindNumber, name, value) => {
        setBodyList(bodyList.map(body => body.number === number ? {
            ...body, 
            kindBodyList: body.kindBodyList.map(kindBody => kindBody.number === kindNumber ? {...kindBody, [name]: value} : kindBody)
        } : body));
    }

    const onChangeConditionComponent = (bodyNumber, kindNumber, conditionNumber, name, value) => {
        setBodyList(
            bodyList.map(body => body.number === bodyNumber ? 
                {
                    ...body, 
                    kindBodyList: body.kindBodyList.map(kindBody => kindBody.number === kindNumber ? 
                        {
                            ...kindBody,
                            conditionBodyList: kindBody.conditionBodyList.map(conditionBody => conditionBody.number === conditionNumber ?
                                {
                                    ...conditionBody,
                                    [name]: value
                                }
                                : conditionBody
                            )
                        }
                        : kindBody
                    )
                } 
                : body
            )
        );
    }

    const onSaveClick = async() => {
        const validation = [];
        bodyList.map((body, index) => {
            if(body.brand_id === null) {
                validation.push({
                    title: '정보 ' + ((index + 1) < 10 ? '0' + (index + 1) : (index + 1)),
                    name: '브랜드'
                })
            }
            body.kindBodyList.map((kindBody, kindIndex) => {
                if(kindBody.kind_name === '') {
                    validation.push({
                        title: '종류 ' + ((kindIndex + 1) < 10 ? '0' + (kindIndex + 1) : (kindIndex + 1)),
                        name: '상품 ' + ((kindIndex + 1) < 10 ? '0' + (kindIndex + 1) : (kindIndex + 1) + '(할인 종류 이름)'),
                    })
                }
            })
        });

        setValidationList(validation);

        if(validation.length > 0) {
            setShowModal(true);
        } else {
            const created_info = await CreateDiscountKindAPI(bodyList);
            const startedIndex = created_info['insertId'];
            
            await CreateDiscountConditionAPI(startedIndex, bodyList);
            
            navigate('/car/discount');
        }
    };

    const onCloseModalClick = () => {
        setShowModal(false);
    };

    const renderBodyList = (type) => {
        if(type === 'kind') {
            return (
                bodyList.map((body, index) => (
                    <Space key={index} direction='vertical' size={40}>
                        <Space direction='vertical' size={20}>
                            <Row align='middle'>
                                <Col>
                                    <label className='main-sub-title'>정보 { body.number !== 10 ? '0' + body.number : body.number }</label>
                                </Col>
                                <Col flex="auto" />
                                <Col>
                                    { 
                                        showDeleteButton 
                                        ? <Button className='white-button big-button' style={{width: 129, fontWeight: 500}} onClick={() => onDeleteComponentClick(body.number)}>정보삭제</Button> 
                                        : ''
                                    }
                                </Col>
                            </Row>
                            <Space direction='vertical' size={0}>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>브랜드</label>
                                    </Col>
                                    <Col span={5} className='table-value-col-section'>
                                        <Select
                                            name='brand_id' 
                                            value={body.brand_id} 
                                            onChange={value => {
                                                onChangeComponent(body.number, 'brand_id', value);
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
                                </Row>
                            </Space>
                        </Space>
                        <Space direction='vertical' size={20}>
                            <Row align='middle'>
                                <Col>
                                    <label className='main-sub-title'>종류 { body.number !== 10 ? '0' + body.number : body.number }</label>
                                </Col>
                                <Col flex="auto" />
                            </Row>
                            <Space direction='vertical' size={20}>
                                {renderKindBodyList(body)}
                            </Space>
                        </Space>
                    </Space>
                ))
            );
        }
        
        if(type === 'condition') {
            return (
                bodyList.map((body) => (
                    body.kindBodyList.map((kindBody, index) => (
                        <Space key={index} direction='vertical' size={40}>
                            <Space direction='vertical' size={20}>
                                <Row align='middle'>
                                    <Col>
                                        <label className='main-sub-title'>정보 { body.number !== 10 ? '0' + body.number : body.number }</label>
                                    </Col>
                                    <Col flex="auto" />
                                </Row>
                                <Space direction='vertical' size={0}>
                                    <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                        <Col span={2} className='table-header-col-section'>
                                            <label>브랜드</label>
                                        </Col>
                                        <Col span={5} className='table-value-col-section'>
                                            <Space>
                                                <Select
                                                    value={body.brand_id}
                                                    size='large' 
                                                    suffixIcon={<CaretDownOutlined />}
                                                    placeholder="브랜드 선택"
                                                    style={{ width: 300 }}
                                                    disabled={true}
                                                >
                                                    {
                                                        brandOptionList.map((optionItem, optionIndex) => (
                                                            <Select.Option key={optionIndex} value={optionItem.value}>
                                                                {optionItem.label}
                                                            </Select.Option>
                                                        ))
                                                    }
                                                </Select>
                                                <Input 
                                                    value={kindBody.kind_name}
                                                    placeholder="할인 종류 이름" style={{ width: 300 }} 
                                                    size='large' 
                                                    maxLength={18} disabled={true}
                                                />
                                            </Space>
                                        </Col>
                                    </Row>
                                </Space>
                            </Space>
                            <Space direction='vertical' size={20}>
                                <Row align='middle'>
                                    <Col>
                                        <label className='main-sub-title'>조건 { body.number !== 10 ? '0' + body.number : body.number }</label>
                                    </Col>
                                    <Col flex="auto" />
                                </Row>
                                <Space direction='vertical' size={0}>
                                    {renderConditionBodyList(body.number, kindBody)}
                                </Space>
                            </Space>
                        </Space>
                    ))
                ))
            )
        }
    }

    const renderKindBodyList = (body) => {
        return (
            body.kindBodyList.map((kindBody, index) => (
                <Space direction='vertical' size={0}>
                    <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                        <Col span={2} className='table-header-col-section'>
                            <label>상품 { kindBody.number !== 10 ? '0' + kindBody.number : kindBody.number }</label>
                        </Col>
                        <Col flex="auto" className='table-value-col-section'>
                            <Space size={14}>
                                <Space size={6}>
                                    <Input 
                                        name='kind_name' 
                                        value={kindBody.kind_name} 
                                        onChange={e => {
                                            onChangeKindComponent(body.number, kindBody.number, e.target.name, e.target.value);
                                        }} 
                                        size='large'
                                        placeholder="할인 종류 이름" 
                                        maxLength={18} style={{ width: 300 }} 
                                    />
                                    <Input 
                                        name='kind_detail' 
                                        value={kindBody.kind_detail} 
                                        onChange={e => {
                                            onChangeKindComponent(body.number, kindBody.number, e.target.name, e.target.value);
                                        }} 
                                        size='large'
                                        placeholder="세부 내용 입력" 
                                        maxLength={50} style={{ width: 900 }} 
                                    />
                                </Space>
                                { 
                                    body.kindBodyList.length == index + 1 
                                    ? 
                                    <>
                                        {
                                            body.kindBodyList.length != 1 
                                            ? <Button className='white-button' onClick={() => onDeleteKindComponentClick(body.number, kindBody.number)} size='large'>삭제</Button> 
                                            : ''
                                        }
                                        <Button className='black-button' onClick={() => onAddKindComponentClick(body.number)} size='large'>추가</Button>
                                    </>
                                    : <Button className='white-button' onClick={() => onDeleteKindComponentClick(body.number, kindBody.number)} size='large'>삭제</Button>
                                }
                            </Space>
                        </Col>
                    </Row>
                    <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                        <Col span={2} className='table-header-col-section'>
                            <label>기간 { kindBody.number !== 10 ? '0' + kindBody.number : kindBody.number }</label>
                        </Col>
                        <Col flex="auto" className='table-value-col-section'>
                            <Space size={6}>
                                <DatePicker 
                                    name='s_date' 
                                    value={moment(kindBody.s_date)} 
                                    onChange={value => {
                                        onChangeKindComponent(body.number, kindBody.number, 's_date', value.toString());
                                    }}
                                    size='large'
                                    placeholder='시작일' 
                                />
                                <label>~</label>
                                <DatePicker 
                                    name='e_date' 
                                    value={moment(kindBody.e_date)} 
                                    onChange={value => {
                                        onChangeKindComponent(body.number, kindBody.number, 'e_date', value.toString());
                                    }}
                                    size='large'
                                    placeholder='종료일' 
                                />
                            </Space>
                        </Col>
                    </Row>
                </Space>
            ))
        );
    }

    const renderConditionBodyList = (bodyNumber, kindBody) => {
        return (
            kindBody.conditionBodyList.map((conditionBody, index) => (
                <Row key={index} gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                    <Col span={2} className='table-header-col-section'>
                        <label>조건 { conditionBody.number !== 10 ? '0' + conditionBody.number : conditionBody.number }</label>
                    </Col>
                    <Col flex="auto" className='table-value-col-section'>
                        <Space size={600}>
                            <Space size={6}>
                                <Input 
                                    name='condition_name' 
                                    value={conditionBody.condition_name} 
                                    onChange={e => {
                                        onChangeConditionComponent(bodyNumber, kindBody.number, conditionBody.number, e.target.name, e.target.value);
                                    }}  
                                    size='large' 
                                    placeholder="할인조건 입력" style={{ width: 400 }} 
                                />
                                <Input 
                                    name='discount_price' 
                                    value={conditionBody.discount_price} 
                                    onChange={e => {
                                        onChangeConditionComponent(bodyNumber, kindBody.number, conditionBody.number, e.target.name, e.target.value);
                                    }}  
                                    size='large' 
                                    addonAfter={
                                        <Select
                                            name='price_unit' 
                                            value={conditionBody.price_unit} 
                                            onChange={value => {
                                                onChangeConditionComponent(bodyNumber, kindBody.number, conditionBody.number, 'price_unit', value);
                                            }}
                                            className="select-after"
                                        >
                                            {
                                                Constants.currencyTypeOptions.map((optionItem, optionIndex) => (
                                                    <Select.Option key={optionIndex} value={optionItem.value}>
                                                        {optionItem.label}
                                                    </Select.Option>
                                                ))
                                            }
                                        </Select>
                                    } 
                                    style={{ width: 250 }} 
                                />
                            </Space>
                        </Space>
                    </Col>
                </Row>
            ))
        );
    }

    return(
        <>
            <Space direction='vertical' size={18} className='main-layout'>
                {/* Page Header */}
                <Space direction='vertical' size={18}>
                    <Row justify='middle'>
                        <Col>
                            <label className='main-header-title'>할인/비용 등록</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/car/discount">
                                    <Button className='white-button' size='large'>취소</Button>
                                </Link>
                                <Button className='black-button' size='large' onClick={onSaveClick}>저장하고 나가기</Button>
                            </Space>
                        </Col>
                    </Row>
                    <Divider className='main-body-divider' />
                </Space>

                {/* Body Section */}
                <Space direction='vertical' size={20} style={{paddingBottom: 117}}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="할인종류" key="1">
                            <Space direction='vertical' size={40}>
                                {renderBodyList('kind')}
                                <Row justify="center" gutter={[17, 0]}>
                                    <Col>
                                        <Button className='white-button rounded-button' icon={<PlusOutlined />} onClick={onAddComponentClick}>할인종류 추가하기</Button>
                                    </Col>
                                </Row>
                            </Space>
                        </TabPane>
                        <TabPane tab="할인조건" key="2">
                            <Space direction='vertical' size={40}>
                                {renderBodyList('condition')}
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