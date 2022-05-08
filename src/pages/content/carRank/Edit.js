import { Col, Divider, Row, Space, Select, Button, Input } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetRankInfoAPI, UpdateRankAPI } from '../../../api/Rank';
import { GetModelInfoAPI } from '../../../api/Model';
import { GetBrandOptionListAPI } from '../../../api/Brand';
import { GetGroupOptionListAPI } from '../../../api/Group';
import { GetModelOptionListAPI } from '../../../api/Model';

const { Option } = Select;

function Create() {
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [brandOptionList, setBrandOptionList] = useState([]);
    const [groupOptionList, setGroupOptionList] = useState([]);
    const [modelOptionList, setModelOptionList] = useState([]);
    const [rankBodyInfo, setRankBodyInfo] = useState({
        type: null,
        ids: '',
        created_date: null
    });
    const [modelBodyList, setModelBodyList] = useState([
        {
            number: 1,
            brand_id: null,
            group_id: null,
            idx: null
        }
    ]);

    const initComponent = async () => {
        const initBrandOptionList = await GetBrandOptionListAPI();
        const initGroupOptionList = await GetGroupOptionListAPI();
        const initModelOptionList = await GetModelOptionListAPI();
		const initRankBodyInfo = await GetRankInfoAPI(1);
		const initModelBodyList = [];

        for (let index = 0; index < initRankBodyInfo.ids.split(',').length; index++) {
            const id = initRankBodyInfo.ids.split(',')[index];
            initModelBodyList.push({
                ...(await GetModelInfoAPI(id)),
                number: index + 1
            });
        }

        setBrandOptionList(initBrandOptionList);
        setGroupOptionList(initGroupOptionList);
        setModelOptionList(initModelOptionList);
		setRankBodyInfo(initRankBodyInfo);
		setModelBodyList(initModelBodyList);
	};

    useEffect(() => {
		initComponent();
	}, []);

    const onSaveClick = async() => {
        const updateRankBodyInfo = {
            ...rankBodyInfo,
            ids: modelBodyList.map(body => body.idx).join(','),
            created_date: new Date()
        };
        const created_info = await UpdateRankAPI(updateRankBodyInfo);
        
        // setShowModal(true);
        navigate('/content/carRank');
    };

    const onAddModelComponentClick = event => {
        setModelBodyList([...modelBodyList, {
            number: modelBodyList[modelBodyList.length - 1].number + 1,
            brand_id: null,
            group_id: null,
            model_id: null
        }]);
    };

    const onChangeModelComponent = async(number, name, value) => {
        await setModelBodyList(modelBodyList.map(body => body.number === number ? {...body, [name]: value} : body));
    }

    const onDeleteModelComponentClick = (number) => {
        if(modelBodyList.length > 1){
            setModelBodyList(modelBodyList.filter((body) => body.number !== number));
        }
    };

    const renderModelBodyList = () => {
        return (
            modelBodyList.map((body, index) => (
                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                    <Col span={2} className='table-header-col-section'>
                        <label>순서 { body.number !== 10 ? '0' + body.number : body.number }</label>
                    </Col>
                    <Col flex="auto" className='table-value-col-section'>
                        <Space size={10}>
                            <Select
                                name='brand_id' 
                                value={body.brand_id} 
                                onChange={value => {
                                    onChangeModelComponent(body.number, 'brand_id', value);
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
                                value={body.group_id} 
                                onChange={value => {
                                    onChangeModelComponent(body.number, 'group_id', value);
                                }}
                                suffixIcon={<CaretDownOutlined />}
                                placeholder="모델그룹 선택"
                                style={{ width: 300 }}
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
                                name='idx' 
                                value={body.idx} 
                                onChange={value => {
                                    onChangeModelComponent(body.number, 'idx', value);
                                }}
                                suffixIcon={<CaretDownOutlined />}
                                placeholder="모델 선택"
                                style={{ width: 300 }}
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
                    <Col flex='auto' />
                    <Col className='table-value-col-section'>
                        <Space size={13}>
                            { 
                                modelBodyList.length == index + 1 
                                ? 
                                <>
                                    {
                                        modelBodyList.length != 1 
                                        ? <Button className='white-button' onClick={() => onDeleteModelComponentClick(body.number)}>삭제</Button> 
                                        : ''
                                    }
                                    <Button className='black-button' onClick={() => onAddModelComponentClick(body.number)}>추가</Button>
                                </>
                                : <Button className='white-button' onClick={() => onDeleteModelComponentClick(body.number)}>삭제</Button>
                            }
                        </Space>
                    </Col>
                </Row>
            ))
        );
    };

    return(
        <>
            <Space direction='vertical' size={18} className='main-layout'>
                {/* Page Header */}
                <Space direction='vertical' size={18}>
                    <Row justify='middle'>
                        <Col>
                            <label className='main-header-title'>자동차 인기순위 수정</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/content/carRank">
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
                    <Space direction='vertical' size={0} split={<Divider />}>
                        <Row align='middle'>
                            <Col>
                                <label className='main-sub-title'>콘텐츠  선택</label>
                            </Col>
                            <Col flex="auto" />
                        </Row>
                        <Space direction='vertical' size={20}>
                            <Row gutter={[30]}>
                                <Col>
                                    <Space size={10}>
                                        <label>최소 등록수량</label>
                                        <Input size='large' style={{width: 130}} value={'1 / 20'} disabled />
                                    </Space>
                                </Col>
                                <Col>
                                    <Space size={10}>
                                        <label>국내</label>
                                        <Input size='large' style={{width: 130}} value={'1 / 20'} disabled />
                                    </Space>
                                </Col>
                                <Col>
                                    <Space size={10}>
                                        <label>수입</label>
                                        <Input size='large' style={{width: 130}} value={'0 / 20'} disabled />
                                    </Space>
                                </Col>
                            </Row>
                            <Space direction='vertical' size={0}>
                                {renderModelBodyList()}
                            </Space>
                        </Space>
                    </Space>
                </Space>
            </Space>
        </>
    );
}

export default Create;