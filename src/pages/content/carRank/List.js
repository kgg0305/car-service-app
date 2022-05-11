import { Col, Divider, Row, Space, Button, Image, Modal, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { GetModelInfoAPI } from '../../../api/Model';
import { GetRankInfoAPI } from '../../../api/Rank';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';

// 목록페지
function List() {
    const [offset, setOffset] = useState(0);
	const [rankBodyInfo, setRankBodyInfo] = useState({
		idx: null,
		type: 1,
		ids: '',
		created_date: ''
	});
	const [dataSource, setDataSource] = useState([]);
	
	const initComponent = async ( ) => {
		const initDataSource = await GetRankInfoAPI(1);

		var initModelBodyList = [];
        for (let index = 0; index < initDataSource.ids.split(',').length; index++) {
            const id = initDataSource.ids.split(',')[index];
            initModelBodyList.push({
                ...(await GetModelInfoAPI(id)), 
                number: index + 1
            });
        }

		setRankBodyInfo({
			...initDataSource,
			created_date: new Date(initDataSource.created_date).getFullYear() + '-' + ("0" + (new Date(initDataSource.created_date).getMonth() + 1)).slice(-2) + '-' + ("0" + new Date(initDataSource.created_date).getDate()).slice(-2) + ' ' + new Date(initDataSource.created_date).getHours() + '시' + new Date(initDataSource.created_date).getMinutes() + '분'
		});
		setDataSource(initModelBodyList);
	};

	useEffect(() => {
		initComponent();
	}, []);
	
	const columns = [
		{
			title: '순위',
			dataIndex: 'number',
			key: 'number',
            align: 'center',
		},
        {
			title: '수입여부',
			dataIndex: 'is_income',
			key: 'is_income',
            align: 'center',
			render: is_income => Constants.incomeOptions.filter(item => item.value == is_income).length ? Constants.incomeOptions.filter(item => item.value == is_income)[0].label : ''
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
	];

	const tableList = {
        title: '등록일 ' + rankBodyInfo.created_date,
        topItems: [
            {
				type: Constants.inputTypes.button,
				link: '/content/carRank/edit',
				label: '순위 수정',
				style: 'white-button big-button',
				width: 150
			},
			{
				type: Constants.inputTypes.button,
				link: '/content/carRank/create',
				label: '순위 등록',
				style: 'black-button big-button',
				width: 150
			}
		],
		tableData: dataSource,
		tableColumns: columns
	};

    return(
        <>
            <Space direction='vertical' size={18} className='main-layout'>
                {/* Page Header */}
                <Space direction='vertical' size={18}>
                    <label className='main-header-title'>자동차 인기순위</label>
                    <Divider className='main-body-divider' />
                </Space>

                {/* Body Section */}
                <TableList dataSource={tableList} />

            </Space>
        </>
    );
}

export default List;