import { Col, Divider, Row, Space, Select, Button, Input, Image, Upload, Modal, Tabs, DatePicker, Switch } from 'antd';
import { CaretDownOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Link, useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { GetBrandOptionListAPI } from '../../../api/Brand';
import { GetDiscountKindInfoAPI, UpdateDiscountKindAPI, DeleteDiscountKindInfoAPI } from '../../../api/DiscountKind';
import alert_icon from '../../../assets/images/alert-icon.png';
import { Constants } from '../../../constants/Constants';

const { Option } = Select;
const { TabPane } = Tabs;

function Create() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [brandOptionList, setBrandOptionList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [kindBodyInfo, setKindBodyInfo] = useState(
        {
            idx: 1,
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
		const initKindBodyInfo = await GetDiscountKindInfoAPI(id);

        setBrandOptionList(initBrandOptionList);
		setKindBodyInfo(initKindBodyInfo);
	}

	useEffect(() => {
		initComponent();
	}, []);

    const onChangeKindComponent = (name, value) => {
        setKindBodyInfo(
            { 
                ...kindBodyInfo,
                [name]: value
            }
        );
    }

    const onChangeConditionComponent = (number, name, value) => {
        // setConditionBodyList(
        //     { 
        //         ...kindBodyInfo,
        //         [name]: value
        //     }
        // );
    }

    const onSaveClick = async() => {
        await UpdateDiscountKindAPI(kindBodyInfo);
        // setShowModal(true);
        navigate('/car/discount');
    };

    const onDeleteClick = async(idx) => {
        await DeleteDiscountKindInfoAPI(idx);
        navigate('/car/discount');
    }

    const onCloseModalClick = () => {
        setShowModal(false);
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
                                                    value={kindBodyInfo.brand_id} 
                                                    onChange={value => {
                                                        onChangeKindComponent('brand_id', value);
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
                                                            value={kindBodyInfo.kind_name} 
                                                            onChange={e => {
                                                                onChangeKindComponent(e.target.name, e.target.value);
                                                            }} 
                                                            placeholder="할인 종류 이름" style={{ width: 300 }} 
                                                        />
                                                        <Input 
                                                            name='kind_detail' 
                                                            value={kindBodyInfo.kind_detail} 
                                                            onChange={e => {
                                                                onChangeKindComponent(e.target.name, e.target.value);
                                                            }} 
                                                            placeholder="세부 내용 입력" style={{ width: 900 }} 
                                                        />
                                                    </Space>
                                                    <Button className='white-button'>삭제</Button>
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
                                                    value={moment(kindBodyInfo.s_date)} 
                                                    onChange={value => {
                                                        onChangeKindComponent('s_date', value.toString());
                                                    }}
                                                    placeholder='시작일' 
                                                />
                                                <label>~</label>
                                                <DatePicker 
                                                    name='e_date' 
                                                    value={moment(kindBodyInfo.e_date)} 
                                                    onChange={value => {
                                                        onChangeKindComponent('e_date', value.toString());
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
                                        <Button className='white-button rounded-button' icon={<PlusOutlined />} onClick={() => onDeleteClick(kindBodyInfo.idx)}>삭제하기</Button>
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