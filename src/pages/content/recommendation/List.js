import { Col, Divider, Row, Space, Button, Image, Modal, Input } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetRecommendationListAPI } from '../../../api/Recommendation';
import { GetContentInfoAPI } from '../../../api/Content';
import { CheckOutlined } from '@ant-design/icons';
import checkIcon from '../../../assets/images/check-icon.png';
import clockIcon from '../../../assets/images/clock-icon.png';
import historyIcon from '../../../assets/images/history-icon.png';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';

function List() {
    const [offset, setOffset] = useState(0);
    const [showModal, setShowModal] = useState(false);
	const [dataSource, setDataSource] = useState();
    const [contentList, setContentList] = useState([]);
	
	const initComponent = async () => {
		const initDataSource = await GetRecommendationListAPI(offset);
		
        setDataSource(initDataSource.map(body => {
			return({
				...body,
                content_count: body.content_ids.split(',').length,
				publish_date_text: new Date(body.publish_date).getFullYear() + '-' + ("0" + (new Date(body.publish_date).getMonth() + 1)).slice(-2) + '-' + ("0" + new Date(body.publish_date).getDate()).slice(-2),
			})
		}));
	};

	useEffect(() => {
		initComponent();
	}, []);
    	
	const columns = [
		{
			title: '발행일',
			dataIndex: 'publish_date_text',
			key: 'publish_date_text',
            align: 'center',
		},
		{
			title: '콘텐츠 목록',
			dataIndex: 'content_ids',
			key: 'content_ids',
            align: 'center',
            render: content_ids => 
                <Row gutter={[10]} justify='center'>
                    <Col>
                    </Col>
                    <Col>
                        <Button className='white-button small-button rounded-button' onClick={() => onViewDetailClick(content_ids)}>상세보기</Button>
                    </Col>
                </Row>,
		},
		{
			title: '콘텐츠 수',
			dataIndex: 'content_count',
			key: 'content_count',
            align: 'center',
		},
        {
			title: '발행여부/상태',
			dataIndex: 'status',
			key: 'status',
            align: 'center',
            render: status => 
                <Row justify='center'>
                    <Col>
                        {
                            status === '0' ? 
                            <Image src={checkIcon} preview={false} />
                            : status === '1' ? 
                            <Image src={clockIcon} preview={false} />
                            : <Image src={historyIcon} preview={false} />
                        }
                    </Col>
                </Row>,
		},
		{
			title: '관리',
			dataIndex: 'idx',
			key: 'idx',
            align: 'center',
			render: idx => 
                <Row justify='center'>
                    <Col>
                        <Space size={15} split={<Divider type="vertical" />}>
							<Link to="/content/recommendation/edit">
								<Button className='white-button small-button rounded-button'>즉시반영</Button>
							</Link>
							<Link to={"/content/recommendation/edit/" + idx}>
								<Button className='black-button small-button rounded-button'>수정</Button>
							</Link>
						</Space>
                    </Col>
                </Row>,
		},
	];

	const tableDataSource = {
        topItems: [
            {
				type: Constants.inputTypes.label,
				label: '발행완료',
                icon: <Image src={checkIcon} />
			},
            {
				type: Constants.inputTypes.label,
				label: '오늘발행',
                icon: <Image src={clockIcon} />
			},
            {
				type: Constants.inputTypes.label,
				label: '발행예약',
                icon: <Image src={historyIcon} />
			},
			{
				type: Constants.inputTypes.button,
				link: '/content/recommendation/create',
				label: '등록',
				style: 'black-button big-button',
				width: 150
			}
		],
		tableData: dataSource,
		tableColumns: columns
	};

    const onViewDetailClick = async(content_ids) => {
        var initContentList = [];
        for (let index = 0; index < content_ids.split(',').length; index++) {
            const id = content_ids.split(',')[index];
            initContentList.push(await GetContentInfoAPI(id));
        }
        
        await setContentList(initContentList);
        setShowModal(true);
    };

    const onCloseModalClick = () => {
        setShowModal(false);
    };

    const onClickTableMore = async() => {
		const initDataSource = await GetRecommendationListAPI(offset + 10);
		setOffset(offset + initDataSource.length);
		
		setDataSource([
			...dataSource,
			...initDataSource.map(body => {
				return({
					...body,
                    content_count: body.content_ids.split(',').length,
                    publish_date_text: new Date(body.publish_date).getFullYear() + '-' + ("0" + (new Date(body.publish_date).getMonth() + 1)).slice(-2) + '-' + ("0" + new Date(body.publish_date).getDate()).slice(-2),
				})
			})
		]);
	};

    return(
        <>
            <Space direction='vertical' size={18} className='main-layout'>
                {/* Page Header */}
                <Space direction='vertical' size={18}>
                    <label className='main-header-title'>추천뉴스 관리</label>
                    <Divider className='main-body-divider' />
                </Space>

                {/* Body Section */}
                <TableList dataSource={tableDataSource} />

                <Row justify='center'>
				    <label className='show-more-label' onClick={onClickTableMore}>더보기</label>
			    </Row>
            </Space>

            <Modal
                centered
                width={1100}
                closable={false}
                visible={showModal}
                title={'콘텐츠 목록  2022-03-31'}
                footer={[
                    <Button className='alert-button' onClick={onCloseModalClick}>닫기</Button>
                ]}
            >
                <Space direction='vertical' size={20} style={{width:'100%'}}>
                    <Space direction='vertical' size={0} style={{width:'100%'}}>
                        {
                            contentList.map((content, index) => (
                                <Row key={0} gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>순서{index + 1}</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Input value={content.title} readOnly={true} />
                                    </Col>
                                </Row>
                            ))
                        }
                    </Space>
                </Space>
            </Modal>
        </>
    );
}

export default List;