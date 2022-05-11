import { Col, Divider, Row, Space, Select, Button, Input, Image, Upload, Modal, Tabs, DatePicker, Switch } from 'antd';
import { CaretDownOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Link, useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { GetBrandOptionListAPI } from '../../../api/Brand';
import { GetDiscountKindInfoAPI, UpdateDiscountKindAPI, DeleteDiscountKindInfoAPI } from '../../../api/DiscountKind';
import alert_icon from '../../../assets/images/alert-icon.png';
import { Constants } from '../../../constants/Constants';
import AlertModal from '../../../components/AlertModal';
import AlertDeleteModal from '../../../components/AlertDeleteModal';

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
    const [bodyInfo, setBodyInfo] = useState(
        {
            idx: id,
            brand_id: null,
            kind_name: '',
            kind_detail: '',
            s_date: new Date(),
            e_date: new Date(),
        }
    );
    const [conditionBodyList, setConditionBodyList] = useState([
        {
            idx: 1,
            brand_id: null,
            kind_name: '',
            kind_detail: '',
            s_date: new Date(),
            e_date: new Date(),
        }
    ]);

    const initComponent = async () => {
        const initBrandOptionList = await GetBrandOptionListAPI();
		const initBodyInfo = await GetDiscountKindInfoAPI(id);

        setBrandOptionList(initBrandOptionList);
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

    const onChangeConditionComponent = (number, name, value) => {
        // setConditionBodyList(
        //     { 
        //         ...bodyInfo,
        //         [name]: value
        //     }
        // );
    }

    const onSaveClick = async() => {
        const validation = [];
        if(bodyInfo.brand_id === null) {
            validation.push({
                title: '정보',
                name: '브랜드'
            })
        }
        if(bodyInfo.kind_name === '') {
            validation.push({
                title: '종류',
                name: '할인종류 이름',
            })
        }
        if(bodyInfo.kind_detail === '') {
            validation.push({
                title: '종류',
                name: '세부내용',
            })
        }

        setValidationList(validation);

        if(validation.length > 0) {
            setShowModal(true);
        } else {
            await UpdateDiscountKindAPI(bodyInfo);
            navigate('/car/discount');
        }
    };

    const onDeleteClick = async() => {
        setShowDeleteModal(true);
    };

    const deleteInfo = async() => {
        await DeleteDiscountKindInfoAPI(id);
        navigate('/car/discount');
    };

    const renderConditionBodyList = () => {
        return (
            conditionBodyList.map((body, index) => (
                <Row key={index} gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                    <Col span={2} className='table-header-col-section'>
                        <label>조건 01</label>
                    </Col>
                    <Col flex="auto" className='table-value-col-section'>
                        <Space size={600}>
                            <Space size={6}>
                                <Input placeholder="할인조건 입력" style={{ width: 400 }} />
                                <Input
                                    addonAfter={
                                        <Select
                                            name='price_unit' 
                                            value={body.price_unit} 
                                            onChange={value => {
                                                onChangeConditionComponent('price_unit', value);
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
                            <Button className='white-button'>삭제</Button>
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
                            <label className='main-header-title'>할인/비용 수정</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/car/discount">
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
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="할인종류" key="1">
                            <Space direction='vertical' size={40}>
                                <Space direction='vertical' size={20}>
                                    <Row align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>정보 01</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>브랜드</label>
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
                                        </Row>
                                    </Space>
                                </Space>
                                <Space direction='vertical' size={20}>
                                    <Row align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>종류 01</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>상품 01</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={14}>
                                                    <Space size={6}>
                                                        <Input 
                                                            name='kind_name' 
                                                            value={bodyInfo.kind_name} 
                                                            onChange={e => {
                                                                onChangeComponent(e.target.name, e.target.value);
                                                            }} 
                                                            placeholder="할인 종류 이름"
                                                            maxLength={18} style={{ width: 300 }} 
                                                        />
                                                        <Input 
                                                            name='kind_detail' 
                                                            value={bodyInfo.kind_detail} 
                                                            onChange={e => {
                                                                onChangeComponent(e.target.name, e.target.value);
                                                            }} 
                                                            placeholder="세부 내용 입력"
                                                            maxLength={50} style={{ width: 900 }} 
                                                        />
                                                    </Space>
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>기간 01</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={6}>
                                                <DatePicker 
                                                    name='s_date' 
                                                    value={moment(bodyInfo.s_date)} 
                                                    onChange={value => {
                                                        onChangeComponent('s_date', value.toString());
                                                    }}
                                                    placeholder='시작일' 
                                                />
                                                <label>~</label>
                                                <DatePicker 
                                                    name='e_date' 
                                                    value={moment(bodyInfo.e_date)} 
                                                    onChange={value => {
                                                        onChangeComponent('e_date', value.toString());
                                                    }}
                                                    placeholder='종료일' 
                                                />
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Space>
                                </Space>
                                <Row justify="center" gutter={[17, 0]}>
                                    <Col>
                                        <Button className='white-button rounded-button' icon={<PlusOutlined />} onClick={() => onDeleteClick(bodyInfo.idx)}>삭제하기</Button>
                                    </Col>
                                </Row>
                            </Space>
                        </TabPane>
                        <TabPane tab="할인조건" key="2">
                            <Space direction='vertical' size={40}>
                                <Space direction='vertical' size={20}>
                                    <Row align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>정보 01</label>
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
                                                        suffixIcon={<CaretDownOutlined />}
                                                        placeholder="브랜드 선택"
                                                        style={{ width: 300 }}
                                                    >
                                                        <Option value="jack">Jack</Option>
                                                        <Option value="lucy">Lucy</Option>
                                                        <Option value="Yiminghe">yiminghe</Option>
                                                    </Select>
                                                    <Select
                                                        suffixIcon={<CaretDownOutlined />}
                                                        placeholder="할인종류 선택"
                                                        style={{ width: 300 }}
                                                    >
                                                        <Option value="jack">Jack</Option>
                                                        <Option value="lucy">Lucy</Option>
                                                        <Option value="Yiminghe">yiminghe</Option>
                                                    </Select>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Space>
                                </Space>
                                <Space direction='vertical' size={20}>
                                    <Row align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>조건 01</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        {renderConditionBodyList()}
                                    </Space>
                                </Space>
                            </Space>
                        </TabPane>
                    </Tabs>
                </Space>
            </Space>
            <AlertModal visible={showModal} onConfirmClick={() => setShowModal(false)} validationList={validationList} />
            <AlertDeleteModal visible={showDeleteModal} onConfirmClick={() => deleteInfo()} onCancelClick={() => setShowDeleteModal(false)} />
        </>
    );
}

export default Edit;