import { Col, Divider, Row, Space, Select, Button, Input } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Constants } from "../../../constants/Constants";
import AlertModal from "../../../components/AlertModal";
import AlertDeleteModal from "../../../components/AlertDeleteModal";
import { useDispatch, useSelector } from "react-redux";
import {
  closeValidation,
  checkName,
  closeConfirm,
  showConfirm,
  init,
  setBody,
  remove,
  removeRedirectTo,
  save,
} from "../../../store/reducers/car/group/edit";

const { Option } = Select;

// 수정페지
function Edit() {
  let { id, brand_id } = useParams();
  let navigate = useNavigate();

  const {
    redirectTo,
    validation,
    confirm,
    brandOptionList,
    carKindOptionList,
    bodyInfo,
  } = useSelector((state) => ({
    redirectTo: state.groupEdit.redirectTo,
    validation: state.groupEdit.validation,
    confirm: state.groupEdit.confirm,
    brandOptionList: state.groupEdit.brandOptionList,
    carKindOptionList: state.groupEdit.carKindOptionList,
    bodyInfo: state.groupEdit.bodyInfo,
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
  const onCheckNameClick = (name) => dispatch(checkName(name));
  const onComponentChange = (name, value) => dispatch(setBody(name, value));
  const onSaveClick = (url) => dispatch(save(url));
  const onDeleteClick = async () => dispatch(showConfirm());
  const deleteInfo = async () => dispatch(remove("/car/group", id));

  return (
    <>
      <Space direction="vertical" size={18} className="main-layout">
        {/* Page Header */}
        <Space direction="vertical" size={11}>
          <Row justify="middle">
            <Col>
              <label className="main-header-title">모델그룹 수정</label>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space size={10}>
                <Link
                  to={
                    parseInt(brand_id) === 0
                      ? "/car/group"
                      : "/car/group/manage/" + brand_id
                  }
                >
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
                  onClick={() =>
                    onSaveClick(
                      parseInt(brand_id) === 0
                        ? "/car/group"
                        : "/car/group/manage/" + brand_id
                    )
                  }
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
          <Space
            direction="vertical"
            size={59}
            split={<Divider className="detail-body-divider" dashed />}
          >
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
                    <label>브랜드</label>
                  </Col>
                  <Col flex="636px" className="table-value-col-section">
                    <Select
                      name="brand_id"
                      value={bodyInfo.brand_id}
                      onChange={(value) => {
                        onComponentChange("brand_id", value);
                      }}
                      size="large"
                      suffixIcon={<CaretDownOutlined />}
                      placeholder="브랜드 선택"
                      style={{ width: 400 }}
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
                  <Col flex="154px" className="table-header-col-section">
                    <label>모델그룹</label>
                  </Col>
                  <Col flex="auto" className="table-value-col-section">
                    <Space>
                      <div style={{ position: "relative" }}>
                        <Input
                          name="group_name"
                          value={bodyInfo.group_name}
                          onChange={(e) => {
                            onComponentChange(e.target.name, e.target.value);
                          }}
                          size="large"
                          placeholder="모델 그룹명 입력"
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
                        onClick={() => onCheckNameClick(bodyInfo.group_name)}
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
                    <label>차종</label>
                  </Col>
                  <Col flex="636px" className="table-value-col-section">
                    <Select
                      name="car_kind_id"
                      value={bodyInfo.car_kind_id}
                      onChange={(value) => {
                        onComponentChange("car_kind_id", value);
                      }}
                      size="large"
                      suffixIcon={<CaretDownOutlined />}
                      placeholder="선택"
                      style={{ width: 150 }}
                    >
                      {carKindOptionList.map((optionItem, optionIndex) => (
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
              </Space>
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

export default Edit;
