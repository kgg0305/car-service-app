import { Col, Divider, Row, Space, Table, Button, Upload } from 'antd';
import React, { useState } from 'react';
import SearchPanel from '../../../components/SearchPanel';
import { Constants } from '../../../constants/Constants';

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
							width: 250,
							data: null
						},
						{
							type: Constants.inputTypes.select,
							placeholder: '모델그룹 선택',
							width: 250,
							data: null
						},
						{
							type: Constants.inputTypes.select,
							placeholder: '모델 선택',
							width: 250,
							data: null
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
			<SearchPanel dataSource={searchRowList} />

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