import { Col, Divider, Row, Space, Button, Select, Switch } from 'antd';
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { DeleteLineupInfoAPI, GetLineupListAPI, UpdateLineupAPI } from '../../../api/Lineup';
import { GetBrandOptionListAPI } from '../../../api/Brand';
import { GetGroupOptionListAPI } from '../../../api/Group';
import { GetModelInfoAPI, GetModelOptionListAPI } from '../../../api/Model';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';
import { GetDateFullTimeStringUsingKorFromDate } from '../../../constants/GlobalFunctions';
import { CaretDownOutlined } from '@ant-design/icons';
import AlertDeleteModal from '../../../components/AlertDeleteModal';

// 목록페지
function Manage() {
    let { model_id } = useParams();
	const [offset, setOffset] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState({
        idx: null,
        show: false
    });
	const [dataSource, setDataSource] = useState([]);
    const [modelBodyInfo, setModelBodyInfo] = useState({
        model_name: ''
    });
	
	const initComponent = async () => {
		const initDataSource = await GetLineupListAPI(offset, {
            model_id: model_id
        });
        const initModelBodyInfo = await GetModelInfoAPI(model_id);
		
		setDataSource(initDataSource);
        setModelBodyInfo(initModelBodyInfo);
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
			title: '모델',
			dataIndex: 'model_name',
			key: 'model_name',
            align: 'center',
		},
        {
			title: '라인업',
			dataIndex: 'lineup_name',
			key: 'lineup_name',
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
			title: '등록일',
			dataIndex: 'created_date',
			key: 'created_date',
            align: 'center',
			render: created_date => GetDateFullTimeStringUsingKorFromDate(new Date(created_date))
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
                            <Link to={"/car/lineup/edit/" + idx}>
                                <Button className='black-button small-button rounded-button'>수정</Button>
                            </Link>
                            <Button className='white-button small-button rounded-button' onClick={() => onDeleteClick(idx)} size='large'>삭제</Button>
                        </Space>
                    </Col>
                </Row>,
		},
	];

	const tableDataSource = {
		title: modelBodyInfo.model_name,
		tableData: dataSource,
		tableColumns: columns
	};

    const onClickTableMore = async() => {
		const initDataSource = await GetLineupListAPI(offset + 10, {
            model_id: model_id
        });
		setOffset(offset + initDataSource.length);
		
		setDataSource([
			...dataSource,
			...initDataSource
		]);
	};

    const onIsUseChange = async(idx, value) => {
        const lineup_info = {
            ...dataSource.filter(item => item.idx === idx)[0],
            is_use: value
        };

        await UpdateLineupAPI(lineup_info);

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
        await DeleteLineupInfoAPI(showDeleteModal.idx);
        const initDataSource = await GetLineupListAPI(0, {
            model_id: model_id
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
                    <label className='main-header-title'>라인업 관리</label>
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