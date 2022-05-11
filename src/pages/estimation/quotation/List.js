import { Col, Divider, Row, Space, Button, Image, Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetGroupOptionListAPI } from '../../../api/Group';
import { GetQuotationListAPI } from '../../../api/Quotation';
import { GetUserOptionListAPI } from '../../../api/User';
import SearchPanel from '../../../components/SearchPanel';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';

// 목록페지
function List() {
	const [offset, setOffset] = useState(0);
	const [dataSource, setDataSource] = useState([]);
	const [groupOptionList, setGroupOptionList] = useState([]);
	const [userOptionList, setUserOptionList] = useState([]);
	const [searchData, setSearchData] = useState({
		date_type: null,
		s_date: new Date(),
		e_date: new Date(),
		purchase_method: null,
		search_type: null,
		search_text: '',
		purchase_path: '',
		status: ''
	});
	const [summaryData, setSummaryData] = useState({
		quotation: 0,
		wait: 0,
		business: 0,
		contract: 0,
		release: 0,
		close: 0
	});

	const initComponent = async () => {
		const initDataSource = await GetQuotationListAPI(offset);
		const initGroupOptionList = await GetGroupOptionListAPI();
		const initUserOptionList = await GetUserOptionListAPI();
		
		setSummaryData({
			quotation: initDataSource.length,
			wait: initDataSource.filter(body => body.is_business == null).length,
			business: initDataSource.filter(body => body.is_business == 0).length,
			contract: initDataSource.filter(body => body.is_contract == 0).length,
			release: initDataSource.filter(body => body.is_release == 0).length,
			close: initDataSource.filter(body => body.is_close == 0).length
		});

		setDataSource(initDataSource);
		setGroupOptionList(initGroupOptionList);
		setUserOptionList(initUserOptionList);
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
			title: '유입경로',
			dataIndex: 'purchase_path',
			key: 'purchase_path',
            align: 'center',
		},
		{
			title: '구입방법',
			dataIndex: 'purchase_method',
			key: 'purchase_method',
            align: 'center',
		},
		{
			title: '이름',
			dataIndex: 'client_name',
			key: 'client_name',
            align: 'center',
		},
		{
			title: '연락처',
			dataIndex: 'client_phone',
			key: 'client_phone',
            align: 'center',
		},
		{
			title: '브랜드',
			dataIndex: 'brand_name',
			key: 'brand_name',
            align: 'center',
		},
		{
			title: '차종',
			dataIndex: 'kind_name',
			key: 'kind_name',
            align: 'center',
		},
		{
			title: '지점',
			dataIndex: 'area',
			key: 'area',
            align: 'center',
			render: path => renderGroupSelect(),
		},
		{
			title: '인원',
			dataIndex: 'member',
			key: 'member',
            align: 'center',
			render: path => renderUserSelect(),
		},
		{
			title: '관리',
			dataIndex: 'idx',
			key: 'idx',
            align: 'center',
			render: idx => 
				<Row justify='center'>
					<Col>
						<Space size={15} split={<Divider type="vertical" />}>
							<Link to={"/estimation/quotation/detail/" + idx}>
								<Button className='black-button small-button rounded-button'>상세보기</Button>
							</Link>
						</Space>
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
							type: Constants.inputTypes.select,
							name: 'date_type',
							placeholder: '등록일',
							width: 130,
							data: Constants.dateTypeOptions
						},
                        {
							type: Constants.inputTypes.button,
							name: 'date_button1',
							label: '전체',
							style: 'black-button'
						},
						{
							type: Constants.inputTypes.button,
							name: 'date_button2',
							label: '오늘',
							style: 'white-button'
						},
						{
							type: Constants.inputTypes.button,
							name: 'date_button3',
							label: '어제',
							style: 'white-button'
						},
						{
							type: Constants.inputTypes.button,
							name: 'date_button4',
							label: '3일',
							style: 'white-button'
						},
						{
							type: Constants.inputTypes.button,
							name: 'date_button5',
							label: '7일',
							style: 'white-button'
						},
						{
							type: Constants.inputTypes.button,
							name: 'date_button6',
							label: '1개월',
							style: 'white-button'
						},
						{
							type: Constants.inputTypes.button,
							name: 'date_button7',
							label: '3개월',
							style: 'white-button'
						},
                        {
							type: Constants.inputTypes.datePicker,
							name: 's_date',
							placeholder: '시작일'
						},
						{
							type: Constants.inputTypes.label,
							label: '~'
						},
						{
							type: Constants.inputTypes.datePicker,
							name: 'e_date',
							placeholder: '종료일'
						}
					]
				}
			]
		},
        {
			height: 80,
			columns: [
				{
					titleText: '검색 I',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.select,
							name: 'purchase_method',
							placeholder: '구입방법',
							width: 130,
							data: Constants.purchaseMethodOptions
						},
                        {
							type: Constants.inputTypes.select,
							name: 'search_type',
							placeholder: '검색구분',
							width: 130,
							data: Constants.searchTypeOptions
						},
                        {
							type: Constants.inputTypes.input,
							name: 'search_text',
							placeholder: '검색어 입력',
							width: 200
						},
                        {
							type: Constants.inputTypes.input,
							name: 'purchase_path',
							placeholder: '유입경로 입력',
							width: 200
						}
					]
				}
			]
		},
        {
			height: 80,
			columns: [
				{
					titleText: '검색 II',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.button,
							label: '전체',
							style: 'black-button'
						},
                        {
							type: Constants.inputTypes.button,
							label: '대기중',
							style: 'white-button disabled-button'
						},
                        {
							type: Constants.inputTypes.button,
							label: '상담중',
							style: 'white-button disabled-button'
						},
                        {
							type: Constants.inputTypes.button,
							label: '계약중',
							style: 'white-button disabled-button'
						},
                        {
							type: Constants.inputTypes.button,
							label: '출고중',
							style: 'white-button disabled-button'
						},
                        {
							type: Constants.inputTypes.button,
							label: '종료',
							style: 'white-button disabled-button'
						}
					]
				}
			]
		}
	];

	const tableDataSource = {
		topItems: [
			{
				type: Constants.inputTypes.button,
				link: '#',
				label: '엑셀로 내려받기',
				style: 'black-button big-button',
				width: 150
			}
		],
		subItems: [
			{
				type: Constants.inputTypes.input,
				disabled: true,
				label: '견적서',
				value: summaryData.quotation,
				width: 130
			},
			{
				type: Constants.inputTypes.input,
				disabled: true,
				label: '대기',
				value: summaryData.wait,
				width: 130
			},
			{
				type: Constants.inputTypes.input,
				disabled: true,
				label: '상담',
				value: summaryData.business,
				width: 130
			},
			{
				type: Constants.inputTypes.input,
				disabled: true,
				label: '계약',
				value: summaryData.contract,
				width: 130
			},
			{
				type: Constants.inputTypes.input,
				disabled: true,
				label: '출고',
				value: summaryData.release,
				width: 130
			},
			{
				type: Constants.inputTypes.input,
				disabled: true,
				label: '종료',
				value: summaryData.close,
				width: 130
			}
		],
		tableData: dataSource,
		tableColumns: columns
	};

	const onClickTableMore = async() => {
		const initDataSource = await GetQuotationListAPI(offset + 10, searchData);
		setOffset(offset + initDataSource.length);
		
		setSummaryData({
			quotation: initDataSource.length,
			wait: initDataSource.filter(body => body.is_business == 0).length,
			business: initDataSource.filter(body => body.is_business == 0).length,
			contract: initDataSource.filter(body => body.is_contract == 0).length,
			release: initDataSource.filter(body => body.is_release == 0).length,
			close: initDataSource.filter(body => body.is_close == 0).length
		});
		
		setDataSource([
			...dataSource,
			...initDataSource
		]);
	};

	const onClickSearch = async(searchData) => {
		const initDataSource = await GetQuotationListAPI(0, searchData);

		setSummaryData({
			quotation: initDataSource.length,
			wait: initDataSource.filter(body => body.is_business == 0).length,
			business: initDataSource.filter(body => body.is_business == 0).length,
			contract: initDataSource.filter(body => body.is_contract == 0).length,
			release: initDataSource.filter(body => body.is_release == 0).length,
			close: initDataSource.filter(body => body.is_close == 0).length
		});
		
		setOffset(0);
		setSearchData(searchData);

		setDataSource([
			...initDataSource
		]);
	};

	const renderGroupSelect = () => {
		return (
			<Row justify='center'>
				<Col>
					<Select
						size={'large'}
						suffixIcon={<CaretDownOutlined />}
						placeholder={'선택'}
						style={{ width: 130 }}
					>
						{
							groupOptionList.map((optionItem, optionIndex) => (
								<Select.Option key={optionIndex} value={optionItem.value}>
									{optionItem.label}
								</Select.Option>
							))
						}
					</Select>
				</Col>
			</Row>
		);
	};

	const renderUserSelect = () => {
		return (
			<Row justify='center'>
				<Col>
					<Select
						size={'large'}
						suffixIcon={<CaretDownOutlined />}
						placeholder={'선택'}
						style={{ width: 130 }}
					>
						{
							userOptionList.map((optionItem, optionIndex) => (
								<Select.Option key={optionIndex} value={optionItem.value}>
									{optionItem.label}
								</Select.Option>
							))
						}
					</Select>
				</Col>
			</Row>
		);
	};

    return (
        <Space direction='vertical' size={18} className='main-layout'>
            {/* Page Header */}
            <Space direction='vertical' size={18}>
                <label className='main-header-title'>견적신청 목록</label>
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
    );
}

export default List;