import { Col, Divider, Row, Space, Select, Button, Image } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetGroupOptionListAPI } from '../../../api/Group';
import { GetUserListAPI } from '../../../api/User';
import SearchPanel from '../../../components/SearchPanel';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';

const { Option } = Select;

// 목록페지
function List() {
	const [offset, setOffset] = useState(0);
	const [groupOptionList, setGroupOptionList] = useState([]);
	const [dataSource, setDataSource] = useState();
	const [searchData, setSearchData] = useState({
		type_id: null,
		group_id: null,
		name: ''
	});
	
	const initComponent = async () => {
		const initDataSource = await GetUserListAPI(offset);
		const initGroupOptionList = await GetGroupOptionListAPI();
		
		setDataSource(initDataSource);
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
			title: '구분',
			dataIndex: 'type_id',
			key: 'type_id',
            align: 'center',
			render: type_id => Constants.userTypeOptions.filter(item => item.value === type_id).length ? Constants.userTypeOptions.filter(item => item.value === type_id)[0].label : '',
		},
		{
			title: '그룹',
			dataIndex: 'group_id',
			key: 'group_id',
            align: 'center',
			render: group_id => groupOptionList.filter(item => item.value === group_id).length ? groupOptionList.filter(item => item.value === group_id)[0].label : '',
		},
		{
			title: '이름',
			dataIndex: 'name',
			key: 'name',
            align: 'center',
		},
		{
			title: '연락처',
			dataIndex: 'phone',
			key: 'phone',
            align: 'center',
		},
		{
			title: '이메일',
			dataIndex: 'email',
			key: 'email',
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
						<Link to={"/user/manage/edit/" + idx}>
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
					titleText: '그룹',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.select,
							name: 'type_id',
							placeholder: '구분',
							width: 200,
							data: Constants.userTypeOptions
						},
						{
							type: Constants.inputTypes.select,
							name: 'group_id',
							placeholder: '그룹',
							width: 200,
							data: groupOptionList
						}
					]
				},
				{
					titleText: '이름',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.input,
							name: 'name',
							placeholder: '이름입력',
							width: 200
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
				link: '/user/manage/create',
				label: '등록',
				style: 'black-button big-button',
				width: 150
			}
		],
		tableData: dataSource,
		tableColumns: columns
	};

	const onClickTableMore = async() => {
		const initDataSource = await GetUserListAPI(offset + 10, searchData);
		setOffset(offset + initDataSource.length);
		
		setDataSource([
			...dataSource,
			...initDataSource
		]);
	};

	const onClickSearch = async(searchData) => {
		const initDataSource = await GetUserListAPI(0, searchData);
		
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
				<label className='main-header-title'>사용자 관리</label>
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