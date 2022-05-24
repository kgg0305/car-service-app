import { Col, Divider, Row, Space, Select, Button, Input, Switch } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Constants } from "../../../constants/Constants";
import AlertModal from "../../../components/AlertModal";
import { useDispatch, useSelector } from "react-redux";
import {
  closeValidation,
  checkName,
  init,
  setBody,
  removeRedirectTo,
  save,
  setLineupBody,
  setColorBody,
} from "../../../store/reducers/car/lineup/create";

const { Option } = Select;

// 등록페지
function Create() {
  let navigate = useNavigate();

  const {
    redirectTo,
    validation,
    brandOptionList,
    groupOptionList,
    modelOptionList,
    bodyInfo,
    lineupBodyList,
    colorBodyList,
  } = useSelector((state) => ({
    redirectTo: state.lineupCreate.redirectTo,
    validation: state.lineupCreate.validation,
    brandOptionList: state.lineupCreate.brandOptionList,
    groupOptionList: state.lineupCreate.groupOptionList,
    modelOptionList: state.lineupCreate.modelOptionList,
    bodyInfo: state.lineupCreate.bodyInfo,
    lineupBodyList: state.lineupCreate.lineupBodyList,
    colorBodyList: state.lineupCreate.colorBodyList,
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
  const onComponentChange = (name, value) => dispatch(setBody(name, value));
  const onChangeLineupComponent = (idx, name, value) =>
    dispatch(setLineupBody(idx, name, value));
  const onChangeColorComponent = (idx, name, value) =>
    dispatch(setColorBody(idx, name, value));
  const onSaveClick = (url) =>
    dispatch(save(url, bodyInfo, lineupBodyList, colorBodyList));

  const renderModelLineupBodyList = () => {
    return lineupBodyList.length > 0
      ? lineupBodyList.map((body, index) => (
          <Row
            gutter={[0]}
            align="middle"
            style={{ height: 80 }}
            className="table-layout"
          >
            <Col span={2} className="table-header-col-section">
              <label>
                공통옵션 {index + 1 < 10 ? "0" + (index + 1) : index + 1}
              </label>
            </Col>
            <Col flex="auto" className="table-value-col-section">
              <Row>
                <Col>
                  <Space size={6}>
                    <Input
                      value={body.name}
                      readOnly={true}
                      size="large"
                      style={{ width: 300 }}
                    />
                    <Input
                      value={body.price}
                      readOnly={true}
                      size="large"
                      style={{ width: 200 }}
                    />
                    <Input
                      value={body.detail}
                      readOnly={true}
                      size="large"
                      style={{ width: 700 }}
                    />
                  </Space>
                </Col>
                <Col flex="auto" />
                <Col>
                  <Space size={11}>
                    <Switch
                      checked={body.is_use === "0" ? false : true}
                      onClick={(checked) =>
                        onChangeLineupComponent(
                          body.idx,
                          "is_use",
                          checked ? "1" : "0"
                        )
                      }
                    />
                    <label className="switch-label">
                      {
                        Constants.availableOptions.filter(
                          (item) => item.value === body.is_use
                        )[0].label
                      }
                    </label>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        ))
      : "선택된 정보가 없습니다.";
  };

  const renderModelColorBodyList = () => {
    return colorBodyList.length > 0
      ? colorBodyList.map((body, index) => (
          <Row
            gutter={[0]}
            align="middle"
            style={{ height: 80 }}
            className="table-layout"
          >
            <Col span={2} className="table-header-col-section">
              <label>
                색상 {index + 1 < 10 ? "0" + (index + 1) : index + 1}
              </label>
            </Col>
            <Col flex="auto" className="table-value-col-section">
              <Row>
                <Col>
                  <Space size={6}>
                    <Input
                      value={body.name}
                      readOnly={true}
                      size="large"
                      style={{ width: 300 }}
                    />
                    <Input
                      value={body.price}
                      readOnly={true}
                      size="large"
                      style={{ width: 200 }}
                    />
                  </Space>
                </Col>
                <Col flex="auto" />
                <Col>
                  <Space size={11}>
                    <Switch
                      checked={body.is_use === "0" ? false : true}
                      onClick={(checked) =>
                        onChangeColorComponent(
                          body.idx,
                          "is_use",
                          checked ? "1" : "0"
                        )
                      }
                    />
                    <label className="switch-label">
                      {
                        Constants.availableOptions.filter(
                          (item) => item.value === body.is_use
                        )[0].label
                      }
                    </label>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        ))
      : "선택된 정보가 없습니다.";
  };

  return (
    <>
      <Space direction="vertical" size={18} className="main-layout">
        {/* Page Header */}
        <Space direction="vertical" size={18}>
          <Row justify="middle">
            <Col>
              <label className="main-header-title">라인업 등록</label>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space size={10}>
                <Link to="/car/lineup">
                  <Button className="white-button" size="large">
                    취소
                  </Button>
                </Link>
                <Button
                  className="white-button"
                  size="large"
                  onClick={() => onSaveClick("/car/lineup")}
                >
                  저장하고 나가기
                </Button>

                <Button
                  className="black-button"
                  size="large"
                  onClick={() => onSaveClick("/car/trim")}
                >
                  저장하고 트림 등록하기
                </Button>
              </Space>
            </Col>
          </Row>
          <Divider className="main-body-divider" />
        </Space>

        {/* Body Section */}
        <Space direction="vertical" size={20} style={{ paddingBottom: 117 }}>
          <Space direction="vertical" size={40}>
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
                      style={{ width: 300 }}
                    >
                      {groupOptionList
                        .filter((item) => item.brand_id === bodyInfo.brand_id)
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
                  <Col flex="auto" className="table-value-col-section">
                    <Select
                      name="model_id"
                      value={bodyInfo.model_id}
                      onChange={(value) => {
                        onComponentChange("model_id", value);
                      }}
                      size="large"
                      suffixIcon={<CaretDownOutlined />}
                      placeholder="모델 선택"
                      style={{ width: 300 }}
                    >
                      {modelOptionList
                        .filter((item) => item.group_id === bodyInfo.group_id)
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
                </Row>
                <Row
                  gutter={[0]}
                  align="middle"
                  style={{ height: 80 }}
                  className="table-layout"
                >
                  <Col span={2} className="table-header-col-section">
                    <label>라인업</label>
                  </Col>
                  <Col span={10} className="table-value-col-section">
                    <Space>
                      <div style={{ position: "relative" }}>
                        <Input
                          name="lineup_name"
                          value={bodyInfo.lineup_name}
                          onChange={(e) => {
                            onComponentChange(e.target.name, e.target.value);
                          }}
                          size="large"
                          placeholder="라인업 입력"
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
                        className="black-button"
                        onClick={() => onCheckNameClick(bodyInfo.lineup_name)}
                        size="large"
                      >
                        확인
                      </Button>
                    </Space>
                  </Col>
                  <Col span={2} className="table-header-col-section">
                    <label>연료</label>
                  </Col>
                  <Col flex="auto" className="table-value-col-section">
                    <Select
                      name="fule_kind"
                      value={bodyInfo.fule_kind}
                      onChange={(value) => {
                        onComponentChange("fule_kind", value);
                      }}
                      size="large"
                      suffixIcon={<CaretDownOutlined />}
                      placeholder="선택"
                      style={{ width: 150 }}
                    >
                      {Constants.fuelTypeOptions.map(
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
                  style={{ height: 80 }}
                  className="table-layout"
                >
                  <Col span={2} className="table-header-col-section">
                    <label>연식</label>
                  </Col>
                  <Col span={10} className="table-value-col-section">
                    <Space>
                      <Input
                        name="year_type"
                        value={bodyInfo.year_type}
                        onChange={(e) => {
                          onComponentChange(e.target.name, e.target.value);
                        }}
                        size="large"
                        maxLength={6}
                        style={{ width: 150 }}
                      />
                    </Space>
                  </Col>
                  <Col span={2} className="table-header-col-section">
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
                      defaultValue="true"
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
            <Space direction="vertical" size={20}>
              <Row align="middle">
                <Col>
                  <label className="main-sub-title">
                    모델/라인업 공통 옵션 (튜닝/액세서리)
                  </label>
                </Col>
                <Col flex="auto" />
              </Row>
              {renderModelLineupBodyList()}
            </Space>
            <Space direction="vertical" size={20}>
              <Row align="middle">
                <Col>
                  <label className="main-sub-title">
                    모델/라인업 색상 (견적 메뉴에서만 노출)
                  </label>
                </Col>
                <Col flex="auto" />
              </Row>
              {renderModelColorBodyList()}
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
