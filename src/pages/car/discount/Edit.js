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
import { Link, useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import React, { useEffect } from "react";
import { Constants } from "../../../constants/Constants";
import AlertModal from "../../../components/AlertModal";
import AlertDeleteModal from "../../../components/AlertDeleteModal";
import { useDispatch, useSelector } from "react-redux";
import {
  removeRedirectTo,
  init,
  closeValidation,
  setBody,
  save,
  closeConfirm,
  showConfirm,
  remove,
  addConditionBody,
  setConditionBody,
  deleteConditionBody,
} from "../../../store/reducers/car/discount/edit";
import { GetDateStringFromDate } from "../../../constants/GlobalFunctions";

const { Option } = Select;
const { TabPane } = Tabs;

// 수정페지
function Edit() {
  let { id } = useParams();
  let navigate = useNavigate();

  const {
    redirectTo,
    validation,
    confirm,
    brandOptionList,
    bodyInfo,
    conditionBodyList,
  } = useSelector((state) => ({
    redirectTo: state.discountEdit.redirectTo,
    validation: state.discountEdit.validation,
    confirm: state.discountEdit.confirm,
    brandOptionList: state.discountEdit.brandOptionList,
    bodyInfo: state.discountEdit.bodyInfo,
    conditionBodyList: state.discountEdit.conditionBodyList,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (redirectTo) {
      const redirectURL = redirectTo;
      dispatch(removeRedirectTo());
      navigate(redirectURL);
    }
    dispatch(init(id));
  }, [redirectTo, dispatch]);

  const onCloseValidationClick = () => dispatch(closeValidation());
  const onCloseConfirmClick = () => dispatch(closeConfirm());
  const onComponentChange = (name, value) => dispatch(setBody(name, value));
  const onAddConditionComponentClick = () => dispatch(addConditionBody());
  const onChangeConditionComponent = (number, name, value) =>
    dispatch(setConditionBody(number, name, value));
  const onDeleteConditionComponentClick = (number) =>
    dispatch(deleteConditionBody(number));
  const onSaveClick = () => dispatch(save("/car/discount"));
  const onDeleteClick = async () => dispatch(showConfirm());
  const deleteInfo = async () => dispatch(remove("/car/discount", id));

  const renderConditionBodyList = () => {
    return conditionBodyList.map((conditionBody, index) => (
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
              {conditionBodyList.length == index + 1 ? (
                <>
                  {conditionBodyList.length != 1 ? (
                    <Button
                      className="white-button"
                      onClick={() =>
                        onDeleteConditionComponentClick(conditionBody.number)
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
                    onClick={() => onAddConditionComponentClick()}
                    size="large"
                  >
                    추가
                  </Button>
                </>
              ) : (
                <Button
                  className="white-button"
                  onClick={() =>
                    onDeleteConditionComponentClick(conditionBody.number)
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
              <label className="main-header-title">할인/비용 수정</label>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space size={10}>
                <Link to="/car/discount">
                  <Button className="white-button medium-button">취소</Button>
                </Link>
                <Button
                  className="black-button medium-button"
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
                <Space direction="vertical" size={20}>
                  <Row align="middle">
                    <Col>
                      <label className="main-sub-title">정보 01</label>
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
                        <Select
                          name="brand_id"
                          value={bodyInfo.brand_id}
                          onChange={(value) => {
                            onComponentChange("brand_id", value);
                          }}
                          size="large"
                          suffixIcon={<CaretDownOutlined />}
                          placeholder="브랜드 선택"
                          style={{ width: 300 }}
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
                    </Row>
                  </Space>
                </Space>
                <Space direction="vertical" size={20}>
                  <Row align="middle">
                    <Col>
                      <label className="main-sub-title">종류 01</label>
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
                        <label>상품 01</label>
                      </Col>
                      <Col flex="auto" className="table-value-col-section">
                        <Space size={14}>
                          <Space size={6}>
                            <Input
                              name="kind_name"
                              value={bodyInfo.kind_name}
                              onChange={(e) => {
                                onComponentChange(
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
                              value={bodyInfo.kind_detail}
                              onChange={(e) => {
                                onComponentChange(
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
                        <label>기간 01</label>
                      </Col>
                      <Col flex="auto" className="table-value-col-section">
                        <Space size={6}>
                          <DatePicker
                            name="s_date"
                            value={moment(bodyInfo.s_date)}
                            onChange={(value) => {
                              onComponentChange(
                                "s_date",
                                GetDateStringFromDate(
                                  new Date(value.toString())
                                )
                              );
                            }}
                            size="large"
                            placeholder="시작일"
                          />
                          <label>~</label>
                          <DatePicker
                            name="e_date"
                            value={moment(bodyInfo.e_date)}
                            onChange={(value) => {
                              onComponentChange(
                                "e_date",
                                GetDateStringFromDate(
                                  new Date(value.toString())
                                )
                              );
                            }}
                            size="large"
                            placeholder="종료일"
                          />
                        </Space>
                      </Col>
                    </Row>
                  </Space>
                </Space>
                <Row justify="center" gutter={[17, 0]}>
                  <Col>
                    <Button
                      className="white-button rounded-button"
                      icon={<PlusOutlined />}
                      onClick={() => onDeleteClick(bodyInfo.idx)}
                      size="large"
                    >
                      삭제하기
                    </Button>
                  </Col>
                </Row>
              </Space>
            </TabPane>
            <TabPane tab="할인조건" key="2">
              <Space direction="vertical" size={40}>
                <Space direction="vertical" size={20}>
                  <Row align="middle">
                    <Col>
                      <label className="main-sub-title">정보 01</label>
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
                            value={bodyInfo.brand_id}
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
                            value={bodyInfo.kind_name}
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
                      <label className="main-sub-title">조건 01</label>
                    </Col>
                    <Col flex="auto" />
                  </Row>
                  <Space direction="vertical" size={0}>
                    {renderConditionBodyList()}
                  </Space>
                </Space>
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
      <AlertDeleteModal
        visible={confirm.show}
        onConfirmClick={() => deleteInfo()}
        onCancelClick={onCloseConfirmClick}
      />
    </>
  );
}

export default Edit;
