import { Col, Divider, Row, Space, Select, Button, Input } from "antd";
import { CaretDownOutlined, PlusOutlined } from "@ant-design/icons";
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
} from "../../../store/reducers/user/manage/edit";

const { Option } = Select;

function Edit() {
  let { id } = useParams();
  let navigate = useNavigate();

  const { redirectTo, validation, confirm, bodyInfo } = useSelector(
    (state) => ({
      redirectTo: state.manageEdit.redirectTo,
      validation: state.manageEdit.validation,
      confirm: state.manageEdit.confirm,
      brandOptionList: state.manageEdit.brandOptionList,
      carKindOptionList: state.manageEdit.carKindOptionList,
      bodyInfo: state.manageEdit.bodyInfo,
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
  const onCheckNameClick = (name) => dispatch(checkName(name));
  const onComponentChange = (name, value) => dispatch(setBody(name, value));
  const onSaveClick = () => dispatch(save("/user/manage", bodyInfo));
  const onDeleteClick = async () => dispatch(showConfirm());
  const deleteInfo = async () => dispatch(remove("/user/manage", id));

  return (
    <>
      <Space direction="vertical" size={18} className="main-layout">
        {/* Page Header */}
        <Space direction="vertical" size={18}>
          <Row justify="middle">
            <Col>
              <label className="main-header-title">사용자 수정</label>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space size={10}>
                <Link to="/user/manage">
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
          <Space direction="vertical" size={72} split={<Divider />}>
            <Space direction="vertical" size={20}>
              <Row align="middle">
                <Col>
                  <label className="main-sub-title">정보</label>
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
                    <label>이름</label>
                  </Col>
                  <Col span={10} className="table-value-col-section">
                    <Input
                      name="name"
                      value={bodyInfo.name}
                      onChange={(e) => {
                        onComponentChange(e.target.name, e.target.value);
                      }}
                      size="large"
                      placeholder="이름 입력"
                      style={{ width: 150 }}
                    />
                  </Col>
                  <Col span={2} className="table-header-col-section">
                    <label>아이디</label>
                  </Col>
                  <Col flex="auto" className="table-value-col-section">
                    <Input
                      name="user_id"
                      value={bodyInfo.user_id}
                      onChange={(e) => {
                        onComponentChange(e.target.name, e.target.value);
                      }}
                      size="large"
                      placeholder="아이디 입력"
                      style={{ width: 150 }}
                    />
                  </Col>
                </Row>
                <Row
                  gutter={[0]}
                  align="middle"
                  style={{ height: 80 }}
                  className="table-layout"
                >
                  <Col span={2} className="table-header-col-section">
                    <label>그룹</label>
                  </Col>
                  <Col span={10} className="table-value-col-section">
                    <Space size={6}>
                      <Select
                        name="type_id"
                        value={bodyInfo.type_id}
                        onChange={(value) => {
                          onComponentChange("type_id", value);
                        }}
                        size="large"
                        suffixIcon={<CaretDownOutlined />}
                        placeholder="구분"
                        style={{ width: 150 }}
                      >
                        {Constants.userTypeOptions.map(
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
                      <Select
                        name="group_id"
                        value={bodyInfo.group_id}
                        onChange={(value) => {
                          onComponentChange("group_id", value);
                        }}
                        size="large"
                        suffixIcon={<CaretDownOutlined />}
                        placeholder="그룹"
                        style={{ width: 150 }}
                      >
                        {bodyInfo.type_id === "0"
                          ? Constants.userTeamGroupOptions.map(
                              (optionItem, optionIndex) => (
                                <Select.Option
                                  key={optionIndex}
                                  value={optionItem.value}
                                >
                                  {optionItem.label}
                                </Select.Option>
                              )
                            )
                          : bodyInfo.type_id === "1"
                          ? Constants.userAreaGroupOptions.map(
                              (optionItem, optionIndex) => (
                                <Select.Option
                                  key={optionIndex}
                                  value={optionItem.value}
                                >
                                  {optionItem.label}
                                </Select.Option>
                              )
                            )
                          : ""}
                      </Select>
                    </Space>
                  </Col>
                  <Col span={2} className="table-header-col-section">
                    <label>임시 비밀번호</label>
                  </Col>
                  <Col flex="auto" className="table-value-col-section">
                    <Space size={6}>
                      <div style={{ position: "relative" }}>
                        <Input
                          name="password"
                          value={bodyInfo.password}
                          onChange={(e) => {
                            onComponentChange(e.target.name, e.target.value);
                          }}
                          size="large"
                          placeholder="비밀번호 입력"
                          maxLength={15}
                          style={{ width: 250 }}
                        />
                        <label className="danger-alert">
                          이미 사용중인 이름 입니다.
                        </label>
                      </div>
                      <label
                        className="description-label"
                        style={{ width: 350 }}
                      >
                        {
                          "공백없이 8~15글자의 영문 대소문자, 숫자, 일부 특수기호만 조합해 사용(사용가능한 특수기호 : !@#$%^&*()_+=><)"
                        }
                      </label>
                    </Space>
                  </Col>
                </Row>
              </Space>
            </Space>
          </Space>

          <Row justify="center" gutter={[17, 0]}>
            <Col>
              <Button
                className="white-button rounded-button"
                icon={<PlusOutlined />}
                onClick={onDeleteClick}
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
        visible={confirm.show}
        onConfirmClick={() => deleteInfo()}
        onCancelClick={onCloseConfirmClick}
      />
    </>
  );
}

export default Edit;
