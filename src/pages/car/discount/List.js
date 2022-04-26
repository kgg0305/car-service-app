import { Col, Divider, Row, Space, Button } from 'antd';
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
				brand: 32,
				type: '블루멤버스 포인트 선사용',
                condition: '2회 이상 재구매 고객',
                money: '-100,000원',
                start: '2022-01-24',
				end: '2022-02-24',
				manage: '',
			},
			{
				key: 2,
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

	const searchRowList = [
		{
			height: 80,
			columns: [
				{
					titleText: '브랜드',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.select,
							placeholder: '브랜드 선택',
							width: 300,
							data: null
						},
						{
							type: Constants.inputTypes.select,
							placeholder: '할인종류 선택',
							width: 300,
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
					titleText: '날짜',
					titleWidth: '154px',
					contentItems: [
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
		}
	];

	const tableList = {
		topItems: [
			{
				type: Constants.inputTypes.button,
				link: '/car/discount/create',
				label: '등록',
				style: 'black-button big-button',
				width: 150
			}
		],
		tableData: dataSource,
		tableColumns: columns
	};

    return(
		<Space direction='vertical' size={18} className='main-layout'>
			{/* Page Header */}
			<Space direction='vertical' size={18}>
				<label className='main-header-title'>할인/비용 목록</label>
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