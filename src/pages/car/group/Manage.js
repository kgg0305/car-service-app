import { Col, Divider, Row, Space, Button, Switch } from 'antd';
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetBrandInfoAPI, GetBrandOptionListAPI } from '../../../api/Brand';
import { DeleteGroupInfoAPI, GetGroupListAPI, UpdateGroupAPI } from '../../../api/Group';
import { GetCarKindOptionListAPI } from '../../../api/CarKind';
import SearchPanel from '../../../components/SearchPanel';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';
import AlertDeleteModal from '../../../components/AlertDeleteModal';

// 목록페지
function Manage() {
    let { brand_id } = useParams();
	const [offset, setOffset] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState({
        idx: null,
        show: false
    });
	const [dataSource, setDataSource] = useState([]);
    const [brandBodyInfo, setBrandBodyInfo] = useState({
        brand_name: ''
    });
	
	const initComponent = async () => {
		const initDataSource = await GetGroupListAPI(offset, {
            brand_id: brand_id
        });
        const initBrandBodyInfo = await GetBrandInfoAPI(brand_id);
		
		setDataSource(initDataSource);
        setBrandBodyInfo(initBrandBodyInfo);
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
			dataIndex: 'idx',
			key: 'idx',
            align: 'center',
			render: idx => renderIsUseField(idx)
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
                            <Link to={"/car/group/edit/" + idx}>
                                <Button className='black-button small-button rounded-button'>수정</Button>
                            </Link>
                            <Button className='white-button small-button rounded-button' onClick={() => onDeleteClick(idx)} size='large'>삭제</Button>
                        </Space>
                    </Col>
                </Row>,
		},
	];

	const tableDataSource = {
        title: brandBodyInfo.brand_name,
		tableData: dataSource,
		tableColumns: columns
	};

	const onClickTableMore = async() => {
		const initDataSource = await GetGroupListAPI(offset + 10, {
            brand_id, brand_id
        });
		setOffset(offset + initDataSource.length);
		
		setDataSource([
			...dataSource,
			...initDataSource
		]);
	};

    const onIsUseChange = async(idx, value) => {
        const group_info = {
            ...dataSource.filter(item => item.idx === idx)[0],
            is_use: value
        };

        await UpdateGroupAPI(group_info);

        setDataSource(dataSource.map(item => (
            {
                ...item,
                is_use: item.idx === idx ? value : item.is_use
            }
        )))
    };

    const onDeleteClick = async(idx) => {
        setShowDeleteModal({
            idx: idx,
            show: true
        });
    };

    const deleteInfo = async() => {
        await DeleteGroupInfoAPI(showDeleteModal.idx);
        const initDataSource = await GetGroupListAPI(0, {
            brand_id, brand_id
        });
        setDataSource(initDataSource);
    };

    const renderIsUseField = (idx) => {
        return (
            <Switch 
                checked={
                    dataSource.filter(item => item.idx === idx)[0].is_use === '0' ? false : true
                } 
                onClick={checked => onIsUseChange(idx, checked ? '1' : '0')}
            >
                <label className='switch-label'>
                    {
                        Constants.availableOptions.filter(item => item.value === dataSource.filter(item => item.idx === idx)[0].is_use)[0].label
                    }
                </label>
            </Switch>
        );
    };

    return(
        <>
            <Space direction='vertical' size={18} className='main-layout'>
                {/* Page Header */}
                <Space direction='vertical' size={18}>
                    <label className='main-header-title'>모델그룹 관리</label>
                    <Divider className='main-body-divider' />
                </Space>

                {/* Body Section */}
                <TableList dataSource={tableDataSource} />

                <Row justify='center'>
                    <label className='show-more-label' onClick={onClickTableMore}>더보기</label>
                </Row>
            </Space>
            <AlertDeleteModal visible={showDeleteModal.show} onConfirmClick={() => deleteInfo()} onCancelClick={() => setShowDeleteModal({...showDeleteModal, show: false})} />
        </>
    );
}

export default Manage;