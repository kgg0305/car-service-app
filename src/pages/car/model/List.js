import { Col, Divider, Row, Space, Button, Select } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetBrandOptionListAPI } from '../../../api/Brand';
import { GetGroupOptionListAPI } from '../../../api/Group';
import { GetModelListAPI } from '../../../api/Model';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';
import { GetDateFullTimeStringUsingKorFromDate, GetDateTimeStringFromDate } from '../../../constants/GlobalFunctions';
import { CaretDownOutlined } from '@ant-design/icons'

// 목록페지
function List() {
	const [offset, setOffset] = useState(0);
	const [brandOptionList, setBrandOptionList] = useState([]);
	const [groupOptionList, setGroupOptionList] = useState([]);
	const [dataSource, setDataSource] = useState();
	const [searchData, setSearchData] = useState({
		brand_id: null,
		group_id: null,
		is_new: null,
		is_use: null
	});
	
	const initComponent = async () => {
		const initDataSource = await GetModelListAPI(offset);
		const initBrandOptionList = await GetBrandOptionListAPI();
		const initGroupOptionList = await GetGroupOptionListAPI();
		
		setDataSource(initDataSource);
		setBrandOptionList(initBrandOptionList);
		setGroupOptionList(initGroupOptionList);
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
			title: '모델그룹',
			dataIndex: 'group_name',
			key: 'group_name',
            align: 'center',
		},
        {
			title: '모델',
			dataIndex: 'model_name',
			key: 'model_name',
            align: 'center',
		},
        {
			title: '순서',
			dataIndex: 'sequence',
			key: 'sequence',
            align: 'center',
		},
        {
			title: '신차여부',
			dataIndex: 'is_new',
			key: 'is_new',
            align: 'center',
			render: is_new => 
				is_new == 0 ? '예' : '아니오'
		},
		{
			title: '사용여부',
			dataIndex: 'is_use',
			key: 'is_use',
            align: 'center',
			render: is_use => Constants.availableOptions.filter(item => item.value == is_use)[0].label
		},
        {
			title: '등록일',
			dataIndex: 'created_date',
			key: 'created_date',
            align: 'center',
			render: created_date => GetDateFullTimeStringUsingKorFromDate(new Date(created_date))
		},
		{
			title: '관리',
			dataIndex: 'idx',
			key: 'idx',
            align: 'center',
			render: idx => 
                <Row justify='center'>
                    <Col>
                        <Space size={15} split={<Divider type="vertical" />}>
                            <Link to="/car/lineup">
                                <Button className='white-button small-button rounded-button'>라인업관리</Button>
                            </Link>
                            <Link to={"/car/model/edit/" + idx}>
                                <Button className='black-button small-button rounded-button'>수정</Button>
                            </Link>
                        </Space>
                    </Col>
                </Row>,
		},
	];

	const tableDataSource = {
		topItems: [
			{
				type: Constants.inputTypes.button,
				link: '/car/model/create',
				label: '등록',
				style: 'black-button big-button',
				width: 150
			}
		],
		tableData: dataSource,
		tableColumns: columns
	};

	const onClickTableMore = async() => {
		const initDataSource = await GetModelListAPI(offset + 10, searchData);
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
                [name]: value
            }
        );
	};

	const onClickReset = () => {
		setSearchData(
			{
				brand_id: null,
				group_id: null,
				is_new: null,
				is_use: '0'
			}
		);

		onClickSearch(
			{
				brand_id: null,
				group_id: null,
				is_new: null,
				is_use: '0'
			}
		);
	};

	const onClickSearch = async(searchData) => {
		const initDataSource = await GetModelListAPI(0, searchData);
		setOffset(0);

		setDataSource([
			...initDataSource
		]);
	};

    return(
		<Space direction='vertical' size={18} className='main-layout'>
			{/* Page Header */}
			<Space direction='vertical' size={18}>
				<label className='main-header-title'>모델 목록</label>
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
								style={{ width: 400 }}
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
								style={{ width: 400 }}
							>
								{
									groupOptionList.filter(item => item.brand_id == searchData.brand_id).map((optionItem, optionIndex) => (
										<Select.Option key={optionIndex} value={optionItem.value}>
											{optionItem.label}
										</Select.Option>
									))
								}
							</Select>
						</Space>
					</Col>
				</Row>
				<Row key={1} gutter={[0]} align="middle" style={{ height: 80 }} className='table'>
					<Col flex="154px" className='table-header'>
						<label className='table-header-label'>신차여부</label>
					</Col>
					<Col flex="auto" className='table-value'>
						<Space size={6}>
							<Select
								name='is_new' 
								value={searchData.is_new} 
								onChange={value => {
									onChangeSearchComponent('is_new', value);
								}}
								suffixIcon={<CaretDownOutlined />}
								placeholder="선택"
								size='large'
								style={{ width: 150 }}
							>
								{
									Constants.isNewOptions.map((optionItem, optionIndex) => (
										<Select.Option key={optionIndex} value={optionItem.value}>
											{optionItem.label}
										</Select.Option>
									))
								}
							</Select>
						</Space>
					</Col>
					<Col flex="154px" className='table-header'>
						<label className='table-header-label'>사용여부</label>
					</Col>
					<Col flex="auto" className='table-value'>
						<Space size={6}>
							<Select
								name='is_use' 
								value={searchData.is_use} 
								onChange={value => {
									onChangeSearchComponent('is_use', value);
								}}
								suffixIcon={<CaretDownOutlined />}
								placeholder="선택"
								size='large'
								style={{ width: 150 }}
							>
								{
									Constants.availableOptions.map((optionItem, optionIndex) => (
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