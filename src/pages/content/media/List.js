import { Col, Divider, Row, Space, Progress } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import SearchPanel from '../../../components/SearchPanel';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';
import styles from '../../../assets/styles/pages/content/Media.module.css';

function List() {
	const [dataSource, setDataSource] = useState(
		[
			{
				key: 1,
				rank: '1',
				name: '줌자동차',
				view: '999,999,999',
                rate: 20,
                average: '999 시간',
			},
			{
				key: 2,
				rank: '1',
				name: '줌자동차',
				view: '999,999,999',
                rate: 30,
                average: '999 시간',
			},
		]
	);
	
	const columns = [
		{
			title: '순위',
			dataIndex: 'rank',
			key: 'rank',
            align: 'center',
		},
		{
			title: '매체명',
			dataIndex: 'name',
			key: 'name',
            align: 'center',
		},
		{
			title: '페이지뷰(PV)',
			dataIndex: 'view',
			key: 'view',
            align: 'center',
		},
        {
			title: '비율',
			dataIndex: 'rate',
			key: 'rate',
            align: 'center',
            render: rate => (
                <Progress type='line' strokeWidth={30} strokeColor='#3FA9CB' strokeLinecap='square' percent={rate} />
            )
		},
        {
			title: '평균체류시간',
			dataIndex: 'average',
			key: 'average',
            align: 'center',
		}
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
		}
	];

	const tableList = {
        title: '페이지뷰 순위',
		tableData: dataSource,
		tableColumns: columns
	};

    return(
		<Space direction='vertical' size={18} className='main-layout'>
			{/* Page Header */}
			<Space direction='vertical' size={18}>
				<label className='main-header-title'>매체별 페이지뷰</label>
				<Divider className='main-body-divider' />
			</Space>

			{/* Search Section */}
			<SearchPanel dataSource={searchRowList} />

            <Space direction='vertical' size={20}>
                <label>페이지뷰 요약</label>
                <Row gutter={[20]}>
                    <Col>
                        <div className={styles.summaryBody}>
                            <Space direction='vertical' size={20}>
                                <label className={styles.summaryHeaderLabel}>페이지뷰(PV)</label>
                                <label className={styles.summaryValueLabel}>999,999,999</label>
                            </Space>
                        </div>
                    </Col>
                    <Col>
                        <div className={styles.summaryBody}>
                            <Space direction='vertical' size={20}>
                                <label className={styles.summaryHeaderLabel}>신규방문자 PV</label>
                                <label className={styles.summaryValueLabel}>999,999,999</label>
                            </Space>
                        </div>
                    </Col>
                    <Col>
                        <div className={styles.summaryBody}>
                            <Space direction='vertical' size={20}>
                                <label className={styles.summaryHeaderLabel}>재방문자 PV</label>
                                <label className={styles.summaryValueLabel}>999,999,999</label>
                            </Space>
                        </div>
                    </Col>
                    <Col>
                        <div className={styles.summaryBody}>
                            <Space direction='vertical' size={20}>
                                <label className={styles.summaryHeaderLabel}>방문횟수</label>
                                <label className={styles.summaryValueLabel}>999,999,999</label>
                            </Space>
                        </div>
                    </Col>
                    <Col>
                        <div className={styles.summaryBody}>
                            <Space direction='vertical' size={20}>
                                <label className={styles.summaryHeaderLabel}>방문당 PV</label>
                                <label className={styles.summaryValueLabel}>999,999,999</label>
                            </Space>
                        </div>
                    </Col>
                </Row>
            </Space>

            <Space direction='vertical' size={20}>
                <label>페이지뷰 그래프</label>
                <div className={styles.graphBody}>

                </div>
            </Space>

			{/* Body Section */}
			<TableList dataSource={tableList} />

		</Space>
    );
}

export default List;