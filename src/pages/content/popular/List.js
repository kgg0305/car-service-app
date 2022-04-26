import { Col, Divider, Row, Space, Button, Image } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';

function List() {

	const [dataSource, setDataSource] = useState(
		[
			{
				key: 1,
				order: '1',
				image: window.location.origin + '/images/logo/logo.png',
				brand: 'qwewqe',
                model: '사용',
                date: '2022-01-23',
				manage: '',
			},
			{
				key: 2,
				order: '1',
				image: window.location.origin + '/images/logo/logo.png',
				brand: 'qwewqe',
                model: '사용',
                date: '2022-01-23',
				manage: '',
			},
			{
				key: 2,
				order: '1',
				image: window.location.origin + '/images/logo/logo.png',
				brand: 'qwewqe',
                model: '사용',
                date: '2022-01-23',
				manage: '',
			},
		]
	);
	
	const columns = [
		{
			title: '노출순서',
			dataIndex: 'order',
			key: 'order',
            align: 'center',
		},
		{
			title: '이미지',
			dataIndex: 'image',
			key: 'image',
            align: 'center',
            render: path => <Image src={path} />,
		},
		{
			title: '브랜드',
			dataIndex: 'brand',
			key: 'brand',
            align: 'center',
		},
        {
			title: '모델',
			dataIndex: 'model',
			key: 'model',
            align: 'center',
		},
        {
			title: '등록일',
			dataIndex: 'date',
			key: 'date',
            align: 'center',
		},
		{
			title: '관리',
			dataIndex: 'manage',
			key: 'manage',
            align: 'center',
			render: path => 
                <Row justify='center'>
                    <Col>
                        <Space size={15} split={<Divider type="vertical" />}>
							<Link to="/content/gallery/edit">
								<Button className='black-button small-button rounded-button'>수정</Button>
							</Link>
						</Space>
                    </Col>
                </Row>,
		},
	];

	const tableList = {
		tableData: dataSource,
		tableColumns: columns
	};

    return(
        <>
            <Space direction='vertical' size={18} className='main-layout'>
                {/* Page Header */}
                <Space direction='vertical' size={18}>
                    <label className='main-header-title'>인기포토 관리</label>
                    <Divider className='main-body-divider' />
                </Space>

                {/* Body Section */}
                <TableList dataSource={tableList} />

            </Space>
        </>
    );
}

export default List;