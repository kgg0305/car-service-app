import { Col, Divider, Row, Space, Table, Select, Button, Image, Upload } from 'antd';
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
                model: '경차',
                area: '',
				tax: '',
                profit: '',
				discount: '',
                delivery: '',
			},
			{
				number: '1',
				brand: 32,
                model: '경차',
                area: '',
				tax: '',
                profit: '',
				discount: '',
                delivery: '',
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
			title: '모델',
			dataIndex: 'model',
			key: 'model',
            align: 'center',
		},
        {
			title: '등록지역',
			dataIndex: 'area',
			key: 'area',
            align: 'center',
		},
		{
			title: '면세조건',
			dataIndex: 'tax',
			key: 'tax',
            align: 'center',
		},
        {
			title: '취득세',
			dataIndex: 'profit',
			key: 'profit',
            align: 'center',
		},
        {
			title: '채권할인',
			dataIndex: 'discount',
			key: 'discount',
            align: 'center',
		},
        {
			title: '탁송',
			dataIndex: 'delivery',
			key: 'delivery',
            align: 'center',
		},
	];

	const onClickTableMore = () => {
		setDataSource([
			...dataSource,
			{
				number: '1',
				brand: 32,
                model: '경차',
                area: '',
				tax: '',
                profit: '',
				discount: '',
                delivery: '',
			},
			{
				number: '1',
				brand: 32,
                model: '경차',
                area: '',
				tax: '',
                profit: '',
				discount: '',
                delivery: '',
			},
		]);
	};

    return(
		<Space direction='vertical' size={18} className='main-layout'>
			{/* Page Header */}
			<Space direction='vertical' size={18}>
				<label className='main-header-title'>면세조건/등록지역/탁송</label>
				<Divider className='main-body-divider' />
			</Space>

			{/* Search Section */}
			<Space direction='vertical' size={20}>
				<label className='main-sub-title'>검색</label>
                <Space direction='vertical' size={0}>
                    <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                        <Col flex="154px" className='table-header-col-section'>
                            <label>차량</label>
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
                                    placeholder="모델그룹 선택"
                                    style={{ width: 300 }}
                                >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                                <Select
                                    suffixIcon={<CaretDownOutlined />}
                                    placeholder="모델 선택"
                                    style={{ width: 300 }}
                                >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
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
                        <Space size={12}>
                            <Col>
                                <Button className='white-button big-button'>엑셀 다운로드</Button>
                            </Col>
                            <Col>
                                <Upload>
                                    <Button className='black-button big-button'>엑셀 등록</Button>
                                </Upload>
                            </Col>
                        </Space>
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