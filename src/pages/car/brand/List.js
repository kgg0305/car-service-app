import { Col, Divider, Row, Space, Table, Select, Button, Image } from 'antd';
import { Link } from 'react-router-dom';
import { CaretDownOutlined } from '@ant-design/icons'
import React, { useState } from 'react';

const { Option } = Select;

function List() {
	const [dataSource, setDataSource] = useState(
		[
			{
				number: '1',
				logo: window.location.origin + '/images/logo/logo.png',
				brand: 'Ford',
				order: '10',
				available: '사용',
				count: '42',
				manage: '',
			},
			{
				number: '1',
				logo: window.location.origin + '/images/logo/logo.png',
				brand: 'Ford',
				order: '10',
				available: '사용',
				count: '12',
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
			title: '로고',
			dataIndex: 'logo',
			key: 'logo',
            align: 'center',
			render: path => <Image src={path} />,
		},
		{
			title: '브랜드',
			dataIndex: 'brand',
			key: 'brand',
            align: 'center',
		},
		{
			title: '순서',
			dataIndex: 'order',
			key: 'order',
            align: 'center',
		},
		{
			title: '사용여부',
			dataIndex: 'available',
			key: 'available',
            align: 'center',
		},
		{
			title: '등록 차량수',
			dataIndex: 'count',
			key: 'count',
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
							<Link to="/car/brand/edit">
								<Button className='white-button small-button rounded-button'>그룹관리</Button>
							</Link>
							<Link to="/car/brand/edit">
								<Button className='black-button small-button rounded-button'>수정</Button>
							</Link>
						</Space>
					</Col>
				</Row>,
		},
	];

	const onClickTableMore = () => {
		setDataSource([
			...dataSource,
			{
				number: '1',
				logo: window.location.origin + '/images/logo/logo.png',
				brand: 'Ford',
				order: '1',
				available: '사용',
				count: '3',
				manage: '',
			},
			{
				number: '1',
				logo: window.location.origin + '/images/logo/logo.png',
				brand: 'Ford',
				order: '2',
				available: '사용',
				count: '4',
				manage: '',
			}
		]);
	};

    return(
		<Space direction='vertical' size={18} className='main-layout'>
			{/* Page Header */}
			<Space direction='vertical' size={18}>
				<label className='main-header-title'>브랜드 목록</label>
				<Divider className='main-body-divider' />
			</Space>

			{/* Search Section */}
			<Space direction='vertical' size={20}>
				<label className='main-sub-title'>검색</label>
				<Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
					<Col flex="154px" className='table-header-col-section'>
						<label>차량검색</label>
					</Col>
					<Col flex="auto" className='table-value-col-section'>
						<Select
							suffixIcon={<CaretDownOutlined />}
							placeholder="브랜드 선택"
							style={{ width: 400 }}>
							<Option value="jack">Jack</Option>
							<Option value="lucy">Lucy</Option>
							<Option value="Yiminghe">yiminghe</Option>
						</Select>
					</Col>
					<Col flex="154px" className='table-header-col-section'>
						<label>사용여부</label>
					</Col>
					<Col flex="auto" className='table-value-col-section'>
						<Select
							suffixIcon={<CaretDownOutlined />}
							placeholder="선택"
							style={{ width: 150 }}
						>
							<Option value="1">사용</Option>
							<Option value="2">미사용</Option>
						</Select>
					</Col>
				</Row>
				<Row justify="center" gutter={[17, 0]}>
					<Col>
						<Button className='white-button big-button'>초기화</Button>
					</Col>
					<Col>
						<Button className='black-button big-button'>검색</Button>
					</Col>
				</Row>
			</Space>

			{/* Body Section */}
			<Space className='body-section' direction='vertical' size={20}>
				<Row justify='bottom'>
					<Col>
						<label className='body-header-title'>목록</label>
					</Col>
					<Col flex="auto" />
					<Col>
						<Link to="/car/brand/create">
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