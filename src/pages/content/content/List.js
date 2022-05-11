import { Col, Divider, Row, Space, Button, Switch } from 'antd';
import React, { useState, useEffect } from 'react';
import { GetContentListAPI, DeleteContentInfoAPI, UpdateContentAPI } from '../../../api/Content';
import AlertDeleteModal from '../../../components/AlertDeleteModal';
import SearchPanel from '../../../components/SearchPanel';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';
import { GetDateTimeStringFromDate } from '../../../constants/GlobalFunctions';

// 목록페지
function List() {
	const [offset, setOffset] = useState(0);
	const [showDeleteModal, setShowDeleteModal] = useState({
		is_show: false,
		idx: null
	});
	const [dataSource, setDataSource] = useState([]);
	const [searchData, setSearchData] = useState({
		start_date: null,
		end_date: null,
		media_type: null,
		title: null,
		category_id: null,
		recommendation_id: null,
		is_use: null
	});
	
	const initComponent = async () => {
		const initDataSource = await GetContentListAPI(offset);
		
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
			title: '매체명',
			dataIndex: 'media_type',
			key: 'media_type',
            align: 'center',
		},
		{
			title: '카테고리',
			dataIndex: 'category_id',
			key: 'category_id',
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
			dataIndex: 'recommendation',
			key: 'recommendation',
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
			dataIndex: 'created_date',
			key: 'created_date',
            align: 'center',
			render: created_date => GetDateTimeStringFromDate(new Date(created_date))
		},
		{
			title: '사용여부',
			dataIndex: 'idx',
			key: 'idx',
            align: 'center',
            render: idx => renderSwitchComponent(idx)
		},
		{
			title: '관리',
			dataIndex: 'idx',
			key: 'idx',
            align: 'center',
			render: idx => 
                <Row justify='center'>
                    <Col>
						<Button className='black-button small-button rounded-button' onClick={() => onDeleteClick(idx)}>삭제</Button>
                    </Col>
                </Row>,
		},
	];

	const searchDataSource = [
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
							name:'start_date',
							placeholder: '시작일'
						},
						{
							type: Constants.inputTypes.label,
							label: '~'
						},
						{
							type: Constants.inputTypes.datePicker,
							name:'end_date',
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
							name: 'media_type',
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
							name: 'title',
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
							name: 'category_id',
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
							name: 'news',
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
							name: 'is_use',
							placeholder: '선택',
							width: 150,
							data: Constants.availableOptions
						}
					]
				}
			]
		}
	];

	const tableDataSource = {
		tableData: dataSource,
		tableColumns: columns
	};

	const onClickTableMore = async() => {
		const initDataSource = await GetContentListAPI(offset + 10, searchData);
		setOffset(offset + initDataSource.length);
		
		setDataSource([
			...dataSource,
			...initDataSource
		]);
	};

	const onClickSearch = async(searchData) => {
		const initDataSource = await GetContentListAPI(0, searchData);
		setOffset(0);
		setSearchData(searchData);

		setDataSource([
			...initDataSource
		]);
	};

	const onDeleteClick = async(idx) => {
        setShowDeleteModal({
			is_show: true,
			idx: idx
		});
    };

    const deleteInfo = async() => {
        await DeleteContentInfoAPI(showDeleteModal.idx);
        const initDataSource = await GetContentListAPI(offset);
		setDataSource(initDataSource);
		setShowDeleteModal({
			is_show: false, 
			idx: null
		});
    };

	const changeIsUse = async(idx, checked) => {
		let bodyInfo = dataSource.filter(item => item.idx === idx)[0];
		bodyInfo.is_use = checked ? '1' : '0';
		await UpdateContentAPI(bodyInfo);

		setDataSource(dataSource.map(item => (
			item.idx === idx ? bodyInfo : item
		)));
	}

	const renderSwitchComponent = (idx) => {
		return (
			<Row justify='center' gutter={[11]}>
				<Col>
					<Switch checked={dataSource.filter(item => item.idx === idx)[0].is_use === '0' ? false : true} onClick={checked => changeIsUse(idx, checked)}/>
				</Col>
				<Col>
					<label className='switch-label'>
						{
							Constants.availableOptions.filter(item => item.value === dataSource.filter(item => item.idx === idx)[0].is_use)[0].label
						}
					</label>
				</Col>
			</Row>
		);
	}

    return(
		<>
			<Space direction='vertical' size={18} className='main-layout'>
				{/* Page Header */}
				<Space direction='vertical' size={18}>
					<label className='main-header-title'>콘텐츠 관리</label>
					<Divider className='main-body-divider' />
				</Space>

				{/* Search Section */}
				<SearchPanel dataSource={searchDataSource} onSearch={onClickSearch} />

				{/* Body Section */}
				<TableList dataSource={tableDataSource} />

				<Row justify='center'>
					<label className='show-more-label' onClick={onClickTableMore}>더보기</label>
				</Row>
			</Space>
			<AlertDeleteModal visible={showDeleteModal.is_show} onConfirmClick={() => deleteInfo()} onCancelClick={() => setShowDeleteModal({is_show: false, idx: null})} />
		</>
    );
}

export default List;