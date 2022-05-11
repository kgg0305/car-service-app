import { Col, Divider, Row, Space, Button, Image, Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { CreateCountAPI, GetCountInfoByDateAPI, GetCountListAPI, UpdateCountAPI } from '../../../api/Count';
import SearchPanel from '../../../components/SearchPanel';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';

// 목록페지
function List() {
	const [offset, setOffset] = useState(0);
	const [dataSource, setDataSource] = useState([]);
	const [searchData, setSearchData] = useState({
		rent_admin: '',
		new_admin: ''
	});

	const initComponent = async () => {
		const initDataSource = await GetCountListAPI(offset);
		
		setDataSource(initDataSource.map(body => {
			return({
				...body,
				reg_date_text: new Date(body.reg_date).getFullYear() + '-' + ("0" + (new Date(body.reg_date).getMonth() + 1)).slice(-2) + '-' + ("0" + new Date(body.reg_date).getDate()).slice(-2),
				rent_total: body.rent_request + body.rent_admin,
				new_total: body.new_request + body.new_admin
			})
		}));
	};

	useEffect(() => {
		initComponent();
	}, []);

	const columns = [
		{
			title: '날짜',
            dataIndex: 'reg_date_text',
            key: 'reg_date_text',
            align: 'center',
		},
		{
			title: '렌트/리스 문의 카운트',
			dataIndex: 'rent',
			key: 'rent',
            align: 'center',
            children: [
                {
                    title: '의뢰수',
                    dataIndex: 'rent_request',
                    key: 'rent_request',
                    align: 'center',
                },
                {
                    title: '관리자 입력수',
                    dataIndex: 'rent_admin',
                    key: 'rent_admin',
                    align: 'center',
                },
                {
                    title: '누계',
                    dataIndex: 'rent_total',
                    key: 'rent_total',
                    align: 'center',
                }
            ]
		},
		{
			title: '신차문의 카운트',
			dataIndex: 'new',
			key: 'new',
            align: 'center',
            children: [
                {
                    title: '의뢰수',
                    dataIndex: 'new_request',
                    key: 'new_request',
                    align: 'center',
                },
                {
                    title: '관리자 입력수',
                    dataIndex: 'new_admin',
                    key: 'new_admin',
                    align: 'center',
                },
                {
                    title: '누계',
                    dataIndex: 'new_total',
                    key: 'new_total',
                    align: 'center',
                }
            ]
		},
	];

	const searchDataSource = [
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
							name: 'rent_admin',
							placeholder: '숫자입력',
							width: 130,
						},
						{
							type: Constants.inputTypes.label,
							label: '신차 문의 카운트'
						},
                        {
							type: Constants.inputTypes.input,
							name: 'new_admin',
							placeholder: '숫자입력',
							width: 130,
						},
						{
							type: Constants.inputTypes.label,
							label: new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2) + ' 날짜에 입력 됩니다.'
						}
					]
				}
			]
		}
	];

	const tableDataSource = {
		topItems: [
			{
				type: Constants.inputTypes.select,
				name: 'year',
                width: 130,
                data: Constants.yearOptions
			},
            {
				type: Constants.inputTypes.select,
				name: 'month',
                width: 130,
                data: Constants.monthOptions
			},
            {
				type: Constants.inputTypes.button,
                label: '시간대별 카운트 자동설정',
				link: "/estimation/setting",
                style: 'white-button'
			}
		],
		tableData: dataSource,
		tableColumns: columns
	};

	const onClickTableMore = async() => {
		const initDataSource = await GetCountListAPI(offset + 10);
		setOffset(offset + initDataSource.length);
		
		setDataSource([
			...dataSource,
			...initDataSource.map(body => {
				return({
					...body,
					reg_date_text: new Date(body.reg_date).getFullYear() + '-' + ("0" + (new Date(body.reg_date).getMonth() + 1)).slice(-2) + '-' + ("0" + new Date(body.reg_date).getDate()).slice(-2),
					rent_total: body.rent_request + body.rent_admin,
					new_total: body.new_request + body.new_admin
				})
			})
		]);
	};

	const onClickSearch = async(searchData) => {
		const date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2);
		const existCountInfo = await GetCountInfoByDateAPI(date);

		if(existCountInfo) {
			existCountInfo.rent_admin += Number(searchData.rent_admin);
			existCountInfo.new_admin += Number(searchData.new_admin);
			await UpdateCountAPI(existCountInfo);
		} else {
			await CreateCountAPI({
				...searchData,
				rent_request: 0,
				new_request: 0
			});
		}

		const initDataSource = await GetCountListAPI(0);
		
		setOffset(0);
		setSearchData(searchData);

		setDataSource(initDataSource.map(body => {
			return({
				...body,
				reg_date_text: new Date(body.reg_date).getFullYear() + '-' + ("0" + (new Date(body.reg_date).getMonth() + 1)).slice(-2) + '-' + ("0" + new Date(body.reg_date).getDate()).slice(-2),
				rent_total: body.rent_request + body.rent_admin,
				new_total: body.new_request + body.new_admin
			})
		}));
	};

    return (
        <Space direction='vertical' size={18} className='main-layout'>
            {/* Page Header */}
            <Space direction='vertical' size={18}>
                <label className='main-header-title'>견적신청 목록</label>
                <Divider className='main-body-divider' />
            </Space>

            {/* Search Section */}
            <SearchPanel title={'견적/상담 카운트'} actionButtonTitle={'저장'} disableInitButton={true} dataSource={searchDataSource} onSearch={onClickSearch} />

            {/* Body Section */}
            <TableList dataSource={tableDataSource} />

        </Space>
    );
}

export default List;