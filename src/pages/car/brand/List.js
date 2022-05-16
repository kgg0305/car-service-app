import { Col, Divider, Row, Space, Select, Button, Image } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetBrandListAPI, GetBrandOptionListAPI } from '../../../api/Brand';
import SearchPanel from '../../../components/SearchPanel';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';

const { Option } = Select;

// 목록페지
function List() {
	const [offset, setOffset] = useState(0);
	const [brandOptionList, setBrandOptionList] = useState([]);
	const [dataSource, setDataSource] = useState([]);
	const [searchData, setSearchData] = useState({
		idx: '',
		is_use: null
	});

	const initComponent = async () => {
		const initDataSource = await GetBrandListAPI(offset);
		const initBrandOptionList = await GetBrandOptionListAPI();
		
		setDataSource(initDataSource);
		setBrandOptionList(initBrandOptionList);
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
			title: '로고',
			dataIndex: 'logo',
			key: 'logo',
            align: 'center',
			render: path => <Image width={60} src={window.location.origin + '/uploads/brand/' + path} />,
		},
		{
			title: '브랜드',
			dataIndex: 'brand_name',
			key: 'brand_name',
            align: 'center',
		},
		{
			title: '순서',
			dataIndex: 'sequence',
			key: 'sequence',
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
			title: '등록 차량수',
			dataIndex: 'count',
			key: 'count',
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
						<Space size={15} split={<Divider type="vertical" />}>
							<Link to={"/car/group/manage/" + idx}>
								<Button className='white-button small-button rounded-button'>그룹관리</Button>
							</Link>
							<Link to={"/car/brand/edit/" + idx}>
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
					titleText: '차량선택',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.select,
							name: 'idx',
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
				}
			]
		}
	];

	const tableDataSource = {
		topItems: [
			{
				type: Constants.inputTypes.button,
				link: '/car/brand/create',
				label: '등록',
				style: 'black-button big-button',
				width: 150
			}
		],
		tableData: dataSource,
		tableColumns: columns
	};

	const onClickTableMore = async() => {
		const initDataSource = await GetBrandListAPI(offset + 10, searchData);
		setOffset(offset + initDataSource.length);
		
		setDataSource([
			...dataSource,
			...initDataSource
		]);
	};

	const onClickSearch = async(searchData) => {
		const initDataSource = await GetBrandListAPI(0, searchData);
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
				<label className='main-header-title'>브랜드 목록</label>
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