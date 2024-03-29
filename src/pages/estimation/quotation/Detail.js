import {
  Col,
  Divider,
  Row,
  Space,
  Select,
  Button,
  Input,
  DatePicker,
} from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import moment from "moment";
import { Constants } from "../../../constants/Constants";
import AlertModal from "../../../components/AlertModal";
import AlertDeleteModal from "../../../components/AlertDeleteModal";
import { useDispatch, useSelector } from "react-redux";
import {
  closeValidation,
  closeConfirm,
  showConfirm,
  init,
  setBody,
  remove,
  removeRedirectTo,
  save,
} from "../../../store/reducers/estimation/quotation/detail";
import { GetDateStringFromDate } from "../../../constants/GlobalFunctions";

const { Option } = Select;

// 상세페지
function Detail() {
  let { id } = useParams();
  let navigate = useNavigate();

  const { redirectTo, validation, confirm, bodyInfo } = useSelector(
    (state) => ({
      redirectTo: state.quotationDetail.redirectTo,
      validation: state.quotationDetail.validation,
      confirm: state.quotationDetail.confirm,
      bodyInfo: state.quotationDetail.bodyInfo,
    })
  );

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
  const onSaveClick = () => dispatch(save("/estimation/quotation", bodyInfo));
  const onDeleteClick = async () => dispatch(showConfirm());
  const deleteInfo = async () => dispatch(remove("/estimation/quotation", id));

  return (
    <>
      <Space direction="vertical" size={18} className="main-layout">
        {/* Page Header */}
        <Space direction="vertical" size={11}>
          <Row justify="middle">
            <Col>
              <label className="main-header-title">견적신청 상세보기</label>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space size={10}>
                <Link to="/estimation/quotation">
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
                  <label>구입방법</label>
                </Col>
                <Col flex="636px" className="table-value-col-section">
                  <Input
                    name="purchase_method"
                    value={
                      Constants.purchaseMethodOptions.filter(
                        (item) => item.value === bodyInfo.purchase_method
                      ).length
                        ? Constants.purchaseMethodOptions.filter(
                            (item) => item.value === bodyInfo.purchase_method
                          )[0].label
                        : ""
                    }
                    size="large"
                    style={{ width: 150 }}
                    disabled
                  />
                </Col>
                <Col flex="154px" className="table-header-col-section">
                  <label>등록일</label>
                </Col>
                <Col flex="auto" className="table-value-col-section">
                  <Space size={6}>
                    <Input
                      name="reg_date_text1"
                      value={bodyInfo.reg_date_text1}
                      size="large"
                      style={{ width: 150 }}
                      disabled
                    />
                    <Input
                      size="large"
                      name="reg_date_text2"
                      value={bodyInfo.reg_date_text2}
                      style={{ width: 150 }}
                      disabled
                    />
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
                  <label>이름</label>
                </Col>
                <Col flex="636px" className="table-value-col-section">
                  <Input
                    name="client_name"
                    value={bodyInfo.client_name}
                    size="large"
                    style={{ width: 150 }}
                    disabled
                  />
                </Col>
                <Col flex="154px" className="table-header-col-section">
                  <label>연락처</label>
                </Col>
                <Col flex="auto" className="table-value-col-section">
                  <Space size={6}>
                    <Input
                      name="client_phone"
                      value={bodyInfo.client_phone}
                      size="large"
                      style={{ width: 150 }}
                      disabled
                    />
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
                  <label>차량정보</label>
                </Col>
                <Col flex="auto" className="table-value-col-section">
                  <Space size={6}>
                    <Input
                      name="brand_name"
                      value={bodyInfo.brand_name}
                      size="large"
                      style={{ width: 150 }}
                      disabled
                    />
                    <Input
                      name="model_name"
                      value={bodyInfo.model_name}
                      size="large"
                      style={{ width: 180 }}
                      disabled
                    />
                    <Input
                      name="lineup_name"
                      value={bodyInfo.lineup_name}
                      size="large"
                      style={{ width: 124 }}
                      disabled
                    />
                    <Input
                      name="trim_name"
                      value={bodyInfo.trim_name}
                      size="large"
                      style={{ width: 250 }}
                      disabled
                    />
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
                  <label>상담여부</label>
                </Col>
                <Col flex="636px" className="table-value-col-section">
                  <Select
                    name="is_business"
                    value={bodyInfo.is_business}
                    onChange={(value) => {
                      onComponentChange("is_business", value);
                    }}
                    size="large"
                    suffixIcon={<CaretDownOutlined />}
                    placeholder="선택"
                    style={{ width: 150 }}
                  >
                    {Constants.statusOptions.map((optionItem, optionIndex) => (
                      <Select.Option key={optionIndex} value={optionItem.value}>
                        {optionItem.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
                <Col flex="154px" className="table-header-col-section">
                  <label>계약여부</label>
                </Col>
                <Col flex="auto" className="table-value-col-section">
                  <Space size={6}>
                    <Select
                      name="is_contract"
                      value={bodyInfo.is_contract}
                      onChange={(value) => {
                        onComponentChange("is_contract", value);
                      }}
                      disabled={bodyInfo.is_business === "1" ? false : true}
                      size="large"
                      suffixIcon={<CaretDownOutlined />}
                      placeholder="선택"
                      style={{ width: 150 }}
                    >
                      {Constants.statusOptions.map(
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
                    <DatePicker
                      name="contract_date"
                      value={
                        bodyInfo.contract_date
                          ? moment(bodyInfo.contract_date)
                          : null
                      }
                      onChange={(value) => {
                        onComponentChange(
                          "contract_date",
                          GetDateStringFromDate(new Date(value.toString()))
                        );
                      }}
                      disabled={bodyInfo.is_business === "1" ? false : true}
                      placeholder="0000-00-00"
                      size="large"
                    />
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
                  <label>출고여부</label>
                </Col>
                <Col flex="636px" className="table-value-col-section">
                  <Space size={6}>
                    <Select
                      name="is_release"
                      value={bodyInfo.is_release}
                      onChange={(value) => {
                        onComponentChange("is_release", value);
                      }}
                      disabled={bodyInfo.is_contract === "1" ? false : true}
                      size="large"
                      suffixIcon={<CaretDownOutlined />}
                      placeholder="선택"
                      style={{ width: 150 }}
                    >
                      {Constants.statusOptions.map(
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
                    <DatePicker
                      name="release_date"
                      value={
                        bodyInfo.release_date
                          ? moment(bodyInfo.release_date)
                          : null
                      }
                      onChange={(value) => {
                        onComponentChange(
                          "release_date",
                          GetDateStringFromDate(new Date(value.toString()))
                        );
                      }}
                      disabled={bodyInfo.is_contract === "1" ? false : true}
                      placeholder="0000-00-00"
                      size="large"
                    />
                  </Space>
                </Col>
                <Col flex="154px" className="table-header-col-section">
                  <label>종료여부</label>
                </Col>
                <Col flex="auto" className="table-value-col-section">
                  <Space size={6}>
                    <Select
                      name="is_close"
                      value={bodyInfo.is_close}
                      onChange={(value) => {
                        onComponentChange("is_close", value);
                      }}
                      disabled={bodyInfo.is_release === "1" ? false : true}
                      size="large"
                      suffixIcon={<CaretDownOutlined />}
                      placeholder="선택"
                      style={{ width: 150 }}
                    >
                      {Constants.statusOptions.map(
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
                  <label>비고</label>
                </Col>
                <Col flex="auto" className="table-value-col-section">
                  <Space size={6}>
                    <Input
                      name="note"
                      value={bodyInfo.note}
                      onChange={(e) => {
                        onComponentChange(e.target.name, e.target.value);
                      }}
                      size="large"
                      style={{ width: 600 }}
                      placeholder={"내용을 입력해 주세요"}
                    />
                  </Space>
                </Col>
              </Row>
            </Space>
          </Space>

          <Row justify="center" gutter={[17, 0]}>
            <Col>
              <Button
                className="white-button rounded-button delete-detail-button"
                onClick={() => onDeleteClick(bodyInfo.idx)}
                size="large"
              >
                삭제하기
              </Button>
            </Col>
          </Row>
        </Space>
      </Space>
      <AlertModal
        visible={validation.show}
        onConfirmClick={onCloseValidationClick}
        validationList={validation.list}
      />
      <AlertDeleteModal
        name={confirm.name}
        visible={confirm.show}
        onConfirmClick={() => deleteInfo()}
        onCancelClick={onCloseConfirmClick}
      />
    </>
  );
}

export default Detail;
