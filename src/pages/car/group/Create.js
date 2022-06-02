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
} from "../../../store/reducers/car/group/create";

const { Option } = Select;

// 등록페지
function Create() {
  let navigate = useNavigate();

  const {
    redirectTo,
    validation,
    brandOptionList,
    carKindOptionList,
    bodyList,
  } = useSelector((state) => ({
    redirectTo: state.groupCreate.redirectTo,
    validation: state.groupCreate.validation,
    brandOptionList: state.groupCreate.brandOptionList,
    carKindOptionList: state.groupCreate.carKindOptionList,
    bodyList: state.groupCreate.bodyList,
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
  const onSaveClick = (url) => dispatch(save(url));

  const renderBodyList = () => {
    return (
      <>
        {bodyList.map((body, index) => {
          return (
            <Space direction="vertical" size={20} key={index}>
              <Row align="middle">
                <Col>
                  <label className="detail-sub-title">
                    정보 {body.number < 10 ? "0" + body.number : body.number}
                  </label>
                </Col>
                <Col flex="auto" />
                <Col>
                  {bodyList.length > 1 ? (
                    <Button
                      className="white-button big-button delete-body-detail-button"
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
                  className="detail-table-layout"
                >
                  <Col flex="154px" className="table-header-col-section">
                    <label>브랜드</label>
                  </Col>
                  <Col flex="636px" className="table-value-col-section">
                    <Select
                      name="brand_id"
                      value={body.brand_id}
                      onChange={(value) => {
                        onComponentChange(body.number, "brand_id", value);
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
                          value={body.group_name}
                          onChange={(e) => {
                            onComponentChange(
                              body.number,
                              e.target.name,
                              e.target.value
                            );
                          }}
                          size="large"
                          placeholder="모델 그룹명 입력"
                          maxLength={15}
                          style={{ width: 400 }}
                        />
                        {body.check_name == "exist" ? (
                          <label className="danger-alert">
                            이미 사용중인 이름 입니다.
                          </label>
                        ) : body.check_name == "not-exist" ? (
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
                          onCheckNameClick(body.number, body.group_name)
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
                    <label>차종</label>
                  </Col>
                  <Col flex="636px" className="table-value-col-section">
                    <Select
                      name="car_kind_id"
                      value={body.car_kind_id}
                      onChange={(value) => {
                        onComponentChange(body.number, "car_kind_id", value);
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
                      value={body.is_use}
                      onChange={(value) => {
                        onComponentChange(body.number, "is_use", value);
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
          );
        })}
      </>
    );
  };

  return (
    <>
      <Space direction="vertical" size={18} className="main-layout">
        {/* Page Header */}
        <Space direction="vertical" size={11}>
          <Row justify="middle">
            <Col>
              <label className="main-header-title">모델그룹 등록</label>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space size={10}>
                <Link to="/car/group">
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
                  onClick={() => onSaveClick("/car/group")}
                >
                  저장하고 나가기
                </Button>

                <Button
                  className="black-button save-goto-detail-button"
                  size="large"
                  onClick={() => onSaveClick("/car/model/create")}
                >
                  저장하고 모델 등록하기
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
            {renderBodyList()}
          </Space>

          <Row justify="center" gutter={[17, 0]}>
            <Col>
              <Button
                className="white-button rounded-button add-body-detail-button"
                icon={<PlusOutlined />}
                onClick={onAddComponentClick}
              >
                그룹 추가하기
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
