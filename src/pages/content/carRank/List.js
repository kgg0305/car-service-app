import { Col, Divider, Row, Space, Button, Image, Modal, Input } from 'antd';
import React, { useState } from 'react';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';

function List() {
    const [showModal, setShowModal] = useState(false);

	const [dataSource, setDataSource] = useState(
		[
			{
				key: 1,
				rank: '1',
				import: '수입',
				brand: '블루멤버스',
                group: '블루멤버스',
				model: '블루멤버스',
			},
			{
				key: 2,
				rank: '1',
				import: '수입',
				brand: '블루멤버스',
                group: '블루멤버스',
				model: '블루멤버스',
			},
			{
				key: 2,
				rank: '1',
				import: '수입',
				brand: '블루멤버스',
                group: '블루멤버스',
				model: '블루멤버스',
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
			title: '수입여부',
			dataIndex: 'import',
			key: 'import',
            align: 'center',
		},
        {
			title: '브랜드',
			dataIndex: 'brand',
			key: 'brand',
            align: 'center',
		},
		{
			title: '모델그룹',
			dataIndex: 'group',
			key: 'group',
            align: 'center',
		},
        {
			title: '모델',
			dataIndex: 'model',
			key: 'model',
            align: 'center',
		},
	];

	const tableList = {
        title: '등록일' + '  2022-03-31 12시24분',
        topItems: [
            {
				type: Constants.inputTypes.button,
				link: '/content/carRank/edit',
				label: '순위 수정',
				style: 'white-button big-button',
				width: 150
			},
			{
				type: Constants.inputTypes.button,
				link: '/content/carRank/create',
				label: '순위 등록',
				style: 'black-button big-button',
				width: 150
			}
		],
		tableData: dataSource,
		tableColumns: columns
	};

    const onViewDetailClick = event => {
        setShowModal(true);
    };

    const onCloseModalClick = () => {
        setShowModal(false);
    };

    return(
        <>
            <Space direction='vertical' size={18} className='main-layout'>
                {/* Page Header */}
                <Space direction='vertical' size={18}>
                    <label className='main-header-title'>자동차 인기순위</label>
                    <Divider className='main-body-divider' />
                </Space>

                {/* Body Section */}
                <TableList dataSource={tableList} />

            </Space>

            <Modal
                centered
                width={1100}
                closable={false}
                visible={showModal}
                title={'콘텐츠 목록  2022-03-31'}
                footer={[
                    <Button className='alert-button' onClick={onCloseModalClick}>닫기</Button>
                ]}
            >
                <Space direction='vertical' size={20} style={{width:'100%'}}>
                    <Space direction='vertical' size={0} style={{width:'100%'}}>
                        <Row key={0} gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                            <Col span={2} className='table-header-col-section'>
                                <label>순서1</label>
                            </Col>
                            <Col flex="auto" className='table-value-col-section'>
                                <Input />
                            </Col>
                        </Row>
                        <Row key={1} gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                            <Col span={2} className='table-header-col-section'>
                                <label>순서1</label>
                            </Col>
                            <Col flex="auto" className='table-value-col-section'>
                                <Input />
                            </Col>
                        </Row>
                    </Space>
                </Space>
            </Modal>
        </>
    );
}

export default List;