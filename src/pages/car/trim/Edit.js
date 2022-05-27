import {
  Col,
  Divider,
  Row,
  Space,
  Select,
  Button,
  Input,
  Tabs,
  Switch,
  InputNumber,
} from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { Constants } from "../../../constants/Constants";
import AlertModal from "../../../components/AlertModal";
import AlertDeleteModal from "../../../components/AlertDeleteModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addSpecificationBody,
  deleteSpecificationBody,
  setSpecificationBody,
  setTrimBody,
  removeRedirectTo,
  init,
  closeValidation,
  checkName,
  setBody,
  save,
  closeConfirm,
  showConfirm,
  remove,
  setDetailBody,
} from "../../../store/reducers/car/trim/edit";

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
    groupOptionList,
    modelOptionList,
    lineupOptionList,
    bodyInfo,
    brandBodyInfo,
    lineupBodyInfo,
    specificationBodyList,
    trimBodyList,
    specificationIdList,
    detailBodyInfo,
  } = useSelector((state) => ({
    redirectTo: state.trimEdit.redirectTo,
    validation: state.trimEdit.validation,
    confirm: state.trimEdit.confirm,
    brandOptionList: state.trimEdit.brandOptionList,
    groupOptionList: state.trimEdit.groupOptionList,
    modelOptionList: state.trimEdit.modelOptionList,
    lineupOptionList: state.trimEdit.lineupOptionList,
    bodyInfo: state.trimEdit.bodyInfo,
    brandBodyInfo: state.trimEdit.brandBodyInfo,
    lineupBodyInfo: state.trimEdit.lineupBodyInfo,
    specificationBodyList: state.trimEdit.specificationBodyList,
    trimBodyList: state.trimEdit.trimBodyList,
    specificationIdList: state.trimEdit.specificationIdList,
    detailBodyInfo: state.trimEdit.detailBodyInfo,
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
  const onAddSpecificationComponentClick = () =>
    dispatch(addSpecificationBody());
  const onChangeSpecificationComponent = (number, name, value) =>
    dispatch(setSpecificationBody(number, name, value));
  const onDeleteSpecificationComponentClick = (number) =>
    dispatch(deleteSpecificationBody(number));
  const onChangeTrimComponent = (idx, name, value) =>
    dispatch(setTrimBody(idx, name, value));
  const onDetailComponentChange = (name, value) =>
    dispatch(setDetailBody(name, value));
  const onSaveClick = (url) =>
    dispatch(
      save(
        url,
        bodyInfo,
        specificationBodyList,
        trimBodyList,
        specificationIdList
      )
    );
  const onDeleteClick = async () => dispatch(showConfirm());
  const deleteInfo = async () => dispatch(remove("/car/trim", id));

  const renderSpecificationBodyList = () => {
    return specificationBodyList.map((body, index) => (
      <Row
        gutter={[0]}
        align="middle"
        style={{ height: 80 }}
        className="table-layout"
      >
        <Col span={2} className="table-header-col-section">
          <label>
            사양 {body.number < 10 ? "0" + body.number : body.number}
          </label>
        </Col>
        <Col flex="auto" className="table-value-col-section">
          <Row>
            <Col>
              <Space size={6}>
                <Select
                  name="specification_id"
                  value={body.specification_id}
                  onChange={(value) => {
                    onChangeSpecificationComponent(
                      body.number,
                      "specification_id",
                      value
                    );
                  }}
                  size="large"
                  suffixIcon={<CaretDownOutlined />}
                  placeholder="선택"
                  style={{ width: 200 }}
                >
                  {Constants.specificationOptions.map(
                    (optionItem, optionIndex) => (
                      <Select.Option key={optionIndex} value={optionItem.value}>
                        {optionItem.label}
                      </Select.Option>
                    )
                  )}
                </Select>
                <Input
                  name="detail"
                  value={body.detail}
                  onChange={(e) => {
                    onChangeSpecificationComponent(
                      body.number,
                      e.target.name,
                      e.target.value
                    );
                  }}
                  size="large"
                  placeholder="세부 내용 입력"
                  maxLength={50}
                  style={{ width: 1050 }}
                />
              </Space>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space size={13}>
                {specificationBodyList.length == index + 1 ? (
                  <>
                    {specificationBodyList.length != 1 ? (
                      <Button
                        className="white-button"
                        onClick={() =>
                          onDeleteSpecificationComponentClick(body.number)
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
                        onAddSpecificationComponentClick(body.number)
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
                      onDeleteSpecificationComponentClick(body.number)
                    }
                    size="large"
                  >
                    삭제
                  </Button>
                )}
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    ));
  };

  const renderModelTrimBodyList = () => {
    return trimBodyList.map((body, index) => (
      <Row
        gutter={[0]}
        align="middle"
        style={{ height: 80 }}
        className="table-layout"
      >
        <Col span={2} className="table-header-col-section">
          <label>옵션 {index + 1 < 10 ? "0" + (index + 1) : index + 1}</label>
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
                    onChangeTrimComponent(
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
    ));
  };

  const renderDetailCarField = () => {
    return bodyInfo.lineup_id != null ? (
      <Space size={10}>
        <Input
          value={
            brandOptionList.filter(
              (item) => item.value === bodyInfo.brand_id
            )[0].label
          }
          size="large"
          disabled={true}
        />
        <Input
          value={
            bodyInfo.group_id != null
              ? groupOptionList.filter(
                  (item) => item.value === bodyInfo.group_id
                )[0].label
              : ""
          }
          size="large"
          disabled={true}
        />
        <Input
          value={
            bodyInfo.model_id != null
              ? modelOptionList.filter(
                  (item) => item.value === bodyInfo.model_id
                )[0].label
              : ""
          }
          size="large"
          disabled={true}
        />
        <Input
          value={
            bodyInfo.lineup_id != null
              ? lineupOptionList.filter(
                  (item) => item.value === bodyInfo.lineup_id
                )[0].label
              : ""
          }
          size="large"
          disabled={true}
        />
        <Input value={bodyInfo.trim_name} size="large" disabled={true} />
      </Space>
    ) : (
      "선택된 차량 정보가 없습니다."
    );
  };

  const renderDetailBody = () => {
    if (bodyInfo.lineup_id != null) {
      if (lineupBodyInfo.fule_kind !== "3") {
        if (brandBodyInfo.is_income === "0") {
          return (
            <Space direction="vertical" size={40}>
              <Space direction="vertical" size={20}>
                <Row gutter={[12]} align="middle">
                  <Col>
                    <label className="main-sub-title">제원</label>
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
                      <label>연료</label>
                    </Col>
                    <Col span={10} className="table-value-col-section">
                      <Input
                        value={
                          Constants.fuelTypeOptions.filter(
                            (item) => item.value === lineupBodyInfo.fule_kind
                          )[0].label
                        }
                        size="large"
                        style={{ width: 150 }}
                        disabled
                      />
                    </Col>
                    <Col span={2} className="table-header-col-section">
                      <label>연비 [km/l]</label>
                    </Col>
                    <Col flex="auto" className="table-value-col-section">
                      <InputNumber
                        name="fuel_efficiency"
                        value={
                          detailBodyInfo.fuel_efficiency
                            ? detailBodyInfo.fuel_efficiency
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("fuel_efficiency", number);
                        }}
                        size="large"
                        controls={false}
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
                      <label>베기량 [CC]</label>
                    </Col>
                    <Col span={10} className="table-value-col-section">
                      <InputNumber
                        name="amount_mowing"
                        value={
                          detailBodyInfo.amount_mowing
                            ? detailBodyInfo.amount_mowing
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("amount_mowing", number);
                        }}
                        size="large"
                        controls={false}
                        style={{ width: 150 }}
                      />
                    </Col>
                    <Col span={2} className="table-header-col-section">
                      <label>엔진형식</label>
                    </Col>
                    <Col flex="auto" className="table-value-col-section">
                      <Input
                        name="engine_type"
                        value={
                          detailBodyInfo.engine_type
                            ? detailBodyInfo.engine_type
                            : ""
                        }
                        onChange={(e) => {
                          onDetailComponentChange(
                            e.target.name,
                            e.target.value
                          );
                        }}
                        placeholder="엔진형식 입력"
                        style={{ width: 200 }}
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
                      <label>최대토크 [kg.m/rpm]</label>
                    </Col>
                    <Col span={10} className="table-value-col-section">
                      <Space size={6}>
                        <InputNumber
                          name="max_torque1"
                          value={
                            detailBodyInfo.max_torque1
                              ? detailBodyInfo.max_torque1
                              : 0
                          }
                          onChange={(number) => {
                            onDetailComponentChange("max_torque1", number);
                          }}
                          size="large"
                          controls={false}
                          style={{ width: 100 }}
                        />
                        <label>/</label>
                        <InputNumber
                          name="max_torque2"
                          value={
                            detailBodyInfo.max_torque2
                              ? detailBodyInfo.max_torque2
                              : 0
                          }
                          onChange={(number) => {
                            onDetailComponentChange("max_torque2", number);
                          }}
                          size="large"
                          controls={false}
                          style={{ width: 100 }}
                        />
                      </Space>
                    </Col>
                    <Col span={2} className="table-header-col-section">
                      <label>최고출력 [ps/rpm]</label>
                    </Col>
                    <Col flex="auto" className="table-value-col-section">
                      <Space size={6}>
                        <InputNumber
                          name="highest_output1"
                          value={
                            detailBodyInfo.highest_output1
                              ? detailBodyInfo.highest_output1
                              : 0
                          }
                          onChange={(number) => {
                            onDetailComponentChange("highest_output1", number);
                          }}
                          size="large"
                          controls={false}
                          style={{ width: 100 }}
                        />
                        <label>/</label>
                        <InputNumber
                          name="highest_output2"
                          value={
                            detailBodyInfo.highest_output2
                              ? detailBodyInfo.highest_output2
                              : 0
                          }
                          onChange={(number) => {
                            onDetailComponentChange("highest_output2", number);
                          }}
                          size="large"
                          controls={false}
                          style={{ width: 100 }}
                        />
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
                      <label>CO2배출량 [g/km]</label>
                    </Col>
                    <Col span={10} className="table-value-col-section">
                      <InputNumber
                        name="emissions_CO2"
                        value={
                          detailBodyInfo.emissions_CO2
                            ? detailBodyInfo.emissions_CO2
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("emissions_CO2", number);
                        }}
                        size="large"
                        controls={false}
                        style={{ width: 150 }}
                      />
                    </Col>
                    <Col span={2} className="table-header-col-section">
                      <label>타이어</label>
                    </Col>
                    <Col flex="auto" className="table-value-col-section">
                      <Space size={6}>
                        <InputNumber
                          name="tire1"
                          value={
                            detailBodyInfo.tire1 ? detailBodyInfo.tire1 : 0
                          }
                          onChange={(number) => {
                            onDetailComponentChange("tire1", number);
                          }}
                          size="large"
                          controls={false}
                          style={{ width: 100 }}
                        />
                        <label>/</label>
                        <InputNumber
                          name="tire2"
                          value={
                            detailBodyInfo.tire2 ? detailBodyInfo.tire2 : 0
                          }
                          onChange={(number) => {
                            onDetailComponentChange("tire2", number);
                          }}
                          size="large"
                          controls={false}
                          style={{ width: 60 }}
                        />
                        <label>R</label>
                        <InputNumber
                          name="tire3"
                          value={
                            detailBodyInfo.tire3 ? detailBodyInfo.tire3 : 0
                          }
                          onChange={(number) => {
                            onDetailComponentChange("tire3", number);
                          }}
                          size="large"
                          controls={false}
                          style={{ width: 60 }}
                        />
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
                      <label>구동방식</label>
                    </Col>
                    <Col span={10} className="table-value-col-section">
                      <Input
                        name="driving_method"
                        value={
                          detailBodyInfo.driving_method
                            ? detailBodyInfo.driving_method
                            : ""
                        }
                        onChange={(e) => {
                          onDetailComponentChange(
                            e.target.name,
                            e.target.value
                          );
                        }}
                        size="large"
                        placeholder="구동방식 입력"
                        style={{ width: 200 }}
                      />
                    </Col>
                    <Col span={2} className="table-header-col-section">
                      <label>변속기</label>
                    </Col>
                    <Col flex="auto" className="table-value-col-section">
                      <Input
                        name="gearbox"
                        value={
                          detailBodyInfo.gearbox ? detailBodyInfo.gearbox : ""
                        }
                        onChange={(e) => {
                          onDetailComponentChange(
                            e.target.name,
                            e.target.value
                          );
                        }}
                        size="large"
                        placeholder="변속기 입력"
                        style={{ width: 200 }}
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
                      <label>연료탱크 [ l ]</label>
                    </Col>
                    <Col span={10} className="table-value-col-section">
                      <InputNumber
                        name="fuel_tank"
                        value={
                          detailBodyInfo.fuel_tank
                            ? detailBodyInfo.fuel_tank
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("fuel_tank", number);
                        }}
                        size="large"
                        controls={false}
                        style={{ width: 150 }}
                      />
                    </Col>
                    <Col span={2} className="table-header-col-section">
                      <label>공차중량 [kg]</label>
                    </Col>
                    <Col flex="auto" className="table-value-col-section">
                      <InputNumber
                        name="tolerance_weight"
                        value={
                          detailBodyInfo.tolerance_weight
                            ? detailBodyInfo.tolerance_weight
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("tolerance_weight", number);
                        }}
                        size="large"
                        controls={false}
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
                      <label>승차정원 [명]</label>
                    </Col>
                    <Col flex="auto" className="table-value-col-section">
                      <InputNumber
                        name="boarding_capacity"
                        value={
                          detailBodyInfo.boarding_capacity
                            ? detailBodyInfo.boarding_capacity
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("boarding_capacity", number);
                        }}
                        size="large"
                        controls={false}
                        style={{ width: 150 }}
                      />
                    </Col>
                  </Row>
                </Space>
              </Space>
              <Space direction="vertical" size={20}>
                <Row gutter={[12]} align="middle">
                  <Col>
                    <label className="main-sub-title">크기</label>
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
                      <label>전고 [mm]</label>
                    </Col>
                    <Col span={10} className="table-value-col-section">
                      <InputNumber
                        name="whole_height"
                        value={
                          detailBodyInfo.whole_height
                            ? detailBodyInfo.whole_height
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("whole_height", number);
                        }}
                        size="large"
                        controls={false}
                        style={{ width: 150 }}
                      />
                    </Col>
                    <Col span={2} className="table-header-col-section">
                      <label>전폭 [mm]</label>
                    </Col>
                    <Col flex="auto" className="table-value-col-section">
                      <InputNumber
                        name="full_width"
                        value={
                          detailBodyInfo.full_width
                            ? detailBodyInfo.full_width
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("full_width", number);
                        }}
                        size="large"
                        controls={false}
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
                      <label>휠베이스 [mm]</label>
                    </Col>
                    <Col span={10} className="table-value-col-section">
                      <InputNumber
                        name="wheelbase"
                        value={
                          detailBodyInfo.wheelbase
                            ? detailBodyInfo.wheelbase
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("wheelbase", number);
                        }}
                        size="large"
                        controls={false}
                        style={{ width: 150 }}
                      />
                    </Col>
                    <Col span={2} className="table-header-col-section">
                      <label>전장 [mm]</label>
                    </Col>
                    <Col flex="auto" className="table-value-col-section">
                      <InputNumber
                        name="whole_length"
                        value={
                          detailBodyInfo.whole_length
                            ? detailBodyInfo.whole_length
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("whole_length", number);
                        }}
                        size="large"
                        controls={false}
                        style={{ width: 150 }}
                      />
                    </Col>
                  </Row>
                </Space>
              </Space>
            </Space>
          );
        } else {
          return (
            <Space direction="vertical" size={40}>
              <Space direction="vertical" size={20}>
                <Row gutter={[12]} align="middle">
                  <Col>
                    <label className="main-sub-title">제원</label>
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
                      <label>연료</label>
                    </Col>
                    <Col span={10} className="table-value-col-section">
                      <Input
                        value={
                          Constants.fuelTypeOptions.filter(
                            (item) => item.value === lineupBodyInfo.fule_kind
                          )[0].label
                        }
                        size="large"
                        style={{ width: 150 }}
                        disabled
                      />
                    </Col>
                    <Col span={2} className="table-header-col-section">
                      <label>연비 [km/l]</label>
                    </Col>
                    <Col flex="auto" className="table-value-col-section">
                      <InputNumber
                        name="fuel_efficiency"
                        value={
                          detailBodyInfo.fuel_efficiency
                            ? detailBodyInfo.fuel_efficiency
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("fuel_efficiency", number);
                        }}
                        size="large"
                        controls={false}
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
                      <label>베기량 [CC]</label>
                    </Col>
                    <Col span={10} className="table-value-col-section">
                      <InputNumber
                        name="amount_mowing"
                        value={
                          detailBodyInfo.amount_mowing
                            ? detailBodyInfo.amount_mowing
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("amount_mowing", number);
                        }}
                        size="large"
                        controls={false}
                        style={{ width: 150 }}
                      />
                    </Col>
                    <Col span={2} className="table-header-col-section">
                      <label>엔진형식</label>
                    </Col>
                    <Col flex="auto" className="table-value-col-section">
                      <Input
                        name="engine_type"
                        value={
                          detailBodyInfo.engine_type
                            ? detailBodyInfo.engine_type
                            : ""
                        }
                        onChange={(e) => {
                          onDetailComponentChange(
                            e.target.name,
                            e.target.value
                          );
                        }}
                        placeholder="엔진형식 입력"
                        style={{ width: 200 }}
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
                      <label>최대토크 [kg.m/rpm]</label>
                    </Col>
                    <Col span={10} className="table-value-col-section">
                      <Space size={6}>
                        <InputNumber
                          name="max_torque1"
                          value={
                            detailBodyInfo.max_torque1
                              ? detailBodyInfo.max_torque1
                              : 0
                          }
                          onChange={(number) => {
                            onDetailComponentChange("max_torque1", number);
                          }}
                          size="large"
                          controls={false}
                          style={{ width: 100 }}
                        />
                        <label>/</label>
                        <InputNumber
                          name="max_torque2"
                          value={
                            detailBodyInfo.max_torque2
                              ? detailBodyInfo.max_torque2
                              : 0
                          }
                          onChange={(number) => {
                            onDetailComponentChange("max_torque2", number);
                          }}
                          size="large"
                          controls={false}
                          style={{ width: 100 }}
                        />
                      </Space>
                    </Col>
                    <Col span={2} className="table-header-col-section">
                      <label>최고출력 [ps/rpm]</label>
                    </Col>
                    <Col flex="auto" className="table-value-col-section">
                      <Space size={6}>
                        <InputNumber
                          name="highest_output1"
                          value={
                            detailBodyInfo.highest_output1
                              ? detailBodyInfo.highest_output1
                              : 0
                          }
                          onChange={(number) => {
                            onDetailComponentChange("highest_output1", number);
                          }}
                          size="large"
                          controls={false}
                          style={{ width: 100 }}
                        />
                        <label>/</label>
                        <InputNumber
                          name="highest_output2"
                          value={
                            detailBodyInfo.highest_output2
                              ? detailBodyInfo.highest_output2
                              : 0
                          }
                          onChange={(number) => {
                            onDetailComponentChange("highest_output2", number);
                          }}
                          size="large"
                          controls={false}
                          style={{ width: 100 }}
                        />
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
                      <label>제로백 [초]</label>
                    </Col>
                    <Col span={10} className="table-value-col-section">
                      <InputNumber
                        name="zero_back"
                        value={
                          detailBodyInfo.zero_back
                            ? detailBodyInfo.zero_back
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("zero_back", number);
                        }}
                        size="large"
                        controls={false}
                        style={{ width: 150 }}
                      />
                    </Col>
                    <Col span={2} className="table-header-col-section">
                      <label>CO2배출량 [g/km]</label>
                    </Col>
                    <Col span={10} className="table-value-col-section">
                      <InputNumber
                        name="emissions_CO2"
                        value={
                          detailBodyInfo.emissions_CO2
                            ? detailBodyInfo.emissions_CO2
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("emissions_CO2", number);
                        }}
                        size="large"
                        controls={false}
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
                      <label>타이어</label>
                    </Col>
                    <Col flex="auto" className="table-value-col-section">
                      <Space size={6}>
                        <InputNumber
                          name="tire1"
                          value={
                            detailBodyInfo.tire1 ? detailBodyInfo.tire1 : 0
                          }
                          onChange={(number) => {
                            onDetailComponentChange("tire1", number);
                          }}
                          size="large"
                          controls={false}
                          style={{ width: 100 }}
                        />
                        <label>/</label>
                        <InputNumber
                          name="tire2"
                          value={
                            detailBodyInfo.tire2 ? detailBodyInfo.tire2 : 0
                          }
                          onChange={(number) => {
                            onDetailComponentChange("tire2", number);
                          }}
                          size="large"
                          controls={false}
                          style={{ width: 60 }}
                        />
                        <label>R</label>
                        <InputNumber
                          name="tire3"
                          value={
                            detailBodyInfo.tire3 ? detailBodyInfo.tire3 : 0
                          }
                          onChange={(number) => {
                            onDetailComponentChange("tire3", number);
                          }}
                          size="large"
                          controls={false}
                          style={{ width: 60 }}
                        />
                      </Space>
                    </Col>
                    <Col span={2} className="table-header-col-section">
                      <label>구동방식</label>
                    </Col>
                    <Col span={10} className="table-value-col-section">
                      <Input
                        name="driving_method"
                        value={
                          detailBodyInfo.driving_method
                            ? detailBodyInfo.driving_method
                            : ""
                        }
                        onChange={(e) => {
                          onDetailComponentChange(
                            e.target.name,
                            e.target.value
                          );
                        }}
                        size="large"
                        placeholder="구동방식 입력"
                        style={{ width: 200 }}
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
                      <label>변속기</label>
                    </Col>
                    <Col flex="auto" className="table-value-col-section">
                      <Input
                        name="gearbox"
                        value={
                          detailBodyInfo.gearbox ? detailBodyInfo.gearbox : ""
                        }
                        onChange={(e) => {
                          onDetailComponentChange(
                            e.target.name,
                            e.target.value
                          );
                        }}
                        size="large"
                        placeholder="변속기 입력"
                        style={{ width: 200 }}
                      />
                    </Col>
                    <Col span={2} className="table-header-col-section">
                      <label>연료탱크 [ l ]</label>
                    </Col>
                    <Col span={10} className="table-value-col-section">
                      <InputNumber
                        name="fuel_tank"
                        value={
                          detailBodyInfo.fuel_tank
                            ? detailBodyInfo.fuel_tank
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("fuel_tank", number);
                        }}
                        size="large"
                        controls={false}
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
                      <label>공차중량 [kg]</label>
                    </Col>
                    <Col flex="auto" className="table-value-col-section">
                      <InputNumber
                        name="tolerance_weight"
                        value={
                          detailBodyInfo.tolerance_weight
                            ? detailBodyInfo.tolerance_weight
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("tolerance_weight", number);
                        }}
                        size="large"
                        controls={false}
                        style={{ width: 150 }}
                      />
                    </Col>
                    <Col span={2} className="table-header-col-section">
                      <label>승차정원 [명]</label>
                    </Col>
                    <Col flex="auto" className="table-value-col-section">
                      <InputNumber
                        name="boarding_capacity"
                        value={
                          detailBodyInfo.boarding_capacity
                            ? detailBodyInfo.boarding_capacity
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("boarding_capacity", number);
                        }}
                        size="large"
                        controls={false}
                        style={{ width: 150 }}
                      />
                    </Col>
                  </Row>
                </Space>
              </Space>
              <Space direction="vertical" size={20}>
                <Row gutter={[12]} align="middle">
                  <Col>
                    <label className="main-sub-title">크기</label>
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
                      <label>전고 [mm]</label>
                    </Col>
                    <Col span={10} className="table-value-col-section">
                      <InputNumber
                        name="whole_height"
                        value={
                          detailBodyInfo.whole_height
                            ? detailBodyInfo.whole_height
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("whole_height", number);
                        }}
                        size="large"
                        controls={false}
                        style={{ width: 150 }}
                      />
                    </Col>
                    <Col span={2} className="table-header-col-section">
                      <label>전폭 [mm]</label>
                    </Col>
                    <Col flex="auto" className="table-value-col-section">
                      <InputNumber
                        name="full_width"
                        value={
                          detailBodyInfo.full_width
                            ? detailBodyInfo.full_width
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("full_width", number);
                        }}
                        size="large"
                        controls={false}
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
                      <label>휠베이스 [mm]</label>
                    </Col>
                    <Col span={10} className="table-value-col-section">
                      <InputNumber
                        name="wheelbase"
                        value={
                          detailBodyInfo.wheelbase
                            ? detailBodyInfo.wheelbase
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("wheelbase", number);
                        }}
                        size="large"
                        controls={false}
                        style={{ width: 150 }}
                      />
                    </Col>
                    <Col span={2} className="table-header-col-section">
                      <label>전장 [mm]</label>
                    </Col>
                    <Col flex="auto" className="table-value-col-section">
                      <InputNumber
                        name="whole_length"
                        value={
                          detailBodyInfo.whole_length
                            ? detailBodyInfo.whole_length
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("whole_length", number);
                        }}
                        size="large"
                        controls={false}
                        style={{ width: 150 }}
                      />
                    </Col>
                  </Row>
                </Space>
              </Space>
            </Space>
          );
        }
      } else {
        return (
          <Space direction="vertical" size={40}>
            <Space direction="vertical" size={20}>
              <Row gutter={[12]} align="middle">
                <Col>
                  <label className="main-sub-title">주행가능거리</label>
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
                    <label>도심 [km]</label>
                  </Col>
                  <Col span={10} className="table-value-col-section">
                    <InputNumber
                      name="center_town"
                      value={
                        detailBodyInfo.center_town
                          ? detailBodyInfo.center_town
                          : 0
                      }
                      onChange={(number) => {
                        onDetailComponentChange("center_town", number);
                      }}
                      size="large"
                      controls={false}
                      style={{ width: 150 }}
                    />
                  </Col>
                  <Col span={2} className="table-header-col-section">
                    <label>고속도로 [km]</label>
                  </Col>
                  <Col flex="auto" className="table-value-col-section">
                    <InputNumber
                      name="expressway"
                      value={
                        detailBodyInfo.expressway
                          ? detailBodyInfo.expressway
                          : 0
                      }
                      onChange={(number) => {
                        onDetailComponentChange("expressway", number);
                      }}
                      size="large"
                      controls={false}
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
                    <label>복합 [km]</label>
                  </Col>
                  <Col span={10} className="table-value-col-section">
                    <InputNumber
                      name="combined"
                      value={
                        detailBodyInfo.combined ? detailBodyInfo.combined : 0
                      }
                      onChange={(number) => {
                        onDetailComponentChange("combined", number);
                      }}
                      size="large"
                      controls={false}
                      style={{ width: 150 }}
                    />
                  </Col>
                  <Col span={2} className="table-header-col-section">
                    <label>상온 [km]</label>
                  </Col>
                  <Col flex="auto" className="table-value-col-section">
                    <InputNumber
                      name="room_temperature"
                      value={
                        detailBodyInfo.room_temperature
                          ? detailBodyInfo.room_temperature
                          : 0
                      }
                      onChange={(number) => {
                        onDetailComponentChange("room_temperature", number);
                      }}
                      size="large"
                      controls={false}
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
                    <label>저온 [km]</label>
                  </Col>
                  <Col span={10} className="table-value-col-section">
                    <Space size={6}>
                      <InputNumber
                        name="low_temperature"
                        value={
                          detailBodyInfo.low_temperature
                            ? detailBodyInfo.low_temperature
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("low_temperature", number);
                        }}
                        size="large"
                        controls={false}
                        style={{ width: 150 }}
                      />
                    </Space>
                  </Col>
                </Row>
              </Space>
            </Space>
            <Space direction="vertical" size={20}>
              <Row gutter={[12]} align="middle">
                <Col>
                  <label className="main-sub-title">충전정보</label>
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
                    <label>배터리 용량 [kWh]</label>
                  </Col>
                  <Col span={10} className="table-value-col-section">
                    <InputNumber
                      name="battery_capacity"
                      value={
                        detailBodyInfo.battery_capacity
                          ? detailBodyInfo.battery_capacity
                          : 0
                      }
                      onChange={(number) => {
                        onDetailComponentChange("battery_capacity", number);
                      }}
                      size="large"
                      controls={false}
                      style={{ width: 150 }}
                    />
                  </Col>
                  <Col span={2} className="table-header-col-section">
                    <label>충전방식</label>
                  </Col>
                  <Col flex="auto" className="table-value-col-section">
                    <Input
                      name="charging_method"
                      value={
                        detailBodyInfo.charging_method
                          ? detailBodyInfo.charging_method
                          : ""
                      }
                      onChange={(e) => {
                        onDetailComponentChange(e.target.name, e.target.value);
                      }}
                      placeholder="충전방식 입력"
                      size="large"
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
                    <label>급속충전</label>
                  </Col>
                  <Col span={10} className="table-value-col-section">
                    <Input
                      name="fast_charging"
                      value={
                        detailBodyInfo.fast_charging
                          ? detailBodyInfo.fast_charging
                          : ""
                      }
                      onChange={(e) => {
                        onDetailComponentChange(e.target.name, e.target.value);
                      }}
                      placeholder="충전방식 입력"
                      size="large"
                      style={{ width: 400 }}
                    />
                  </Col>
                  <Col span={2} className="table-header-col-section">
                    <label>완속충전</label>
                  </Col>
                  <Col flex="auto" className="table-value-col-section">
                    <Input
                      name="slow_charging"
                      value={
                        detailBodyInfo.slow_charging
                          ? detailBodyInfo.slow_charging
                          : ""
                      }
                      onChange={(e) => {
                        onDetailComponentChange(e.target.name, e.target.value);
                      }}
                      placeholder="충전방식 입력"
                      size="large"
                      style={{ width: 400 }}
                    />
                  </Col>
                </Row>
              </Space>
            </Space>
            <Space direction="vertical" size={20}>
              <Row gutter={[12]} align="middle">
                <Col>
                  <label className="main-sub-title">제원</label>
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
                    <label>구동방식</label>
                  </Col>
                  <Col span={10} className="table-value-col-section">
                    <Input
                      name="driving_method"
                      value={
                        detailBodyInfo.driving_method
                          ? detailBodyInfo.driving_method
                          : ""
                      }
                      onChange={(e) => {
                        onDetailComponentChange(e.target.name, e.target.value);
                      }}
                      placeholder="구동방식 입력"
                      size="large"
                      style={{ width: 200 }}
                    />
                  </Col>
                  <Col span={2} className="table-header-col-section">
                    <label>최대속도 [km/h]</label>
                  </Col>
                  <Col flex="auto" className="table-value-col-section">
                    <InputNumber
                      name="max_speed"
                      value={
                        detailBodyInfo.max_speed ? detailBodyInfo.max_speed : 0
                      }
                      onChange={(number) => {
                        onDetailComponentChange("max_speed", number);
                      }}
                      size="large"
                      controls={false}
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
                    <label>최고출력 [ps/rpm]</label>
                  </Col>
                  <Col span={10} className="table-value-col-section">
                    <Space size={6}>
                      <InputNumber
                        name="highest_output1"
                        value={
                          detailBodyInfo.highest_output1
                            ? detailBodyInfo.highest_output1
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("highest_output1", number);
                        }}
                        size="large"
                        controls={false}
                        style={{ width: 100 }}
                      />
                      <label>/</label>
                      <InputNumber
                        name="highest_output2"
                        value={
                          detailBodyInfo.highest_output2
                            ? detailBodyInfo.highest_output2
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("highest_output2", number);
                        }}
                        size="large"
                        controls={false}
                        style={{ width: 100 }}
                      />
                    </Space>
                  </Col>
                  <Col span={2} className="table-header-col-section">
                    <label>최대토크 [kg.m/rpm]</label>
                  </Col>
                  <Col flex="auto" className="table-value-col-section">
                    <Space size={6}>
                      <InputNumber
                        name="max_torque1"
                        value={
                          detailBodyInfo.max_torque1
                            ? detailBodyInfo.max_torque1
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("max_torque1", number);
                        }}
                        size="large"
                        controls={false}
                        style={{ width: 100 }}
                      />
                      <label>/</label>
                      <InputNumber
                        name="max_torque2"
                        value={
                          detailBodyInfo.max_torque2
                            ? detailBodyInfo.max_torque2
                            : 0
                        }
                        onChange={(number) => {
                          onDetailComponentChange("max_torque2", number);
                        }}
                        size="large"
                        controls={false}
                        style={{ width: 100 }}
                      />
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
                    <label>제로백 [초]</label>
                  </Col>
                  <Col span={10} className="table-value-col-section">
                    <InputNumber
                      name="zero_back"
                      value={
                        detailBodyInfo.zero_back ? detailBodyInfo.zero_back : 0
                      }
                      onChange={(number) => {
                        onDetailComponentChange("zero_back", number);
                      }}
                      size="large"
                      controls={false}
                      style={{ width: 150 }}
                    />
                  </Col>
                </Row>
              </Space>
            </Space>
          </Space>
        );
      }
    }
  };

  return (
    <>
      <Space direction="vertical" size={18} className="main-layout">
        {/* Page Header */}
        <Space direction="vertical" size={18}>
          <Row justify="middle">
            <Col>
              <label className="main-header-title">트림 수정</label>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space size={10}>
                <Link to="/car/trim">
                  <Button className="white-button" size="large">
                    취소
                  </Button>
                </Link>
                <Button
                  className="black-button"
                  size="large"
                  onClick={() => onSaveClick("/car/trim")}
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
            <TabPane tab="상세가격표" key="1">
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
                        <Space size={6}>
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
                              .filter(
                                (item) => item.brand_id === bodyInfo.brand_id
                              )
                              .map((optionItem, optionIndex) => (
                                <Select.Option
                                  key={optionIndex}
                                  value={optionItem.value}
                                >
                                  {optionItem.label}
                                </Select.Option>
                              ))}
                          </Select>
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
                              .filter(
                                (item) => item.group_id === bodyInfo.group_id
                              )
                              .map((optionItem, optionIndex) => (
                                <Select.Option
                                  key={optionIndex}
                                  value={optionItem.value}
                                >
                                  {optionItem.label}
                                </Select.Option>
                              ))}
                          </Select>
                          <Select
                            name="lineup_id"
                            value={bodyInfo.lineup_id}
                            onChange={(value) => {
                              onComponentChange("lineup_id", value);
                            }}
                            size="large"
                            suffixIcon={<CaretDownOutlined />}
                            placeholder="라인업 선택"
                            style={{ width: 400 }}
                          >
                            {lineupOptionList
                              .filter(
                                (item) => item.model_id === bodyInfo.model_id
                              )
                              .map((optionItem, optionIndex) => (
                                <Select.Option
                                  key={optionIndex}
                                  value={optionItem.value}
                                >
                                  {optionItem.label}
                                </Select.Option>
                              ))}
                          </Select>
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
                        <label>트림</label>
                      </Col>
                      <Col span={10} className="table-value-col-section">
                        <Space>
                          <div style={{ position: "relative" }}>
                            <Input
                              name="trim_name"
                              value={bodyInfo.trim_name}
                              onChange={(e) => {
                                onComponentChange(
                                  e.target.name,
                                  e.target.value
                                );
                              }}
                              size="large"
                              placeholder="트림명 입력"
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
                            onClick={() => onCheckNameClick(bodyInfo.trim_name)}
                            size="large"
                          >
                            확인
                          </Button>
                        </Space>
                      </Col>
                      <Col span={2} className="table-header-col-section">
                        <label>변속기</label>
                      </Col>
                      <Col flex="auto" className="table-value-col-section">
                        <Select
                          name="gearbox_type"
                          value={bodyInfo.gearbox_type}
                          onChange={(value) => {
                            onComponentChange("gearbox_type", value);
                          }}
                          size="large"
                          suffixIcon={<CaretDownOutlined />}
                          placeholder="선택"
                          style={{ width: 150 }}
                        >
                          {Constants.gearBoxTypeOptions.map(
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
                        <label>가격</label>
                      </Col>
                      <Col span={10} className="table-value-col-section">
                        <InputNumber
                          name="price"
                          value={bodyInfo.price}
                          onChange={(number) => {
                            onComponentChange("price", number);
                          }}
                          size="large"
                          controls={false}
                          maxLength={9}
                          style={{ width: 150 }}
                        />
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
                      <label className="main-sub-title">사양</label>
                    </Col>
                    <Col flex="auto" />
                  </Row>
                  <Space direction="vertical" size={0}>
                    {renderSpecificationBodyList()}
                  </Space>
                </Space>
                <Space direction="vertical" size={20}>
                  <Row align="middle">
                    <Col>
                      <label className="main-sub-title">트림 옵션</label>
                    </Col>
                    <Col flex="auto" />
                  </Row>
                  <Space direction="vertical" size={0}>
                    {renderModelTrimBodyList()}
                  </Space>
                </Space>
              </Space>
            </TabPane>
            <TabPane tab="제원ㆍ사양/옵션" key="2">
              <Space direction="vertical" size={40}>
                <Space direction="vertical" size={20}>
                  <Row align="middle">
                    <Col>
                      <label className="main-sub-title">차량</label>
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
                        <label>모델정보</label>
                      </Col>
                      <Col flex="auto" className="table-value-col-section">
                        {renderDetailCarField()}
                      </Col>
                    </Row>
                  </Space>
                </Space>
                {renderDetailBody()}
              </Space>
            </TabPane>
          </Tabs>

          <Row justify="center" gutter={[17, 0]}>
            <Col>
              <Button
                className="white-button rounded-button"
                onClick={() => onDeleteClick()}
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
