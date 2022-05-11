import { Col, Divider, Row, Space, Button, Image, Modal, Input } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetPhotoListAPI } from '../../../api/Photo';
import { GetContentInfoAPI } from '../../../api/Content';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';

// 목록페지
function List() {
    const [offset, setOffset] = useState(0);
    const [showModal, setShowModal] = useState(false);
	const [dataSource, setDataSource] = useState([]);
    const [contentList, setContentList] = useState([]);
	
	const initComponent = async () => {
		const initDataSource = await GetPhotoListAPI(offset);
		
        let initTempDataSource = [];
        for (let i = 0; i < initDataSource.length; i++) {
            const element = initDataSource[i];
            initTempDataSource.push({
                ...element,
                content_list_text: (await GetContentInfoAPI(element.content_ids.split(',')[0])).title,
                content_count: element.content_ids.split(',').length
            });
        }

        setDataSource(initTempDataSource);
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
			title: '콘텐츠 목록',
			dataIndex: 'idx',
			key: 'idx',
            align: 'center',
            render: idx => renderContentListField(idx),
		},
		{
			title: '콘텐츠 수',
			dataIndex: 'content_count',
			key: 'content_count',
            align: 'center',
		},
        {
			title: '사용여부',
			dataIndex: 'is_use',
			key: 'is_use',
            align: 'center',
            render: is_use => Constants.availableOptions.filter(item => item.value === is_use)[0].label
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
							<Link to={"/content/photo/edit/" + idx}>
								<Button className='black-button small-button rounded-button'>수정</Button>
							</Link>
						</Space>
                    </Col>
                </Row>,
		},
	];

	const tableList = {
        topItems: [
			{
				type: Constants.inputTypes.button,
				link: '/content/photo/create',
				label: '등록',
				style: 'black-button big-button',
				width: 150
			}
		],
		tableData: dataSource,
		tableColumns: columns
	};

    const onViewDetailClick = async(content_ids) => {
        var initContentList = [];
        for (let index = 0; index < content_ids.split(',').length; index++) {
            const id = content_ids.split(',')[index];
            initContentList.push(await GetContentInfoAPI(id));
        }
        
        await setContentList(initContentList);
        setShowModal(true);
    };

    const onCloseModalClick = () => {
        setShowModal(false);
    };

    const onClickTableMore = async() => {
		const initDataSource = await GetPhotoListAPI(offset + 10);
		setOffset(offset + initDataSource.length);
		
		setDataSource([
			...dataSource,
			...initDataSource.map(body => {
				return({
					...body,
                    content_count: body.content_ids.split(',').length,
                    publish_date_text: new Date(body.publish_date).getFullYear() + '-' + ("0" + (new Date(body.publish_date).getMonth() + 1)).slice(-2) + '-' + ("0" + new Date(body.publish_date).getDate()).slice(-2),
				})
			})
		]);
	};

    const renderContentListField = (idx) => {
        return (
            <Row gutter={[10]} justify='center'>
                <Col>
                    <label>{dataSource.filter(item => item.idx === idx)[0].content_list_text}</label>
                </Col>
                <Col>
                    <Button className='white-button small-button rounded-button' onClick={() => onViewDetailClick(dataSource.filter(item => item.idx === idx)[0].content_ids)}>상세보기</Button>
                </Col>
            </Row>
        );
    };

    return(
        <>
            <Space direction='vertical' size={18} className='main-layout'>
                {/* Page Header */}
                <Space direction='vertical' size={18}>
                    <label className='main-header-title'>포토뉴스 관리</label>
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
                        {
                            contentList.map((content, index) => (
                                <Row key={0} gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                    <Col span={2} className='table-header-col-section'>
                                        <label>순서{index + 1}</label>
                                    </Col>
                                    <Col flex="auto" className='table-value-col-section'>
                                        <Input value={content.title} readOnly={true} />
                                    </Col>
                                </Row>
                            ))
                        }
                    </Space>
                </Space>
            </Modal>
        </>
    );
}

export default List;