import { Divider, Space, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import { GetBrandOptionListAPI } from '../../../api/Brand';
import { GetGroupOptionListAPI } from '../../../api/Group';
import { GetModelOptionListAPI } from '../../../api/Model';
import { GetExtraListAPI } from '../../../api/Extra';
import SearchPanel from '../../../components/SearchPanel';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';

function List() {
	const [offset, setOffset] = useState(0);
	const [brandOptionList, setBrandOptionList] = useState([]);
	const [groupOptionList, setGroupOptionList] = useState([]);
	const [modelOptionList, setModelOptionList] = useState([]);
	const [dataSource, setDataSource] = useState();
	const [searchData, setSearchData] = useState({
		brand_id: null,
		group_id: null,
		model_id: null,
		is_use: null
	});
	
	const initComponent = async () => {
		const initDataSource = await GetExtraListAPI(offset);
		const initBrandOptionList = await GetBrandOptionListAPI();
		const initGroupOptionList = await GetGroupOptionListAPI();
		const initModelOptionList = await GetModelOptionListAPI();
		
		setDataSource(initDataSource);
		setBrandOptionList(initBrandOptionList);
		setGroupOptionList(initGroupOptionList);
		setModelOptionList(initModelOptionList);
	};

	useEffect(() => {
		initComponent();
	}, []);
	
	const columns = [
		{
			title: '번호',
			dataIndex: 'idx',
			key: 'idx',
            align: 'center',
		},
		{
			title: '브랜드',
			dataIndex: 'brand_name',
			key: 'brand_name',
            align: 'center',
		},
        {
			title: '모델',
			dataIndex: 'model_name',
			key: 'model_name',
            align: 'center',
		},
        {
			title: '등록지역',
			dataIndex: 'region',
			key: 'region',
            align: 'center',
		},
		{
			title: '면세조건',
			dataIndex: 'condition',
			key: 'condition',
            align: 'center',
		},
        {
			title: '취득세',
			dataIndex: 'fee',
			key: 'fee',
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
			dataIndex: 'transfer',
			key: 'transfer',
            align: 'center',
		},
	];

	const searchDataSource = [
		{
			height: 80,
			columns: [
				{
					titleText: '차량',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.select,
							name: 'brand_id',
							placeholder: '브랜드 선택',
							width: 250,
							data: brandOptionList
						},
						{
							type: Constants.inputTypes.select,
							name: 'group_id',
							placeholder: '모델그룹 선택',
							width: 250,
							data: groupOptionList
						},
						{
							type: Constants.inputTypes.select,
							name: 'model_id',
							placeholder: '모델 선택',
							width: 250,
							data: modelOptionList
						}
					]
				}
			]
		}
	];

	const tableDataSource = {
		topItems: [
			{
				type: Constants.inputTypes.button,
				link: '/car/disount/create',
				label: '엑셀 다운로드',
				style: 'white-button big-button',
				width: 150
			},
			{
				type: Constants.inputTypes.upload,
				label: '엑셀 등록',
				style: 'black-button big-button',
				width: 150
			}
		],
		tableData: dataSource,
		tableColumns: columns
	};

	const onClickTableMore = async() => {
		const initDataSource = await GetExtraListAPI(offset + 10, searchData);
		setOffset(offset + initDataSource.length);
		
		setDataSource([
			...dataSource,
			...initDataSource
		]);
	};

	const onClickSearch = async(searchData) => {
		const initDataSource = await GetExtraListAPI(0, searchData);
		setOffset(0);
		setSearchData(searchData);

		setDataSource([
			...initDataSource
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
			<SearchPanel dataSource={searchDataSource} onSearch={onClickSearch}/>

			{/* Body Section */}
			<TableList dataSource={tableDataSource} />

			<Row justify='center'>
				<label className='show-more-label' onClick={onClickTableMore}>더보기</label>
			</Row>
		</Space>
    );
}

export default List;