import { Col, Divider, Row, Space, Select, Button, Image, Upload } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetModelInfoAPI, GetModelOptionListAPI } from '../../../api/Model';
import preview_default_image from '../../../assets/images/preview-default-image.png';
import { GetModelGalleryListAPI } from '../../../api/ModelGallery';
import { GetBrandOptionListAPI } from '../../../api/Brand';
import { GetGroupOptionListAPI } from '../../../api/Group';

const { Option } = Select;

// 수정페지
function Edit() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [brandOptionList, setBrandOptionList] = useState([]);
	const [groupOptionList, setGroupOptionList] = useState([]);
    const [modelOptionList, setModelOptionList] = useState([]);
    const [modelBodyInfo, setModelBodyInfo] = useState({
        idx: id,
        brand_id: null,
        group_id: null
    });
    const [bodyList, setBodyList] = useState([]);

    const initComponent = async () => {
        const initBrandOptionList = await GetBrandOptionListAPI(id);
        const initGroupOptionList = await GetGroupOptionListAPI(id);
        const initModelOptionList = await GetModelOptionListAPI(id);
		const initModelBodyInfo = await GetModelInfoAPI(id);
        const initBodyList = await GetModelGalleryListAPI(0, {
            model_id: id
        });

        setBrandOptionList(initBrandOptionList);
        setGroupOptionList(initGroupOptionList);
        setModelOptionList(initModelOptionList);
		setBodyList(initBodyList);
        setModelBodyInfo(initModelBodyInfo);
	}

	useEffect(() => {
		initComponent();
	}, []);

    const onChangeComponent = (name, value) => {
        // setBodyInfo(
        //     { 
        //         ...bodyInfo,
        //         [name]: value
        //     }
        // );
    }

    const onSaveClick = async() => {
        // const created_info = await CreateModelAPI(bodyInfo);
        
        
        navigate('/content/gallery');
    };

    const onCloseModalClick = () => {
        setShowModal(false);
    };

    const renderPictureList = () => {
        return (
            bodyList.map((body, index) => (
                <Col style={{ textAlign: 'center' }}>
                    <Space direction='vertical' size={5}>
                        <label>사진 { (index + 1) !== 10 ? '0' + (index + 1) : (index + 1) }</label>
                        <Image src={ window.location.origin + '/uploads/brand/' + body.picture } width={150} height={150} />
                        <Upload>
                            <Button className='black-button'>등록</Button>
                        </Upload>
                    </Space>
                </Col>
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
                            <label className='main-header-title'>포토갤러리 수정</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/car/brand">
                                    <Button className='white-button medium-button'>취소</Button>
                                </Link>
                                <Button className='black-button medium-button'>저장하고 나가기</Button>
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
                                        <label>차량검색</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space size={6}>
                                            <Select
                                                name='brand_id' 
                                                value={modelBodyInfo.brand_id} 
                                                onChange={value => {
                                                    onChangeComponent('brand_id', value);
                                                }}
                                                suffixIcon={<CaretDownOutlined />}
                                                placeholder="브랜드 선택"
                                                style={{ width: 250 }}
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
                                                value={modelBodyInfo.group_id} 
                                                onChange={value => {
                                                    onChangeComponent('group_id', value);
                                                }}
                                                suffixIcon={<CaretDownOutlined />}
                                                placeholder="모델그룹 선택"
                                                style={{ width: 250 }}
                                            >
                                                {
                                                    groupOptionList.map((optionItem, optionIndex) => (
                                                        <Select.Option key={optionIndex} value={optionItem.value}>
                                                            {optionItem.label}
                                                        </Select.Option>
                                                    ))
                                                }
                                            </Select>
                                            <Select
                                                name='model_id' 
                                                value={modelBodyInfo.idx} 
                                                onChange={value => {
                                                    onChangeComponent('model_id', value);
                                                }}
                                                suffixIcon={<CaretDownOutlined />}
                                                placeholder="모델 선택"
                                                style={{ width: 250 }}
                                            >
                                                {
                                                    modelOptionList.map((optionItem, optionIndex) => (
                                                        <Select.Option key={optionIndex} value={optionItem.value}>
                                                            {optionItem.label}
                                                        </Select.Option>
                                                    ))
                                                }
                                            </Select>
                                        </Space>
                                    </Col>
                                </Row>
                                <Row gutter={[0]} align="middle" style={{ height:275 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>사진</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Row gutter={[10]}>
                                            {renderPictureList()}
                                        </Row>
                                    </Col>
                                </Row>
                            </Space>
                        </Space>
                    </Space>
                </Space>
            </Space>
        </>
    );
}

export default Edit;