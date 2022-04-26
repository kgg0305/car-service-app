import { Col, Divider, Row, Space, Button, Image, Modal, Input } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import checkIcon from '../../../assets/images/check-icon.png';
import clockIcon from '../../../assets/images/clock-icon.png';
import historyIcon from '../../../assets/images/history-icon.png';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';

function List() {
    const [showModal, setShowModal] = useState(false);

	const [dataSource, setDataSource] = useState(
		[
			{
				key: 1,
				date: '1',
				list: '32',
				count: '블루멤버스 포인트 선사용',
                status: 'done',
				manage: '',
			},
			{
				key: 2,
				date: '1',
				list: '32',
				count: '블루멤버스 포인트 선사용',
                status: 'progress',
				manage: '',
			},
			{
				key: 2,
				date: '1',
				list: '32',
				count: '블루멤버스 포인트 선사용',
                status: '',
				manage: '',
			},
		]
	);
	
	const columns = [
		{
			title: '발행일',
			dataIndex: 'date',
			key: 'date',
            align: 'center',
		},
		{
			title: '콘텐츠 목록',
			dataIndex: 'list',
			key: 'list',
            align: 'center',
            render: list => 
                <Row gutter={[10]} justify='center'>
                    <Col>
                        {list}
                    </Col>
                    <Col>
                        <Button className='white-button small-button rounded-button' onClick={onViewDetailClick}>상세보기</Button>
                    </Col>
                </Row>,
		},
		{
			title: '콘텐츠 수',
			dataIndex: 'count',
			key: 'count',
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
                            status === 'done' ? 
                            <Image src={checkIcon} />
                            : status === 'progress' ? 
                            <Image src={clockIcon} />
                            : <Image src={historyIcon} />
                        }
                    </Col>
                </Row>,
		},
		{
			title: '관리',
			dataIndex: 'manage',
			key: 'manage',
            align: 'center',
			render: path => 
                <Row justify='center'>
                    <Col>
                        <Space size={15} split={<Divider type="vertical" />}>
							<Link to="/content/recommendation/edit">
								<Button className='white-button small-button rounded-button'>즉시반영</Button>
							</Link>
							<Link to="/content/recommendation/edit">
								<Button className='black-button small-button rounded-button'>수정</Button>
							</Link>
						</Space>
                    </Col>
                </Row>,
		},
	];

	const tableList = {
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

    const onViewDetailClick = event => {
        setShowModal(true);
    };

    const onCloseModalClick = () => {
        setShowModal(false);
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
                <TableList dataSource={tableList} />

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
                        <Row key={0} gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                            <Col span={2} className='table-header-col-section'>
                                <label>순서1</label>
                            </Col>
                            <Col flex="auto" className='table-value-col-section'>
                                <Input />
                            </Col>
                        </Row>
                        <Row key={1} gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                            <Col span={2} className='table-header-col-section'>
                                <label>순서1</label>
                            </Col>
                            <Col flex="auto" className='table-value-col-section'>
                                <Input />
                            </Col>
                        </Row>
                    </Space>
                </Space>
            </Modal>
        </>
    );
}

export default List;