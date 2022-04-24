import { Col, Divider, Row, Space, Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import SearchPanel from '../../../components/SearchPanel';
import { Constants } from '../../../constants/Constants';

function List() {
	const [dataSource, setDataSource] = useState(
		[
			{
				number: '1',
				brand: 32,
				group: '10 Downing Street',
                model: '경차',
                order: '경차',
                new: '경차',
				available: '사용',
                register: '2022-03-05',
				manage: '',
			},
			{
				number: '1',
				brand: 32,
				group: '10 Downing Street',
                model: '경차',
                order: '경차',
                new: '경차',
				available: '사용',
                register: '2022-03-05',
				manage: '',
			},
		]
	);
	
	const columns = [
		{
			title: '번호',
			dataIndex: 'number',
			key: 'number',
            align: 'center',
		},
		{
			title: '브랜드',
			dataIndex: 'brand',
			key: 'brand',
            align: 'center',
		},
		{
			title: '모델그룹',
			dataIndex: 'group',
			key: 'group',
            align: 'center',
		},
        {
			title: '모델',
			dataIndex: 'model',
			key: 'model',
            align: 'center',
		},
        {
			title: '순서',
			dataIndex: 'order',
			key: 'order',
            align: 'center',
		},
        {
			title: '신차여부',
			dataIndex: 'new',
			key: 'new',
            align: 'center',
		},
		{
			title: '사용여부',
			dataIndex: 'available',
			key: 'available',
            align: 'center',
		},
        {
			title: '등록일',
			dataIndex: 'register',
			key: 'register',
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
                            <Link to="/car/model/edit">
                                <Button className='white-button small-button rounded-button'>그룹관리</Button>
                            </Link>
                            <Link to="/car/model/edit">
                                <Button className='black-button small-button rounded-button'>수정</Button>
                            </Link>
                        </Space>
                    </Col>
                </Row>,
		},
	];

	const searchRowList = [
		{
			height: 80,
			columns: [
				{
					titleText: '차량',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.select,
							placeholder: '브랜드 선택',
							width: 400,
							data: null
						},
						{
							type: Constants.inputTypes.select,
							placeholder: '모델그룹 선택',
							width: 400,
							data: null
						}
					]
				}
			]
		},
		{
			height: 80,
			columns: [
				{
					titleText: '신차여부',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.select,
							placeholder: ' 선택',
							width: 150,
							data: Constants.isNewOptions
						}
					]
				},
				{
					titleText: '사용여부',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.select,
							placeholder: '선택',
							width: 150,
							data: Constants.availableOptions
						}
					]
				}
			]
		}
	];

	const onClickTableMore = () => {
		setDataSource([
			...dataSource,
			{
				number: '1', 
				brand: 32,
				group: '10 Downing Street',
                model: '경차',
                order: '경차',
                new: '경차',
				available: '사용',
                register: '2022-03-05',
				manage: '',
			},
			{
				number: '1',
				brand: 32,
				group: '10 Downing Street',
                model: '경차',
                order: '경차',
                new: '경차',
				available: '사용',
                register: '2022-03-05',
				manage: '',
			},
		]);
	};

    return(
		<Space direction='vertical' size={18} className='main-layout'>
			{/* Page Header */}
			<Space direction='vertical' size={18}>
				<label className='main-header-title'>모델 목록</label>
				<Divider className='main-body-divider' />
			</Space>

			{/* Search Section */}
			<SearchPanel dataSource={searchRowList} />

			{/* Body Section */}
			<Space className='body-section' direction='vertical' size={20}>
				<Row justify='bottom'>
					<Col>
						<label className='body-header-title'>목록</label>
					</Col>
					<Col flex="auto" />
					<Col>
						<Link to="/car/model/create">
							<Button className='black-button big-button'>등록</Button>
						</Link>
					</Col>
				</Row>
				<Table dataSource={dataSource} columns={columns} pagination={false} />
				<Row justify='center'>
					<label className='table-more-label' onClick={onClickTableMore}>더보기</label>
				</Row>
			</Space>
		</Space>
    );
}

export default List;