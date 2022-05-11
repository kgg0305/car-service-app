import { Col, Divider, Row, Space, Button, Table, Checkbox, Input } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';
import styles from '../../../assets/styles/pages/user/Role.module.css';

// 목록페지
function List() {

	const [dataSource1, setDataSource1] = useState(
		[
			{
				key: 1,
				user: '[사용자 이름]',
				manage: ''
			},
			{
				key: 2,
				user: '[사용자 이름]',
				manage: ''
			},
		]
	);
	
	const columns1 = [
		{
			title: '사용자',
			dataIndex: 'user',
			key: 'user',
            align: 'center',
            width: 200,
            render: user => 
                <Row justify='left'>
                    <Col>
                        <Space size={20}>
                            <label>{ user }</label>
							<Link to="/user/role/edit">
								<Button type='link' size='small' className={styles.linkButton}>삭제</Button>
							</Link>
						</Space>
                    </Col>
                </Row>,
		},
		{
			title: '자동차 DB 관리',
			dataIndex: 'manage',
			key: 'manage',
            align: 'center',
			render: path => 
                <Space direction='vertical' size={5}>
                    <Row gutter={[13]} justify='left'>
                        <Col span={2} style={{textAlign: 'right'}}>
                            <label>전체관리</label>
                        </Col>
                        <Col>
                            <Checkbox>이 메뉴에 대한 전체 사용권한을 부여</Checkbox>
                        </Col>
                    </Row>
                    <Row gutter={[13]} justify='left'>
                        <Col span={2} style={{textAlign: 'right'}}>
                            <label>보기만</label>
                        </Col>
                        <Col>
                            <Checkbox>보기 전용(메뉴 사용 불가)</Checkbox>
                        </Col>
                    </Row>
                </Space>,
		}
	];

    const [dataSource2, setDataSource2] = useState(
		[
			{
				key: 1,
				user: '[사용자 이름]',
				manage: ''
			},
			{
				key: 2,
				user: '[사용자 이름]',
				manage: ''
			},
		]
	);
	
	const columns2 = [
		{
			title: '사용자',
			dataIndex: 'user',
			key: 'user',
            align: 'center',
            width: 200,
            render: user => 
                <Row justify='left'>
                    <Col>
                        <Space size={20}>
                            <label>{ user }</label>
							<Link to="/user/role/edit">
								<Button type='link' size='small' className={styles.linkButton}>삭제</Button>
							</Link>
						</Space>
                    </Col>
                </Row>,
		},
		{
			title: '금융견적 DB 관리',
			dataIndex: 'manage',
			key: 'manage',
            align: 'center',
			render: path => 
                <Space direction='vertical' size={5}>
                    <Row gutter={[13]} justify='left'>
                        <Col span={2} style={{textAlign: 'right'}}>
                            <label>전체관리</label>
                        </Col>
                        <Col>
                            <Checkbox>이 메뉴에 대한 전체 사용권한을 부여</Checkbox>
                        </Col>
                    </Row>
                    <Row gutter={[13]} justify='left'>
                        <Col span={2} style={{textAlign: 'right'}}>
                            <label>보기만</label>
                        </Col>
                        <Col>
                            <Checkbox>보기 전용(메뉴 사용 불가)</Checkbox>
                        </Col>
                    </Row>
                </Space>,
		}
	];

    const [dataSource3, setDataSource3] = useState(
		[
			{
				key: 1,
				user: '[사용자 이름]',
				request: '',
                count: '',
                setting: ''
			},
			{
				key: 2,
				user: '[사용자 이름]',
				request: '',
                count: '',
                setting: ''
			},
		]
	);
	
	const columns3 = [
		{
			title: '사용자',
			dataIndex: 'user',
			key: 'user',
            align: 'center',
            width: 200,
            render: user => 
                <Row justify='left'>
                    <Col>
                        <Space size={20}>
                            <label>{ user }</label>
							<Link to="/user/role/edit">
								<Button type='link' size='small' className={styles.linkButton}>삭제</Button>
							</Link>
						</Space>
                    </Col>
                </Row>,
		},
		{
			title: '견적신청 / 견적할당',
			dataIndex: 'request',
			key: 'request',
            align: 'center',
			render: path => 
                <Space direction='vertical' size={5}>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>전체관리</label>
                        </Col>
                        <Col>
                            <Checkbox>지점관리, 인원관리, 견적관리에 대한 권한부여</Checkbox>
                        </Col>
                    </Row>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>견적관리</label>
                        </Col>
                        <Col>
                            <Checkbox>할당된 견적관리에 대한 권한부여</Checkbox>
                        </Col>
                    </Row>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>보기만</label>
                        </Col>
                        <Col>
                            <Checkbox>보기 전용(메뉴 사용 불가)</Checkbox>
                        </Col>
                    </Row>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>노출안함</label>
                        </Col>
                        <Col>
                            <Checkbox>해당 메뉴를 표시하지 않음</Checkbox>
                        </Col>
                    </Row>
                </Space>,
		},
		{
			title: '견적상담 카운트',
			dataIndex: 'count',
			key: 'count',
            align: 'center',
			render: path => 
                <Space direction='vertical' size={5}>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>전체관리</label>
                        </Col>
                        <Col>
                            <Checkbox>이 메뉴에 대한 전체 사용권한을 부여</Checkbox>
                        </Col>
                    </Row>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>보기만</label>
                        </Col>
                        <Col>
                            <Checkbox>보기 전용(메뉴 사용 불가)</Checkbox>
                        </Col>
                    </Row>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>노출안함</label>
                        </Col>
                        <Col>
                            <Checkbox>해당 메뉴를 표시하지 않음</Checkbox>
                        </Col>
                    </Row>
                </Space>,
		},
		{
			title: '견적상담 카운트',
			dataIndex: 'setting',
			key: 'setting',
            align: 'center',
			render: path => 
                <Space direction='vertical' size={5}>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>전체관리</label>
                        </Col>
                        <Col>
                            <Checkbox>이 메뉴에 대한 전체 사용권한을 부여</Checkbox>
                        </Col>
                    </Row>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>보기만</label>
                        </Col>
                        <Col>
                            <Checkbox>보기 전용(메뉴 사용 불가)</Checkbox>
                        </Col>
                    </Row>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>노출안함</label>
                        </Col>
                        <Col>
                            <Checkbox>해당 메뉴를 표시하지 않음</Checkbox>
                        </Col>
                    </Row>
                </Space>,
		}
	];

    const [dataSource4, setDataSource4] = useState(
		[
			{
				key: 1,
				user: '[사용자 이름]',
				content: '',
                media: ''
			},
			{
				key: 2,
				user: '[사용자 이름]',
				content: '',
                media: ''
			},
		]
	);
	
	const columns4 = [
		{
			title: '사용자',
			dataIndex: 'user',
			key: 'user',
            align: 'center',
            width: 200,
            render: user => 
                <Row justify='left'>
                    <Col>
                        <Space size={20}>
                            <label>{ user }</label>
							<Link to="/user/role/edit">
								<Button type='link' size='small' className={styles.linkButton}>삭제</Button>
							</Link>
						</Space>
                    </Col>
                </Row>,
		},
		{
			title: '콘텐츠',
			dataIndex: 'content',
			key: 'content',
            align: 'center',
			render: path => 
            <Space direction='vertical' size={5}>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>전체관리</label>
                    </Col>
                    <Col>
                        <Checkbox>이 메뉴에 대한 전체 사용권한을 부여</Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>보기만</label>
                    </Col>
                    <Col>
                        <Checkbox>보기 전용(메뉴 사용 불가)</Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>노출안함</label>
                    </Col>
                    <Col>
                        <Checkbox>해당 메뉴를 표시하지 않음</Checkbox>
                    </Col>
                </Row>
            </Space>,
		},
		{
			title: '매체 PV',
			dataIndex: 'media',
			key: 'media',
            align: 'center',
			render: path => 
                <Space direction='vertical' size={5}>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>전체관리</label>
                        </Col>
                        <Col>
                            <Checkbox>이 메뉴에 대한 전체 사용권한을 부여</Checkbox>
                        </Col>
                    </Row>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>보기만</label>
                        </Col>
                        <Col>
                            <Checkbox>보기 전용(메뉴 사용 불가)</Checkbox>
                        </Col>
                    </Row>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>노출안함</label>
                        </Col>
                        <Col>
                            <Checkbox>해당 메뉴를 표시하지 않음</Checkbox>
                        </Col>
                    </Row>
                </Space>,
		}
	];

    const [dataSource5, setDataSource5] = useState(
		[
			{
				key: 1,
				user: '[사용자 이름]',
				recommendation: '',
                photo: '',
                gallery: '',
                rank: ''
			},
			{
				key: 2,
				user: '[사용자 이름]',
				recommendation: '',
                photo: '',
                gallery: '',
                rank: ''
			},
		]
	);
	
	const columns5 = [
		{
			title: '사용자',
			dataIndex: 'user',
			key: 'user',
            align: 'center',
            width: 200,
            render: user => 
                <Row justify='left'>
                    <Col>
                        <Space size={20}>
                            <label>{ user }</label>
							<Link to="/user/role/edit">
								<Button type='link' size='small' className={styles.linkButton}>삭제</Button>
							</Link>
						</Space>
                    </Col>
                </Row>,
		},
		{
			title: '추천뉴스',
			dataIndex: 'recommendation',
			key: 'recommendation',
            align: 'center',
			render: path => 
            <Space direction='vertical' size={5}>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>전체관리</label>
                    </Col>
                    <Col>
                        <Checkbox>이 메뉴에 대한 전체 사용권한을 부여</Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>보기만</label>
                    </Col>
                    <Col>
                        <Checkbox>보기 전용(메뉴 사용 불가)</Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>노출안함</label>
                    </Col>
                    <Col>
                        <Checkbox>해당 메뉴를 표시하지 않음</Checkbox>
                    </Col>
                </Row>
            </Space>,
		},
		{
			title: '포토 뉴스',
			dataIndex: 'photo',
			key: 'photo',
            align: 'center',
			render: path => 
                <Space direction='vertical' size={5}>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>전체관리</label>
                        </Col>
                        <Col>
                            <Checkbox>이 메뉴에 대한 전체 사용권한을 부여</Checkbox>
                        </Col>
                    </Row>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>보기만</label>
                        </Col>
                        <Col>
                            <Checkbox>보기 전용(메뉴 사용 불가)</Checkbox>
                        </Col>
                    </Row>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>노출안함</label>
                        </Col>
                        <Col>
                            <Checkbox>해당 메뉴를 표시하지 않음</Checkbox>
                        </Col>
                    </Row>
                </Space>,
		},
		{
			title: '포토 / 인기 갤러리',
			dataIndex: 'gallery',
			key: 'gallery',
            align: 'center',
			render: path => 
                <Space direction='vertical' size={5}>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>전체관리</label>
                        </Col>
                        <Col>
                            <Checkbox>이 메뉴에 대한 전체 사용권한을 부여</Checkbox>
                        </Col>
                    </Row>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>보기만</label>
                        </Col>
                        <Col>
                            <Checkbox>보기 전용(메뉴 사용 불가)</Checkbox>
                        </Col>
                    </Row>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>노출안함</label>
                        </Col>
                        <Col>
                            <Checkbox>해당 메뉴를 표시하지 않음</Checkbox>
                        </Col>
                    </Row>
                </Space>,
		},
		{
			title: '인기순위(자동차, 콘텐츠, 동영상)',
			dataIndex: 'rank',
			key: 'rank',
            align: 'center',
			render: path => 
                <Space direction='vertical' size={5}>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>전체관리</label>
                        </Col>
                        <Col>
                            <Checkbox>이 메뉴에 대한 전체 사용권한을 부여</Checkbox>
                        </Col>
                    </Row>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>보기만</label>
                        </Col>
                        <Col>
                            <Checkbox>보기 전용(메뉴 사용 불가)</Checkbox>
                        </Col>
                    </Row>
                    <Row gutter={[13]} justify='left'>
                        <Col style={{textAlign: 'right', width: 70}}>
                            <label>노출안함</label>
                        </Col>
                        <Col>
                            <Checkbox>해당 메뉴를 표시하지 않음</Checkbox>
                        </Col>
                    </Row>
                </Space>,
		}
	];

    return(
        <>
            <Space direction='vertical' size={18} className='main-layout'>
                {/* Page Header */}
                <Space direction='vertical' size={18}>
                    <Row justify='middle'>
                        <Col>
                            <label className='main-header-title'>사용자 권한</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Button className='black-button medium-button'>저장하기</Button>
                        </Col>
                    </Row>
                    <Divider className='main-body-divider' />
                </Space>

                {/* Body Section */}
                <Space direction='vertical' size={80}>
                    <Space key={1} direction='vertical' size={20}>
                        <Space size={10} direction="vertical">
                            <Row justify='bottom'>
                                <Col>
                                    <label className={'body-header-title'}>자동차 DB</label>
                                </Col>
                                <Col flex="auto" />
                            </Row>
                        </Space>
                        
                        <Table dataSource={dataSource1} columns={columns1} pagination={false} bordered />

                        <Space size={6}>
                            <Input size='large' placeholder='사용자 이름 입력' style={{width: 400}} />
                            <Button size='large' className='black-button'>추가하기</Button>
                        </Space>
                    </Space>

                    <Space key={2} direction='vertical' size={20}>
                        <Space size={10} direction="vertical">
                            <Row justify='bottom'>
                                <Col>
                                    <label className={'body-header-title'}>금융견적 DB</label>
                                </Col>
                                <Col flex="auto" />
                            </Row>
                        </Space>
                        
                        <Table dataSource={dataSource2} columns={columns2} pagination={false} bordered />

                        <Space size={6}>
                            <Input size='large' placeholder='사용자 이름 입력' style={{width: 400}} />
                            <Button size='large' className='black-button'>추가하기</Button>
                        </Space>
                    </Space>

                    <Space key={3} direction='vertical' size={20}>
                        <Space size={10} direction="vertical">
                            <Row justify='bottom'>
                                <Col>
                                    <label className={'body-header-title'}>견적관리</label>
                                </Col>
                                <Col flex="auto" />
                            </Row>
                        </Space>
                        
                        <Table dataSource={dataSource3} columns={columns3} pagination={false} bordered />

                        <Space size={6}>
                            <Input size='large' placeholder='사용자 이름 입력' style={{width: 400}} />
                            <Button size='large' className='black-button'>추가하기</Button>
                        </Space>
                    </Space>

                    <Space key={4} direction='vertical' size={20}>
                        <Space size={10} direction="vertical">
                            <Row justify='bottom'>
                                <Col>
                                    <label className={'body-header-title'}>콘텐츠 관리</label>
                                </Col>
                                <Col flex="auto" />
                            </Row>
                        </Space>
                        
                        <Table dataSource={dataSource4} columns={columns4} pagination={false} bordered />

                        <Space size={6}>
                            <Input size='large' placeholder='사용자 이름 입력' style={{width: 400}} />
                            <Button size='large' className='black-button'>추가하기</Button>
                        </Space>
                    </Space>

                    <Space key={5} direction='vertical' size={20}>
                        <Space size={10} direction="vertical">
                            <Row justify='bottom'>
                                <Col>
                                    <label className={'body-header-title'}>콘텐츠 운영 관리</label>
                                </Col>
                                <Col flex="auto" />
                            </Row>
                        </Space>
                        
                        <Table dataSource={dataSource5} columns={columns5} pagination={false} bordered />

                        <Space size={6}>
                            <Input size='large' placeholder='사용자 이름 입력' style={{width: 400}} />
                            <Button size='large' className='black-button'>추가하기</Button>
                        </Space>
                    </Space>
                </Space>
            </Space>
        </>
    );
}

export default List;