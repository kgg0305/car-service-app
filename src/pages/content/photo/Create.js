import { Col, Divider, Row, Space, Select, Button, Input, InputNumber } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { CreatePhotoAPI } from '../../../api/Photo';
import { GetContentInfoAPI } from '../../../api/Content';
import { Constants } from '../../../constants/Constants';

const { Option } = Select;

function Create() {
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [bodyInfo, setBodyInfo] = useState(
        {
            number: 1,
            category: '',
            tag: '',
            content_ids: null,
            is_use: null
        }
    );
    const [contentBodyList, setContentBodyList] = useState([
        {
            number: 1,
            idx: null,
            title: ''
        }
    ]);

    const onChangeComponent = (name, value) => {
        setBodyInfo(
            { 
                ...bodyInfo,
                [name]: value
            }
        );
        
    }

    const onSaveClick = async() => {
        const updateBodyInfo = {
            ...bodyInfo,
            content_ids: contentBodyList.map(body => body.idx).join(',')
        }

        const created_info = await CreatePhotoAPI(updateBodyInfo);
        
        setBodyInfo(updateBodyInfo);
        // setShowModal(true);
        navigate('/content/photo');
    };

    const onAddContentComponentClick = event => {
        setContentBodyList([...contentBodyList, {
            number: contentBodyList[contentBodyList.length - 1].number + 1,
            idx: null,
            title: ''
        }]);
    };

    const onChangeContentComponent = async(number, name, value) => {
        await setContentBodyList(contentBodyList.map(body => body.number === number ? {...body, [name]: value} : body));
        if(name == 'idx') {
            const contentInfo = await GetContentInfoAPI(value);
            if(contentInfo) {
                setContentBodyList(
                    contentBodyList.map(
                        body => body.number === number ? 
                        {
                            ...body, 
                            ['title']: contentInfo.title,
                            [name]: value
                        } 
                        : body
                    )
                );
            } else {
                setContentBodyList(
                    contentBodyList.map(
                        body => body.number === number ? 
                        {
                            ...body, 
                            ['title']: '등록되지 않은 콘텐츠입니다.',
                            [name]: value
                        } 
                        : body
                    )
                );
            }
        }
    }

    const onDeleteContentComponentClick = (number) => {
        if(contentBodyList.length > 1){
            setContentBodyList(contentBodyList.filter((body) => body.number !== number));
        }
    };

    const renderContentBodyList = () => {
        return (
            contentBodyList.map((body, index) => (
                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                    <Col span={2} className='table-header-col-section'>
                        <label>순서 { body.number !== 10 ? '0' + body.number : body.number }</label>
                    </Col>
                    <Col flex="auto" className='table-value-col-section'>
                        <Space size={10}>
                            <InputNumber 
                                name='idx' 
                                value={body.idx} 
                                onChange={number => {
                                    onChangeContentComponent(body.number, 'idx', number);
                                }}
                                controls={false}
                                placeholder='콘텐츠 번호 또는 줌 자동차 뉴스의 URL 입력'
                                style={{ width:500 }} 
                            />
                            <Input 
                                name='title' 
                                value={body.title} 
                                readOnly={true}
                                placeholder='콘텐츠 번호 또는 줌 자동차 뉴스의 URL 입력'
                                style={{ width:500 }} 
                            />
                        </Space>
                    </Col>
                    <Col flex='auto' />
                    <Col className='table-value-col-section'>
                        <Space size={13}>
                            { 
                                contentBodyList.length == index + 1 
                                ? 
                                <>
                                    {
                                        contentBodyList.length != 1 
                                        ? <Button className='white-button' onClick={() => onDeleteContentComponentClick(body.number)}>삭제</Button> 
                                        : ''
                                    }
                                    <Button className='black-button' onClick={() => onAddContentComponentClick(body.number)}>추가</Button>
                                </>
                                : <Button className='white-button' onClick={() => onDeleteContentComponentClick(body.number)}>삭제</Button>
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
                            <label className='main-header-title'>포토뉴스 등록</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/content/photo">
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
                                        <label>카테고리</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Input 
                                            name='category' 
                                            value={bodyInfo.category} 
                                            onChange={e => {
                                                onChangeComponent(e.target.name, e.target.value);
                                            }} 
                                            size='large' style={{ width:600 }} 
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
                                        <label>태그</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Input 
                                            name='tag' 
                                            value={bodyInfo.tag} 
                                            onChange={e => {
                                                onChangeComponent(e.target.name, e.target.value);
                                            }} 
                                            size='large' 
                                            style={{ width:600 }} 
                                            placeholder={'콤마 ( , )로 구분해서 작성해 주세요  예시) 현대, 제네시스'} 
                                        />
                                    </Col>
                                </Row>
                            </Space>
                        </Space>
                        <Space direction='vertical' size={20}>
                            <Row align='middle'>
                                <Col>
                                    <label className='main-sub-title'>콘텐츠  선택</label>
                                </Col>
                                <Col flex="auto" />
                            </Row>
                            <Space direction='vertical' size={0}>
                                {renderContentBodyList()}
                            </Space>
                        </Space>
                    </Space>
                </Space>
            </Space>
        </>
    );
}

export default Create;