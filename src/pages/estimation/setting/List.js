import { Col, Divider, Row, Space, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';

function List() {
    const initDataSource = [];
    for (let index = 0; index < 25; index++) {
        initDataSource.push(
            {
				key: index,
				time: index + '시 ~',
				question1: '',
				question2: '',
			}
        );
    }
    const [dataSource, setDataSource] = useState(initDataSource);
	
	const columns = [
		{
			title: '시간대',
            dataIndex: 'time',
            key: 'time',
            align: 'center',
		},
		{
			title: '리스/렌탈 문의 (최저~최고값)',
			dataIndex: 'question1',
			key: 'question1',
            align: 'center',
            render: path => 
                <Row justify='center'>
					<Col>
						<Space size={20}>
                            <Input key={0} size={'large'} style={{ width: 130 }} placeholder='숫자입력' />
                            <label>~</label>
                            <Input key={0} size={'large'} style={{ width: 130 }} placeholder='숫자입력' />
						</Space>
					</Col>
				</Row>,
		},
		{
			title: '신차문의 (최저~최고값)',
			dataIndex: 'question2',
			key: 'question2',
            align: 'center',
            render: path => 
                <Row justify='center'>
					<Col>
						<Space size={20}>
                            <Input key={0} size={'large'} style={{ width: 130 }} placeholder='숫자입력' />
                            <label>~</label>
                            <Input key={0} size={'large'} style={{ width: 130 }} placeholder='숫자입력' />
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
        title: '시간대별 카운트 자동입력 설정',
		tableData: dataSource,
		tableColumns: columns
	};

    return (
        <Space direction='vertical' size={18} className='main-layout'>
            {/* Body Section */}
            <TableList dataSource={tableList} />
        </Space>
    );
}

export default List;