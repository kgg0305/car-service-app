import { Col, Divider, Row, Space, Button, Image, Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import SearchPanel from '../../../components/SearchPanel';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';

function List() {
    const [dataSource, setDataSource] = useState(
		[
			{
				key: 1,
				number: '1',
				path: 'naverblog',
				method: '렌트',
				name: '김철수',
				contact: '010-0000-0000',
				brand: '제네시스',
				type: 'G80',
				area: '',
				member: '',
				manage: '',
			},
			{
				key: 2,
				number: '1',
				path: 'naverblog',
				method: '렌트',
				name: '김철수',
				contact: '010-0000-0000',
				brand: '제네시스',
				type: 'G80',
				area: '',
				member: '',
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
			title: '유입경로',
			dataIndex: 'path',
			key: 'path',
            align: 'center',
		},
		{
			title: '구입방법',
			dataIndex: 'method',
			key: 'method',
            align: 'center',
		},
		{
			title: '이름',
			dataIndex: 'name',
			key: 'name',
            align: 'center',
		},
		{
			title: '연락처',
			dataIndex: 'contact',
			key: 'contact',
            align: 'center',
		},
		{
			title: '브랜드',
			dataIndex: 'brand',
			key: 'brand',
            align: 'center',
		},
		{
			title: '차종',
			dataIndex: 'type',
			key: 'type',
            align: 'center',
		},
		{
			title: '지점',
			dataIndex: 'area',
			key: 'area',
            align: 'center',
			render: path => 
				<Row justify='center'>
					<Col>
						<Select
							size={'large'}
							suffixIcon={<CaretDownOutlined />}
							placeholder={'선택'}
							style={{ width: 130 }}
						>
							{
								<Select.Option key={1} value={1}>
									1
								</Select.Option>
							}
						</Select>
					</Col>
				</Row>,
		},
		{
			title: '인원',
			dataIndex: 'member',
			key: 'member',
            align: 'center',
			render: path => 
				<Row justify='center'>
					<Col>
						<Select
							size={'large'}
							suffixIcon={<CaretDownOutlined />}
							placeholder={'선택'}
							style={{ width: 130 }}
						>
							{
								<Select.Option key={1} value={1}>
									1
								</Select.Option>
							}
						</Select>
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
							<Link to="/estimation/request/detail">
								<Button className='black-button small-button rounded-button'>상세보기</Button>
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
					titleText: '날짜',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.select,
							placeholder: '등록일',
							width: 130,
							data: null
						},
                        {
							type: Constants.inputTypes.button,
							label: '전체',
							style: 'black-button'
						},
						{
							type: Constants.inputTypes.button,
							label: '오늘',
							style: 'white-button'
						},
						{
							type: Constants.inputTypes.button,
							label: '어제',
							style: 'white-button'
						},
						{
							type: Constants.inputTypes.button,
							label: '3일',
							style: 'white-button'
						},
						{
							type: Constants.inputTypes.button,
							label: '7일',
							style: 'white-button'
						},
						{
							type: Constants.inputTypes.button,
							label: '1개월',
							style: 'white-button'
						},
						{
							type: Constants.inputTypes.button,
							label: '3개월',
							style: 'white-button'
						},
                        {
							type: Constants.inputTypes.datePicker,
							placeholder: '시작일'
						},
						{
							type: Constants.inputTypes.label,
							label: '~'
						},
						{
							type: Constants.inputTypes.datePicker,
							placeholder: '종료일'
						}
					]
				}
			]
		},
        {
			height: 80,
			columns: [
				{
					titleText: '검색 I',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.select,
							placeholder: '구입방법',
							width: 130,
							data: null
						},
                        {
							type: Constants.inputTypes.select,
							placeholder: '검색구분',
							width: 130,
							data: null
						},
                        {
							type: Constants.inputTypes.input,
							placeholder: '검색어 입력',
							width: 200
						},
                        {
							type: Constants.inputTypes.input,
							placeholder: '유입경로 입력',
							width: 200
						}
					]
				}
			]
		},
        {
			height: 80,
			columns: [
				{
					titleText: '검색 II',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.button,
							label: '전체',
							style: 'black-button'
						},
                        {
							type: Constants.inputTypes.button,
							label: '대기중',
							style: 'white-button disabled-button'
						},
                        {
							type: Constants.inputTypes.button,
							label: '상담중',
							style: 'white-button disabled-button'
						},
                        {
							type: Constants.inputTypes.button,
							label: '계약중',
							style: 'white-button disabled-button'
						},
                        {
							type: Constants.inputTypes.button,
							label: '출고중',
							style: 'white-button disabled-button'
						},
                        {
							type: Constants.inputTypes.button,
							label: '종료',
							style: 'white-button disabled-button'
						}
					]
				}
			]
		}
	];

	const tableList = {
		topItems: [
			{
				type: Constants.inputTypes.button,
				link: '/car/model/create',
				label: '등록',
				style: 'black-button big-button',
				width: 150
			}
		],
		subItems: [
			{
				type: Constants.inputTypes.input,
				disabled: true,
				label: '견적서',
				value: '999,999,999',
				width: 130
			},
			{
				type: Constants.inputTypes.input,
				disabled: true,
				label: '대기',
				value: '999,999,999',
				width: 130
			},
			{
				type: Constants.inputTypes.input,
				disabled: true,
				label: '상담',
				value: '999,999,999',
				width: 130
			},
			{
				type: Constants.inputTypes.input,
				disabled: true,
				label: '계약',
				value: '999,999,999',
				width: 130
			},
			{
				type: Constants.inputTypes.input,
				disabled: true,
				label: '출고',
				value: '999,999,999',
				width: 130
			},
			{
				type: Constants.inputTypes.input,
				disabled: true,
				label: '종료',
				value: '999,999,999',
				width: 130
			}
		],
		tableData: dataSource,
		tableColumns: columns
	};

    return (
        <Space direction='vertical' size={18} className='main-layout'>
            {/* Page Header */}
            <Space direction='vertical' size={18}>
                <label className='main-header-title'>견적신청 목록</label>
                <Divider className='main-body-divider' />
            </Space>

            {/* Search Section */}
            <SearchPanel dataSource={searchRowList} />

            {/* Body Section */}
            <TableList dataSource={tableList} />

        </Space>
    );
}

export default List;