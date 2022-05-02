import { Col, Divider, Row, Space, Select, Button, Input, Image, Upload, Modal } from 'antd';
import { CaretDownOutlined, PlusOutlined } from '@ant-design/icons'
import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { CheckBrandNameAPI, GetBrandInfoAPI, UpdateBrandAPI, DeleteBrandInfoAPI } from '../../../api/Brand';
import preview_default_image from '../../../assets/images/preview-default-image.png';
import alert_icon from '../../../assets/images/alert-icon.png';
import { Constants } from '../../../constants/Constants';

const { Option } = Select;

function Edit() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [previewImage, setPreviewImage] = useState(preview_default_image);
    const [bodyInfo, setBodyInfo] = useState(
        {
            idx: id,
            brand_name: '',
            sequence: 1,
            nation: null,
            is_income: null,
            is_use: null,
            public_uri: '',
            room_uri: '',
            service_uri: '',
            deposit_uri: '',
            preview: null,
            check_name: ''
        }
    );

    const initComponent = async () => {
		const initBodyInfo = await GetBrandInfoAPI(id);
		setBodyInfo(initBodyInfo);
	}

	useEffect(() => {
		initComponent();
	}, []);

    async function checkName(name) {
        const result = await CheckBrandNameAPI(name);
        onChangeComponent('check_name', result ? 'exist' : 'not-exist');
    }

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const handleChange = async info => {
        const file = info.file;
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.preview);
    };

    const onChangeComponent = (name, value) => {
        setBodyInfo(
            { 
                ...bodyInfo,
                [name]: value
            }
        );
    }

    const onSaveClick = event => {
        UpdateBrandAPI(bodyInfo);
        // setShowModal(true);
        navigate('/car/brand');
    };

    const onDeleteClick = (idx) => {
        DeleteBrandInfoAPI(idx);
        navigate('/car/brand');
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
                            <label className='main-header-title'>브랜드 수정</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/car/brand">
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
                                        <label>브랜드</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                        <Space>
                                            <div className=''>
                                                <Input 
                                                    name='brand_name' 
                                                    value={bodyInfo.brand_name} 
                                                    onChange={e => {
                                                        onChangeComponent(e.target.name, e.target.value);
                                                    }} 
                                                    placeholder="브랜드 입력" maxLength={15} style={{ width: 400 }} 
                                                />
                                                {
                                                    bodyInfo.check_name == 'exist'
                                                    ? <label className='danger-alert'>이미 사용중인 이름 입니다.</label>
                                                    : bodyInfo.check_name == 'not-exist'
                                                    ? <label className='successful-alert'>사용 가능한 이름 입니다.</label>
                                                    : ''
                                                }
                                            </div>
                                            <Button className='black-button' onClick={() => checkName(bodyInfo.brand_name)}>확인</Button>
                                        </Space>
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>순서</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space>
                                            <Input
                                                name='sequence' 
                                                value={bodyInfo.sequence} 
                                                onChange={e => {
                                                    onChangeComponent(e.target.name, e.target.value);
                                                }} 
                                                maxLength={6} style={{ width: 150 }} 
                                            />
                                            <label className='order-description-label'>숫자가 낮을수록 먼저 노출이 됩니다.</label>
                                        </Space>
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>국가</label>
                                    </Col>
                                    <Col span={4} className='table-value-col-section'>
                                        <Select
                                            name='nation' 
                                            value={bodyInfo.nation} 
                                            onChange={value => {
                                                onChangeComponent('nation', value);
                                            }}
                                            suffixIcon={<CaretDownOutlined />}
                                            placeholder="선택"
                                            style={{ width: 150 }}
                                        >
                                            {
                                                Constants.nationOptions.map((optionItem, optionIndex) => (
                                                    <Select.Option key={optionIndex} value={optionItem.value}>
                                                        {optionItem.label}
                                                    </Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>수입여부</label>
                                    </Col>
                                    <Col span={4} className='table-value-col-section'>
                                        <Select
                                            name='is_income' 
                                            value={bodyInfo.is_income} 
                                            onChange={value => {
                                                onChangeComponent('is_income', value);
                                            }}
                                            suffixIcon={<CaretDownOutlined />}
                                            placeholder="선택"
                                            style={{ width: 150 }}
                                        >
                                            {
                                                Constants.incomeOptions.map((optionItem, optionIndex) => (
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
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>공식사이트</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                        <Input 
                                            name='public_uri' 
                                            value={bodyInfo.public_uri} 
                                            onChange={e => {
                                                onChangeComponent(e.target.name, e.target.value);
                                            }} 
                                            placeholder="URL 입력" style={{ width: 400 }} 
                                        />
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>전시장 안내</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Input 
                                            name='room_uri' 
                                            value={bodyInfo.room_uri} 
                                            onChange={e => {
                                                onChangeComponent(e.target.name, e.target.value);
                                            }} 
                                            placeholder="URL 입력" style={{ width: 400 }} 
                                        />
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>서비스 센터</label>
                                    </Col>
                                    <Col span={10} className='table-value-col-section'>
                                        <Input 
                                            name='service_uri' 
                                            value={bodyInfo.service_uri} 
                                            onChange={e => {
                                                onChangeComponent(e.target.name, e.target.value);
                                            }} 
                                            placeholder="URL 입력" style={{ width: 400 }} 
                                        />
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>보증금 안내</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Input 
                                            name='deposit_uri' 
                                            value={bodyInfo.deposit_uri} 
                                            onChange={e => {
                                                onChangeComponent(e.target.name, e.target.value);
                                            }} 
                                            placeholder="URL 입력" style={{ width: 400 }} 
                                        />
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:174 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>로고</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space direction='horizontal' align='end' size={20}>
                                            <Image src={ preview_default_image } width={150} height={150} />
                                            <Space direction='vertical' size={34}>
                                                <label className='logo-description-label'>
                                                    이미지 권장 크기는 90 * 60이며, *.png로 등록하셔야 합니다. <br/>
                                                    이미지를 새로 등록 하기 위해선 등록된 이미지 [삭제]후 재 등록 하시면 됩니다.
                                                </label>
                                                <Upload>
                                                    <Button className='black-button'>등록</Button>
                                                </Upload>
                                            </Space>
                                        </Space>
                                        
                                    </Col>
                                </Row>
                            </Space>
                        </Space>
                    </Space>
                    
                    <Row justify="center" gutter={[17, 0]}>
                        <Col>
                            <Button className='white-button rounded-button' icon={<PlusOutlined />} onClick={() => onDeleteClick(bodyInfo.idx)}>삭제하기</Button>
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

export default Edit;