import { Col, Divider, Row, Space, Button, Switch } from 'antd';
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
				name: '32',
				category: '블루멤버스 포인트 선사용',
                title: '2회 이상 재구매 고객',
                news: '-100,000원',
                views: '2022-01-24',
				date: '2022-02-24',
                available: '',
				manage: '',
			},
			{
				key: 2,
				number: '2',
				name: '32',
				category: '블루멤버스 포인트 선사용',
                title: '2회 이상 재구매 고객',
                news: '-100,000원',
                views: '2022-01-24',
				date: '2022-02-24',
                available: '',
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
			title: '매체명',
			dataIndex: 'name',
			key: 'name',
            align: 'center',
		},
		{
			title: '카테고리',
			dataIndex: 'category',
			key: 'category',
            align: 'center',
		},
        {
			title: '콘텐츠 제목',
			dataIndex: 'title',
			key: 'title',
            align: 'center',
		},
        {
			title: '추천뉴스',
			dataIndex: 'news',
			key: 'news',
            align: 'center',
		},
        {
			title: '조회수',
			dataIndex: 'views',
			key: 'views',
            align: 'center',
		},
		{
			title: '등록일',
			dataIndex: 'date',
			key: 'date',
            align: 'center',
		},
		{
			title: '사용여부',
			dataIndex: 'available',
			key: 'available',
            align: 'center',
            render: path => 
                <Row justify='center'>
                    <Col>
                        <Space size={11}>
                            <Switch width={100} height={40} />
                            <label className='switch-label'>사용</label>
                        </Space>
                    </Col>
                </Row>,
		},
		{
			title: '관리',
			dataIndex: 'manage',
			key: 'manage',
            align: 'center',
			render: path => 
                <Row justify='center'>
                    <Col>
                        <Link to="/car/discount/edit">
                            <Button className='black-button small-button rounded-button'>삭제</Button>
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
					titleText: '날짜',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.button,
							label: '전체',
							style: 'black-button'
						},
						{
							type: Constants.inputTypes.button,
							label: '오늘',
							style: 'white-button'
						},
						{
							type: Constants.inputTypes.button,
							label: '어제',
							style: 'white-button'
						},
						{
							type: Constants.inputTypes.button,
							label: '3일',
							style: 'white-button'
						},
						{
							type: Constants.inputTypes.button,
							label: '7일',
							style: 'white-button'
						},
						{
							type: Constants.inputTypes.button,
							label: '1개월',
							style: 'white-button'
						},
						{
							type: Constants.inputTypes.button,
							label: '3개월',
							style: 'white-button'
						},
						{
							type: Constants.inputTypes.datePicker,
							placeholder: '시작일'
						},
						{
							type: Constants.inputTypes.label,
							label: '~'
						},
						{
							type: Constants.inputTypes.datePicker,
							placeholder: '종료일'
						}
					]
				},
                {
					titleText: '매체',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.select,
							placeholder: '선택',
							width: 150,
							data: null
						}
					]
				}
			]
		},
        {
			height: 80,
			columns: [
				{
					titleText: '검색어',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.input,
							placeholder: '검색어 입력',
							width: 200
						}
					]
				},
                {
					titleText: '카테고리',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.select,
							placeholder: '선택',
							width: 150,
							data: null
						}
					]
				},
                {
					titleText: '추천뉴스',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.select,
							placeholder: '선택',
							width: 150,
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
							data: null
						}
					]
				}
			]
		}
	];

	const tableList = {
		tableData: dataSource,
		tableColumns: columns
	};

    return(
		<Space direction='vertical' size={18} className='main-layout'>
			{/* Page Header */}
			<Space direction='vertical' size={18}>
				<label className='main-header-title'>콘텐츠 관리</label>
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