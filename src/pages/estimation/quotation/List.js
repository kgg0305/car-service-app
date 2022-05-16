import { Col, Divider, Row, Space, Button, Input, Select, DatePicker } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { DownloadQuotationFileAPI, GetQuotationListAPI, UpdateQuotationAPI } from '../../../api/Quotation';
import { GetUserOptionListAPI } from '../../../api/User';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';
import moment from 'moment';

// 목록페지
function List() {
	const [offset, setOffset] = useState(0);
	const [dataSource, setDataSource] = useState([]);
	const [userOptionList, setUserOptionList] = useState([]);
	const [searchData, setSearchData] = useState({
		date_type: '0',
		date_period: 0,
		s_date: null,
		e_date: null,
		purchase_method: null,
		search_type: null,
		search_text: '',
		purchase_path: '',
		status: 0
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
			render: path => renderAreaGroupSelect(),
		},
		{
			title: '인원',
			dataIndex: 'idx',
			key: 'idx',
            align: 'center',
			render: idx => renderUserSelect(idx),
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

	const tableDataSource = {
		topItems: [
			{
				type: Constants.inputTypes.button,
				onClick: DownloadQuotationFileAPI,
				label: '엑셀로 내려받기',
				style: 'black-button'
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

	const onChangeSearchComponent = (name, value) => {
		let s_date = searchData.s_date;
		let e_date = searchData.e_date;
		if(name === 'date_period') {
			switch (value) {
				case 0:
					s_date = null;
					e_date = null;
					break;
				case 1:
					s_date = new Date();
					e_date = new Date();
					break;
				case 2:
					s_date = new Date();
					s_date.setDate(s_date.getDate() - 1)
					e_date = new Date();
					e_date.setDate(e_date.getDate() - 1)
					break;
				case 3:
					s_date = new Date();
					s_date.setDate(s_date.getDate() - 3)
					e_date = new Date();
					break;
				case 4:
					s_date = new Date();
					s_date.setDate(s_date.getDate() - 7)
					e_date = new Date();
					break;
				case 5:
					s_date = new Date();
					s_date.setMonth(s_date.getMonth() - 1)
					e_date = new Date();
					break;
				case 6:
					s_date = new Date();
					s_date.setMonth(s_date.getMonth() - 3)
					e_date = new Date();
					break;
				default:
					break;
			}
		}
		setSearchData(
            { 
                ...searchData,
                idx: name == 'brand_id' ? null : searchData.idx,
				s_date: s_date,
				e_date: e_date,
                [name]: value
            }
        );
	};

	const onClickReset = () => {
		setSearchData(
			{
				date_type: '0',
				date_period: 0,
				s_date: new Date(),
				e_date: new Date(),
				purchase_method: null,
				search_type: null,
				search_text: '',
				purchase_path: '',
				status: 0
			}
		);

		onClickSearch(
			{
				date_type: '0',
				date_period: 0,
				s_date: new Date(),
				e_date: new Date(),
				purchase_method: null,
				search_type: null,
				search_text: '',
				purchase_path: '',
				status: 0
			}
		);
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

	const onAssignToChange = async(idx, value) => {
		let quotation_info = dataSource.filter(item => item.idx === idx)[0];
		quotation_info.assign_to = value;
		await UpdateQuotationAPI(quotation_info);
		setDataSource(dataSource.map(item => (
			{
				...item,
				assign_to: item.idx === idx ? value : item.assign_to
			}
		)));
	};

	const renderAreaGroupSelect = () => {
		return (
			<Row justify='center'>
				<Col>
					<Select
						size='large'
						suffixIcon={<CaretDownOutlined />}
						placeholder={'선택'}
						style={{ width: 130 }}
					>
						{
							Constants.userAreaGroupOptions.map((optionItem, optionIndex) => (
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

	const renderUserSelect = (idx) => {
		const quotation_info = dataSource.filter(item => item.idx === idx)[0];
		return (
			<Row justify='center'>
				<Col>
					<Select
						size='large'
						name='assign_to' 
						value={quotation_info.assign_to} 
						onChange={value => {
							onAssignToChange(idx, value);
						}}
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
            <Space direction='vertical' size={20}>
				<label className='title-label'>검색</label>
				<Space direction='vertical' size={0}>
					<Row key={1} gutter={[0]} align="middle" style={{ height: 80 }} className='table'>
						<Col flex="154px" className='table-header'>
							<label className='table-header-label'>날짜</label>
						</Col>
						<Col flex="auto" className='table-value'>
							<Space size={6}>
								<Select
									name='date_type' 
									value={searchData.date_type} 
									onChange={value => {
										onChangeSearchComponent('date_type', value);
									}}
									suffixIcon={<CaretDownOutlined />}
									placeholder="등록일"
									size='large'
									style={{ width: 130 }}
								>
									{
										Constants.dateTypeOptions.map((optionItem, optionIndex) => (
											<Select.Option key={optionIndex} value={optionItem.value}>
												{optionItem.label}
											</Select.Option>
										))
									}
								</Select>
								<Button 
									key={1}
									onClick={() => onChangeSearchComponent('date_period', 0)}
									size='large'
									className={searchData.date_period === 0 ? 'black-button' : 'white-button'}
								>
									전체
								</Button>
								<Button 
									key={2}
									onClick={() => onChangeSearchComponent('date_period', 1)}
									size='large'
									className={searchData.date_period === 1 ? 'black-button' : 'white-button'}
								>
									오늘
								</Button>
								<Button 
									key={3}
									onClick={() => onChangeSearchComponent('date_period', 2)}
									size='large'
									className={searchData.date_period === 2 ? 'black-button' : 'white-button'}
								>
									어제
								</Button>
								<Button 
									key={4}
									onClick={() => onChangeSearchComponent('date_period', 3)}
									size='large'
									className={searchData.date_period === 3 ? 'black-button' : 'white-button'}
								>
									3일
								</Button>
								<Button 
									key={5}
									onClick={() => onChangeSearchComponent('date_period', 4)}
									size='large'
									className={searchData.date_period === 4 ? 'black-button' : 'white-button'}
								>
									7일
								</Button>
								<Button 
									key={6}
									onClick={() => onChangeSearchComponent('date_period', 5)}
									size='large'
									className={searchData.date_period === 5 ? 'black-button' : 'white-button'}
								>
									1개월
								</Button>
								<Button 
									key={7}
									onClick={() => onChangeSearchComponent('date_period', 6)}
									size='large'
									className={searchData.date_period === 6 ? 'black-button' : 'white-button'}
								>
									3개월
								</Button>
								<DatePicker 
									key={8}
									name='s_date' 
									value={searchData.s_date ? moment(searchData.s_date) : ''} 
									onChange={value => {
										onChangeSearchComponent('s_date', value.toString());
									}}
									placeholder='시작일' 
									size='large'
								/>
								<DatePicker 
									key={9}
									name='e_date' 
									value={searchData.e_date ? moment(searchData.e_date) : ''} 
									onChange={value => {
										onChangeSearchComponent('e_date', value.toString());
									}}
									placeholder='종료일' 
									size='large'
								/>
							</Space>
						</Col>
					</Row>
					<Row key={2} gutter={[0]} align="middle" style={{ height: 80 }} className='table'>
						<Col flex="154px" className='table-header'>
							<label className='table-header-label'>검색 I</label>
						</Col>
						<Col flex="auto" className='table-value'>
							<Space size={6}>
								<Select
									name='purchase_method' 
									value={searchData.purchase_method} 
									onChange={value => {
										onChangeSearchComponent('purchase_method', value);
									}}
									suffixIcon={<CaretDownOutlined />}
									placeholder="구입방법"
									size='large'
									style={{ width: 130 }}
								>
									{
										Constants.purchaseMethodOptions.map((optionItem, optionIndex) => (
											<Select.Option key={optionIndex} value={optionItem.value}>
												{optionItem.label}
											</Select.Option>
										))
									}
								</Select>
								<Select
									name='search_type' 
									value={searchData.search_type} 
									onChange={value => {
										onChangeSearchComponent('search_type', value);
									}}
									suffixIcon={<CaretDownOutlined />}
									placeholder="검색구분"
									size='large'
									style={{ width: 130 }}
								>
									{
										Constants.searchTypeOptions.map((optionItem, optionIndex) => (
											<Select.Option key={optionIndex} value={optionItem.value}>
												{optionItem.label}
											</Select.Option>
										))
									}
								</Select>
								<Input 
									name='search_text' 
									value={searchData.search_text} 
									onChange={e => {
										onChangeSearchComponent(e.target.name, e.target.value);
									}} 
									size='large' 
									style={{width: 200}} 
									placeholder='검색어 입력'
								/>
								<Input 
									name='purchase_path' 
									value={searchData.purchase_path} 
									onChange={e => {
										onChangeSearchComponent(e.target.name, e.target.value);
									}} 
									size='large' 
									style={{width: 200}} 
									placeholder='유입경로 입력'
								/>
							</Space>
						</Col>
					</Row>
					<Row key={3} gutter={[0]} align="middle" style={{ height: 80 }} className='table'>
						<Col flex="154px" className='table-header'>
							<label className='table-header-label'>검색 II</label>
						</Col>
						<Col flex="auto" className='table-value'>
							<Space size={6}>
								<Button 
									key={1}
									onClick={() => onChangeSearchComponent('status', 0)}
									size='large'
									className={(searchData.status === 0 ? 'black-button' : 'white-button') + ' big-button'}
								>
									전체
								</Button>
								<Button 
									key={2}
									onClick={() => onChangeSearchComponent('status', 1)}
									size='large'
									className={(searchData.status === 1 ? 'black-button' : 'white-button') + ' big-button'}
								>
									대기중
								</Button>
								<Button 
									key={3}
									onClick={() => onChangeSearchComponent('status', 2)}
									size='large'
									className={(searchData.status === 2 ? 'black-button' : 'white-button') + ' big-button'}
								>
									상담중
								</Button>
								<Button 
									key={4}
									onClick={() => onChangeSearchComponent('status', 3)}
									size='large'
									className={(searchData.status === 3 ? 'black-button' : 'white-button') + ' big-button'}
								>
									계약중
								</Button>
								<Button 
									key={5}
									onClick={() => onChangeSearchComponent('status', 4)}
									size='large'
									className={(searchData.status === 4 ? 'black-button' : 'white-button') + ' big-button'}
								>
									출고중
								</Button>
								<Button 
									key={6}
									onClick={() => onChangeSearchComponent('status', 5)}
									size='large'
									className={(searchData.status === 5 ? 'black-button' : 'white-button') + ' big-button'}
								>
									종료
								</Button>
							</Space>
						</Col>
					</Row>
				</Space>
				
				<Row key={2} justify="center" gutter={[17, 0]}>
					<Col>
						<Button className='white-button big-button' onClick={onClickReset}>초기화</Button>
					</Col>
					<Col>
						<Button className='black-button big-button' onClick={() => onClickSearch(searchData)}>검색</Button>
					</Col>
				</Row>
			</Space>

            {/* Body Section */}
            <TableList dataSource={tableDataSource} />

			<Row justify='center'>
				<label className='show-more-label' onClick={onClickTableMore}>더보기</label>
			</Row>
        </Space>
    );
}

export default List;