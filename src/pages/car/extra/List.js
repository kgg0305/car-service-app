import { Divider, Space } from 'antd';
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
                model: '경차',
                area: '',
				tax: '',
                profit: '',
				discount: '',
                delivery: '',
			},
			{
				key: 2,
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

	const tableList = {
		topItems: [
			{
				type: Constants.inputTypes.button,
				link: '/car/disount/create',
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
				<label className='main-header-title'>면세조건/등록지역/탁송</label>
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