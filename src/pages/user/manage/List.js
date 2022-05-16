import { Col, Divider, Row, Space, Select, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetUserListAPI } from '../../../api/User';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';
import { CaretDownOutlined } from '@ant-design/icons'

const { Option } = Select;

// 목록페지
function List() {
	const [offset, setOffset] = useState(0);
	const [dataSource, setDataSource] = useState([]);
	const [searchData, setSearchData] = useState({
		type_id: null,
		group_id: null,
		name: ''
	});
	
	const initComponent = async () => {
		const initDataSource = await GetUserListAPI(offset);
		
		setDataSource(initDataSource);
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
			dataIndex: 'idx',
			key: 'idx',
            align: 'center',
			render: idx => renderGroupField(idx)
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

	const onChangeSearchComponent = (name, value) => {
		setSearchData(
            { 
                ...searchData,
                group_id: name == 'type_id' ? null : searchData.group_id,
                [name]: value
            }
        );
	};

	const onClickReset = () => {
		setSearchData(
			{
				type_id: null,
				group_id: null,
				name: ''
			}
		);

		onClickSearch(
			{
				type_id: null,
				group_id: null,
				name: ''
			}
		);
	};

	const onClickSearch = async(searchData) => {
		const initDataSource = await GetUserListAPI(0, searchData);
		
		setOffset(0);
		setSearchData(searchData);

		setDataSource([
			...initDataSource
		]);
	};

	const renderGroupField = (idx) => {
		const userInfo = dataSource.filter(item => item.idx === idx)[0];
		return (
			userInfo.type_id == '0' ?
			Constants.userTeamGroupOptions.filter(item => item.value === userInfo.group_id)[0].label :
			Constants.userAreaGroupOptions.filter(item => item.value === userInfo.group_id)[0].label
		);
	};

    return(
		<Space direction='vertical' size={18} className='main-layout'>
			{/* Page Header */}
			<Space direction='vertical' size={18}>
				<label className='main-header-title'>사용자 관리</label>
				<Divider className='main-body-divider' />
			</Space>

			{/* Search Section */}
			<Space direction='vertical' size={20}>
				<label className='title-label'>검색</label>
				<Space direction='vertical' size={0}>
				<Row key={1} gutter={[0]} align="middle" style={{ height: 80 }} className='table'>
					<Col flex="154px" className='table-header'>
						<label className='table-header-label'>그룹</label>
					</Col>
					<Col flex="auto" className='table-value'>
						<Space size={6}>
							<Select
								name='type_id' 
								value={searchData.type_id} 
								onChange={value => {
									onChangeSearchComponent('type_id', value);
								}}
								suffixIcon={<CaretDownOutlined />}
								placeholder="선택"
								size='large'
								style={{ width: 200 }}
							>
								{
									Constants.userTypeOptions.map((optionItem, optionIndex) => (
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
								placeholder="선택"
								size='large'
								style={{ width: 200 }}
							>
								{
									searchData.type_id === '0' ?
									Constants.userTeamGroupOptions.map((optionItem, optionIndex) => (
										<Select.Option key={optionIndex} value={optionItem.value}>
											{optionItem.label}
										</Select.Option>
									)) :
									searchData.type_id === '1' ?
									Constants.userAreaGroupOptions.map((optionItem, optionIndex) => (
										<Select.Option key={optionIndex} value={optionItem.value}>
											{optionItem.label}
										</Select.Option>
									)) : ''
								}
							</Select>
						</Space>
					</Col>
					<Col flex="154px" className='table-header'>
						<label className='table-header-label'>사용여부</label>
					</Col>
					<Col flex="auto" className='table-value'>
						<Space size={6}>
							<Input
								name='name' 
								value={searchData.name} 
								onChange={e => {
									onChangeSearchComponent(e.target.name, e.target.value);
								}}
								placeholder="이름입력"
								size='large'
								style={{ width: 200 }}
							/>
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