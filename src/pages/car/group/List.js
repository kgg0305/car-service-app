import { Col, Divider, Row, Space, Button, Select } from 'antd';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { init, reset, search, setSearch, showMore } from '../../../store/reducers/car/group/list';
import { CaretDownOutlined } from '@ant-design/icons';

// 목록페지
function List() {
	const { offset, brandOptionList, carKindOptionList, dataSource, searchData } = useSelector(state => ({
        offset: state.groupList.offset,
        brandOptionList: state.groupList.brandOptionList,
		carKindOptionList: state.groupList.carKindOptionList,
        dataSource: state.groupList.dataSource,
        searchData: state.groupList.searchData,
    }));

    const dispatch = useDispatch();

	useEffect(() => {
		dispatch(init());
	}, [dispatch]);

	const onClickTableMore = () => dispatch(showMore(offset + 10));
	const onClickSearch = () => dispatch(search(searchData));
	const onClickReset = () => dispatch(reset());
	const onChangeSearchComponent = (name, value) => dispatch(setSearch(name, value));
	
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
			title: '모델그룹',
			dataIndex: 'group_name',
			key: 'group_name',
            align: 'center',
		},
        {
			title: '차종',
			dataIndex: 'kind_name',
			key: 'kind_name',
            align: 'center',
		},
		{
			title: '사용여부',
			dataIndex: 'is_use',
			key: 'is_use',
            align: 'center',
			render: is_use => Constants.availableOptions.filter(item => item.value == is_use)[0].label
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
                            <Link to={"/car/model/manage/" + idx}>
                                <Button className='white-button small-button rounded-button'>모델관리</Button>
                            </Link>
                            <Link to={"/car/group/edit/" + idx}>
                                <Button className='black-button small-button rounded-button'>수정</Button>
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
				link: '/car/group/create',
				label: '등록',
				style: 'black-button big-button',
				width: 150
			}
		],
		tableData: dataSource,
		tableColumns: columns
	};

    return(
		<Space direction='vertical' size={18} className='main-layout'>
			{/* Page Header */}
			<Space direction='vertical' size={18}>
				<label className='main-header-title'>모델그룹 목록</label>
				<Divider className='main-body-divider' />
			</Space>

			{/* Search Section */}
			<Space direction='vertical' size={20}>
				<label className='title-label'>검색</label>
				<Space direction='vertical' size={0}>
				<Row key={1} gutter={[0]} align="middle" style={{ height: 80 }} className='table'>
					<Col flex="154px" className='table-header'>
						<label className='table-header-label'>차량</label>
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
						</Space>
					</Col>
					<Col flex="154px" className='table-header'>
						<label className='table-header-label'>사용여부</label>
					</Col>
					<Col flex="auto" className='table-value'>
						<Space size={6}>
							<Select
								name='is_use' 
								value={searchData.is_use} 
								onChange={value => {
									onChangeSearchComponent('is_use', value);
								}}
								suffixIcon={<CaretDownOutlined />}
								placeholder="선택"
								size='large'
								style={{ width: 150 }}
							>
								{
									Constants.availableOptions.map((optionItem, optionIndex) => (
										<Select.Option key={optionIndex} value={optionItem.value}>
											{optionItem.label}
										</Select.Option>
									))
								}
							</Select>
						</Space>
					</Col>
					<Col flex="154px" className='table-header'>
						<label className='table-header-label'>차종</label>
					</Col>
					<Col flex="auto" className='table-value'>
						<Space size={6}>
							<Select
								name='car_kind_id' 
								value={searchData.car_kind_id} 
								onChange={value => {
									onChangeSearchComponent('car_kind_id', value);
								}}
								suffixIcon={<CaretDownOutlined />}
								placeholder="선택"
								size='large'
								style={{ width: 150 }}
							>
								{
									carKindOptionList.map((optionItem, optionIndex) => (
										<Select.Option key={optionIndex} value={optionItem.value}>
											{optionItem.label}
										</Select.Option>
									))
								}
							</Select>
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