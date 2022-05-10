import { Col, Divider, Row, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetBrandOptionListAPI } from '../../../api/Brand';
import { GetGroupListAPI } from '../../../api/Group';
import { GetCarKindOptionListAPI } from '../../../api/CarKind';
import SearchPanel from '../../../components/SearchPanel';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';

function List() {
	const [offset, setOffset] = useState(0);
	const [brandOptionList, setBrandOptionList] = useState([]);
	const [carKindOptionList, setCarKindOptionList] = useState([]);
	const [dataSource, setDataSource] = useState();
	const [searchData, setSearchData] = useState({
		brand_id: null,
		car_kind_id: null,
		is_use: null
	});
	
	const initComponent = async () => {
		const initDataSource = await GetGroupListAPI(offset);
		const initBrandOptionList = await GetBrandOptionListAPI();
		const initCarKindOptionList = await GetCarKindOptionListAPI();
		
		setDataSource(initDataSource);
		setBrandOptionList(initBrandOptionList);
		setCarKindOptionList(initCarKindOptionList);
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
			title: '차종',
			dataIndex: 'kind_name',
			key: 'kind_name',
            align: 'center',
		},
		{
			title: '사용여부',
			dataIndex: 'is_use',
			key: 'is_use',
            align: 'center',
			render: is_use => Constants.availableOptions.filter(item => item.value == is_use)[0].label
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
                            <Link to="/car/model">
                                <Button className='white-button small-button rounded-button'>모델관리</Button>
                            </Link>
                            <Link to={"/car/group/edit/" + idx}>
                                <Button className='black-button small-button rounded-button'>수정</Button>
                            </Link>
                        </Space>
                    </Col>
                </Row>,
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
							width: 400,
							data: brandOptionList
						}
					]
				},
				{
					titleText: '사용여부',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.select,
							name: 'is_use',
							placeholder: '선택',
							width: 150,
							data: Constants.availableOptions
						}
					]
				},
				{
					titleText: '차종',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.select,
							name: 'car_kind_id',
							placeholder: '선택',
							width: 150,
							data: carKindOptionList
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
				link: '/car/group/create',
				label: '등록',
				style: 'black-button big-button',
				width: 150
			}
		],
		tableData: dataSource,
		tableColumns: columns
	};

	const onClickTableMore = async() => {
		const initDataSource = await GetGroupListAPI(offset + 10, searchData);
		setOffset(offset + initDataSource.length);
		
		setDataSource([
			...dataSource,
			...initDataSource
		]);
	};

	const onClickSearch = async(searchData) => {
		const initDataSource = await GetGroupListAPI(0, searchData);
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
				<label className='main-header-title'>모델그룹 목록</label>
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