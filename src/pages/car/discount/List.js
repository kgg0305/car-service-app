import { Col, Divider, Row, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetBrandOptionListAPI } from '../../../api/Brand';
import { GetDiscountKindListAPI, GetDiscountKindOptionListAPI } from '../../../api/DiscountKind';
import SearchPanel from '../../../components/SearchPanel';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';

function List() {
	const [offset, setOffset] = useState(0);
	const [brandOptionList, setBrandOptionList] = useState([]);
	const [discountKindOptionList, setDiscountKindOptionList] = useState([]);
	const [dataSource, setDataSource] = useState();
	const [searchData, setSearchData] = useState({
		brand_id: null,
		idx: null,
		s_date: null,
		e_date: null
	});
	
	const initComponent = async () => {
		const initDataSource = await GetDiscountKindListAPI(offset);
		const initBrandOptionList = await GetBrandOptionListAPI();
		const initDiscountKindOptionList = await GetDiscountKindOptionListAPI();
		
		setDataSource(initDataSource);
		setBrandOptionList(initBrandOptionList);
		setDiscountKindOptionList(initDiscountKindOptionList);
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
			title: '종류',
			dataIndex: 'kind_name',
			key: 'kind_name',
            align: 'center',
		},
        {
			title: '조건',
			dataIndex: 'condition_name',
			key: 'condition_name',
            align: 'center',
		},
        {
			title: '할인비용',
			dataIndex: 'discount_price',
			key: 'discount_price',
            align: 'center',
		},
        {
			title: '시작일',
			dataIndex: 's_date',
			key: 's_date',
            align: 'center',
		},
		{
			title: '종료일',
			dataIndex: 'e_date',
			key: 'e_date',
            align: 'center',
		},
		{
			title: '관리',
			dataIndex: 'idx',
			key: 'idx',
            align: 'center',
			render: idx => 
                <Row justify='center'>
                    <Col>
                        <Link to={"/car/discount/edit/" + idx}>
                            <Button className='black-button small-button rounded-button'>수정</Button>
                        </Link>
                    </Col>
                </Row>,
		},
	];

	const searchDataSource = [
		{
			height: 80,
			columns: [
				{
					titleText: '브랜드',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.select,
							name: 'brand_id',
							placeholder: '브랜드 선택',
							width: 300,
							data: brandOptionList
						},
						{
							type: Constants.inputTypes.select,
							name: 'idx',
							placeholder: '할인종류 선택',
							width: 300,
							data: discountKindOptionList
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
							name: 's_date',
							placeholder: '시작일'
						},
						{
							type: Constants.inputTypes.label,
							label: '~'
						},
						{
							type: Constants.inputTypes.datePicker,
							name: 'e_date',
							placeholder: '종료일'
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
				link: '/car/discount/create',
				label: '등록',
				style: 'black-button big-button',
				width: 150
			}
		],
		tableData: dataSource,
		tableColumns: columns
	};

	const onClickTableMore = async() => {
		const initDataSource = await GetDiscountKindListAPI(offset + 10, searchData);
		setOffset(offset + initDataSource.length);
		
		setDataSource([
			...dataSource,
			...initDataSource
		]);
	};

	const onClickSearch = async(searchData) => {
		const initDataSource = await GetDiscountKindListAPI(0, searchData);
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
				<label className='main-header-title'>할인/비용 목록</label>
				<Divider className='main-body-divider' />
			</Space>

			{/* Search Section */}
			<SearchPanel dataSource={searchDataSource} onSearch={onClickSearch} />

			{/* Body Section */}
			<TableList dataSource={tableDataSource} />

			<Row justify='center'>
				<label className='show-more-label' onClick={onClickTableMore}>더보기</label>
			</Row>
		</Space>
    );
}

export default List;