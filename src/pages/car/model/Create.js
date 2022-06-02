import {
  Col,
  Divider,
  Row,
  Space,
  Select,
  Button,
  Input,
  Image,
  Upload,
  Tabs,
  DatePicker,
  Switch,
  InputNumber,
} from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import React, { useEffect } from "react";
import { CaretUpFilled, CaretDownFilled } from "@ant-design/icons";
import { Constants } from "../../../constants/Constants";
import AlertModal from "../../../components/AlertModal";
import { useDispatch, useSelector } from "react-redux";
import {
  init,
  save,
  setBody,
  closeValidation,
  checkName,
  removeRedirectTo,
  addLineupBody,
  deleteLineupBody,
  setLineupBody,
  addColorBody,
  deleteColorBody,
  setColorBody,
  addTrimBody,
  deleteTrimBody,
  setTrimBody,
  setDiscountBody,
  preview,
  deletePicture,
  moveUp,
  moveDown,
} from "../../../store/reducers/car/model/create";
import { GetDateStringFromDate } from "../../../constants/GlobalFunctions";

const { Option } = Select;
const { TabPane } = Tabs;

// 등록페지
function Create() {
  let navigate = useNavigate();

  const {
    redirectTo,
    validation,
    brandOptionList,
    groupOptionList,
    bodyInfo,
    lineupBodyList,
    colorBodyList,
    trimBodyList,
    discountBodyList,
  } = useSelector((state) => ({
    redirectTo: state.modelCreate.redirectTo,
    validation: state.modelCreate.validation,
    brandOptionList: state.modelCreate.brandOptionList,
    groupOptionList: state.modelCreate.groupOptionList,
    bodyInfo: state.modelCreate.bodyInfo,
    lineupBodyList: state.modelCreate.lineupBodyList,
    colorBodyList: state.modelCreate.colorBodyList,
    trimBodyList: state.modelCreate.trimBodyList,
    discountBodyList: state.modelCreate.discountBodyList,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (redirectTo) {
      const redirectURL = redirectTo;
      dispatch(removeRedirectTo());
      navigate(redirectURL);
    }
    dispatch(init());
  }, [redirectTo, dispatch]);

  const onCloseValidationClick = () => dispatch(closeValidation());
  const onCheckNameClick = (name) => dispatch(checkName(name));
  const onPreviewChange = (number, file) => dispatch(preview(number, file));
  const onComponentChange = (name, value) => dispatch(setBody(name, value));
  const onAddLineupComponentClick = () => dispatch(addLineupBody());
  const onDeleteLineupComponentClick = (number) =>
    dispatch(deleteLineupBody(number));
  const onChangeLineupComponent = (number, name, value) =>
    dispatch(setLineupBody(number, name, value));
  const onAddColorComponentClick = () => dispatch(addColorBody());
  const onDeleteColorComponentClick = (number) =>
    dispatch(deleteColorBody(number));
  const onChangeColorComponent = (number, name, value) =>
    dispatch(setColorBody(number, name, value));
  const onAddTrimComponentClick = () => dispatch(addTrimBody());
  const onDeleteTrimComponentClick = (number) =>
    dispatch(deleteTrimBody(number));
  const onChangeTrimComponent = (number, name, value) =>
    dispatch(setTrimBody(number, name, value));
  const onChangeDiscountComponent = (kind_id, condition_id, name, value) =>
    dispatch(setDiscountBody(kind_id, condition_id, name, value));
  const onPictureDeleteClick = (number) => dispatch(deletePicture(number));
  const onUpMoveClick = (name, index) => dispatch(moveUp(name, index));
  const onDownMoveClick = (name, index) => dispatch(moveDown(name, index));
  const onSaveClick = (url) => dispatch(save(url));

  const renderLineupBodyList = () => {
    return lineupBodyList.map((body, index) => (
      <Row
        key={index}
        gutter={[0]}
        align="middle"
        style={{ height: 80 }}
        className="detail-table-layout"
      >
        <Col flex="154px" className="table-header-col-section">
          {lineupBodyList.length > 1 ? (
            <Space direction="vertical" style={{ paddingLeft: "10px" }}>
              <CaretUpFilled
                style={{ fontSize: "30px", cursor: "pointer" }}
                onClick={() => onUpMoveClick("lineupBodyList", index)}
              />
              <CaretDownFilled
                style={{ fontSize: "30px", cursor: "pointer" }}
                onClick={() => onDownMoveClick("lineupBodyList", index)}
              />
            </Space>
          ) : (
            ""
          )}
          <label>
            공통옵션 {body.number < 10 ? "0" + body.number : body.number}
          </label>
        </Col>
        <Col flex="auto" className="table-value-col-section">
          <Row>
            <Col>
              <Space size={6}>
                <Input
                  name="name"
                  value={body.name}
                  onChange={(e) => {
                    onChangeLineupComponent(
                      body.number,
                      e.target.name,
                      e.target.value
                    );
                  }}
                  size="large"
                  placeholder="옵션 이름"
                  maxLength={18}
                  style={{ width: 300 }}
                />
                <InputNumber
                  name="price"
                  value={body.price}
                  onChange={(number) => {
                    onChangeLineupComponent(body.number, "price", number);
                  }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  size="large"
                  maxLength={11}
                  controls={false}
                  style={{ width: 200 }}
                />
                <Input
                  name="detail"
                  value={body.detail}
                  onChange={(e) => {
                    onChangeLineupComponent(
                      body.number,
                      e.target.name,
                      e.target.value
                    );
                  }}
                  size="large"
                  placeholder="세부 내용 입력"
                  maxLength={50}
                  style={{ width: 750 }}
                />
              </Space>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space size={13}>
                {lineupBodyList.length == index + 1 ? (
                  <>
                    {lineupBodyList.length != 1 ? (
                      <Button
                        className="white-button"
                        onClick={() =>
                          onDeleteLineupComponentClick(body.number)
                        }
                        size="large"
                      >
                        삭제
                      </Button>
                    ) : (
                      ""
                    )}
                    <Button
                      className="black-button"
                      onClick={() => onAddLineupComponentClick(body.number)}
                      size="large"
                    >
                      추가
                    </Button>
                  </>
                ) : (
                  <Button
                    className="white-button"
                    onClick={() => onDeleteLineupComponentClick(body.number)}
                    size="large"
                  >
                    삭제
                  </Button>
                )}
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    ));
  };

  const renderColorBodyList = () => {
    return colorBodyList.map((body, index) => (
      <Row
        key={index}
        gutter={[0]}
        align="middle"
        style={{ height: 80 }}
        className="detail-table-layout"
      >
        <Col flex="154px" className="table-header-col-section">
          {colorBodyList.length > 1 ? (
            <Space direction="vertical" style={{ paddingLeft: "10px" }}>
              <CaretUpFilled
                style={{ fontSize: "30px", cursor: "pointer" }}
                onClick={() => onUpMoveClick("colorBodyList", index)}
              />
              <CaretDownFilled
                style={{ fontSize: "30px", cursor: "pointer" }}
                onClick={() => onDownMoveClick("colorBodyList", index)}
              />
            </Space>
          ) : (
            ""
          )}
          <label>
            색상 {body.number < 10 ? "0" + body.number : body.number}
          </label>
        </Col>
        <Col flex="auto" className="table-value-col-section">
          <Row>
            <Col>
              <Space size={6}>
                <Input
                  name="name"
                  value={body.name}
                  onChange={(e) => {
                    onChangeColorComponent(
                      body.number,
                      e.target.name,
                      e.target.value
                    );
                  }}
                  placeholder="색상 이름"
                  maxLength={18}
                  style={{ width: 300 }}
                />
                <InputNumber
                  name="price"
                  value={body.price}
                  onChange={(number) => {
                    onChangeColorComponent(body.number, "price", number);
                  }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  size="large"
                  maxLength={11}
                  controls={false}
                  style={{ width: 200 }}
                />
              </Space>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space size={13}>
                {colorBodyList.length == index + 1 ? (
                  <>
                    {colorBodyList.length != 1 ? (
                      <Button
                        className="white-button"
                        onClick={() => onDeleteColorComponentClick(body.number)}
                        size="large"
                      >
                        삭제
                      </Button>
                    ) : (
                      ""
                    )}
                    <Button
                      className="black-button"
                      onClick={() => onAddColorComponentClick(body.number)}
                      size="large"
                    >
                      추가
                    </Button>
                  </>
                ) : (
                  <Button
                    className="white-button"
                    onClick={() => onDeleteColorComponentClick(body.number)}
                    size="large"
                  >
                    삭제
                  </Button>
                )}
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    ));
  };

  const renderTrimBodyList = () => {
    return trimBodyList.map((body, index) => (
      <Row
        key={index}
        gutter={[0]}
        align="middle"
        style={{ height: 80 }}
        className="detail-table-layout"
      >
        <Col flex="154px" className="table-header-col-section">
          {trimBodyList.length > 1 ? (
            <Space direction="vertical" style={{ paddingLeft: "10px" }}>
              <CaretUpFilled
                style={{ fontSize: "30px", cursor: "pointer" }}
                onClick={() => onUpMoveClick("trimBodyList", index)}
              />
              <CaretDownFilled
                style={{ fontSize: "30px", cursor: "pointer" }}
                onClick={() => onDownMoveClick("trimBodyList", index)}
              />
            </Space>
          ) : (
            ""
          )}
          <label>
            옵션 {body.number < 10 ? "0" + body.number : body.number}
          </label>
        </Col>
        <Col flex="auto" className="table-value-col-section">
          <Row>
            <Col>
              <Space size={6}>
                <Input
                  name="name"
                  value={body.name}
                  onChange={(e) => {
                    onChangeTrimComponent(
                      body.number,
                      e.target.name,
                      e.target.value
                    );
                  }}
                  size="large"
                  placeholder="옵션 이름"
                  maxLength={18}
                  style={{ width: 300 }}
                />
                <InputNumber
                  name="price"
                  value={body.price}
                  onChange={(number) => {
                    onChangeTrimComponent(body.number, "price", number);
                  }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  size="large"
                  maxLength={11}
                  controls={false}
                  style={{ width: 200 }}
                />
                <Input
                  name="detail"
                  value={body.detail}
                  onChange={(e) => {
                    onChangeTrimComponent(
                      body.number,
                      e.target.name,
                      e.target.value
                    );
                  }}
                  size="large"
                  placeholder="세부 내용 입력"
                  maxLength={50}
                  style={{ width: 750 }}
                />
              </Space>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space size={13}>
                {trimBodyList.length == index + 1 ? (
                  <>
                    {trimBodyList.length != 1 ? (
                      <Button
                        className="white-button"
                        onClick={() => onDeleteTrimComponentClick(body.number)}
                        size="large"
                      >
                        삭제
                      </Button>
                    ) : (
                      ""
                    )}
                    <Button
                      className="black-button"
                      onClick={() => onAddTrimComponentClick(body.number)}
                      size="large"
                    >
                      추가
                    </Button>
                  </>
                ) : (
                  <Button
                    className="white-button"
                    onClick={() => onDeleteTrimComponentClick(body.number)}
                    size="large"
                  >
                    삭제
                  </Button>
                )}
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    ));
  };

  const renderDiscountCarField = () => {
    return bodyInfo.brand_id != null && bodyInfo.group_id != null ? (
      <Space size={10}>
        <Input
          value={
            brandOptionList.filter(
              (item) => item.value === bodyInfo.brand_id
            )[0].label
          }
          size="large"
          disabled={true}
        />
        <Input
          value={
            bodyInfo.group_id != null
              ? groupOptionList.filter(
                  (item) => item.value === bodyInfo.group_id
                )[0].label
              : ""
          }
          size="large"
          disabled={true}
        />
        <Input value={bodyInfo.model_name} size="large" disabled={true} />
      </Space>
    ) : (
      "선택된 차량 정보가 없습니다."
    );
  };

  const renderDiscountBodyList = () => {
    return discountBodyList.map((kindBody) => (
      <Space direction="vertical" size={20}>
        <Row gutter={[12]} align="middle">
          <Col>
            <label className="detail-sub-title">{kindBody.kind_name}</label>
          </Col>
          <Col>
            <label className="sub-description">{kindBody.kind_detail}</label>
          </Col>
          <Col flex="auto" />
        </Row>
        <Space direction="vertical" size={0}>
          {kindBody.discount_condition_list.map((conditionBody, index) => (
            <Row
              gutter={[0]}
              align="middle"
              style={{ height: 80 }}
              className="detail-table-layout"
            >
              <Col flex="154px" className="table-header-col-section">
                <label>
                  할인 {index + 1 < 10 ? "0" + (index + 1) : index + 1}
                </label>
              </Col>
              <Col flex="auto" className="table-value-col-section">
                <Space size={10}>
                  <Input
                    value={conditionBody.condition_name}
                    style={{ width: 300 }}
                    size="large"
                    readOnly={true}
                  />
                  <Input
                    value={conditionBody.discount_price}
                    style={{ width: 200 }}
                    size="large"
                    readOnly={true}
                  />
                  <Space size={11}>
                    <Switch
                      checked={conditionBody.is_use === "0" ? false : true}
                      onClick={(checked) =>
                        onChangeDiscountComponent(
                          kindBody.idx,
                          conditionBody.idx,
                          "is_use",
                          checked ? "1" : "0"
                        )
                      }
                    />
                    <label className="switch-label">
                      {
                        Constants.availableOptions.filter(
                          (item) => item.value === conditionBody.is_use
                        )[0].label
                      }
                    </label>
                  </Space>
                </Space>
              </Col>
            </Row>
          ))}
        </Space>
      </Space>
    ));
  };

  const renderPictures = () => {
    const pictures = [1, 2, 3, 4, 5, 6, 7, 8];
    return (
      <Row gutter={[8]}>
        {pictures.map((item) => (
          <Col>
            <label className="picture-header-label">
              사진 {"0" + item} (대표)
            </label>
            <Space direction="vertical" align="center" size={6}>
              <Image
                src={bodyInfo["preview_" + item]}
                width={150}
                height={150}
              />
              {bodyInfo["picture_" + item].uid.includes("__AUTO__") ? (
                <Upload
                  accept=".png"
                  fileList={[bodyInfo["picture_" + item]]}
                  name={"picture_" + item}
                  showUploadList={false}
                  onChange={(info) => {
                    onPreviewChange(item, info.file);
                  }}
                  beforeUpload={(file) => {
                    onComponentChange("picture_" + item, file);
                    return true;
                  }}
                >
                  <Button
                    className="black-button upload-image-detail-button"
                    size="large"
                  >
                    등록
                  </Button>
                </Upload>
              ) : (
                <Button
                  className="black-button"
                  size="large"
                  onClick={() => onPictureDeleteClick(item)}
                >
                  삭제
                </Button>
              )}
            </Space>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <>
      <Space direction="vertical" size={18} className="main-layout">
        {/* Page Header */}
        <Space direction="vertical" size={11}>
          <Row justify="middle">
            <Col>
              <label className="main-header-title">모델 등록</label>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space size={10}>
                <Link to="/car/model">
                  <Button
                    className="white-button cancel-detail-button"
                    size="large"
                  >
                    취소
                  </Button>
                </Link>
                <Button
                  className="white-button save-detail-button"
                  size="large"
                  onClick={() => onSaveClick("/car/model")}
                >
                  저장하고 나가기
                </Button>

                <Button
                  className="black-button save-goto-detail-button"
                  size="large"
                  onClick={() => onSaveClick("/car/lineup/create")}
                >
                  저장하고 라인업 등록하기
                </Button>
              </Space>
            </Col>
          </Row>
          <Divider className="main-body-divider" />
        </Space>

        {/* Body Section */}
        <Space direction="vertical" size={40} style={{ paddingBottom: 112 }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="모델정보" key="1">
              <Space direction="vertical" size={40}>
                <Space direction="vertical" size={20}>
                  <Row align="middle">
                    <Col>
                      <label className="detail-sub-title">정보</label>
                    </Col>
                    <Col flex="auto" />
                  </Row>
                  <Space direction="vertical" size={0}>
                    <Row
                      gutter={[0]}
                      align="middle"
                      style={{ height: 80 }}
                      className="detail-table-layout"
                    >
                      <Col flex="154px" className="table-header-col-section">
                        <label>차량</label>
                      </Col>
                      <Col span={5} className="table-value-col-section">
                        <Select
                          name="brand_id"
                          value={bodyInfo.brand_id}
                          onChange={(value) => {
                            onComponentChange("brand_id", value);
                          }}
                          size="large"
                          suffixIcon={<CaretDownOutlined />}
                          placeholder="브랜드 선택"
                          style={{ width: "100%" }}
                        >
                          {brandOptionList.map((optionItem, optionIndex) => (
                            <Select.Option
                              key={optionIndex}
                              value={optionItem.value}
                            >
                              {optionItem.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Col>
                      <Col span={5} className="table-value-col-section">
                        <Select
                          name="group_id"
                          value={bodyInfo.group_id}
                          onChange={(value) => {
                            onComponentChange("group_id", value);
                          }}
                          size="large"
                          suffixIcon={<CaretDownOutlined />}
                          placeholder="모델그룹 선택"
                          style={{ width: "100%" }}
                        >
                          {groupOptionList
                            .filter(
                              (item) => item.brand_id == bodyInfo.brand_id
                            )
                            .map((optionItem, optionIndex) => (
                              <Select.Option
                                key={optionIndex}
                                value={optionItem.value}
                              >
                                {optionItem.label}
                              </Select.Option>
                            ))}
                        </Select>
                      </Col>
                      <Col flex="154px" className="table-header-col-section">
                        <label>모델</label>
                      </Col>
                      <Col flex="auto" className="table-value-col-section">
                        <Space>
                          <div style={{ position: "relative" }}>
                            <Input
                              name="model_name"
                              value={bodyInfo.model_name}
                              onChange={(e) => {
                                onComponentChange(
                                  e.target.name,
                                  e.target.value
                                );
                              }}
                              size="large"
                              placeholder="모델명 입력"
                              maxLength={15}
                              style={{ width: 400 }}
                            />
                            {bodyInfo.check_name == "exist" ? (
                              <label className="danger-alert">
                                이미 사용중인 이름 입니다.
                              </label>
                            ) : bodyInfo.check_name == "not-exist" ? (
                              <label className="successful-alert">
                                사용 가능한 이름 입니다.
                              </label>
                            ) : (
                              ""
                            )}
                          </div>
                          <Button
                            className="black-button check-name-button"
                            onClick={() =>
                              onCheckNameClick(bodyInfo.model_name)
                            }
                            size="large"
                          >
                            확인
                          </Button>
                        </Space>
                      </Col>
                    </Row>
                    <Row
                      gutter={[0]}
                      align="middle"
                      style={{ height: 80 }}
                      className="detail-table-layout"
                    >
                      <Col flex="154px" className="table-header-col-section">
                        <label>신차여부</label>
                      </Col>
                      <Col span={10} className="table-value-col-section">
                        <Select
                          name="is_new"
                          value={bodyInfo.is_new}
                          onChange={(value) => {
                            onComponentChange("is_new", value);
                          }}
                          size="large"
                          suffixIcon={<CaretDownOutlined />}
                          placeholder="선택"
                          style={{ width: 150 }}
                        >
                          {Constants.isNewOptions.map(
                            (optionItem, optionIndex) => (
                              <Select.Option
                                key={optionIndex}
                                value={optionItem.value}
                              >
                                {optionItem.label}
                              </Select.Option>
                            )
                          )}
                        </Select>
                      </Col>
                      <Col flex="154px" className="table-header-col-section">
                        <label>출시일</label>
                      </Col>
                      <Col flex="auto" className="table-value-col-section">
                        <DatePicker
                          name="release_date"
                          value={moment(bodyInfo.release_date)}
                          onChange={(value) => {
                            onComponentChange(
                              "release_date",
                              GetDateStringFromDate(new Date(value.toString()))
                            );
                          }}
                          size="large"
                        />
                      </Col>
                    </Row>
                    <Row
                      gutter={[0]}
                      align="middle"
                      style={{ height: 80 }}
                      className="detail-table-layout"
                    >
                      <Col flex="154px" className="table-header-col-section">
                        <label>순서</label>
                      </Col>
                      <Col span={10} className="table-value-col-section">
                        <Space>
                          <InputNumber
                            name="sequence"
                            value={bodyInfo.sequence}
                            onChange={(number) => {
                              onComponentChange("sequence", number);
                            }}
                            size="large"
                            maxLength={6}
                            style={{ width: 150 }}
                            controls={false}
                          />
                          <label className="order-description-label">
                            숫자가 낮을수록 먼저 노출이 됩니다.
                          </label>
                        </Space>
                      </Col>
                      <Col flex="154px" className="table-header-col-section">
                        <label>사용여부</label>
                      </Col>
                      <Col flex="auto" className="table-value-col-section">
                        <Select
                          name="is_use"
                          value={bodyInfo.is_use}
                          onChange={(value) => {
                            onComponentChange("is_use", value);
                          }}
                          size="large"
                          suffixIcon={<CaretDownOutlined />}
                          placeholder="선택"
                          style={{ width: 150 }}
                        >
                          {Constants.availableOptions.map(
                            (optionItem, optionIndex) => (
                              <Select.Option
                                key={optionIndex}
                                value={optionItem.value}
                              >
                                {optionItem.label}
                              </Select.Option>
                            )
                          )}
                        </Select>
                      </Col>
                    </Row>
                    <Row
                      gutter={[0]}
                      align="middle"
                      style={{ height: 369 }}
                      className="detail-table-layout"
                    >
                      <Col flex="154px" className="table-header-col-section">
                        <label>사진</label>
                      </Col>
                      <Col flex="auto" className="table-value-col-section">
                        <Space direction="vertical" align="start" size={37}>
                          <label className="logo-description-label">
                            이미지 권장 크기는 90 * 60이며, *.png로 등록하셔야
                            합니다. <br />
                            이미지를 새로 등록 하기 위해선 등록된 이미지
                            [삭제]후 재 등록 하시면 됩니다.
                          </label>
                          {renderPictures()}
                        </Space>
                      </Col>
                    </Row>
                  </Space>
                </Space>
                <Space direction="vertical" size={20}>
                  <Row align="middle">
                    <Col>
                      <label className="detail-sub-title">
                        모델/라인업 공통 옵션 (튜닝/액세서리)
                      </label>
                    </Col>
                    <Col flex="auto" />
                  </Row>
                  <Space direction="vertical" size={0}>
                    {renderLineupBodyList()}
                  </Space>
                </Space>
                <Space direction="vertical" size={20}>
                  <Row align="middle">
                    <Col>
                      <label className="detail-sub-title">
                        모델/라인업 색상 (견적 메뉴에서만 노출)
                      </label>
                    </Col>
                    <Col flex="auto" />
                  </Row>
                  <Space direction="vertical" size={0}>
                    {renderColorBodyList()}
                  </Space>
                </Space>
                <Space direction="vertical" size={20}>
                  <Row align="middle">
                    <Col>
                      <label className="detail-sub-title">트림 통합 옵션</label>
                    </Col>
                    <Col flex="auto" />
                  </Row>
                  <Space direction="vertical" size={0}>
                    {renderTrimBodyList()}
                  </Space>
                </Space>
              </Space>
            </TabPane>
            <TabPane tab="모델할인" key="2">
              <Space direction="vertical" size={40}>
                <Space direction="vertical" size={20}>
                  <Row align="middle">
                    <Col>
                      <label className="detail-sub-title">정보</label>
                    </Col>
                    <Col flex="auto" />
                  </Row>
                  <Space direction="vertical" size={0}>
                    <Row
                      gutter={[0]}
                      align="middle"
                      style={{ height: 80 }}
                      className="detail-table-layout"
                    >
                      <Col flex="154px" className="table-header-col-section">
                        <label>차량</label>
                      </Col>
                      <Col flex="auto" className="table-value-col-section">
                        {renderDiscountCarField()}
                      </Col>
                    </Row>
                  </Space>
                </Space>
                {renderDiscountBodyList()}
              </Space>
            </TabPane>
          </Tabs>
        </Space>
      </Space>
      <AlertModal
        visible={validation.show}
        onConfirmClick={onCloseValidationClick}
        validationList={validation.list}
      />
    </>
  );
}

export default Create;
