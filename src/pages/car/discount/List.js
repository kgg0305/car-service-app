import { Col, Divider, Row, Space, Table, Select, Button, Image, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { CaretDownOutlined } from '@ant-design/icons'
import React, { useState } from 'react';

const { Option } = Select;

function List() {
	const [dataSource, setDataSource] = useState(
		[
			{
				number: '1',
				brand: 32,
				type: '블루멤버스 포인트 선사용',
                condition: '2회 이상 재구매 고객',
                money: '-100,000원',
                start: '2022-01-24',
				end: '2022-02-24',
				manage: '',
			},
			{
				number: '1',
				brand: 32,
				type: '블루멤버스 포인트 선사용',
                condition: '2회 이상 재구매 고객',
                money: '-100,000원',
                start: '2022-01-24',
				end: '2022-02-24',
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
			title: '종류',
			dataIndex: 'type',
			key: 'type',
            align: 'center',
		},
        {
			title: '조건',
			dataIndex: 'condition',
			key: 'condition',
            align: 'center',
		},
        {
			title: '할인비용',
			dataIndex: 'money',
			key: 'money',
            align: 'center',
		},
        {
			title: '시작일',
			dataIndex: 'start',
			key: 'start',
            align: 'center',
		},
		{
			title: '종료일',
			dataIndex: 'end',
			key: 'end',
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
                        <Link to="/car/discount/edit">
                            <Button className='black-button small-button rounded-button'>수정</Button>
                        </Link>
                    </Col>
                </Row>,
		},
	];

	const onClickTableMore = () => {
		setDataSource([
			...dataSource,
			{
				number: '1',
				brand: 32,
				type: '블루멤버스 포인트 선사용',
                condition: '2회 이상 재구매 고객',
                money: '-100,000원',
                start: '2022-01-24',
				end: '2022-02-24',
				manage: '',
			},
			{
				number: '1',
				brand: 32,
				type: '블루멤버스 포인트 선사용',
                condition: '2회 이상 재구매 고객',
                money: '-100,000원',
                start: '2022-01-24',
				end: '2022-02-24',
				manage: '',
			},
		]);
	};

    return(
		<Space direction='vertical' size={18} className='main-layout'>
			{/* Page Header */}
			<Space direction='vertical' size={18}>
				<label className='main-header-title'>할인/비용 목록</label>
				<Divider className='main-body-divider' />
			</Space>

			{/* Search Section */}
			<Space direction='vertical' size={20}>
				<label className='main-sub-title'>검색</label>
                <Space direction='vertical' size={0}>
                    <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                        <Col flex="154px" className='table-header-col-section'>
                            <label>브랜드</label>
                        </Col>
                        <Col flex="auto" className='table-value-col-section'>
                            <Space size={6}>
                                <Select
                                    suffixIcon={<CaretDownOutlined />}
                                    placeholder="브랜드 선택"
                                    style={{ width: 300 }}
                                >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                                <Select
                                    suffixIcon={<CaretDownOutlined />}
                                    placeholder="할인종류 선택"
                                    style={{ width: 300 }}
                                >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </Space>
                        </Col>
                    </Row>
                    <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                        <Col flex="154px" className='table-header-col-section'>
                            <label>날짜</label>
                        </Col>
                        <Col flex="auto" className='table-value-col-section'>
                            <Space size={30}>
                                <Space size={2}>
                                    <Button className='black-button smallest-button'>전체</Button>
                                    <Button className='white-button smallest-button'>오늘</Button>
                                    <Button className='white-button smallest-button'>어제</Button>
                                    <Button className='white-button smallest-button'>3일</Button>
                                    <Button className='white-button smallest-button'>7일</Button>
                                    <Button className='white-button smallest-button'>1개월</Button>
                                    <Button className='white-button smallest-button'>3개월</Button>
                                </Space>
                                <Space size={6}>
                                    <DatePicker placeholder='시작일' />
                                    <label>~</label>
                                    <DatePicker placeholder='종료일' />
                                </Space>
                            </Space>
                        </Col>
                    </Row>
                </Space>
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
						<Link to="/car/discount/create">
							<Button className='black-button big-button'>상품 등록</Button>
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