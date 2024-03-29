import { Col, Divider, Row, Space, Select, Button, Input } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
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
} from "../../../store/reducers/content/carRank/edit";

const { Option } = Select;

// 수정페지
function Edit() {
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
    redirectTo: state.carRankEdit.redirectTo,
    validation: state.carRankEdit.validation,
    confirm: state.carRankEdit.confirm,
    bodyInfo: state.carRankEdit.bodyInfo,
    modelBodyList: state.carRankEdit.modelBodyList,
    brandOptionList: state.carRankEdit.brandOptionList,
    groupOptionList: state.carRankEdit.groupOptionList,
    modelOptionList: state.carRankEdit.modelOptionList,
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
        className="detail-table-layout"
      >
        <Col flex="154px" className="table-header-col-section">
          <Row
            justify="start"
            align="middle"
            style={{ paddingLeft: 10, width: "100%" }}
          >
            <Col flex="auto">
              <Space
                className="order-change-panel"
                direction="vertical"
                size={10}
              >
                <svg
                  width="18"
                  height="15"
                  viewBox="0 0 18 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => onUpMoveClick(index)}
                >
                  <path d="M9 0L17.6603 15H0.339746L9 0Z" fill="#C1C1C1" />
                </svg>

                <svg
                  width="18"
                  height="15"
                  viewBox="0 0 18 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => onDownMoveClick(index)}
                >
                  <path d="M9 15L0.339745 0L17.6603 0L9 15Z" fill="#C1C1C1" />
                </svg>
              </Space>
            </Col>
            <Col flex="none">
              <label>
                순서 {body.number < 10 ? "0" + body.number : body.number}
              </label>
            </Col>
          </Row>
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
              name="model_id"
              value={body.model_id}
              onChange={(value) => {
                onModelComponentChange(body.number, "model_id", value);
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
                    className="white-button detail-delete-body-button"
                    onClick={() => onDeleteModelComponentClick(body.number)}
                    size="large"
                  >
                    삭제
                  </Button>
                ) : (
                  ""
                )}
                <Button
                  className="black-button detail-add-body-button"
                  onClick={() => onAddModelComponentClick(body.number)}
                  size="large"
                >
                  추가
                </Button>
              </>
            ) : (
              <Button
                className="white-button detail-delete-body-button"
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
      <Space direction="vertical" size={20} className="main-layout">
        {/* Page Header */}
        <Space direction="vertical" size={11}>
          <Row justify="middle">
            <Col>
              <label className="detail-header-title">
                자동차 인기순위 수정
              </label>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space size={10}>
                <Link to="/content/carRank">
                  <Button
                    className="white-button cancel-detail-button"
                    size="large"
                  >
                    취소
                  </Button>
                </Link>
                <Button
                  className="black-button save-detail-button"
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
        <Space direction="vertical" size={40} style={{ paddingBottom: 112 }}>
          <Space direction="vertical" size={0} split={<Divider />}>
            <Row align="middle">
              <Col>
                <label className="detail-sub-title">순위</label>
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
        disableFooter={validation.disableFooter}
      />
    </>
  );
}

export default Edit;
