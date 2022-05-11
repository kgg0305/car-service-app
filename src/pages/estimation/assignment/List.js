import { Col, Divider, Row, Space, Button, Image, Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetUserListAPI } from '../../../api/User';
import { GetGroupOptionListAPI } from '../../../api/Group';
import SearchPanel from '../../../components/SearchPanel';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';
import { GetQuotationCountAPI } from '../../../api/Quotation';

// 목록페지
function List() {
	const [offset, setOffset] = useState(0);
	const [groupOptionList, setGroupOptionList] = useState([]);
	const [dataSource, setDataSource] = useState([]);
	const [searchData, setSearchData] = useState({
		group_id: null,
		name: ''
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
		const initDataSource = await GetUserListAPI(offset);
		const initGroupOptionList = await GetGroupOptionListAPI();
		
		let updatedDataSource = [];
		for (let i = 0; i < initDataSource.length; i++) {
			const element = initDataSource[i];
			const quotation = await GetQuotationCountAPI({
				assign_to: element.idx
			});
			const business = await GetQuotationCountAPI({
				assign_to: element.idx,
				is_business: '0'
			});
			const contract = await GetQuotationCountAPI({
				assign_to: element.idx,
				is_contract: '0'
			});
			const release = await GetQuotationCountAPI({
				assign_to: element.idx,
				is_release: '0'
			});
			const close = await GetQuotationCountAPI({
				assign_to: element.idx,
				is_close: '0'
			});
			const wait = quotation - business - contract - release - close;
			updatedDataSource[i] = {
				...initDataSource[i],
				quotation: quotation,
				wait: wait,
				business: business,
				contract: contract,
				release: release,
				close: close
			}
		}

		const quotation = await GetQuotationCountAPI({
			
		});
		const business = await GetQuotationCountAPI({
			is_business: '0'
		});
		const contract = await GetQuotationCountAPI({
			is_contract: '0'
		});
		const release = await GetQuotationCountAPI({
			is_release: '0'
		});
		const close = await GetQuotationCountAPI({
			is_close: '0'
		});
		const wait = quotation - business - contract - release - close;

		setSummaryData({
			quotation: quotation,
			wait: wait,
			business: business,
			contract: contract,
			release: release,
			close: close
		});
		setDataSource(updatedDataSource);
		setGroupOptionList(initGroupOptionList);
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
			title: '지점',
			dataIndex: 'group_name',
			key: 'group_name',
            align: 'center',
		},
		{
			title: '이름',
			dataIndex: 'name',
			key: 'name',
            align: 'center',
		},
		{
			title: '견적서',
			dataIndex: 'quotation',
			key: 'quotation',
            align: 'center',
		},
		{
			title: '대기',
			dataIndex: 'wait',
			key: 'wait',
            align: 'center',
		},
		{
			title: '상담',
			dataIndex: 'business',
			key: 'business',
            align: 'center',
		},
		{
			title: '계약',
			dataIndex: 'contract',
			key: 'contract',
            align: 'center',
		},
		{
			title: '출고',
			dataIndex: 'release',
			key: 'release',
            align: 'center',
		},
		{
			title: '종료',
			dataIndex: 'close',
			key: 'close',
            align: 'center',
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
							<Link to="/estimation/assignment/manage">
								<Button className='black-button small-button rounded-button'>할당관리</Button>
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
					titleText: '지점',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.select,
							name: 'group_id',
							placeholder: '지점 선택',
							width: 200,
							data: groupOptionList
						}
					]
				},
                {
					titleText: '이름',
					titleWidth: '154px',
					contentItems: [
						{
							type: Constants.inputTypes.input,
							name: 'name',
							placeholder: '이름 입력',
							width: 200
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
		const initDataSource = await GetUserListAPI(offset + 10, searchData);
		setOffset(offset + initDataSource.length);
		
		let updatedDataSource = [];
		for (let i = 0; i < initDataSource.length; i++) {
			const element = initDataSource[i];
			const quotation = await GetQuotationCountAPI({
				assign_to: element.idx
			});
			const business = await GetQuotationCountAPI({
				assign_to: element.idx,
				is_business: '0'
			});
			const contract = await GetQuotationCountAPI({
				assign_to: element.idx,
				is_contract: '0'
			});
			const release = await GetQuotationCountAPI({
				assign_to: element.idx,
				is_release: '0'
			});
			const close = await GetQuotationCountAPI({
				assign_to: element.idx,
				is_close: '0'
			});
			const wait = quotation - business - contract - release - close;
			updatedDataSource[i] = {
				...initDataSource[i],
				quotation: quotation,
				wait: wait,
				business: business,
				contract: contract,
				release: release,
				close: close
			}
		}

		setDataSource([
			...dataSource,
			...updatedDataSource
		]);
	};

	const onClickSearch = async(searchData) => {
		const initDataSource = await GetUserListAPI(0, searchData);
		
		setOffset(0);
		setSearchData(searchData);

		let updatedDataSource = [];
		for (let i = 0; i < initDataSource.length; i++) {
			const element = initDataSource[i];
			const quotation = await GetQuotationCountAPI({
				assign_to: element.idx
			});
			const business = await GetQuotationCountAPI({
				assign_to: element.idx,
				is_business: '0'
			});
			const contract = await GetQuotationCountAPI({
				assign_to: element.idx,
				is_contract: '0'
			});
			const release = await GetQuotationCountAPI({
				assign_to: element.idx,
				is_release: '0'
			});
			const close = await GetQuotationCountAPI({
				assign_to: element.idx,
				is_close: '0'
			});
			const wait = quotation - business - contract - release - close;
			updatedDataSource[i] = {
				...initDataSource[i],
				quotation: quotation,
				wait: wait,
				business: business,
				contract: contract,
				release: release,
				close: close
			}
		}

		setDataSource([
			...updatedDataSource
		]);
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