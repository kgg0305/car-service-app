import { Col, Divider, Row, Space, Select, Button, Image } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import SearchPanel from '../../../components/SearchPanel';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';

const { Option } = Select;

function List() {
	const [dataSource, setDataSource] = useState(
		[
			{
				key: 1,
				number: '1',
				divider: 'user',
				group: 'Ford',
				name: 'kkk',
				contact: 'kkk@gmail.com',
				email: 'kkk@gmail.com',
				manage: '',
			},
			{
				key: 2,
				number: '2',
				divider: 'user',
				group: 'Ford',
				name: 'kkk',
				contact: 'kkk@gmail.com',
				email: 'kkk@gmail.com',
				manage: '',
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
			title: '구분',
			dataIndex: 'divider',
			key: 'divider',
            align: 'center',
		},
		{
			title: '그룹',
			dataIndex: 'group',
			key: 'group',
            align: 'center',
		},
		{
			title: '이름',
			dataIndex: 'name',
			key: 'name',
            align: 'center',
		},
		{
			title: '연락처',
			dataIndex: 'contact',
			key: 'contact',
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
			dataIndex: 'manage',
			key: 'manage',
            align: 'center',
			render: path => 
				<Row justify='center'>
					<Col>
						<Link to="/user/manage/edit">
							<Button className='black-button small-button rounded-button'>수정</Button>
						</Link>
					</Col>
				</Row>,
		},
	];

	const searchRowList = [
		{
			height: 80,
			columns: [
				{
					titleText: '그룹',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.select,
							placeholder: '구분',
							width: 200,
							data: null
						},
						{
							type: Constants.inputTypes.select,
							placeholder: '그룹',
							width: 200,
							data: null
						}
					]
				},
				{
					titleText: '이름',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.input,
							placeholder: '이름입력',
							width: 200
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
				link: '/user/manage/create',
				label: '등록',
				style: 'black-button big-button',
				width: 150
			}
		],
		tableData: dataSource,
		tableColumns: columns
	};

	const onClickTableMore = () => {
		setDataSource([
			...dataSource,
			{
				number: '1',
				logo: window.location.origin + '/images/logo/logo.png',
				brand: 'Ford',
				order: '1',
				available: '사용',
				count: '3',
				manage: '',
			},
			{
				number: '1',
				logo: window.location.origin + '/images/logo/logo.png',
				brand: 'Ford',
				order: '2',
				available: '사용',
				count: '4',
				manage: '',
			}
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
			<SearchPanel dataSource={searchRowList} />

			{/* Body Section */}
			<TableList dataSource={tableList} />

		</Space>
    );
}

export default List;