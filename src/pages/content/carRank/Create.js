import { Col, Divider, Row, Space, Select, Button, Input } from "antd";
import {
  CaretDownOutlined,
  CaretUpFilled,
  CaretDownFilled,
} from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import AlertModal from "../../../components/AlertModal";
import { useDispatch, useSelector } from "react-redux";
import {
  init,
  save,
  setBody,
  closeValidation,
  removeRedirectTo,
  addModel,
  deleteModel,
  moveUp,
  moveDown,
  setModel,
  closeConfirm,
  showConfirm,
  remove,
} from "../../../store/reducers/content/carRank/create";

const { Option } = Select;

// 등록페지
function Create() {
  let { id } = useParams();
  let navigate = useNavigate();

  const {
    redirectTo,
    validation,
    confirm,
    bodyInfo,
    modelBodyList,
    brandOptionList,
    groupOptionList,
    modelOptionList,
  } = useSelector((state) => ({
    redirectTo: state.carRankCreate.redirectTo,
    validation: state.carRankCreate.validation,
    confirm: state.carRankCreate.confirm,
    bodyInfo: state.carRankCreate.bodyInfo,
    modelBodyList: state.carRankCreate.modelBodyList,
    brandOptionList: state.carRankCreate.brandOptionList,
    groupOptionList: state.carRankCreate.groupOptionList,
    modelOptionList: state.carRankCreate.modelOptionList,
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
  const onAddModelComponentClick = () => dispatch(addModel());
  const onModelComponentChange = (number, name, value) =>
    dispatch(setModel(number, name, value));
  const onDeleteModelComponentClick = (number) => dispatch(deleteModel(number));
  const onUpMoveClick = (index) => dispatch(moveUp(index, modelBodyList));
  const onDownMoveClick = (index) => dispatch(moveDown(index, modelBodyList));
  const onSaveClick = () =>
    dispatch(save("/content/carRank", bodyInfo, modelBodyList));
  const onDeleteClick = async () => dispatch(showConfirm());
  const deleteInfo = async () => dispatch(remove("/content/carRank", id));

  const renderModelBodyList = () => {
    return modelBodyList.map((body, index) => (
      <Row
        gutter={[0]}
        align="middle"
        style={{ height: 80 }}
        className="table-layout"
      >
        <Col span={2} className="table-header-col-section">
          <Space direction="vertical" style={{ paddingLeft: "10px" }}>
            <CaretUpFilled
              style={{ fontSize: "30px", cursor: "pointer" }}
              onClick={() => onUpMoveClick(index)}
            />
            <CaretDownFilled
              style={{ fontSize: "30px", cursor: "pointer" }}
              onClick={() => onDownMoveClick(index)}
            />
          </Space>
          <label>
            순서 {body.number !== 10 ? "0" + body.number : body.number}
          </label>
        </Col>
        <Col flex="auto" className="table-value-col-section">
          <Space size={10}>
            <Select
              name="brand_id"
              value={body.brand_id}
              onChange={(value) => {
                onModelComponentChange(body.number, "brand_id", value);
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
            <Select
              name="group_id"
              value={body.group_id}
              onChange={(value) => {
                onModelComponentChange(body.number, "group_id", value);
              }}
              size="large"
              suffixIcon={<CaretDownOutlined />}
              placeholder="모델그룹 선택"
              style={{ width: 300 }}
            >
              {groupOptionList
                .filter((item) => item.brand_id === body.brand_id)
                .map((optionItem, optionIndex) => (
                  <Select.Option key={optionIndex} value={optionItem.value}>
                    {optionItem.label}
                  </Select.Option>
                ))}
            </Select>
            <Select
              name="idx"
              value={body.idx}
              onChange={(value) => {
                onModelComponentChange(body.number, "idx", value);
              }}
              size="large"
              suffixIcon={<CaretDownOutlined />}
              placeholder="모델 선택"
              style={{ width: 300 }}
            >
              {modelOptionList
                .filter((item) => item.group_id === body.group_id)
                .map((optionItem, optionIndex) => (
                  <Select.Option key={optionIndex} value={optionItem.value}>
                    {optionItem.label}
                  </Select.Option>
                ))}
            </Select>
          </Space>
        </Col>
        <Col flex="auto" />
        <Col className="table-value-col-section">
          <Space size={13}>
            {modelBodyList.length == index + 1 ? (
              <>
                {modelBodyList.length != 1 ? (
                  <Button
                    className="white-button"
                    onClick={() => onDeleteModelComponentClick(body.number)}
                    size="large"
                  >
                    삭제
                  </Button>
                ) : (
                  ""
                )}
                <Button
                  className="black-button"
                  onClick={() => onAddModelComponentClick(body.number)}
                  size="large"
                >
                  추가
                </Button>
              </>
            ) : (
              <Button
                className="white-button"
                onClick={() => onDeleteModelComponentClick(body.number)}
                size="large"
              >
                삭제
              </Button>
            )}
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
              <label className="main-header-title">자동차 인기순위 등록</label>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space size={10}>
                <Link to="/content/carRank">
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
          <Space direction="vertical" size={0} split={<Divider />}>
            <Row align="middle">
              <Col>
                <label className="main-sub-title">콘텐츠 선택</label>
              </Col>
              <Col flex="auto" />
            </Row>
            <Space direction="vertical" size={20}>
              <Row gutter={[30]}>
                <Col>
                  <Space size={10}>
                    <label>최소 등록수량</label>
                    <Input
                      size="large"
                      style={{ width: 130 }}
                      value={modelBodyList.length + " / 20"}
                      disabled
                    />
                  </Space>
                </Col>
                <Col>
                  <Space size={10}>
                    <label>국내</label>
                    <Input
                      size="large"
                      style={{ width: 130 }}
                      value={
                        modelBodyList.filter((body) => body.is_income == "0")
                          .length + " / 20"
                      }
                      disabled
                    />
                  </Space>
                </Col>
                <Col>
                  <Space size={10}>
                    <label>수입</label>
                    <Input
                      size="large"
                      style={{ width: 130 }}
                      value={
                        modelBodyList.filter((body) => body.is_income == "1")
                          .length + " / 20"
                      }
                      disabled
                    />
                  </Space>
                </Col>
              </Row>
              <Space direction="vertical" size={0}>
                {renderModelBodyList()}
              </Space>
            </Space>
          </Space>
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
