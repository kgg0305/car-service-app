import { Col, Divider, Row, Space, Select, Button, Input, Image, Upload, InputNumber, Tabs, DatePicker, Switch } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { GetBrandOptionListAPI } from '../../../api/Brand';
import { GetGroupOptionListAPI } from '../../../api/Group';
import { CheckModelNameAPI, UpdateModelAPI, DeleteModelInfoAPI, GetModelInfoAPI } from '../../../api/Model';
import { CreateModelLineupAPI } from '../../../api/ModelLinup';
import { CreateModelColorAPI } from '../../../api/ModelColor';
import { CreateModelTrimAPI } from '../../../api/ModelTrim';
import preview_default_image from '../../../assets/images/preview-default-image.png';
import alert_icon from '../../../assets/images/alert-icon.png';
import AlertModal from '../../../components/AlertModal';
import AlertDeleteModal from '../../../components/AlertDeleteModal';
import { Constants } from '../../../constants/Constants';
import { GetDateTimeStringFromDate, GetDateStringFromDate } from '../../../constants/GlobalFunctions';

const { Option } = Select;
const { TabPane } = Tabs;

// 수정페지
function Edit() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [validationList, setValidationList] = useState([]);
    const [brandOptionList, setBrandOptionList] = useState([]);
	const [groupOptionList, setGroupOptionList] = useState([]);
    const [bodyInfo, setBodyInfo] = useState(
        {
            title: '정보 ',
            brand_id: null,
            group_id: null,
            is_new: null,
            model_name: '',
            release_date: new Date(),
            sequence: 1,
            is_use: null,
            picture_1: '',
            picture_2: '',
            picture_3: '',
            picture_4: '',
            picture_5: '',
            picture_6: '',
            picture_7: '',
            picture_8: '',
            preview_1: preview_default_image,
            preview_2: preview_default_image,
            preview_3: preview_default_image,
            preview_4: preview_default_image,
            preview_5: preview_default_image,
            preview_6: preview_default_image,
            preview_7: preview_default_image,
            preview_8: preview_default_image,
            created_date: new Date(),
            check_name: ''
        }
    );

    const [lineupBodyList, setLineupBodyList] = useState([
        {
            title: '정보 ',
            model_id: null,
            lineup_name: '',
            lineup_price: 1,
            lineup_detail: ''
        }
    ]);

    const [colorBodyList, setColorBodyList] = useState([
        {
            title: '정보 ',
            model_id: null,
            color_name: '',
            color_price: 1
        }
    ]);

    const [trimBodyList, setTrimBodyList] = useState([
        {
            title: '정보 ',
            model_id: null,
            trim_name: '',
            trim_price: 1,
            trim_detail: ''
        }
    ]);

    const [discountBodyInfo, setDiscountBodyInfo] = useState([
        
    ]);

    const initComponent = async () => {
        const initBodyInfo = await GetModelInfoAPI(id);
		const initBrandOptionList = await GetBrandOptionListAPI();
		const initGroupOptionList = await GetGroupOptionListAPI();
		
        setBodyInfo({
            ...initBodyInfo,
            created_date: GetDateTimeStringFromDate(new Date())
        });
		setBrandOptionList(initBrandOptionList);
		setGroupOptionList(initGroupOptionList);
	};

    useEffect(() => {
		initComponent();
	}, []);

    async function checkName(name) {
        const result = await CheckModelNameAPI(name);
        onChangeComponent('check_name', result ? 'exist' : 'not-exist');
    }

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const previewChange = async (name, file) => {

        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setBodyInfo(
            { 
                ...bodyInfo,
                [name]: file.preview
            }
        );
    };

    const onAddLineupComponentClick = event => {
        setLineupBodyList([...lineupBodyList, {
            number: lineupBodyList[lineupBodyList.length - 1].number + 1,
            model_id: null,
            lineup_name: '',
            lineup_price: 1,
            lineup_detail: ''
        }]);
    };

    const onDeleteLineupComponentClick = (number) => {
        if(lineupBodyList.length > 1){
            setLineupBodyList(lineupBodyList.filter((body) => body.number !== number));
        }
    };

    const onChangeLineupComponent = (number, name, value) => {
        setLineupBodyList(lineupBodyList.map(body => body.number === number ? {...body, [name]: value} : body));
    }

    const onAddColorComponentClick = event => {
        setColorBodyList([...colorBodyList, {
            number: colorBodyList[colorBodyList.length - 1].number + 1,
            model_id: null,
            lineup_name: '',
            lineup_price: 1,
            lineup_detail: ''
        }]);
    };

    const onDeleteColorComponentClick = (number) => {
        if(colorBodyList.length > 1){
            setColorBodyList(colorBodyList.filter((body) => body.number !== number));
        }
    };

    const onChangeColorComponent = (number, name, value) => {
        setColorBodyList(colorBodyList.map(body => body.number === number ? {...body, [name]: value} : body));
    }

    const onAddTrimComponentClick = event => {
        setTrimBodyList([...trimBodyList, {
            number: trimBodyList[trimBodyList.length - 1].number + 1,
            model_id: null,
            lineup_name: '',
            lineup_price: 1,
            lineup_detail: ''
        }]);
    };

    const onDeleteTrimComponentClick = (number) => {
        if(trimBodyList.length > 1){
            setTrimBodyList(trimBodyList.filter((body) => body.number !== number));
        }
    };

    const onChangeTrimComponent = (number, name, value) => {
        setTrimBodyList(trimBodyList.map(body => body.number === number ? {...body, [name]: value} : body));
    }

    const onChangeComponent = (name, value) => {
        setBodyInfo(
            { 
                ...bodyInfo,
                [name]: value,
                group_id: name == 'brand_id' ? null : bodyInfo.group_id
            }
        );
        
        for(var i = 1; i <= 8; i++) {
            if(name == 'picture_' + i) {
                previewChange('preview_' + i, value);
            }
        }
        
    }

    const onSaveClick = async(url) => {
        const validation = [];
        if(bodyInfo.brand_id === null) {
            validation.push({
                title: '정보 ',
                name: '차량'
            })
        }
        if(bodyInfo.group_id === '') {
            validation.push({
                title: '정보 ',
                name: '차량'
            })
        }
        if(bodyInfo.model_name === '') {
            validation.push({
                title: '정보 ',
                name: '모델'
            })
        }
        if(bodyInfo.is_new === null) {
            validation.push({
                title: '정보 ',
                name: '신차여부'
            })
        }
        if(bodyInfo.release_date === null) {
            validation.push({
                title: '정보 ',
                name: '출시일'
            })
        }
        if(bodyInfo.sequence === '') {
            validation.push({
                title: '정보 ',
                name: '순서'
            })
        }

        setValidationList(validation);

        if(validation.length > 0) {
            setShowModal(true);
        } else {
            const created_info = await UpdateModelAPI(bodyInfo);

            //create lineup
            const tempLineupBodyList = lineupBodyList.map(body => (
                {
                    ...body,
                    model_id: id
                }
            ));
            
            setLineupBodyList(tempLineupBodyList);
            await CreateModelLineupAPI(tempLineupBodyList);

            //create color
            const tempColorBodyList = colorBodyList.map(body => (
                {
                    ...body,
                    model_id: id
                }
            ));

            setColorBodyList(tempColorBodyList);
            await CreateModelColorAPI(tempColorBodyList);

            //create color
            const tempTrimBodyList = trimBodyList.map(body => (
                {
                    ...body,
                    model_id: id
                }
            ));

            setTrimBodyList(tempTrimBodyList);
            await CreateModelTrimAPI(tempTrimBodyList);
            
            // setShowModal(true);
            navigate(url);
        }
    };

    const onDeleteClick = async() => {
        setShowDeleteModal(true);
    };

    const deleteInfo = async() => {
        await DeleteModelInfoAPI(id);
        navigate('/car/model');
    };

    const renderLineupBodyList = () => {
        return (
            lineupBodyList.map((body, index) => (
                <Row key={index} gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                    <Col span={2} className='table-header-col-section'>
                        <label>공통옵션 { body.number !== 10 ? '0' + body.number : body.number }</label>
                    </Col>
                    <Col flex="auto" className='table-value-col-section'>
                        <Row>
                            <Col>
                                <Space size={6}>
                                    <Input 
                                        name='lineup_name' 
                                        value={body.lineup_name} 
                                        onChange={e => {
                                            onChangeLineupComponent(body.number, e.target.name, e.target.value);
                                        }} 
                                        placeholder="옵션 이름" style={{ width: 300 }} 
                                    />
                                    <Input 
                                        name='lineup_price' 
                                        value={body.lineup_price} 
                                        onChange={e => {
                                            onChangeLineupComponent(body.number, e.target.name, e.target.value);
                                        }} 
                                        style={{ width: 200 }} 
                                    />
                                    <Input 
                                        name='lineup_detail' 
                                        value={body.lineup_detail} 
                                        onChange={e => {
                                            onChangeLineupComponent(body.number, e.target.name, e.target.value);
                                        }} 
                                        placeholder="세부 내용 입력" style={{ width: 750 }} 
                                    />
                                </Space>
                            </Col>
                            <Col flex='auto' />
                            <Col>
                                <Space size={13}>
                                    { 
                                        lineupBodyList.length == index + 1 
                                        ? 
                                        <>
                                            {
                                                lineupBodyList.length != 1 
                                                ? <Button className='white-button' onClick={() => onDeleteLineupComponentClick(body.number)}>삭제</Button> 
                                                : ''
                                            }
                                            <Button className='black-button' onClick={() => onAddLineupComponentClick(body.number)}>추가</Button>
                                        </>
                                        : <Button className='white-button' onClick={() => onDeleteLineupComponentClick(body.number)}>삭제</Button>
                                    }
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            ))
        );
    };

    const renderColorBodyList = () => {
        return (
            colorBodyList.map((body, index) => (
                <Row key={index} gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                    <Col span={2} className='table-header-col-section'>
                        <label>색상 { body.number !== 10 ? '0' + body.number : body.number }</label>
                    </Col>
                    <Col flex="auto" className='table-value-col-section'>
                        <Row>
                            <Col>
                                <Space size={6}>
                                    <Input 
                                        name='color_name' 
                                        value={body.color_name} 
                                        onChange={e => {
                                            onChangeColorComponent(body.number, e.target.name, e.target.value);
                                        }} 
                                        placeholder="색상 이름" style={{ width: 300 }} 
                                    />
                                    <Input 
                                        name='color_price' 
                                        value={body.color_price} 
                                        onChange={e => {
                                            onChangeColorComponent(body.number, e.target.name, e.target.value);
                                        }} 
                                        style={{ width: 200 }} 
                                    />
                                </Space>
                            </Col>
                            <Col flex='auto' />
                            <Col>
                                <Space size={13}>
                                    { 
                                        colorBodyList.length == index + 1 
                                        ? 
                                        <>
                                            {
                                                colorBodyList.length != 1 
                                                ? <Button className='white-button' onClick={() => onDeleteColorComponentClick(body.number)}>삭제</Button>
                                                : ''
                                            }
                                            <Button className='black-button' onClick={() => onAddColorComponentClick(body.number)}>추가</Button>
                                        </>
                                        : <Button className='white-button' onClick={() => onDeleteColorComponentClick(body.number)}>삭제</Button>
                                    }
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            ))
        );
    };

    const renderTrimBodyList = () => {
        return (
            trimBodyList.map((body, index) => (
                <Row key={index} gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                    <Col span={2} className='table-header-col-section'>
                        <label>옵션 { body.number !== 10 ? '0' + body.number : body.number }</label>
                    </Col>
                    <Col flex="auto" className='table-value-col-section'>
                        <Row>
                            <Col>
                                <Space size={6}>
                                    <Input 
                                        name='trim_name' 
                                        value={body.trim_name} 
                                        onChange={e => {
                                            onChangeTrimComponent(body.number, e.target.name, e.target.value);
                                        }} 
                                        placeholder="옵션 이름" style={{ width: 300 }} 
                                    />
                                    <Input 
                                        name='trim_price' 
                                        value={body.trim_price} 
                                        onChange={e => {
                                            onChangeTrimComponent(body.number, e.target.name, e.target.value);
                                        }} 
                                        style={{ width: 200 }} 
                                    />
                                    <Input 
                                        name='trim_detail' 
                                        value={body.trim_detail} 
                                        onChange={e => {
                                            onChangeTrimComponent(body.number, e.target.name, e.target.value);
                                        }} 
                                        placeholder="세부 내용 입력" style={{ width: 750 }} 
                                    />
                                </Space>
                            </Col>
                            <Col flex='auto' />
                            <Col>
                                <Space size={13}>
                                    { 
                                        trimBodyList.length == index + 1 
                                        ? 
                                        <>
                                            {
                                                trimBodyList.length != 1 
                                                ? <Button className='white-button' onClick={() => onDeleteTrimComponentClick(body.number)}>삭제</Button>
                                                : ''
                                            }
                                            <Button className='black-button' onClick={() => onAddTrimComponentClick(body.number)}>추가</Button>
                                        </>
                                        : <Button className='white-button' onClick={() => onDeleteTrimComponentClick(body.number)}>삭제</Button>
                                    }
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            ))
        )
    };

    return(
        <>
            <Space direction='vertical' size={18} className='main-layout'>
                {/* Page Header */}
                <Space direction='vertical' size={18}>
                    <Row justify='middle'>
                        <Col>
                            <label className='main-header-title'>브랜드 수정</label>
                        </Col>
                        <Col flex="auto" />
                        <Col>
                            <Space size={10}>
                                <Link to="/car/model">
                                    <Button className='white-button medium-button'>취소</Button>
                                </Link>
                                <Button className='black-button medium-button' onClick={() => onSaveClick('/car/model')}>저장하고 나가기</Button>
                            </Space>
                        </Col>
                    </Row>
                    <Divider className='main-body-divider' />
                </Space>

                {/* Body Section */}
                <Space direction='vertical' size={20} style={{paddingBottom: 117}}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="모델정보" key="1">
                            <Space direction='vertical' size={40}>
                                <Space direction='vertical' size={20}>
                                    <Row align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>정보</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>차량</label>
                                            </Col>
                                            <Col span={5} className='table-value-col-section'>
                                                <Select
                                                    name='brand_id' 
                                                    value={bodyInfo.brand_id} 
                                                    onChange={value => {
                                                        onChangeComponent('brand_id', value);
                                                    }}
                                                    suffixIcon={<CaretDownOutlined />}
                                                    placeholder="브랜드 선택"
                                                    style={{ width: '100%' }}
                                                >
                                                    {
                                                        brandOptionList.map((optionItem, optionIndex) => (
                                                            <Select.Option key={optionIndex} value={optionItem.value}>
                                                                {optionItem.label}
                                                            </Select.Option>
                                                        ))
                                                    }
                                                </Select>
                                            </Col>
                                            <Col span={5} className='table-value-col-section'>
                                                <Select
                                                    name='group_id' 
                                                    value={bodyInfo.group_id} 
                                                    onChange={value => {
                                                        onChangeComponent('group_id', value);
                                                    }}
                                                    suffixIcon={<CaretDownOutlined />}
                                                    placeholder="모델그룹 선택"
                                                    style={{ width: '100%' }}
                                                >
                                                    {
                                                        groupOptionList.filter(item => item.brand_id == bodyInfo.brand_id).map((optionItem, optionIndex) => (
                                                            <Select.Option key={optionIndex} value={optionItem.value}>
                                                                {optionItem.label}
                                                            </Select.Option>
                                                        ))
                                                    }
                                                </Select>
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>모델</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                            <Space>
                                                    <div className=''>
                                                        <Input 
                                                            name='model_name' 
                                                            value={bodyInfo.model_name} 
                                                            onChange={e => {
                                                                onChangeComponent(e.target.name, e.target.value);
                                                            }} 
                                                            placeholder="모델명 입력" 
                                                            maxLength={15} style={{ width: 400 }} 
                                                        />
                                                        {
                                                            bodyInfo.check_name == 'exist'
                                                            ? <label className='danger-alert'>이미 사용중인 이름 입니다.</label>
                                                            : bodyInfo.check_name == 'not-exist'
                                                            ? <label className='successful-alert'>사용 가능한 이름 입니다.</label>
                                                            : ''
                                                        }
                                                    </div>
                                                    <Button className='black-button' onClick={() => checkName(bodyInfo.model_name)}>확인</Button>
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>신차여부</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Select
                                                    name='is_new' 
                                                    value={bodyInfo.is_new} 
                                                    onChange={value => {
                                                        onChangeComponent('is_new', value);
                                                    }}
                                                    suffixIcon={<CaretDownOutlined />}
                                                    placeholder="선택"
                                                    style={{ width: 150 }}
                                                >
                                                    {
                                                        Constants.isNewOptions.map((optionItem, optionIndex) => (
                                                            <Select.Option key={optionIndex} value={optionItem.value}>
                                                                {optionItem.label}
                                                            </Select.Option>
                                                        ))
                                                    }
                                                </Select>
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>출시일</label>
                                            </Col>
                                            <Col flex='auto' className='table-value-col-section'>
                                                <DatePicker 
                                                    name='release_date' 
                                                    value={moment(bodyInfo.release_date)} 
                                                    onChange={value => {
                                                        onChangeComponent('release_date', GetDateStringFromDate(new Date(value.toString())));
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>순서</label>
                                            </Col>
                                            <Col span={10} className='table-value-col-section'>
                                                <Space>
                                                    <InputNumber 
                                                        name='sequence' 
                                                        value={bodyInfo.sequence} 
                                                        onChange={number => {
                                                            onChangeComponent('sequence', number);
                                                        }} 
                                                        maxLength={6} 
                                                        style={{ width: 150 }} 
                                                        controls={false}
                                                    />
                                                    <label className='order-description-label'>숫자가 낮을수록 먼저 노출이 됩니다.</label>
                                                </Space>
                                            </Col>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>사용여부</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Select
                                                    name='is_use' 
                                                    value={bodyInfo.is_use} 
                                                    onChange={value => {
                                                        onChangeComponent('is_use', value);
                                                    }}
                                                    suffixIcon={<CaretDownOutlined />}
                                                    placeholder="선택"
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
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:369 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>사진</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space direction='vertical' align='start' size={37}>
                                                    <label className='logo-description-label'>
                                                        이미지 권장 크기는 90 * 60이며, *.png로 등록하셔야 합니다. <br/>
                                                        이미지를 새로 등록 하기 위해선 등록된 이미지 [삭제]후 재 등록 하시면 됩니다.
                                                    </label>
                                                    <Row gutter={[8]}>
                                                        <Col>
                                                            <label className='picture-header-label'>사진 01 (대표)</label>
                                                            <Space direction='vertical' align='center' size={6}>
                                                                <Image src={bodyInfo.preview_1} width={150} height={150} />
                                                                <Upload
                                                                    accept='.png'
                                                                    action='http://127.0.0.1:4200/model/logo'
                                                                    fileList={[bodyInfo.picture_1]}
                                                                    name='picture_1' 
                                                                    onChange={async info => {
                                                                        onChangeComponent('picture_1', info.file);
                                                                    }}
                                                                    itemRender={(originNode, file, currFileList) => (
                                                                        <></>
                                                                    )}
                                                                >
                                                                    <Button className='black-button'>등록</Button>
                                                                </Upload>
                                                            </Space>
                                                        </Col>
                                                        <Col>
                                                            <label className='picture-header-label'>사진 02 (대표)</label>
                                                            <Space direction='vertical' align='center' size={6}>
                                                                <Image src={bodyInfo.preview_2} width={150} height={150} />
                                                                <Upload
                                                                    accept='.png'
                                                                    action='http://127.0.0.1:4200/model/logo'
                                                                    fileList={[bodyInfo.picture_2]}
                                                                    name='picture_2' 
                                                                    onChange={async info => {
                                                                        onChangeComponent('picture_2', info.file);
                                                                    }}
                                                                    itemRender={(originNode, file, currFileList) => (
                                                                        <></>
                                                                    )}
                                                                >
                                                                    <Button className='black-button'>등록</Button>
                                                                </Upload>
                                                            </Space>
                                                        </Col>
                                                        <Col>
                                                            <label className='picture-header-label'>사진 03 (대표)</label>
                                                            <Space direction='vertical' align='center' size={6}>
                                                                <Image src={bodyInfo.preview_3} width={150} height={150} />
                                                                <Upload
                                                                    accept='.png'
                                                                    action='http://127.0.0.1:4200/model/logo'
                                                                    fileList={[bodyInfo.picture_3]}
                                                                    name='picture_3' 
                                                                    onChange={async info => {
                                                                        onChangeComponent('picture_3', info.file);
                                                                    }}
                                                                    itemRender={(originNode, file, currFileList) => (
                                                                        <></>
                                                                    )}
                                                                >
                                                                    <Button className='black-button'>등록</Button>
                                                                </Upload>
                                                            </Space>
                                                        </Col>
                                                        <Col>
                                                            <label className='picture-header-label'>사진 04 (대표)</label>
                                                            <Space direction='vertical' align='center' size={6}>
                                                                <Image src={bodyInfo.preview_4} width={150} height={150} />
                                                                <Upload
                                                                    accept='.png'
                                                                    action='http://127.0.0.1:4200/model/logo'
                                                                    fileList={[bodyInfo.picture_4]}
                                                                    name='picture_4' 
                                                                    onChange={async info => {
                                                                        onChangeComponent('picture_4', info.file);
                                                                    }}
                                                                    itemRender={(originNode, file, currFileList) => (
                                                                        <></>
                                                                    )}
                                                                >
                                                                    <Button className='black-button'>등록</Button>
                                                                </Upload>
                                                            </Space>
                                                        </Col>
                                                        <Col>
                                                            <label className='picture-header-label'>사진 05 (대표)</label>
                                                            <Space direction='vertical' align='center' size={6}>
                                                                <Image src={bodyInfo.preview_5} width={150} height={150} />
                                                                <Upload
                                                                    accept='.png'
                                                                    action='http://127.0.0.1:4200/model/logo'
                                                                    fileList={[bodyInfo.picture_5]}
                                                                    name='picture_5' 
                                                                    onChange={async info => {
                                                                        onChangeComponent('picture_5', info.file);
                                                                    }}
                                                                    itemRender={(originNode, file, currFileList) => (
                                                                        <></>
                                                                    )}
                                                                >
                                                                    <Button className='black-button'>등록</Button>
                                                                </Upload>
                                                            </Space>
                                                        </Col>
                                                        <Col>
                                                            <label className='picture-header-label'>사진 06 (대표)</label>
                                                            <Space direction='vertical' align='center' size={6}>
                                                                <Image src={bodyInfo.preview_6} width={150} height={150} />
                                                                <Upload
                                                                    accept='.png'
                                                                    action='http://127.0.0.1:4200/model/logo'
                                                                    fileList={[bodyInfo.picture_6]}
                                                                    name='picture_6' 
                                                                    onChange={async info => {
                                                                        onChangeComponent('picture_6', info.file);
                                                                    }}
                                                                    itemRender={(originNode, file, currFileList) => (
                                                                        <></>
                                                                    )}
                                                                >
                                                                    <Button className='black-button'>등록</Button>
                                                                </Upload>
                                                            </Space>
                                                        </Col>
                                                        <Col>
                                                            <label className='picture-header-label'>사진 07 (대표)</label>
                                                            <Space direction='vertical' align='center' size={6}>
                                                                <Image src={bodyInfo.preview_7} width={150} height={150} />
                                                                <Upload
                                                                    accept='.png'
                                                                    action='http://127.0.0.1:4200/model/logo'
                                                                    fileList={[bodyInfo.picture_7]}
                                                                    name='picture_7' 
                                                                    onChange={async info => {
                                                                        onChangeComponent('picture_7', info.file);
                                                                    }}
                                                                    itemRender={(originNode, file, currFileList) => (
                                                                        <></>
                                                                    )}
                                                                >
                                                                    <Button className='black-button'>등록</Button>
                                                                </Upload>
                                                            </Space>
                                                        </Col>
                                                        <Col>
                                                            <label className='picture-header-label'>사진 08 (대표)</label>
                                                            <Space direction='vertical' align='center' size={6}>
                                                                <Image src={bodyInfo.preview_8} width={150} height={150} />
                                                                <Upload
                                                                    accept='.png'
                                                                    action='http://127.0.0.1:4200/model/logo'
                                                                    fileList={[bodyInfo.picture_8]}
                                                                    name='picture_8' 
                                                                    onChange={async info => {
                                                                        onChangeComponent('picture_8', info.file);
                                                                    }}
                                                                    itemRender={(originNode, file, currFileList) => (
                                                                        <></>
                                                                    )}
                                                                >
                                                                    <Button className='black-button'>등록</Button>
                                                                </Upload>
                                                            </Space>
                                                        </Col>
                                                    </Row>
                                                </Space>
                                                
                                            </Col>
                                        </Row>
                                    </Space>
                                </Space>
                                <Space direction='vertical' size={20}>
                                    <Row align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>모델/라인업 공통 옵션 (튜닝/액세서리)</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        {renderLineupBodyList()}
                                    </Space>
                                </Space>
                                <Space direction='vertical' size={20}>
                                    <Row align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>모델/라인업 색상 (견적 메뉴에서만 노출)</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        {renderColorBodyList()}
                                    </Space>
                                </Space>
                                <Space direction='vertical' size={20}>
                                    <Row align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>트림 통합 옵션</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        {renderTrimBodyList()}
                                    </Space>
                                </Space>
                            </Space>
                        </TabPane>
                        <TabPane tab="모델할인" key="2">
                            <Space direction='vertical' size={40}>
                                <Space direction='vertical' size={20}>
                                    <Row align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>정보</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>차량</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={10}>
                                                    <Button className='gray-button large-button'>브랜드</Button>
                                                    <Button className='gray-button large-button'>모델그룹</Button>
                                                    <Button className='gray-button large-button'>모델</Button>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Space>
                                </Space>
                                <Space direction='vertical' size={20}>
                                    <Row gutter={[12]} align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>블루멤버스 포인트 선사용</label>
                                        </Col>
                                        <Col>
                                            <label className='sub-description'>개인 및 개인사업자 중 현대차 2회 이상 재구매 고객(신규 고객 제외)</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>할인 01</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={10}>
                                                    <Input value={'2회 이상 재구매 고객'} style={{ width: 300 }} />
                                                    <Input value={'-10만원'} style={{ width: 200 }} />
                                                    <Space size={11}>
                                                        <Switch width='100' height={40} />
                                                        <label className='switch-label'>사용</label>
                                                    </Space>
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>할인 01</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={10}>
                                                    <Input value={'2회 이상 재구매 고객'} style={{ width: 300 }} />
                                                    <Input value={'-10만원'} style={{ width: 200 }} />
                                                    <Space size={11}>
                                                        <Switch width='100' height={40} />
                                                        <label className='switch-label'>사용</label>
                                                    </Space>
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>할인 01</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={10}>
                                                    <Input value={'2회 이상 재구매 고객'} style={{ width: 300 }} />
                                                    <Input value={'-10만원'} style={{ width: 200 }} />
                                                    <Space size={11}>
                                                        <Switch width='100' height={40} />
                                                        <label className='switch-label'>사용</label>
                                                    </Space>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Space>
                                </Space>
                                <Space direction='vertical' size={20}>
                                    <Row gutter={[12]} align='middle'>
                                        <Col>
                                            <label className='main-sub-title'>10년 이상/15년 이상 노후차조건</label>
                                        </Col>
                                        <Col>
                                            <label className='sub-description'>노후차 차량의 본의명의 최초 등록일이 21년 12월 31일 이전 고객 한정정</label>
                                        </Col>
                                        <Col flex="auto" />
                                    </Row>
                                    <Space direction='vertical' size={0}>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>할인 01</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={10}>
                                                    <Input value={'2회 이상 재구매 고객'} style={{ width: 300 }} />
                                                    <Input value={'-10만원'} style={{ width: 200 }} />
                                                    <Space size={11}>
                                                        <Switch width='100' height={40} />
                                                        <label className='switch-label'>사용</label>
                                                    </Space>
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                                            <Col span={2} className='table-header-col-section'>
                                                <label>할인 01</label>
                                            </Col>
                                            <Col flex="auto" className='table-value-col-section'>
                                                <Space size={10}>
                                                    <Input value={'2회 이상 재구매 고객'} style={{ width: 300 }} />
                                                    <Input value={'-10만원'} style={{ width: 200 }} />
                                                    <Space size={11}>
                                                        <Switch width='100' height={40} />
                                                        <label className='switch-label'>사용</label>
                                                    </Space>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Space>
                                </Space>
                            </Space>
                        </TabPane>
                    </Tabs>

                    <Row justify="center" gutter={[17, 0]}>
                        <Col>
                            <Button className='white-button rounded-button' onClick={() => onDeleteClick(bodyInfo.idx)}>삭제하기</Button>
                        </Col>
                    </Row>
                </Space>
            </Space>
            <AlertModal visible={showModal} onConfirmClick={() => setShowModal(false)} validationList={validationList} />
            <AlertDeleteModal visible={showDeleteModal} onConfirmClick={() => deleteInfo(bodyInfo.idx)} onCancelClick={() => setShowDeleteModal(false)} />
        </>
    );
}

export default Edit;