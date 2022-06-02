import {
  Col,
  Divider,
  Row,
  Space,
  Select,
  Button,
  Input,
  Tabs,
  DatePicker,
} from "antd";
import { CaretDownOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import React, { useEffect } from "react";
import { Constants } from "../../../constants/Constants";
import AlertModal from "../../../components/AlertModal";
import { useDispatch, useSelector } from "react-redux";
import {
  removeRedirectTo,
  init,
  closeValidation,
  setBody,
  save,
  addBody,
  deleteBody,
  addKindBody,
  setKindBody,
  deleteKindBody,
  addConditionBody,
  setConditionBody,
  deleteConditionBody,
} from "../../../store/reducers/car/discount/create";
import { GetDateStringFromDate } from "../../../constants/GlobalFunctions";

const { Option } = Select;
const { TabPane } = Tabs;

// 등록페지
function Create() {
  let navigate = useNavigate();

  const { redirectTo, validation, brandOptionList, bodyList } = useSelector(
    (state) => ({
      redirectTo: state.discountCreate.redirectTo,
      validation: state.discountCreate.validation,
      brandOptionList: state.discountCreate.brandOptionList,
      bodyList: state.discountCreate.bodyList,
    })
  );

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
  const onAddComponentClick = () => dispatch(addBody());
  const onComponentChange = (number, name, value) =>
    dispatch(setBody(number, name, value));
  const onDeleteComponentClick = (number) => dispatch(deleteBody(number));
  const onAddKindComponentClick = (number) => dispatch(addKindBody(number));
  const onChangeKindComponent = (number, kindNumber, name, value) =>
    dispatch(setKindBody(number, kindNumber, name, value));
  const onDeleteKindComponentClick = (number, kindNumber) =>
    dispatch(deleteKindBody(number, kindNumber));
  const onAddConditionComponentClick = (number, kindNumber) =>
    dispatch(addConditionBody(number, kindNumber));
  const onChangeConditionComponent = (
    bodyNumber,
    kindNumber,
    conditionNumber,
    name,
    value
  ) =>
    dispatch(
      setConditionBody(bodyNumber, kindNumber, conditionNumber, name, value)
    );
  const onDeleteConditionComponentClick = (
    number,
    kindNumber,
    conditionNumber
  ) => dispatch(deleteConditionBody(number, kindNumber, conditionNumber));
  const onSaveClick = () => dispatch(save("/car/discount"));

  const renderBodyList = (type) => {
    if (type === "kind") {
      return bodyList.map((body, index) => (
        <Space key={index} direction="vertical" size={40}>
          <Space direction="vertical" size={20}>
            <Row align="middle">
              <Col>
                <label className="main-sub-title">
                  정보 {body.number < 10 ? "0" + body.number : body.number}
                </label>
              </Col>
              <Col flex="auto" />
              <Col>
                {bodyList.length > 1 ? (
                  <Button
                    className="white-button big-button"
                    style={{ width: 129, fontWeight: 500 }}
                    onClick={() => onDeleteComponentClick(body.number)}
                  >
                    정보삭제
                  </Button>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Space direction="vertical" size={0}>
              <Row
                gutter={[0]}
                align="middle"
                style={{ height: 80 }}
                className="table-layout"
              >
                <Col span={2} className="table-header-col-section">
                  <label>브랜드</label>
                </Col>
                <Col span={5} className="table-value-col-section">
                  <Select
                    name="brand_id"
                    value={body.brand_id}
                    onChange={(value) => {
                      onComponentChange(body.number, "brand_id", value);
                    }}
                    size="large"
                    suffixIcon={<CaretDownOutlined />}
                    placeholder="브랜드 선택"
                    style={{ width: 300 }}
                  >
                    {brandOptionList.map((optionItem, optionIndex) => (
                      <Select.Option key={optionIndex} value={optionItem.value}>
                        {optionItem.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </Space>
          </Space>
          <Space direction="vertical" size={20}>
            <Row align="middle">
              <Col>
                <label className="main-sub-title">
                  종류 {body.number < 10 ? "0" + body.number : body.number}
                </label>
              </Col>
              <Col flex="auto" />
            </Row>
            <Space direction="vertical" size={20}>
              {renderKindBodyList(body)}
            </Space>
          </Space>
        </Space>
      ));
    }

    if (type === "condition") {
      return bodyList.map((body) =>
        body.kindBodyList.map((kindBody, index) => (
          <Space key={index} direction="vertical" size={40}>
            <Space direction="vertical" size={20}>
              <Row align="middle">
                <Col>
                  <label className="main-sub-title">
                    정보 {body.number < 10 ? "0" + body.number : body.number}
                  </label>
                </Col>
                <Col flex="auto" />
              </Row>
              <Space direction="vertical" size={0}>
                <Row
                  gutter={[0]}
                  align="middle"
                  style={{ height: 80 }}
                  className="table-layout"
                >
                  <Col span={2} className="table-header-col-section">
                    <label>브랜드</label>
                  </Col>
                  <Col span={5} className="table-value-col-section">
                    <Space>
                      <Select
                        value={body.brand_id}
                        size="large"
                        suffixIcon={<CaretDownOutlined />}
                        placeholder="브랜드 선택"
                        style={{ width: 300 }}
                        disabled={true}
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
                      <Input
                        value={kindBody.kind_name}
                        placeholder="할인 종류 이름"
                        style={{ width: 300 }}
                        size="large"
                        maxLength={18}
                        disabled={true}
                      />
                    </Space>
                  </Col>
                </Row>
              </Space>
            </Space>
            <Space direction="vertical" size={20}>
              <Row align="middle">
                <Col>
                  <label className="main-sub-title">
                    조건 {body.number < 10 ? "0" + body.number : body.number}
                  </label>
                </Col>
                <Col flex="auto" />
              </Row>
              <Space direction="vertical" size={0}>
                {renderConditionBodyList(body.number, kindBody)}
              </Space>
            </Space>
          </Space>
        ))
      );
    }
  };

  const renderKindBodyList = (body) => {
    return body.kindBodyList.map((kindBody, index) => (
      <Space direction="vertical" size={0}>
        <Row
          gutter={[0]}
          align="middle"
          style={{ height: 80 }}
          className="table-layout"
        >
          <Col span={2} className="table-header-col-section">
            <label>
              상품{" "}
              {kindBody.number < 10 ? "0" + kindBody.number : kindBody.number}
            </label>
          </Col>
          <Col flex="auto" className="table-value-col-section">
            <Space size={14}>
              <Space size={6}>
                <Input
                  name="kind_name"
                  value={kindBody.kind_name}
                  onChange={(e) => {
                    onChangeKindComponent(
                      body.number,
                      kindBody.number,
                      e.target.name,
                      e.target.value
                    );
                  }}
                  size="large"
                  placeholder="할인 종류 이름"
                  maxLength={18}
                  style={{ width: 300 }}
                />
                <Input
                  name="kind_detail"
                  value={kindBody.kind_detail}
                  onChange={(e) => {
                    onChangeKindComponent(
                      body.number,
                      kindBody.number,
                      e.target.name,
                      e.target.value
                    );
                  }}
                  size="large"
                  placeholder="세부 내용 입력"
                  maxLength={50}
                  style={{ width: 900 }}
                />
              </Space>
              {body.kindBodyList.length == index + 1 ? (
                <>
                  {body.kindBodyList.length != 1 ? (
                    <Button
                      className="white-button"
                      onClick={() =>
                        onDeleteKindComponentClick(body.number, kindBody.number)
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
                    onClick={() => onAddKindComponentClick(body.number)}
                    size="large"
                  >
                    추가
                  </Button>
                </>
              ) : (
                <Button
                  className="white-button"
                  onClick={() =>
                    onDeleteKindComponentClick(body.number, kindBody.number)
                  }
                  size="large"
                >
                  삭제
                </Button>
              )}
            </Space>
          </Col>
        </Row>
        <Row
          gutter={[0]}
          align="middle"
          style={{ height: 80 }}
          className="table-layout"
        >
          <Col span={2} className="table-header-col-section">
            <label>
              기간{" "}
              {kindBody.number < 10 ? "0" + kindBody.number : kindBody.number}
            </label>
          </Col>
          <Col flex="auto" className="table-value-col-section">
            <Space size={6}>
              <DatePicker
                name="s_date"
                value={moment(kindBody.s_date)}
                onChange={(value) => {
                  onChangeKindComponent(
                    body.number,
                    kindBody.number,
                    "s_date",
                    GetDateStringFromDate(new Date(value.toString()))
                  );
                }}
                size="large"
                placeholder="시작일"
              />
              <label>~</label>
              <DatePicker
                name="e_date"
                value={moment(kindBody.e_date)}
                onChange={(value) => {
                  onChangeKindComponent(
                    body.number,
                    kindBody.number,
                    "e_date",
                    GetDateStringFromDate(new Date(value.toString()))
                  );
                }}
                size="large"
                placeholder="종료일"
              />
            </Space>
          </Col>
        </Row>
      </Space>
    ));
  };

  const renderConditionBodyList = (bodyNumber, kindBody) => {
    return kindBody.conditionBodyList.map((conditionBody, index) => (
      <Row
        key={index}
        gutter={[0]}
        align="middle"
        style={{ height: 80 }}
        className="table-layout"
      >
        <Col span={2} className="table-header-col-section">
          <label>
            조건{" "}
            {conditionBody.number !== 10
              ? "0" + conditionBody.number
              : conditionBody.number}
          </label>
        </Col>
        <Col flex="auto" className="table-value-col-section">
          <Space size={620}>
            <Space size={6}>
              <Input
                name="condition_name"
                value={conditionBody.condition_name}
                onChange={(e) => {
                  onChangeConditionComponent(
                    bodyNumber,
                    kindBody.number,
                    conditionBody.number,
                    e.target.name,
                    e.target.value
                  );
                }}
                size="large"
                placeholder="할인조건 입력"
                style={{ width: 400 }}
              />
              <Input
                name="discount_price"
                value={conditionBody.discount_price}
                onChange={(e) => {
                  onChangeConditionComponent(
                    bodyNumber,
                    kindBody.number,
                    conditionBody.number,
                    e.target.name,
                    e.target.value
                  );
                }}
                size="large"
                addonAfter={
                  <Select
                    name="price_unit"
                    value={conditionBody.price_unit}
                    onChange={(value) => {
                      onChangeConditionComponent(
                        bodyNumber,
                        kindBody.number,
                        conditionBody.number,
                        "price_unit",
                        value
                      );
                    }}
                    className="select-after"
                  >
                    {Constants.currencyTypeOptions.map(
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
                }
                style={{ width: 250 }}
              />
            </Space>
            <Space size={6}>
              {kindBody.conditionBodyList.length == index + 1 ? (
                <>
                  {kindBody.conditionBodyList.length != 1 ? (
                    <Button
                      className="white-button"
                      onClick={() =>
                        onDeleteConditionComponentClick(
                          bodyNumber,
                          kindBody.number,
                          conditionBody.number
                        )
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
                    onClick={() =>
                      onAddConditionComponentClick(bodyNumber, kindBody.number)
                    }
                    size="large"
                  >
                    추가
                  </Button>
                </>
              ) : (
                <Button
                  className="white-button"
                  onClick={() =>
                    onDeleteConditionComponentClick(
                      bodyNumber,
                      kindBody.number,
                      conditionBody.number
                    )
                  }
                  size="large"
                >
                  삭제
                </Button>
              )}
            </Space>
          </Space>
        </Col>
      </Row>
    ));
  };

  return (
    <>
      <Space direction="vertical" size={18} className="main-layout">
        {/* Page Header */}
        <Space direction="vertical" size={18}>
          <Row justify="middle">
            <Col>
              <label className="main-header-title">할인/비용 등록</label>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space size={10}>
                <Link to="/car/discount">
                  <Button className="white-button" size="large">
                    취소
                  </Button>
                </Link>
                <Button
                  className="black-button"
                  size="large"
                  onClick={onSaveClick}
                >
                  저장하고 나가기
                </Button>
              </Space>
            </Col>
          </Row>
          <Divider className="main-body-divider" />
        </Space>

        {/* Body Section */}
        <Space direction="vertical" size={20} style={{ paddingBottom: 117 }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="할인종류" key="1">
              <Space direction="vertical" size={40}>
                {renderBodyList("kind")}
                <Row justify="center" gutter={[17, 0]}>
                  <Col>
                    <Button
                      className="white-button rounded-button"
                      icon={<PlusOutlined />}
                      onClick={onAddComponentClick}
                    >
                      할인종류 추가하기
                    </Button>
                  </Col>
                </Row>
              </Space>
            </TabPane>
            <TabPane tab="할인조건" key="2">
              <Space direction="vertical" size={40}>
                {renderBodyList("condition")}
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
