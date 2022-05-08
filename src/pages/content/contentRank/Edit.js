import { Col, Divider, Row, Space, Select, Button, Input, InputNumber } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetRankInfoAPI, UpdateRankAPI } from '../../../api/Rank';
import { GetContentInfoAPI } from '../../../api/Content';

const { Option } = Select;

function Create() {
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [rankBodyInfo, setRankBodyInfo] = useState({
        type: 2,
        ids: '',
        created_date: null
    });
    const [contentBodyList, setContentBodyList] = useState([
        {
            number: 1,
            idx: null,
            title: ''
        }
    ]);

    const initComponent = async () => {
		const initRankBodyInfo = await GetRankInfoAPI(2);
		const initContentBodyList = [];

        for (let index = 0; index < initRankBodyInfo.ids.split(',').length; index++) {
            const id = initRankBodyInfo.ids.split(',')[index];
            initContentBodyList.push({
                ...(await GetContentInfoAPI(id)),
                number: index + 1
            });
        }

		setRankBodyInfo(initRankBodyInfo);
		setContentBodyList(initContentBodyList);
	};

    useEffect(() => {
		initComponent();
	}, []);

    const onSaveClick = async() => {
        const updateRankBodyInfo = {
            ...rankBodyInfo,
            ids: contentBodyList.map(body => body.idx).join(','),
            created_date: new Date()
        };
        const created_info = await UpdateRankAPI(updateRankBodyInfo);
        
        // setShowModal(true);
        navigate('/content/contentRank');
    };

    const onAddContentComponentClick = event => {
        setContentBodyList([...contentBodyList, {
            number: contentBodyList[contentBodyList.length - 1].number + 1,
            brand_id: null,
            group_id: null,
            model_id: null
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
                            <label className='main-header-title'>콘텐츠 인기순위 수정</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/content/contentRank">
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