import { Col, Divider, Row, Space, Select, Button, Input, InputNumber, DatePicker } from 'antd';
import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { DeleteRecommendationInfoAPI, GetRecommendationInfoAPI, UpdateRecommendationAPI } from '../../../api/Recommendation';
import { GetContentInfoAPI } from '../../../api/Content';
import AlertModal from '../../../components/AlertModal';
import { GetDateStringFromDate } from '../../../constants/GlobalFunctions';

const { Option } = Select;

// 수정페지
function Edit() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [validationList, setValidationList] = useState([]);
    const [bodyInfo, setBodyInfo] = useState(
        {
            idx: id,
            publish_date: new Date(),
            content_ids: ''
        }
    );
    const [contentBodyList, setContentBodyList] = useState([
        {
            number: 1,
            idx: null,
            title: ''
        }
    ]);

    const initComponent = async () => {
		const initBodyInfo = await GetRecommendationInfoAPI(id);

        var initContentBodyList = [];
        for (let index = 0; index < initBodyInfo.content_ids.split(',').length; index++) {
            const id = initBodyInfo.content_ids.split(',')[index];
            initContentBodyList.push({
                ...(await GetContentInfoAPI(id)), 
                number: index + 1
            });
        }

		setBodyInfo(initBodyInfo);
        setContentBodyList(initContentBodyList);
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
        const validation = [];
        if(bodyInfo.publish_date === null) {
            validation.push({
                title: '정보',
                name: '발행일'
            })
        }
        contentBodyList.map((body, index) => {
            if(body.idx === null) {
                validation.push({
                    title: '뉴스 ' + ((index + 1) < 10 ? '0' + (index + 1) : (index + 1)),
                    name: '콘텐츠 번호'
                })
            }
            if(body.title === '등록되지 않은 콘텐츠입니다.') {
                validation.push({
                    title: '뉴스 ' + ((index + 1) < 10 ? '0' + (index + 1) : (index + 1)),
                    name: '콘텐츠 내용'
                })
            }
        });

        setValidationList(validation);

        if(validation.length > 0) {
            setShowModal(true);
        } else {
            const updateBodyInfo = {
                publish_date: GetDateStringFromDate(new Date(bodyInfo.publish_date)),
                content_ids: contentBodyList.map(body => body.idx).join(',')
            }
    
            await UpdateRecommendationAPI(updateBodyInfo);
            
            setBodyInfo(updateBodyInfo);
            
            navigate('/content/recommendation');
        }
    };

    const onDeleteClick = async(idx) => {
        await DeleteRecommendationInfoAPI(idx);
        navigate('/content/recommendation');
    }

    const onCloseModalClick = () => {
        setShowModal(false);
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
                            <label className='main-header-title'>추천뉴스 수정</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/content/recommendation">
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
                                    <label className='main-sub-title'>발행일 선택</label>
                                </Col>
                                <Col flex="auto" />
                            </Row>
                            <Space direction='vertical' size={0}>
                                <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>발행일</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Space size={10}>
                                            <DatePicker
                                                name='publish_date' 
                                                value={moment(bodyInfo.publish_date)} 
                                                onChange={value => {
                                                    onChangeComponent('publish_date', value.toString());
                                                }} 
                                                size='large' 
                                            />
                                            <label>선택한 날짜를 기준으로 자동발행 됩니다. (예약발행)</label>
                                        </Space>
                                    </Col>
                                </Row>
                            </Space>
                        </Space>
                        <Space direction='vertical' size={20}>
                            <Row align='middle'>
                                <Col>
                                    <label className='main-sub-title'>뉴스 선택</label>
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
            <AlertModal visible={showModal} onConfirmClick={() => setShowModal(false)} validationList={validationList} />
        </>
    );
}

export default Edit;