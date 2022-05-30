import { Col, Divider, Row, Space, Select, Button, Input } from "antd";
import { CaretDownOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Constants } from "../../../constants/Constants";
import AlertModal from "../../../components/AlertModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addBody,
  deleteBody,
  init,
  save,
  setBody,
  closeValidation,
  checkName,
  removeRedirectTo,
} from "../../../store/reducers/user/manage/create";

const { Option } = Select;

// 등록페지
function Create() {
  let navigate = useNavigate();

  const { redirectTo, validation, bodyList } = useSelector((state) => ({
    redirectTo: state.manageCreate.redirectTo,
    validation: state.manageCreate.validation,
    brandOptionList: state.manageCreate.brandOptionList,
    carKindOptionList: state.manageCreate.carKindOptionList,
    bodyList: state.manageCreate.bodyList,
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
  const onCheckNameClick = (number, name) => dispatch(checkName(number, name));
  const onAddComponentClick = () => dispatch(addBody());
  const onDeleteComponentClick = (number) => dispatch(deleteBody(number));
  const onComponentChange = (number, name, value) =>
    dispatch(setBody(number, name, value));
  const onSaveClick = () => dispatch(save("/user/manage", bodyList));

  const renderBodyList = () => {
    return (
      <>
        {bodyList.map((body, index) => {
          return (
            <Space direction="vertical" size={20} key={index}>
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
                    <></>
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
                    <label>이름</label>
                  </Col>
                  <Col span={10} className="table-value-col-section">
                    <Input
                      name="name"
                      value={body.name}
                      onChange={(e) => {
                        onComponentChange(
                          body.number,
                          e.target.name,
                          e.target.value
                        );
                      }}
                      size="large"
                      placeholder="이름 입력"
                      maxLength={10}
                      style={{ width: 150 }}
                    />
                  </Col>
                  <Col span={2} className="table-header-col-section">
                    <label>아이디</label>
                  </Col>
                  <Col flex="auto" className="table-value-col-section">
                    <Input
                      name="user_id"
                      value={body.user_id}
                      onChange={(e) => {
                        onComponentChange(
                          body.number,
                          e.target.name,
                          e.target.value
                        );
                      }}
                      size="large"
                      placeholder="아이디 입력"
                      maxLength={10}
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
                        value={body.type_id}
                        onChange={(value) => {
                          onComponentChange(body.number, "type_id", value);
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
                        value={body.group_id}
                        onChange={(value) => {
                          onComponentChange(body.number, "group_id", value);
                        }}
                        size="large"
                        suffixIcon={<CaretDownOutlined />}
                        placeholder="그룹"
                        style={{ width: 150 }}
                      >
                        {body.type_id === "0"
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
                          : body.type_id === "1"
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
                          value={body.password}
                          onChange={(e) => {
                            onComponentChange(
                              body.number,
                              e.target.name,
                              e.target.value
                            );
                          }}
                          size="large"
                          placeholder="비밀번호 입력"
                          maxLength={15}
                          style={{ width: 250 }}
                        />
                        {body.danger_password ? (
                          <label className="danger-alert">
                            {body.short_password
                              ? "글자수가 부족합니다."
                              : "사용할 수 없는 비밀번호 입니다."}
                          </label>
                        ) : (
                          ""
                        )}
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
          );
        })}
      </>
    );
  };

  return (
    <>
      <Space direction="vertical" size={18} className="main-layout">
        {/* Page Header */}
        <Space direction="vertical" size={18}>
          <Row justify="middle">
            <Col>
              <label className="main-header-title">사용자 등록</label>
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
            {renderBodyList()}
          </Space>

          <Row justify="center" gutter={[17, 0]}>
            <Col>
              <Button
                className="white-button rounded-button"
                icon={<PlusOutlined />}
                onClick={onAddComponentClick}
                size="large"
              >
                사용자 추가하기
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
    </>
  );
}

export default Create;
