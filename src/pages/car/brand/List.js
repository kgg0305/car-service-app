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
				logo: window.location.origin + '/images/logo/logo.png',
				brand: 'Ford',
				order: '10',
				available: '사용',
				count: '42',
				manage: '',
			},
			{
				key: 2,
				number: '1',
				logo: window.location.origin + '/images/logo/logo.png',
				brand: 'Ford',
				order: '10',
				available: '사용',
				count: '12',
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
			title: '로고',
			dataIndex: 'logo',
			key: 'logo',
            align: 'center',
			render: path => <Image src={path} />,
		},
		{
			title: '브랜드',
			dataIndex: 'brand',
			key: 'brand',
            align: 'center',
		},
		{
			title: '순서',
			dataIndex: 'order',
			key: 'order',
            align: 'center',
		},
		{
			title: '사용여부',
			dataIndex: 'available',
			key: 'available',
            align: 'center',
		},
		{
			title: '등록 차량수',
			dataIndex: 'count',
			key: 'count',
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
						<Space size={15} split={<Divider type="vertical" />}>
							<Link to="/car/brand/edit">
								<Button className='white-button small-button rounded-button'>그룹관리</Button>
							</Link>
							<Link to="/car/brand/edit">
								<Button className='black-button small-button rounded-button'>수정</Button>
							</Link>
						</Space>
					</Col>
				</Row>,
		},
	];

	const searchRowList = [
		{
			height: 80,
			columns: [
				{
					titleText: '차량선택',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.select,
							placeholder: '브랜드 선택',
							width: 400,
							data: null
						}
					]
				},
				{
					titleText: '사용여부',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.select,
							placeholder: '선택',
							width: 150,
							data: Constants.availableOptions
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
				link: '/car/brand/create',
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
				<label className='main-header-title'>브랜드 목록</label>
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