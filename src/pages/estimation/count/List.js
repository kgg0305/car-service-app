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
				date: '2022-04-05',
				request1: 'naverblog',
				admin1: '렌트',
				total1: '김철수',
				request2: 'naverblog',
				admin2: '렌트',
				total2: '김철수',
			},
			{
				key: 2,
				date: '2022-04-05',
				request1: 'naverblog',
				admin1: '렌트',
				total1: '김철수',
				request2: 'naverblog',
				admin2: '렌트',
				total2: '김철수',
			},
		]
	);
	
	const columns = [
		{
			title: '날짜',
            dataIndex: 'date',
            key: 'date',
            align: 'center',
		},
		{
			title: '렌트/리스 문의 카운트',
			dataIndex: 'question1',
			key: 'question1',
            align: 'center',
            children: [
                {
                    title: '의뢰수',
                    dataIndex: 'request1',
                    key: 'request1',
                    align: 'center',
                },
                {
                    title: '관리자 입력수',
                    dataIndex: 'admin1',
                    key: 'admin1',
                    align: 'center',
                },
                {
                    title: '누계',
                    dataIndex: 'total1',
                    key: 'total1',
                    align: 'center',
                }
            ]
		},
		{
			title: '신차문의 카운트',
			dataIndex: 'question2',
			key: 'question2',
            align: 'center',
            children: [
                {
                    title: '의뢰수',
                    dataIndex: 'request2',
                    key: 'request2',
                    align: 'center',
                },
                {
                    title: '관리자 입력수',
                    dataIndex: 'admin2',
                    key: 'admin2',
                    align: 'center',
                },
                {
                    title: '누계',
                    dataIndex: 'total2',
                    key: 'total2',
                    align: 'center',
                }
            ]
		},
	];

	const searchRowList = [
		{
			height: 80,
			columns: [
				{
					titleText: '관리자 입력',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.label,
							label: '랜스/리스 문의 카운트'
						},
                        {
							type: Constants.inputTypes.input,
							placeholder: '숫자입력',
							width: 130,
						},
						{
							type: Constants.inputTypes.label,
							label: '신차 문의 카운트'
						},
                        {
							type: Constants.inputTypes.input,
							placeholder: '숫자입력',
							width: 130,
						},
						{
							type: Constants.inputTypes.label,
							label: '2022-03-31 날짜에 입력 됩니다.'
						}
					]
				}
			]
		}
	];

	const tableList = {
		topItems: [
			{
				type: Constants.inputTypes.select,
                width: 130,
                data: null
			},
            {
				type: Constants.inputTypes.select,
                width: 130,
                data: null
			},
            {
				type: Constants.inputTypes.button,
                label: '시간대별 카운트 자동설정',
                style: 'white-button'
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