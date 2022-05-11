import { Col, Divider, Row, Space, Select, Button, Input, Image, Upload, InputNumber } from 'antd';
import { CaretDownOutlined, PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { CheckBrandNameAPI, CreateBrandAPI } from '../../../api/Brand';
import preview_default_image from '../../../assets/images/preview-default-image.png';
import styles from '../../../assets/styles/pages/car/brand/Create.module.css';
import { Constants } from '../../../constants/Constants';
import AlertModal from '../../../components/AlertModal';

const { Option } = Select;

// 등록페지
function Create() {
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [validationList, setValidationList] = useState([]);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [bodyList, setBodyList] = useState([
        {
            number: 1,
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
    ]);

    async function checkName(number, name) {
        const result = await CheckBrandNameAPI(name);
        onChangeComponent(number, 'check_name', result ? 'exist' : 'not-exist');
    }

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const previewChange = async (number, file) => {

        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setBodyList(
            [
                ...bodyList.filter((body) => body.number !== number), 
                { 
                    ...bodyList.filter((body) => body.number === number)[0],
                    ['preview']: file.preview
                }
            ]
        );
    };

    const onAddComponentClick = event => {
        if(bodyList.length < 10){
            setShowDeleteButton(true);
            setBodyList([...bodyList, {
                number: bodyList[bodyList.length - 1].number + 1,
                brand_name: '',
                sequence: bodyList[bodyList.length - 1].number + 1,
                nation: null,
                is_income: null,
                is_use: 0,
                public_uri: '',
                room_uri: '',
                service_uri: '',
                deposit_uri: '',
                logo: {},
                preview: preview_default_image,
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
            if(body.brand_name === '') {
                validation.push({
                    title: '정보 ' + ((index + 1) < 10 ? '0' + (index + 1) : (index + 1)),
                    name: '브랜드'
                })
            }
            if(body.sequence === null) {
                validation.push({
                    title: '정보 ' + ((index + 1) < 10 ? '0' + (index + 1) : (index + 1)),
                    name: '순서'
                })
            }
            if(body.nation === null) {
                validation.push({
                    title: '정보 ' + ((index + 1) < 10 ? '0' + (index + 1) : (index + 1)),
                    name: '국가'
                })
            }
            if(body.is_income === null) {
                validation.push({
                    title: '정보 ' + ((index + 1) < 10 ? '0' + (index + 1) : (index + 1)),
                    name: '수입여부'
                })
            }
            if(body.public_uri === '') {
                validation.push({
                    title: '정보 ' + ((index + 1) < 10 ? '0' + (index + 1) : (index + 1)),
                    name: '공식사이트'
                })
            }
            if(body.room_uri === '') {
                validation.push({
                    title: '정보 ' + ((index + 1) < 10 ? '0' + (index + 1) : (index + 1)),
                    name: '전시장 안내'
                })
            }
            if(body.service_uri === '') {
                validation.push({
                    title: '정보 ' + ((index + 1) < 10 ? '0' + (index + 1) : (index + 1)),
                    name: '서비스 센터'
                })
            }
            if(body.deposit_uri === '') {
                validation.push({
                    title: '정보 ' + ((index + 1) < 10 ? '0' + (index + 1) : (index + 1)),
                    name: '보증금 안내'
                })
            }
            if(body.preview === preview_default_image) {
                validation.push({
                    title: '정보 ' + ((index + 1) < 10 ? '0' + (index + 1) : (index + 1)),
                    name: '로고'
                })
            }
        });

        setValidationList(validation);

        if(validation.length > 0) {
            setShowModal(true);
        } else {
            await CreateBrandAPI(bodyList);
            navigate(url);
        }
    };

    const renderBodyList = () => {
        return (
            bodyList.map((body, index) => {
                return (
                    <Space direction='vertical' size={20} key={index}>
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
                                <Col span={10} className='table-value-col-section'>
                                    <Space>
                                        <div className=''>
                                            <Input 
                                                name='brand_name' 
                                                value={body.brand_name} 
                                                onChange={e => {
                                                    onChangeComponent(body.number, e.target.name, e.target.value);
                                                }} 
                                                placeholder="브랜드 입력" maxLength={15} style={{ width: 400 }} 
                                            />
                                            {
                                                body.check_name == 'exist'
                                                ? <label className='danger-alert'>이미 사용중인 이름 입니다.</label>
                                                : body.check_name == 'not-exist'
                                                ? <label className='successful-alert'>사용 가능한 이름 입니다.</label>
                                                : ''
                                            }
                                        </div>
                                        <Button className='black-button' onClick={() => checkName(body.number, body.brand_name)}>확인</Button>
                                    </Space>
                                </Col>
                                <Col span={2} className='table-header-col-section'>
                                    <label>순서</label>
                                </Col>
                                <Col flex="auto" className='table-value-col-section'>
                                    <Space>
                                        <InputNumber name='sequence' 
                                            value={body.sequence} 
                                            onChange={number => {
                                                onChangeComponent(body.number, 'sequence', number);
                                            }}
                                            maxLength={6} 
                                            style={{ width: 150 }} 
                                            controls={false}
                                        />
                                        <label className={styles.orderDescriptionLabel}>숫자가 낮을수록 먼저 노출이 됩니다.</label>
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
                                        value={body.nation} 
                                        onChange={value => {
                                            onChangeComponent(body.number, 'nation', value);
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
                                        value={body.is_income} 
                                        onChange={value => {
                                            onChangeComponent(body.number, 'is_income', value);
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
                                        value={body.is_use} 
                                        onChange={value => {
                                            onChangeComponent(body.number, 'is_use', value);
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
                                    <Input name='public_uri' 
                                        value={body.public_uri} 
                                        onChange={e => {
                                            onChangeComponent(body.number, e.target.name, e.target.value);
                                        }}
                                        placeholder="URL 입력" style={{ width: 400 }} 
                                    />
                                </Col>
                                <Col span={2} className='table-header-col-section'>
                                    <label>전시장 안내</label>
                                </Col>
                                <Col flex="auto" className='table-value-col-section'>
                                    <Input name='room_uri' 
                                        value={body.room_uri} 
                                        onChange={e => {
                                            onChangeComponent(body.number, e.target.name, e.target.value);
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
                                    <Input name='service_uri' 
                                        value={body.service_uri} 
                                        onChange={e => {
                                            onChangeComponent(body.number, e.target.name, e.target.value);
                                        }}
                                        placeholder="URL 입력" style={{ width: 400 }} 
                                    />
                                </Col>
                                <Col span={2} className='table-header-col-section'>
                                    <label>보증금 안내</label>
                                </Col>
                                <Col flex="auto" className='table-value-col-section'>
                                    <Input name='deposit_uri' 
                                        value={body.deposit_uri} 
                                        onChange={e => {
                                            onChangeComponent(body.number, e.target.name, e.target.value);
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
                                        <Image src={body.preview} width={150} height={150} />
                                        <Space direction='vertical' size={34}>
                                            <label className={styles.logoDescriptionLabel}>
                                                이미지 권장 크기는 90 * 60이며, *.png로 등록하셔야 합니다. <br/>
                                                이미지를 새로 등록 하기 위해선 등록된 이미지 [삭제]후 재 등록 하시면 됩니다.
                                            </label>
                                            <Upload 
                                                accept='.png'
                                                // action='http://127.0.0.1:4200/file/brand'
                                                fileList={[body.logo]}
                                                name='logo' 
                                                showUploadList={false}
                                                onChange={info => {
                                                    previewChange(body.number, info.file);
                                                }}
                                                beforeUpload={file => {
                                                    onChangeComponent(body.number, 'logo', file);
                                            
                                                    // Prevent upload
                                                    return true;
                                                }}
                                            >
                                                <Button className='black-button'>등록</Button>
                                            </Upload>
                                        </Space>
                                    </Space>
                                    
                                </Col>
                            </Row>
                        </Space>
                    </Space>
                );
            })
        );
    };
    
    return(
        <>
            <Space direction='vertical' size={18} className='main-layout'>
                {/* Page Header */}
                <Space direction='vertical' size={18}>
                    <Row justify='middle'>
                        <Col>
                            <label className='main-header-title'>브랜드 등록</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/car/brand">
                                    <Button className='white-button medium-button'>취소</Button>
                                </Link>
                                <Button className='white-button medium-button' onClick={() => onSaveClick('/car/brand')}>저장하고 나가기</Button>
                                
                                <Button className='black-button medium-button' onClick={() => onSaveClick('/car/group')}>저장하고 모델그룹 등록하기</Button>
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
                            <Button className='white-button rounded-button' icon={<PlusOutlined />} onClick={onAddComponentClick}>브랜드 추가하기</Button>
                        </Col>
                    </Row>
                </Space>
            </Space>
            <AlertModal visible={showModal} onConfirmClick={() => setShowModal(false)} validationList={validationList} />
        </>
    );
}

export default Create;