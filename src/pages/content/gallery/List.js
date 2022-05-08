import { Col, Divider, Row, Space, Button, Image } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetBrandOptionListAPI } from '../../../api/Brand';
import { GetModelGalleryListAPI } from '../../../api/ModelGallery';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';

function List() {
	const [offset, setOffset] = useState(0);
	const [brandOptionList, setBrandOptionList] = useState([]);
	const [dataSource, setDataSource] = useState();
	
	const initComponent = async ( ) => {
		const initDataSource = await GetModelGalleryListAPI(offset);
		const initBrandOptionList = await GetBrandOptionListAPI();
		
		setDataSource(initDataSource);
		setBrandOptionList(initBrandOptionList);
	};

	useEffect(() => {
		initComponent();
	}, []);
	
	const columns = [
		{
			title: '노출순서',
			dataIndex: 'order',
			key: 'order',
            align: 'center',
		},
		{
			title: '이미지',
			dataIndex: 'picture',
			key: 'picture',
            align: 'center',
            render: path => <Image src={path} />,
		},
		{
			title: '브랜드',
			dataIndex: 'brand_id',
			key: 'brand_id',
            align: 'center',
			render: brand_id => brandOptionList.filter(item => item.value == brand_id).length ? brandOptionList.filter(item => item.value == brand_id)[0].label : ''
		},
        {
			title: '모델',
			dataIndex: 'model_name',
			key: 'model_name',
            align: 'center',
		},
        {
			title: '등록일',
			dataIndex: 'created_date',
			key: 'created_date',
            align: 'center',
		},
		{
			title: '관리',
			dataIndex: 'model_id',
			key: 'model_id',
            align: 'center',
			render: model_id => 
                <Row justify='center'>
                    <Col>
                        <Space size={15} split={<Divider type="vertical" />}>
							<Link to={"/content/gallery/edit/" + model_id}>
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
                    <label className='main-header-title'>포토갤러리 관리</label>
                    <Divider className='main-body-divider' />
                </Space>

                {/* Body Section */}
                <TableList dataSource={tableList} />

            </Space>
        </>
    );
}

export default List;