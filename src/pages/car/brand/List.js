import { Col, Divider, Row, Space, Table, Select, Button, Image } from 'antd';
import { Link } from 'react-router-dom';
import { CaretDownOutlined } from '@ant-design/icons'
import React from 'react';

const { Option } = Select;

function List() {
    const dataSource = [
		{
			number: '1',
			logo: window.location.origin + '/images/logo/logo.png',
			brand: 32,
			order: '10 Downing Street',
			available: '10 Downing Street',
			count: '10 Downing Street',
			manage: '10 Downing Street',
		},
		{
			number: '1',
			logo: window.location.origin + '/images/logo/logo.png',
			brand: 32,
			order: '10 Downing Street',
			available: '10 Downing Street',
			count: '10 Downing Street',
			manage: '10 Downing Street',
		},
	];
	
	const columns = [
		{
			title: '번호',
			dataIndex: 'number',
			key: 'number',
		},
		{
			title: '로고',
			dataIndex: 'logo',
			key: 'logo',
			render: path => <Image src={path} />,
		},
		{
			title: '브랜드',
			dataIndex: 'brand',
			key: 'brand',
		},
		{
			title: '순서',
			dataIndex: 'order',
			key: 'order',
		},
		{
			title: '사용여부',
			dataIndex: 'available',
			key: 'available',
		},
		{
			title: '등록 차량수',
			dataIndex: 'count',
			key: 'count',
		},
		{
			title: '관리',
			dataIndex: 'manage',
			key: 'manage',
			render: path => <Space size={15} split={<Divider type="vertical" />}><Button className='white-button small-button rounded-button'>그룹관리</Button><Button className='black-button small-button rounded-button'>수정</Button></Space>,
		},
	];

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
						<label>차량</label>
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
							style={{ width: 150 }}>
							<Option value="jack">Jack</Option>
							<Option value="lucy">Lucy</Option>
							<Option value="Yiminghe">yiminghe</Option>
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
			<Space direction='vertical' size={20}>
				<Row justify='bottom'>
					<Col>
						<label className='body-header-title'>목록</label>
					</Col>
					<Col flex="auto" />
					<Col>
						<Link to="/car/brand/create">
							<Button className='black-button big-button'>브랜드 등록</Button>
						</Link>
					</Col>
				</Row>
				<Table dataSource={dataSource} columns={columns} />
			</Space>
		</Space>
    );
}

export default List;