import { Col, Divider, Row, Space, Button, Image, Modal, Input } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
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
                available: '사용',
				manage: '',
			},
			{
				key: 2,
				date: '1',
				list: '32',
				count: '블루멤버스 포인트 선사용',
                available: '사용',
				manage: '',
			},
			{
				key: 2,
				date: '1',
				list: '32',
				count: '블루멤버스 포인트 선사용',
                available: '사용',
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
			title: '사용여부',
			dataIndex: 'available',
			key: 'available',
            align: 'center',
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
							<Link to="/content/photo/edit">
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
				type: Constants.inputTypes.button,
				link: '/content/photo/create',
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
                    <label className='main-header-title'>포토뉴스 관리</label>
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