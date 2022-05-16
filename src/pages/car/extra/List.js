import { Divider, Space, Row, Select, Col, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { GetBrandOptionListAPI } from '../../../api/Brand';
import { GetGroupOptionListAPI } from '../../../api/Group';
import { GetModelOptionListAPI } from '../../../api/Model';
import { DownloadExtraFileAPI, GetExtraListAPI } from '../../../api/Extra';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';
import { CaretDownOutlined } from '@ant-design/icons';

// 목록페지
function List() {
	const [offset, setOffset] = useState(0);
	const [brandOptionList, setBrandOptionList] = useState([]);
	const [groupOptionList, setGroupOptionList] = useState([]);
	const [modelOptionList, setModelOptionList] = useState([]);
	const [dataSource, setDataSource] = useState();
	const [searchData, setSearchData] = useState({
		brand_id: null,
		group_id: null,
		model_id: null
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
				onClick: DownloadExtraFileAPI,
				label: '엑셀 다운로드',
				style: 'white-button'
			},
			{
				type: Constants.inputTypes.upload,
				action: '',
				accept: '.xlsx',
				label: '엑셀 등록',
				style: 'black-button'
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

	const onChangeSearchComponent = (name, value) => {
		setSearchData(
            { 
                ...searchData,
                group_id: name == 'brand_id' ? null : searchData.group_id,
                model_id: (name == 'brand_id' || name == 'group_id') ? null : searchData.model_id,
                [name]: value
            }
        );
	};

	const onClickReset = () => {
		setSearchData(
			{
				brand_id: null,
				group_id: null,
				model_id: null
			}
		);

		onClickSearch(
			{
				brand_id: null,
				group_id: null,
				model_id: null
			}
		);
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
			<Space direction='vertical' size={20}>
				<label className='title-label'>검색</label>
				<Space direction='vertical' size={0}>
				<Row key={1} gutter={[0]} align="middle" style={{ height: 80 }} className='table'>
					<Col flex="154px" className='table-header'>
						<label className='table-header-label'>차량</label>
					</Col>
					<Col flex="auto" className='table-value'>
						<Space size={6}>
							<Select
								name='brand_id' 
								value={searchData.brand_id} 
								onChange={value => {
									onChangeSearchComponent('brand_id', value);
								}}
								suffixIcon={<CaretDownOutlined />}
								placeholder="브랜드 선택"
								size='large'
								style={{ width: 300 }}
							>
								{
									brandOptionList.map((optionItem, optionIndex) => (
										<Select.Option key={optionIndex} value={optionItem.value}>
											{optionItem.label}
										</Select.Option>
									))
								}
							</Select>
							<Select
								name='group_id' 
								value={searchData.group_id} 
								onChange={value => {
									onChangeSearchComponent('group_id', value);
								}}
								suffixIcon={<CaretDownOutlined />}
								placeholder="모델그룹 선택"
								size='large'
								style={{ width: 300 }}
							>
								{
									groupOptionList.filter(item => item.brand_id == searchData.brand_id).map((optionItem, optionIndex) => (
										<Select.Option key={optionIndex} value={optionItem.value}>
											{optionItem.label}
										</Select.Option>
									))
								}
							</Select>
							<Select
								name='model_id' 
								value={searchData.model_id} 
								onChange={value => {
									onChangeSearchComponent('model_id', value);
								}}
								suffixIcon={<CaretDownOutlined />}
								placeholder="모델 선택"
								size='large'
								style={{ width: 300 }}
							>
								{
									modelOptionList.filter(item => item.group_id === searchData.group_id).map((optionItem, optionIndex) => (
										<Select.Option key={optionIndex} value={optionItem.value}>
											{optionItem.label}
										</Select.Option>
									))
								}
							</Select>
						</Space>
					</Col>
				</Row>
				</Space>
				
				<Row key={2} justify="center" gutter={[17, 0]}>
					<Col>
						<Button className='white-button big-button' onClick={onClickReset}>초기화</Button>
					</Col>
					<Col>
						<Button className='black-button big-button' onClick={() => onClickSearch(searchData)}>검색</Button>
					</Col>
				</Row>
			</Space>

			{/* Body Section */}
			<TableList dataSource={tableDataSource} />

			<Row justify='center'>
				<label className='show-more-label' onClick={onClickTableMore}>더보기</label>
			</Row>
		</Space>
    );
}

export default List;