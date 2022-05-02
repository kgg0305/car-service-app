import { Col, Divider, Row, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetLineupListAPI } from '../../../api/Lineup';
import { GetBrandOptionListAPI } from '../../../api/Brand';
import { GetGroupOptionListAPI } from '../../../api/Group';
import { GetModelOptionListAPI } from '../../../api/Model';
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
		const initDataSource = await GetLineupListAPI(offset);
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
			title: '라인업',
			dataIndex: 'lineup_name',
			key: 'lineup_name',
            align: 'center',
		},
		{
			title: '사용여부',
			dataIndex: 'is_use',
			key: 'is_use',
            align: 'center',
			render: is_use => 
				is_use == 0 ? '사용' : '미사용'
		},
        {
			title: '등록일',
			dataIndex: 'register',
			key: 'register',
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
                            <Link to="/car/lineup/edit">
                                <Button className='white-button small-button rounded-button'>그룹관리</Button>
                            </Link>
                            <Link to={"/car/lineup/edit/" + idx}>
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
							width: 300,
							data: brandOptionList
						},
						{
							type: Constants.inputTypes.select,
							name: 'group_id',
							placeholder: '모델그룹 선택',
							width: 300,
							data: groupOptionList
						},
						{
							type: Constants.inputTypes.select,
							name: 'model_id',
							placeholder: '모델 선택',
							width: 300,
							data: modelOptionList
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
				link: '/car/lineup/create',
				label: '등록',
				style: 'black-button big-button',
				width: 150
			}
		],
		tableData: dataSource,
		tableColumns: columns
	};

	const onClickTableMore = async() => {
		const initDataSource = await GetLineupListAPI(offset + 10, searchData);
		setOffset(offset + initDataSource.length);
		
		setDataSource([
			...dataSource,
			...initDataSource
		]);
	};

	const onClickSearch = async(searchData) => {
		const initDataSource = await GetLineupListAPI(0, searchData);
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
				<label className='main-header-title'>라인업 목록</label>
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