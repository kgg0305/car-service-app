import { Col, Divider, Row, Space, Button, Image, Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import SearchPanel from '../../../components/SearchPanel';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';

function List() {
    const [dataSource, setDataSource] = useState(
		[
			{
				key: 1,
				number: '1',
				area: '강남',
				name: '김철수',
				quote: '100',
				wait: '30',
				meet: '20',
				agree: '40',
				export: '6',
				end: '4',
				manage: '',
			},
			{
				key: 2,
				number: '1',
				area: '강남',
				name: '김철수',
				quote: '100',
				wait: '30',
				meet: '20',
				agree: '40',
				export: '6',
				end: '4',
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
			title: '지점',
			dataIndex: 'area',
			key: 'area',
            align: 'center',
		},
		{
			title: '이름',
			dataIndex: 'name',
			key: 'name',
            align: 'center',
		},
		{
			title: '견적서',
			dataIndex: 'quote',
			key: 'quote',
            align: 'center',
		},
		{
			title: '대기',
			dataIndex: 'wait',
			key: 'wait',
            align: 'center',
		},
		{
			title: '상담',
			dataIndex: 'meet',
			key: 'meet',
            align: 'center',
		},
		{
			title: '계약',
			dataIndex: 'agree',
			key: 'agree',
            align: 'center',
		},
		{
			title: '출고',
			dataIndex: 'export',
			key: 'export',
            align: 'center',
		},
		{
			title: '종료',
			dataIndex: 'end',
			key: 'end',
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
							<Link to="/estimation/assignment/manage">
								<Button className='black-button small-button rounded-button'>할당관리</Button>
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
					titleText: '지점',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.select,
							placeholder: '지점 선택',
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
							placeholder: '이름 입력',
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
				link: '/car/model/create',
				label: '등록',
				style: 'black-button big-button',
				width: 150
			}
		],
		subItems: [
			{
				type: Constants.inputTypes.input,
				disabled: true,
				label: '견적서',
				value: '999,999,999',
				width: 130
			},
			{
				type: Constants.inputTypes.input,
				disabled: true,
				label: '대기',
				value: '999,999,999',
				width: 130
			},
			{
				type: Constants.inputTypes.input,
				disabled: true,
				label: '상담',
				value: '999,999,999',
				width: 130
			},
			{
				type: Constants.inputTypes.input,
				disabled: true,
				label: '계약',
				value: '999,999,999',
				width: 130
			},
			{
				type: Constants.inputTypes.input,
				disabled: true,
				label: '출고',
				value: '999,999,999',
				width: 130
			},
			{
				type: Constants.inputTypes.input,
				disabled: true,
				label: '종료',
				value: '999,999,999',
				width: 130
			}
		],
		tableData: dataSource,
		tableColumns: columns
	};

    return (
        <Space direction='vertical' size={18} className='main-layout'>
            {/* Page Header */}
            <Space direction='vertical' size={18}>
                <label className='main-header-title'>견적신청 목록</label>
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