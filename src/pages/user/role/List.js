import { Col, Divider, Row, Space, Button, Table, Checkbox, Input } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import TableList from '../../../components/TableList';
import { Constants } from '../../../constants/Constants';
import styles from '../../../assets/styles/pages/user/Role.module.css';
import { CreateUserRoleAPI, DeleteUserRoleInfoAPI, GetUserRoleListAPI, UpdateUserRoleAPI } from '../../../api/UserRole';
import { GetUserOptionListAPI } from '../../../api/User';

// 목록페지
function List() {
    const [dataSource, setDataSource] = useState([]);
    const [roleIdList, setRoleIdList] = useState([]);
    const [userOptionList, setUserOptionList] = useState([]);
    const [userName, setUserName] = useState({
        car: ''
    });
    const [checkName, setCheckName] = useState({
        car: false
    });

    const initComponent = async () => {
		const initDataSource = await GetUserRoleListAPI(0);
        const initRoleIdList = initDataSource.map(item => item.idx);
        const initUserOptionList = await GetUserOptionListAPI();
		
		setDataSource(initDataSource.map((item, index) => (
            {
                ...item,
                number: index + 1
            }
        )));
        setUserOptionList(initUserOptionList);
        setRoleIdList(initRoleIdList);
	};

	useEffect(() => {
		initComponent();
	}, []);

    const onChangeUserName = (name, value) => {
        setUserName({
            ...userName,
            [name]: value
        });
    };

    const onChangeStatus = (number, status) => {
        setDataSource(dataSource.map(item => (
            {
                ...item,
                status: item.number === number ? status : item.status
            }
        )))
    };

    const onAddUserNameClick = (name) => {
        console.log(userOptionList)
        if(userOptionList.some(item => item.label === userName[name])) {
            const user_option_info = userOptionList.filter(item => item.label === userName[name])[0];
            setDataSource([
                ...dataSource,
                {
                    idx: null,
                    number: dataSource.length == 0 ? 1: dataSource[dataSource.length - 1],
                    name: name,
                    user_id: user_option_info.value,
                    user_name: user_option_info.label,
                    status: '0'
                }
            ]);
            setCheckName({
                ...checkName,
                [name]: false
            });
        } else {
            setCheckName({
                ...checkName,
                [name]: true
            });
        }
    };

    const onDeleteUserNameClick = (number) => {
        setDataSource(dataSource.filter(item => item.number !== number));
    };

    const onSaveClick = async() => {
        //delete role
        for (let i = 0; i < roleIdList.length; i++) {
            const element = roleIdList[i];
            if(!dataSource.some(item => item.idx === element)) {
                DeleteUserRoleInfoAPI(element);
            }
        }

        //update role
        for (let i = 0; i < dataSource.length; i++) {
            const element = dataSource[i];
            if(element.idx) {
                await UpdateUserRoleAPI(element);
            }
        }

        //create role
        const tempRoleBodyList = dataSource.filter(body => body.idx === null);

        await CreateUserRoleAPI(tempRoleBodyList);
        const initDataSource = await GetUserRoleListAPI(0);
        setDataSource(initDataSource.map((item, index) => (
            {
                ...item,
                number: index + 1
            }
        )));
        setRoleIdList(dataSource.map(item => item.idx));
    };
	
	const columns1 = [
		{
			title: '사용자',
			dataIndex: 'number',
			key: 'number',
            align: 'center',
            width: 200,
            render: number => renderUserField(number),
		},
		{
			title: '자동차 DB 관리',
			dataIndex: 'number',
			key: 'number',
            align: 'center',
			render: number => renderCarStatusField(number),
		}
	];
	
	const columns2 = [
		{
			title: '사용자',
			dataIndex: 'number',
			key: 'number',
            align: 'center',
            width: 200,
            render: number => renderUserField(number),
		},
		{
			title: '금융견적 DB 관리',
			dataIndex: 'number',
			key: 'number',
            align: 'center',
			render: number => renderFinanceStatusField(number),
		}
	];
	
	const columns3 = [
		{
			title: '사용자',
			dataIndex: 'number',
			key: 'number',
            align: 'center',
            width: 200,
            render: number => renderUserField(number),
		},
		{
			title: '견적신청 / 견적할당',
			dataIndex: 'number',
			key: 'number',
            align: 'center',
			render: number => renderEstimationQuotationAndAssignmentStatusField(number),
		},
		{
			title: '견적상담 카운트',
			dataIndex: 'number',
			key: 'number',
            align: 'center',
			render: number => renderEstimationCountStatusField(number),
		},
		{
			title: '견적상담 카운트 설정',
			dataIndex: 'number',
			key: 'number',
            align: 'center',
			render: number => renderEstimationSettingStatusField(number),
		}
	];
	
	const columns4 = [
		{
			title: '사용자',
			dataIndex: 'number',
			key: 'number',
            align: 'center',
            width: 200,
            render: number => renderUserField(number),
		},
		{
			title: '콘텐츠',
			dataIndex: 'number',
			key: 'number',
            align: 'center',
			render: number => renderContentContentStatusField(number),
		},
		{
			title: '매체 PV',
			dataIndex: 'number',
			key: 'number',
            align: 'center',
			render: number => renderContentMediaStatusField(number),
		}
	];
	
	const columns5 = [
		{
			title: '사용자',
			dataIndex: 'number',
			key: 'number',
            align: 'center',
            width: 200,
            render: number => renderUserField(number),
		},
		{
			title: '추천뉴스',
			dataIndex: 'number',
			key: 'number',
            align: 'center',
			render: number => renderContentRecommendationStatusField(number),
		},
		{
			title: '포토 뉴스',
			dataIndex: 'number',
			key: 'number',
            align: 'center',
			render: number => renderContentPhotoStatusField(number),
		},
		{
			title: '포토 / 인기 갤러리',
			dataIndex: 'number',
			key: 'number',
            align: 'center',
			render: number => renderContentGalleryStatusField(number),
		},
		{
			title: '인기순위(자동차, 콘텐츠, 동영상)',
			dataIndex: 'number',
			key: 'number',
            align: 'center',
			render: number => renderContentRankStatusField(number),
		}
	];

    const renderUserField = (number) => {
        const role_info = dataSource.filter(item => item.number === number)[0];
        return (
            <Row justify='left'>
                <Col>
                    <Space size={20}>
                        <label>{ role_info.user_name }</label>
                        <Button type='link' className={styles.linkButton} onClick={() => onDeleteUserNameClick(number)}>삭제</Button>
                    </Space>
                </Col>
            </Row>
        );
    };

    const renderCarStatusField = (number) => {
        return (
            <Space direction='vertical' size={5}>
                <Row gutter={[13]} justify='left'>
                    <Col span={2} style={{textAlign: 'right'}}>
                        <label>전체관리</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status === '1' ? true : false}
                            onChange={e => {
                                onChangeStatus(number, e.target.checked ? '1' : '0');
                            }} 
                        >
                            이 메뉴에 대한 전체 사용권한을 부여
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col span={2} style={{textAlign: 'right'}}>
                        <label>보기만</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status === '2' ? true : false}
                            onChange={e => {
                                onChangeStatus(number, e.target.checked ? '2' : '0');
                            }} 
                        >
                            보기 전용(메뉴 사용 불가)
                        </Checkbox>
                    </Col>
                </Row>
            </Space>
        );
    };

    const renderFinanceStatusField = (number) => {
        return (
            <Space direction='vertical' size={5}>
                <Row gutter={[13]} justify='left'>
                    <Col span={2} style={{textAlign: 'right'}}>
                        <label>전체관리</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status === '1' ? true : false}
                            onChange={e => {
                                onChangeStatus(number, e.target.checked ? '1' : '0');
                            }} 
                        >
                            이 메뉴에 대한 전체 사용권한을 부여
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col span={2} style={{textAlign: 'right'}}>
                        <label>보기만</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status === '2' ? true : false}
                            onChange={e => {
                                onChangeStatus(number, e.target.checked ? '2' : '0');
                            }} 
                        >
                            보기 전용(메뉴 사용 불가)
                        </Checkbox>
                    </Col>
                </Row>
            </Space>
        );
    };

    const renderEstimationQuotationAndAssignmentStatusField = (number) => {
        return (
            <Space direction='vertical' size={5}>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>전체관리</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[0] === '1' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                    e.target.checked ? '1' : '0',
                                    status_array[1],
                                    status_array[2]
                                ];
                                onChangeStatus(number, updated_status.join(','));
                            }} 
                        >
                            지점관리, 인원관리, 견적관리에 대한 권한부여
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>견적관리</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[0] === '2' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                    e.target.checked ? '2' : '0',
                                    status_array[1],
                                    status_array[2]
                                ];
                                onChangeStatus(number, updated_status.join(','));
                            }} 
                        >
                            할당된 견적관리에 대한 권한부여
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>보기만</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[0] === '3' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                    e.target.checked ? '3' : '0',
                                    status_array[1],
                                    status_array[2]
                                ];
                                onChangeStatus(number, updated_status.join(','));
                            }} 
                        >
                            보기 전용(메뉴 사용 불가)
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>노출안함</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[0] === '4' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                    e.target.checked ? '4' : '0',
                                    status_array[1],
                                    status_array[2]
                                ];
                                onChangeStatus(number, updated_status.join(','));
                            }} 
                        >
                            해당 메뉴를 표시하지 않음
                        </Checkbox>
                    </Col>
                </Row>
            </Space>
        );
    };

    const renderEstimationCountStatusField = (number) => {
        return (
            <Space direction='vertical' size={5}>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>전체관리</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[1] === '1' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                    status_array[0],
                                    e.target.checked ? '1' : '0',
                                    status_array[2]
                                ];
                                onChangeStatus(number, updated_status.join(','));
                            }} 
                        >
                            이 메뉴에 대한 전체 사용권한을 부여
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>보기만</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[1] === '2' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                    status_array[0],
                                    e.target.checked ? '2' : '0',
                                    status_array[2]
                                ];
                                onChangeStatus(number, updated_status.join(','));
                            }} 
                        >
                            보기 전용(메뉴 사용 불가)
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>노출안함</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[1] === '3' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                    status_array[0],
                                    e.target.checked ? '3' : '0',
                                    status_array[2]
                                ];
                                onChangeStatus(number, updated_status.join(','));
                            }} 
                        >
                            해당 메뉴를 표시하지 않음
                        </Checkbox>
                    </Col>
                </Row>
            </Space>
        );
    };

    const renderEstimationSettingStatusField = (number) => {
        return (
            <Space direction='vertical' size={5}>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>전체관리</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[2] === '1' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                    status_array[0],
                                    status_array[1],
                                    e.target.checked ? '1' : '0'
                                ];
                                onChangeStatus(number, updated_status.join(','));
                            }} 
                        >
                            이 메뉴에 대한 전체 사용권한을 부여
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>보기만</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[2] === '2' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                    status_array[0],
                                    status_array[1],
                                    e.target.checked ? '2' : '0'
                                ];
                                onChangeStatus(number, updated_status.join(','));
                            }} 
                        >
                            보기 전용(메뉴 사용 불가)
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>노출안함</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[2] === '3' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                    status_array[0],
                                    status_array[1],
                                    e.target.checked ? '3' : '0'
                                ];
                                onChangeStatus(number, updated_status.join(','));
                            }} 
                        >
                            해당 메뉴를 표시하지 않음
                        </Checkbox>
                    </Col>
                </Row>
            </Space>
        );
    };

    const renderContentContentStatusField = (number) => {
        return (
            <Space direction='vertical' size={5}>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>전체관리</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[0] === '1' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                    e.target.checked ? '1' : '0',
                                    status_array[1]
                                ];
                                onChangeStatus(number, updated_status.join(','));
                            }} 
                        >
                            이 메뉴에 대한 전체 사용권한을 부여
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>보기만</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[0] === '2' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                    e.target.checked ? '2' : '0',
                                    status_array[1]
                                ];
                                onChangeStatus(number, updated_status.join(','));
                            }} 
                        >
                            보기 전용(메뉴 사용 불가)
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>노출안함</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[0] === '3' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                    e.target.checked ? '3' : '0',
                                    status_array[1]
                                ];
                                onChangeStatus(number, updated_status.join(','));
                            }}  
                        >
                            해당 메뉴를 표시하지 않음
                        </Checkbox>
                    </Col>
                </Row>
            </Space>
        );
    };

    const renderContentMediaStatusField = (number) => {
        return (
            <Space direction='vertical' size={5}>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>전체관리</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[1] === '1' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                    status_array[0],
                                    e.target.checked ? '1' : '0'
                                ];
                                onChangeStatus(number, updated_status.join(','));
                            }}
                        >
                            이 메뉴에 대한 전체 사용권한을 부여
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>보기만</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[1] === '2' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                    status_array[0],
                                    e.target.checked ? '2' : '0'
                                ];
                                onChangeStatus(number, updated_status.join(','));
                            }}
                        >
                            보기 전용(메뉴 사용 불가)
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>노출안함</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[1] === '3' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                    status_array[0],
                                    e.target.checked ? '3' : '0'
                                ];
                                onChangeStatus(number, updated_status.join(','));
                            }}
                        >
                            해당 메뉴를 표시하지 않음
                        </Checkbox>
                    </Col>
                </Row>
            </Space>
        );
    };

    const renderContentRecommendationStatusField = (number) => {
        return (
            <Space direction='vertical' size={5}>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>전체관리</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[0] === '1' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                        e.target.checked ? '1' : '0',
                                        status_array[1],
                                        status_array[2],
                                        status_array[3]
                                    ];
                                onChangeStatus(number, updated_status.join(','));
                            }}
                        >
                            이 메뉴에 대한 전체 사용권한을 부여
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>보기만</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[0] === '2' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                        e.target.checked ? '2' : '0',
                                        status_array[1],
                                        status_array[2],
                                        status_array[3]
                                    ];
                                onChangeStatus(number, updated_status.join(','));
                            }}
                        >
                            보기 전용(메뉴 사용 불가)
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>노출안함</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[0] === '3' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                        e.target.checked ? '3' : '0',
                                        status_array[1],
                                        status_array[2],
                                        status_array[3]
                                    ];
                                onChangeStatus(number, updated_status.join(','));
                            }}
                        >
                            해당 메뉴를 표시하지 않음
                        </Checkbox>
                    </Col>
                </Row>
            </Space>
        );
    };

    const renderContentPhotoStatusField = (number) => {
        return (
            <Space direction='vertical' size={5}>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>전체관리</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[1] === '1' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                        status_array[0],
                                        e.target.checked ? '1' : '0',
                                        status_array[2],
                                        status_array[3]
                                    ];
                                onChangeStatus(number, updated_status.join(','));
                            }}
                        >
                            이 메뉴에 대한 전체 사용권한을 부여
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>보기만</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[1] === '2' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                        status_array[0],
                                        e.target.checked ? '2' : '0',
                                        status_array[2],
                                        status_array[3]
                                    ];
                                onChangeStatus(number, updated_status.join(','));
                            }}
                        >
                            보기 전용(메뉴 사용 불가)
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>노출안함</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[1] === '3' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                        status_array[0],
                                        e.target.checked ? '3' : '0',
                                        status_array[2],
                                        status_array[3]
                                    ];
                                onChangeStatus(number, updated_status.join(','));
                            }}
                        >
                            해당 메뉴를 표시하지 않음
                        </Checkbox>
                    </Col>
                </Row>
            </Space>
        );
    };

    const renderContentGalleryStatusField = (number) => {
        return (
            <Space direction='vertical' size={5}>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>전체관리</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[2] === '1' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                        status_array[0],
                                        status_array[1],
                                        e.target.checked ? '1' : '0',
                                        status_array[3]
                                    ];
                                onChangeStatus(number, updated_status.join(','));
                            }}
                        >
                            이 메뉴에 대한 전체 사용권한을 부여
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>보기만</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[2] === '2' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                        status_array[0],
                                        status_array[1],
                                        e.target.checked ? '2' : '0',
                                        status_array[3]
                                    ];
                                onChangeStatus(number, updated_status.join(','));
                            }}
                        >
                            보기 전용(메뉴 사용 불가)
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>노출안함</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[2] === '3' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                        status_array[0],
                                        status_array[1],
                                        e.target.checked ? '3' : '0',
                                        status_array[3]
                                    ];
                                onChangeStatus(number, updated_status.join(','));
                            }}
                        >
                            해당 메뉴를 표시하지 않음
                        </Checkbox>
                    </Col>
                </Row>
            </Space>
        );
    };

    const renderContentRankStatusField = (number) => {
        return (
            <Space direction='vertical' size={5}>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>전체관리</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[3] === '1' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                        status_array[0],
                                        status_array[1],
                                        status_array[3],
                                        e.target.checked ? '1' : '0'
                                    ];
                                onChangeStatus(number, updated_status.join(','));
                            }}
                        >
                            이 메뉴에 대한 전체 사용권한을 부여
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>보기만</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[3] === '2' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                        status_array[0],
                                        status_array[1],
                                        status_array[3],
                                        e.target.checked ? '2' : '0'
                                    ];
                                onChangeStatus(number, updated_status.join(','));
                            }}
                        >
                            보기 전용(메뉴 사용 불가)
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[13]} justify='left'>
                    <Col style={{textAlign: 'right', width: 70}}>
                        <label>노출안함</label>
                    </Col>
                    <Col>
                        <Checkbox
                            checked={dataSource.filter(item => item.number === number)[0].status.split(',')[3] === '3' ? true : false}
                            onChange={e => {
                                const status_array = dataSource.filter(item => item.number === number)[0].status.split(',');
                                const updated_status = [
                                        status_array[0],
                                        status_array[1],
                                        status_array[3],
                                        e.target.checked ? '3' : '0'
                                    ];
                                onChangeStatus(number, updated_status.join(','));
                            }}
                        >
                            해당 메뉴를 표시하지 않음
                        </Checkbox>
                    </Col>
                </Row>
            </Space>
        );
    };

    const renderUserOptionList = (name) => {
        return (
            <Space size={6}>
                <div style={{position: 'relative'}}>
                    <Input 
                        name='user_name' 
                        value={userName[name]} 
                        onChange={e => {
                            onChangeUserName(name, e.target.value);
                        }} 
                        size='large' 
                        placeholder='사용자 이름 입력' style={{width: 400}} 
                    />
                    {
                        checkName[name] ? <label className='danger-alert'>등록되지 않은 사용자입니다.</label> : ''
                    }
                </div>
                <Button size='large' className='black-button' onClick={() => onAddUserNameClick(name)}>추가하기</Button>
            </Space>
        );
    };

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
                            <Button className='black-button' size='large' onClick={onSaveClick}>저장하기</Button>
                        </Col>
                    </Row>
                    <Divider className='main-body-divider' />
                </Space>

                {/* Body Section */}
                <Space direction='vertical' size={80} style={{paddingBottom: 50}}>
                    <Space key={1} direction='vertical' size={20}>
                        <Space size={10} direction="vertical">
                            <Row justify='bottom'>
                                <Col>
                                    <label className={'body-header-title'}>자동차 DB</label>
                                </Col>
                                <Col flex="auto" />
                            </Row>
                        </Space>
                        
                        <Table dataSource={dataSource.filter(item => item.name === 'car')} columns={columns1} pagination={false} bordered />

                        {renderUserOptionList('car')}
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
                        
                        <Table dataSource={dataSource.filter(item => item.name === 'finance')} columns={columns2} pagination={false} bordered />

                        {renderUserOptionList('finance')}
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
                        
                        <Table dataSource={dataSource.filter(item => item.name === 'estimation')} columns={columns3} pagination={false} bordered />

                        {renderUserOptionList('estimation')}
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
                        
                        <Table dataSource={dataSource.filter(item => item.name === 'content1')} columns={columns4} pagination={false} bordered />

                        {renderUserOptionList('content1')}
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
                        
                        <Table dataSource={dataSource.filter(item => item.name === 'content2')} columns={columns5} pagination={false} bordered />

                        {renderUserOptionList('content2')}
                    </Space>
                </Space>
            </Space>
        </>
    );
}

export default List;