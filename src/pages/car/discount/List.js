import { Col, Divider, Row, Space, Button, Select, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetBrandOptionListAPI } from '../../../api/Brand';
import { GetDiscountKindListAPI, GetDiscountKindOptionListAPI } from '../../../api/DiscountKind';
import SearchPanel from '../../../components/SearchPanel';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';
import { GetDateFullTimeStringUsingKorFromDate, GetDateStringFromDate } from '../../../constants/GlobalFunctions';
import { CaretDownOutlined } from '@ant-design/icons'
import moment from 'moment';

// 목록페지
function List() {
	const [offset, setOffset] = useState(0);
	const [brandOptionList, setBrandOptionList] = useState([]);
	const [discountKindOptionList, setDiscountKindOptionList] = useState([]);
	const [dataSource, setDataSource] = useState();
	const [searchData, setSearchData] = useState({
		brand_id: null,
		idx: null,
		s_date: null,
		e_date: null,
		date_period: 0
	});
	
	const initComponent = async () => {
		const initDataSource = await GetDiscountKindListAPI(offset);
		const initBrandOptionList = await GetBrandOptionListAPI();
		const initDiscountKindOptionList = await GetDiscountKindOptionListAPI();
		
		setDataSource(initDataSource);
		setBrandOptionList(initBrandOptionList);
		setDiscountKindOptionList(initDiscountKindOptionList);
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
			title: '브랜드',
			dataIndex: 'brand_name',
			key: 'brand_name',
            align: 'center',
		},
		{
			title: '종류',
			dataIndex: 'kind_name',
			key: 'kind_name',
            align: 'center',
		},
        {
			title: '조건',
			dataIndex: 'condition_name',
			key: 'condition_name',
            align: 'center',
		},
        {
			title: '할인비용',
			dataIndex: 'discount_price',
			key: 'discount_price',
            align: 'center',
		},
        {
			title: '시작일',
			dataIndex: 's_date',
			key: 's_date',
			align: 'center',
            render: s_date => GetDateStringFromDate(new Date(s_date))
		},
		{
			title: '종료일',
			dataIndex: 'e_date',
			key: 'e_date',
            align: 'center',
			render: e_date => GetDateStringFromDate(new Date(e_date))
		},
		{
			title: '관리',
			dataIndex: 'idx',
			key: 'idx',
            align: 'center',
			render: idx => 
                <Row justify='center'>
                    <Col>
                        <Link to={"/car/discount/edit/" + idx}>
                            <Button className='black-button small-button rounded-button'>수정</Button>
                        </Link>
                    </Col>
                </Row>,
		},
	];

	const tableDataSource = {
		topItems: [
			{
				type: Constants.inputTypes.button,
				link: '/car/discount/create',
				label: '등록',
				style: 'black-button big-button',
				width: 150
			}
		],
		tableData: dataSource,
		tableColumns: columns
	};

	const onClickTableMore = async() => {
		const initDataSource = await GetDiscountKindListAPI(offset + 10, searchData);
		setOffset(offset + initDataSource.length);
		
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
				brand_id: null,
				idx: null,
				s_date: null,
				e_date: null,
				date_period: 0
			}
		);

		onClickSearch(
			{
				brand_id: null,
				idx: null,
				s_date: null,
				e_date: null,
				date_period: 0
			}
		);
	};

	const onClickSearch = async(searchData) => {
		const initDataSource = await GetDiscountKindListAPI(0, {
			...searchData,
			s_date: searchData.s_date ? GetDateStringFromDate(new Date(searchData.s_date)) : '',
			e_date: searchData.e_date ? GetDateStringFromDate(new Date(searchData.e_date)) : ''
		});
		setOffset(0);

		setDataSource([
			...initDataSource
		]);
	};

    return(
		<Space direction='vertical' size={18} className='main-layout'>
			{/* Page Header */}
			<Space direction='vertical' size={18}>
				<label className='main-header-title'>할인/비용 목록</label>
				<Divider className='main-body-divider' />
			</Space>

			{/* Search Section */}
			<Space direction='vertical' size={20}>
				<label className='title-label'>검색</label>
				<Space direction='vertical' size={0}>
					<Row key={1} gutter={[0]} align="middle" style={{ height: 80 }} className='table'>
						<Col flex="154px" className='table-header'>
							<label className='table-header-label'>브랜드</label>
						</Col>
						<Col flex="auto" className='table-value'>
							<Space size={6}>
								<Select
									name='brand_id' 
									value={searchData.brand_id} 
									onChange={value => {
										onChangeSearchComponent('brand_id', value);
									}}
									suffixIcon={<CaretDownOutlined />}
									placeholder="브랜드 선택"
									size='large'
									style={{ width: 300 }}
								>
									{
										brandOptionList.map((optionItem, optionIndex) => (
											<Select.Option key={optionIndex} value={optionItem.value}>
												{optionItem.label}
											</Select.Option>
										))
									}
								</Select>
								<Select
									name='idx' 
									value={searchData.idx} 
									onChange={value => {
										onChangeSearchComponent('idx', value);
									}}
									suffixIcon={<CaretDownOutlined />}
									placeholder="할인종류 선택"
									size='large'
									style={{ width: 300 }}
								>
									{
										discountKindOptionList.filter(item => item.brand_id == searchData.brand_id).map((optionItem, optionIndex) => (
											<Select.Option key={optionIndex} value={optionItem.value}>
												{optionItem.label}
											</Select.Option>
										))
									}
								</Select>
							</Space>
						</Col>
					</Row>
					<Row key={1} gutter={[0]} align="middle" style={{ height: 80 }} className='table'>
						<Col flex="154px" className='table-header'>
							<label className='table-header-label'>날짜</label>
						</Col>
						<Col flex="auto" className='table-value'>
							<Space size={6}>
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