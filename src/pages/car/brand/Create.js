import { Col, Divider, Row, Space, Select, Button, Input, Image } from 'antd';
import { CaretDownOutlined, PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import React from 'react';
import preview_default_image from '../../../assets/images/preview-default-image.png';
import '../../../assets/styles/pages/car/brand/Create.css';

const { Option } = Select;

function Create() {
    return(
        <Space direction='vertical' size={18} className='main-layout'>
			{/* Page Header */}
			<Space direction='vertical' size={18}>
				<Row justify='middle'>
                    <Col>
                        <label className='main-header-title'>브랜드 등록</label>
                    </Col>
                    <Col flex="auto" />
                    <Col>
                        <Space size={10}>
                            <Button className='white-button medium-button'>취소</Button>
                            <Button className='white-button medium-button'>저장하고 나가기</Button>
                            <Button className='black-button medium-button'>저장하고 모델그룹 등록하기</Button>
                        </Space>
                    </Col>
                </Row>
				<Divider className='main-body-divider' />
			</Space>

            {/* Body Section */}
			<Space direction='vertical' size={20}>
				<label className='main-sub-title'>정보 01</label>
				<Space direction='vertical' size={0}>
                    <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                        <Col span={2} className='table-header-col-section'>
                            <label>브랜드</label>
                        </Col>
                        <Col span={10} className='table-value-col-section'>
                            <Space>
                                <Input placeholder="브랜드 입력" maxLength={15} style={{ width: 400 }} />
                                <Button className='black-button'>확인</Button>
                            </Space>
                        </Col>
                        <Col span={2} className='table-header-col-section'>
                            <label>순서</label>
                        </Col>
                        <Col flex="auto" className='table-value-col-section'>
                            <Space>
                                <Input maxLength={6} value={1} style={{ width: 150 }} />
                                <label className='order-description-label'>숫자가 낮을수록 먼저 노출이 됩니다.</label>
                            </Space>
                        </Col>
                    </Row>
                    <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                        <Col  span={2} className='table-header-col-section'>
                            <label>국가</label>
                        </Col>
                        <Col  span={4} className='table-value-col-section'>
                            <Select
                                suffixIcon={<CaretDownOutlined />}
                                placeholder="선택"
                                style={{ width: 150 }}>
                                <Option value="SK">국산</Option>
                                <Option value="US">미국</Option>
                                <Option value="EU">유럽</Option>
                                <Option value="JP">일본</Option>
                                <Option value="CH">중국</Option>
                            </Select>
                        </Col>
                        <Col  span={2} className='table-header-col-section'>
                            <label>수입여부</label>
                        </Col>
                        <Col span={4} className='table-value-col-section'>
                            <Select
                                suffixIcon={<CaretDownOutlined />}
                                placeholder="선택"
                                style={{ width: 150 }}>
                                <Option value="domestic">국산</Option>
                                <Option value="income">수입</Option>
                            </Select>
                        </Col>
                        <Col  span={2} className='table-header-col-section'>
                            <label>사용여부</label>
                        </Col>
                        <Col flex="auto" className='table-value-col-section'>
                            <Select
                                suffixIcon={<CaretDownOutlined />}
                                placeholder="선택"
                                defaultValue="true"
                                style={{ width: 150 }}>
                                <Option value="true">사용</Option>
                                <Option value="false">미사용</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={[0]} align="middle" style={{ height:80 }} className='table-layout'>
                        <Col span={2} className='table-header-col-section'>
                            <label>공식사이트</label>
                        </Col>
                        <Col span={10} className='table-value-col-section'>
                            <Input placeholder="URL 입력" style={{ width: 400 }} />
                        </Col>
                        <Col span={2} className='table-header-col-section'>
                            <label>전시장 안내</label>
                        </Col>
                        <Col flex="auto" className='table-value-col-section'>
                            <Input placeholder="URL 입력" style={{ width: 400 }} />
                        </Col>
                    </Row>
                    <Row gutter={[0]} align="middle" style={{ height:174 }} className='table-layout'>
                        <Col span={2} className='table-header-col-section'>
                            <label>로고</label>
                        </Col>
                        <Col flex="auto" className='table-value-col-section'>
                            <Space direction='horizontal' align='end' size={20}>
                                <Image src={ preview_default_image } width={150} height={150} />
                                <Space direction='vertical' size={34}>
                                    <label className='logo-description-label'>
                                        이미지 권장 크기는 90 * 60이며, *.png로 등록하셔야 합니다. <br/>
                                        이미지를 새로 등록 하기 위해선 등록된 이미지 [삭제]후 재 등록 하시면 됩니다.
                                    </label>
                                    <Button className='black-button'>등록</Button>
                                </Space>
                            </Space>
                            
                        </Col>
                    </Row>
                </Space>
				<Row justify="center" gutter={[17, 0]}>
					<Col>
                        <Link to="/car/brand">
							<Button className='white-button rounded-button' icon={<PlusOutlined />}>브랜드 추가하기</Button>
						</Link>
					</Col>
				</Row>
			</Space>
		</Space>
    );
}

export default Create;