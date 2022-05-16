import { Col, Divider, Row, Space, Select, Button, Input, InputNumber, Image, Upload } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { CheckBrandNameAPI, GetBrandInfoAPI, UpdateBrandAPI, DeleteBrandInfoAPI } from '../../../api/Brand';
import preview_default_image from '../../../assets/images/preview-default-image.png';
import { Constants } from '../../../constants/Constants';
import AlertModal from '../../../components/AlertModal';
import AlertDeleteModal from '../../../components/AlertDeleteModal';

const { Option } = Select;

// 수정페지
function Edit() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [validationList, setValidationList] = useState([]);
    const [bodyInfo, setBodyInfo] = useState(
        {
            idx: id,
            brand_name: '',
            sequence: 1,
            nation: null,
            is_income: null,
            is_use: '0',
            public_uri: '',
            room_uri: '',
            service_uri: '',
            deposit_uri: '',
            logo: {},
            preview: preview_default_image,
            check_name: ''
        }
    );

    const initComponent = async () => {
		const initBodyInfo = await GetBrandInfoAPI(id);
		setBodyInfo({
            ...initBodyInfo,
            preview: window.location.origin + '/uploads/brand/' + initBodyInfo.logo
        });
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

    const previewChange = async (file) => {

        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setBodyInfo(
            { 
                ...bodyInfo,
                ['preview']: file.preview
            }
        );
    };

    const onChangeComponent = (name, value) => {
        setBodyInfo(
            { 
                ...bodyInfo,
                [name]: value
            }
        );
    }

    const onSaveClick = async(url) => {
        const validation = [];
        if(bodyInfo.brand_name === '') {
            validation.push({
                title: '정보 ',
                name: '브랜드'
            })
        }
        if(bodyInfo.sequence === null) {
            validation.push({
                title: '정보 ',
                name: '순서'
            })
        }
        if(bodyInfo.nation === null) {
            validation.push({
                title: '정보 ',
                name: '국가'
            })
        }
        if(bodyInfo.is_income === null) {
            validation.push({
                title: '정보 ',
                name: '수입여부'
            })
        }
        if(bodyInfo.public_uri === '') {
            validation.push({
                title: '정보 ',
                name: '공식사이트'
            })
        }
        if(bodyInfo.room_uri === '') {
            validation.push({
                title: '정보 ',
                name: '전시장 안내'
            })
        }
        if(bodyInfo.service_uri === '') {
            validation.push({
                title: '정보 ',
                name: '서비스 센터'
            })
        }
        if(bodyInfo.deposit_uri === '') {
            validation.push({
                title: '정보 ',
                name: '보증금 안내'
            })
        }
        if(bodyInfo.preview === preview_default_image) {
            validation.push({
                title: '정보 ',
                name: '로고'
            })
        }

        setValidationList(validation);

        if(validation.length > 0) {
            setShowModal(true);
        } else {
            await UpdateBrandAPI(bodyInfo);
            navigate(url);
        }
    };

    const onDeleteClick = async() => {
        setShowDeleteModal(true);
    };

    const deleteInfo = async() => {
        await DeleteBrandInfoAPI(id);
        navigate('/car/brand');
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
                                    <Button className='white-button' size='large'>취소</Button>
                                </Link>
                                <Button className='black-button' size='large' onClick={() => onSaveClick('/car/brand')}>저장하고 나가기</Button>
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
                                            <div style={{position: 'relative'}}>
                                                <Input 
                                                    name='brand_name' 
                                                    value={bodyInfo.brand_name} 
                                                    onChange={e => {
                                                        onChangeComponent(e.target.name, e.target.value);
                                                    }} 
                                                    size='large'
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
                                            <Button className='black-button' onClick={() => checkName(bodyInfo.brand_name)} size='large'>확인</Button>
                                        </Space>
                                    </Col>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>순서</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space>
                                            <InputNumber
                                                name='sequence' 
                                                value={bodyInfo.sequence} 
                                                onChange={number => {
                                                    onChangeComponent('sequence', number);
                                                }} 
                                                size='large'
                                                maxLength={6} 
                                                style={{ width: 150 }} 
                                                controls={false}
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
                                            size='large'
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
                                            size='large'
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
                                            size='large'
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
                                            size='large'
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
                                            size='large'
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
                                            size='large'
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
                                            <Image  src={bodyInfo.preview} width={150} height={150} />
                                            <Space direction='vertical' size={34}>
                                                <label className='logo-description-label'>
                                                    이미지 권장 크기는 90 * 60이며, *.png로 등록하셔야 합니다. <br/>
                                                    이미지를 새로 등록 하기 위해선 등록된 이미지 [삭제]후 재 등록 하시면 됩니다.
                                                </label>
                                                <Upload 
                                                    accept='.png'
                                                    // action='http://127.0.0.1:4200/file/brand'
                                                    fileList={[bodyInfo.logo]}
                                                    name='logo' 
                                                    showUploadList={false}
                                                    onChange={info => {
                                                        previewChange(info.file);
                                                    }}
                                                    beforeUpload={file => {
                                                        onChangeComponent('logo', file);
                                                
                                                        // Prevent upload
                                                        return true;
                                                    }}
                                                >
                                                    <Button className='black-button' size='large'>등록</Button>
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
                            <Button className='white-button rounded-button' onClick={() => onDeleteClick()} size='large'>삭제하기</Button>
                        </Col>
                    </Row>
                </Space>
            </Space>
            <AlertModal visible={showModal} onConfirmClick={() => setShowModal(false)} validationList={validationList} />
            <AlertDeleteModal visible={showDeleteModal} onConfirmClick={() => deleteInfo()} onCancelClick={() => setShowDeleteModal(false)} />
        </>
    );
}

export default Edit;