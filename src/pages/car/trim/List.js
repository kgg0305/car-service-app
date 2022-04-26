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
				group: '10 Downing Street',
                model: '경차',
                lineup: '경차',
                trim: '경차',
				available: '사용',
				manage: '',
			},
			{
				key: 2,
				number: '1',
				brand: 32,
				group: '10 Downing Street',
                model: '경차',
                lineup: '경차',
                trim: '경차',
				available: '사용',
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
			title: '라인업',
			dataIndex: 'lineup',
			key: 'lineup',
            align: 'center',
		},
        {
			title: '트림',
			dataIndex: 'trim',
			key: 'trim',
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
                        <Link to="/car/trim/edit">
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
						},
						{
							type: Constants.inputTypes.select,
							placeholder: '라인업 선택',
							width: 250,
							data: null
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

	const tableList = {
		topItems: [
			{
				type: Constants.inputTypes.button,
				link: '/car/trim/create',
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
				<label className='main-header-title'>트림 목록</label>
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