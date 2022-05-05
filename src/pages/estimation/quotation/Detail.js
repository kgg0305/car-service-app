import { Col, Divider, Row, Space, Select, Button, Input, Modal, DatePicker } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { DeleteQuotationInfoAPI, GetQuotationInfoAPI, UpdateQuotationAPI } from '../../../api/Quotation';
import alert_icon from '../../../assets/images/alert-icon.png';
import { Constants } from '../../../constants/Constants';

const { Option } = Select;

function Create() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [bodyInfo, setBodyInfo] = useState(
        {
            idx: id,
            purchase_path: '',
            purchase_method: null,
            purchase_method_text: '',
            reg_date: null,
            reg_date_text1: '',
            reg_date_text2: '',
            client_name: '',
            client_phone: '',
            brand_id: null,
            brand_name: '',
            model_name: '',
            lineup_name: '',
            car_kind_id: null,
            trim_id: '',
            trim_name: '',
            is_business: null,
            is_contract: null,
            contract_date: null,
            is_release: null,
            release_date: null,
            is_close: null,
            note: ''
        }
    );

    const initComponent = async () => {
		const initBodyInfo = await GetQuotationInfoAPI(id);

        let year = new Date(initBodyInfo.reg_date).getFullYear();
        let month = ("0" + (new Date(initBodyInfo.reg_date).getMonth() + 1)).slice(-2);
        let day = ("0" + new Date(initBodyInfo.reg_date).getDate()).slice(-2);
        let hour = new Date(initBodyInfo.reg_date).getHours();
        let minute = new Date(initBodyInfo.reg_date).getMinutes();
        let seconds = new Date(initBodyInfo.reg_date).getSeconds();

        const reg_date_text1 = year + '-' + month + '-' + day;
        const reg_date_text2 = hour + ':' + minute + ':' + seconds;

		setBodyInfo({
            ...initBodyInfo,
            purchase_method_text: Constants.purchaseMethodOptions.filter(option => option.value == initBodyInfo.purchase_method)[0].label,
            reg_date_text1: reg_date_text1,
            reg_date_text2: reg_date_text2,
        });
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

    const onSaveClick = async() => {
        await UpdateQuotationAPI(bodyInfo);
        // setShowModal(true);
        navigate('/estimation/quotation');
    };

    const onDeleteClick = async(idx) => {
        await DeleteQuotationInfoAPI(idx);
        navigate('/estimation/quotation');
    }

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
                            <label className='main-header-title'>견적신청 상세보기</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/estimation/quotation">
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
                                        <label>구입방법</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                        <Input 
                                            name='purchase_method_text' 
                                            value={bodyInfo.purchase_method_text} 
                                            size='large' 
                                            style={{width: 150}} disabled 
                                        />
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>등록일</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space size={6}>
                                            <Input 
                                                name='reg_date_text1' 
                                                value={bodyInfo.reg_date_text1} 
                                                size='large' 
                                                style={{width: 150}} disabled 
                                            />
                                            <Input size='large' 
                                                name='reg_date_text2' 
                                                value={bodyInfo.reg_date_text2} 
                                                style={{width: 150}} 
                                                disabled 
                                            />
                                        </Space>
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>이름</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                        <Input 
                                            name='client_name' 
                                            value={bodyInfo.client_name} 
                                            size='large' 
                                            style={{width: 150}} disabled
                                        />
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>연락처</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space size={6}>
                                            <Input 
                                                name='client_phone' 
                                                value={bodyInfo.client_phone} 
                                                size='large' 
                                                style={{width: 150}} disabled 
                                            />
                                        </Space>
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>차량정보</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space size={6}>
                                            <Input 
                                                name='brand_name' 
                                                value={bodyInfo.brand_name} 
                                                size='large' 
                                                style={{width: 150}} disabled 
                                            />
                                            <Input 
                                                name='model_name' 
                                                value={bodyInfo.model_name} 
                                                size='large' 
                                                style={{width: 180}} disabled 
                                            />
                                            <Input 
                                                name='lineup_name' 
                                                value={bodyInfo.lineup_name} 
                                                size='large' 
                                                style={{width: 124}} disabled 
                                            />
                                            <Input 
                                                name='trim_name' 
                                                value={bodyInfo.trim_name} 
                                                size='large' 
                                                style={{width: 250}} disabled 
                                            />
                                        </Space>
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>상담여부</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                        <Select
                                            name='is_business'
                                            value={bodyInfo.is_business}
                                            onChange={value => {
                                                onChangeComponent('is_business', value);
                                            }}
                                            size='large'
                                            suffixIcon={<CaretDownOutlined />}
                                            placeholder="선택"
                                            style={{ width: 150 }}
                                        >
                                            {
                                                Constants.statusOptions.map((optionItem, optionIndex) => (
                                                    <Select.Option key={optionIndex} value={optionItem.value}>
                                                        {optionItem.label}
                                                    </Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>계약여부</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space size={6}>
                                            <Select
                                                name='is_contract'
                                                value={bodyInfo.is_contract}
                                                onChange={value => {
                                                    onChangeComponent('is_contract', value);
                                                }}
                                                size='large'
                                                suffixIcon={<CaretDownOutlined />}
                                                placeholder="선택"
                                                style={{ width: 150 }}
                                            >
                                                {
                                                    Constants.statusOptions.map((optionItem, optionIndex) => (
                                                        <Select.Option key={optionIndex} value={optionItem.value}>
                                                            {optionItem.label}
                                                        </Select.Option>
                                                    ))
                                                }
                                            </Select>
                                            <DatePicker
                                                name='contract_date' 
                                                value={moment(bodyInfo.contract_date)} 
                                                onChange={value => {
                                                    onChangeComponent('contract_date', value.toString());
                                                }} 
                                                size='large' 
                                            />
                                        </Space>
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>출고여부</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                        <Space size={6}>
                                            <Select
                                                name='is_release'
                                                value={bodyInfo.is_release}
                                                onChange={value => {
                                                    onChangeComponent('is_release', value);
                                                }}
                                                size='large'
                                                suffixIcon={<CaretDownOutlined />}
                                                placeholder="선택"
                                                style={{ width: 150 }}
                                            >
                                                {
                                                    Constants.statusOptions.map((optionItem, optionIndex) => (
                                                        <Select.Option key={optionIndex} value={optionItem.value}>
                                                            {optionItem.label}
                                                        </Select.Option>
                                                    ))
                                                }
                                            </Select>
                                            <DatePicker 
                                                name='release_date' 
                                                value={moment(bodyInfo.release_date)} 
                                                onChange={value => {
                                                    onChangeComponent('release_date', value.toString());
                                                }} 
                                                size='large' 
                                            />
                                        </Space>
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>종료여부</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space size={6}>
                                            <Select
                                                name='is_close'
                                                value={bodyInfo.is_close}
                                                onChange={value => {
                                                    onChangeComponent('is_close', value);
                                                }}
                                                size='large'
                                                suffixIcon={<CaretDownOutlined />}
                                                placeholder="선택"
                                                style={{ width: 150 }}
                                            >
                                                {
                                                    Constants.statusOptions.map((optionItem, optionIndex) => (
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
                                        <label>비고</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space size={6}>
                                            <Input 
                                                name='note' 
                                                value={bodyInfo.note} 
                                                onChange={e => {
                                                    onChangeComponent(e.target.name, e.target.value);
                                                }} 
                                                size='large' 
                                                style={{width: 600}} 
                                                placeholder={'내용을 입력해 주세요'} 
                                            />
                                        </Space>
                                    </Col>
                                </Row>
                            </Space>
                        </Space>
                    </Space>
                    
                    <Row justify="center" gutter={[17, 0]}>
                        <Col>
                            <Button className='white-button rounded-button' onClick={() => onDeleteClick(bodyInfo.idx)}>삭제하기</Button>
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