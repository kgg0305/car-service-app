import {
  Col,
  Divider,
  Row,
  Space,
  Select,
  Button,
  Input,
  Image,
  Upload,
  InputNumber,
} from "antd";
import { CaretDownOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import styles from "../../../assets/styles/pages/car/brand/Create.module.css";
import { Constants } from "../../../constants/Constants";
import AlertModal from "../../../components/AlertModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addBody,
  deleteBody,
  init,
  preview,
  save,
  setBody,
  deleteLogo,
  closeValidation,
  checkName,
  removeRedirectTo,
} from "../../../store/reducers/car/brand/create";

const { Option } = Select;

// 등록페지
function Create() {
  let navigate = useNavigate();

  const { redirectTo, validation, bodyList } = useSelector((state) => ({
    redirectTo: state.brandCreate.redirectTo,
    validation: state.brandCreate.validation,
    bodyList: state.brandCreate.bodyList,
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
  const onPreviewChange = (number, file) => dispatch(preview(number, file));
  const onAddComponentClick = () => dispatch(addBody());
  const onDeleteComponentClick = (number) => dispatch(deleteBody(number));
  const onComponentChange = (number, name, value) =>
    dispatch(setBody(number, name, value));
  const onLogoDeleteClick = (number) => dispatch(deleteLogo(number));
  const onSaveClick = (url) => dispatch(save(url));

  const renderBodyList = () => {
    return bodyList.map((body, index) => {
      return (
        <Space direction="vertical" size={8} key={index}>
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
                ""
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
                <Space>
                  <div style={{ position: "relative" }}>
                    <Input
                      name="brand_name"
                      value={body.brand_name}
                      onChange={(e) => {
                        onComponentChange(
                          body.number,
                          e.target.name,
                          e.target.value
                        );
                      }}
                      size="large"
                      placeholder="브랜드 입력"
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
                      onCheckNameClick(body.number, body.brand_name)
                    }
                    size="large"
                  >
                    확인
                  </Button>
                </Space>
              </Col>
              <Col flex="154px" className="table-header-col-section">
                <label>순서</label>
              </Col>
              <Col flex="auto" className="table-value-col-section">
                <Space>
                  <InputNumber
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    name="sequence"
                    value={body.sequence}
                    onChange={(number) => {
                      onComponentChange(body.number, "sequence", number);
                    }}
                    size="large"
                    maxLength={6}
                    style={{ width: 150 }}
                    controls={false}
                  />
                  <label className="order-description-label">
                    숫자가 낮을수록 먼저 노출이 됩니다.
                  </label>
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
                <label>국가</label>
              </Col>
              <Col flex="241px" className="table-value-col-section">
                <Select
                  name="nation"
                  value={body.nation}
                  onChange={(value) => {
                    onComponentChange(body.number, "nation", value);
                  }}
                  size="large"
                  suffixIcon={<CaretDownOutlined />}
                  placeholder="선택"
                  style={{ width: 150 }}
                >
                  {Constants.nationOptions.map((optionItem, optionIndex) => (
                    <Select.Option key={optionIndex} value={optionItem.value}>
                      {optionItem.label}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
              <Col flex="154px" className="table-header-col-section">
                <label>수입여부</label>
              </Col>
              <Col flex="241px" className="table-value-col-section">
                <Select
                  name="is_income"
                  value={body.is_income}
                  onChange={(value) => {
                    onComponentChange(body.number, "is_income", value);
                  }}
                  size="large"
                  suffixIcon={<CaretDownOutlined />}
                  placeholder="선택"
                  style={{ width: 150 }}
                >
                  {Constants.incomeOptions.map((optionItem, optionIndex) => (
                    <Select.Option key={optionIndex} value={optionItem.value}>
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
                  defaultValue="true"
                  style={{ width: 150 }}
                >
                  {Constants.availableOptions.map((optionItem, optionIndex) => (
                    <Select.Option key={optionIndex} value={optionItem.value}>
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
              className="detail-table-layout"
            >
              <Col flex="154px" className="table-header-col-section">
                <label>공식사이트</label>
              </Col>
              <Col flex="636px" className="table-value-col-section">
                <Input
                  name="public_uri"
                  value={body.public_uri}
                  onChange={(e) => {
                    onComponentChange(
                      body.number,
                      e.target.name,
                      e.target.value
                    );
                  }}
                  size="large"
                  placeholder="URL 입력"
                  style={{ width: 400 }}
                />
              </Col>
              <Col flex="154px" className="table-header-col-section">
                <label>전시장 안내</label>
              </Col>
              <Col flex="auto" className="table-value-col-section">
                <Input
                  name="room_uri"
                  value={body.room_uri}
                  onChange={(e) => {
                    onComponentChange(
                      body.number,
                      e.target.name,
                      e.target.value
                    );
                  }}
                  size="large"
                  placeholder="URL 입력"
                  style={{ width: 400 }}
                />
              </Col>
            </Row>
            <Row
              gutter={[0]}
              align="middle"
              style={{ height: 80 }}
              className="detail-table-layout"
            >
              <Col flex="154px" className="table-header-col-section">
                <label>서비스 센터</label>
              </Col>
              <Col flex="636px" className="table-value-col-section">
                <Input
                  name="service_uri"
                  value={body.service_uri}
                  onChange={(e) => {
                    onComponentChange(
                      body.number,
                      e.target.name,
                      e.target.value
                    );
                  }}
                  size="large"
                  placeholder="URL 입력"
                  style={{ width: 400 }}
                />
              </Col>
              <Col flex="154px" className="table-header-col-section">
                <label>보증금 안내</label>
              </Col>
              <Col flex="auto" className="table-value-col-section">
                <Input
                  name="deposit_uri"
                  value={body.deposit_uri}
                  onChange={(e) => {
                    onComponentChange(
                      body.number,
                      e.target.name,
                      e.target.value
                    );
                  }}
                  size="large"
                  placeholder="URL 입력"
                  style={{ width: 400 }}
                />
              </Col>
            </Row>
            <Row
              gutter={[0]}
              align="middle"
              style={{ height: 174 }}
              className="detail-table-layout"
            >
              <Col flex="154px" className="table-header-col-section">
                <label>로고</label>
              </Col>
              <Col flex="auto" className="table-value-col-section">
                <Space direction="horizontal" align="end" size={20}>
                  <Image
                    src={body.preview}
                    width={150}
                    height={150}
                    className="image-upload"
                  />
                  <Space direction="vertical" size={34}>
                    <label className={styles.logoDescriptionLabel}>
                      이미지 권장 크기는 90 * 60이며, *.png로 등록하셔야 합니다.{" "}
                      <br />
                      이미지를 새로 등록 하기 위해선 등록된 이미지 [삭제]후 재
                      등록 하시면 됩니다.
                    </label>
                    {body.logo.uid.includes("__AUTO__") ? (
                      <Upload
                        accept=".png"
                        fileList={[body.logo]}
                        name="logo"
                        showUploadList={false}
                        onChange={(info) => {
                          onPreviewChange(body.number, info.file);
                        }}
                        beforeUpload={(file) => {
                          onComponentChange(body.number, "logo", file);
                          return true;
                        }}
                      >
                        <Button
                          className="black-button upload-image-detail-button"
                          size="large"
                        >
                          등록
                        </Button>
                      </Upload>
                    ) : (
                      <Button
                        className="black-button upload-image-detail-button"
                        size="large"
                        onClick={() => onLogoDeleteClick(body.number)}
                      >
                        삭제
                      </Button>
                    )}
                  </Space>
                </Space>
              </Col>
            </Row>
          </Space>
        </Space>
      );
    });
  };

  return (
    <>
      <Space direction="vertical" size={18} className="main-layout">
        {/* Page Header */}
        <Space direction="vertical" size={11}>
          <Row justify="top">
            <Col>
              <label className="main-header-title">브랜드 등록</label>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space size={10}>
                <Link to="/car/brand">
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
                  onClick={() => onSaveClick("/car/brand")}
                >
                  저장하고 나가기
                </Button>

                <Button
                  className="black-button save-goto-detail-button"
                  size="large"
                  onClick={() => onSaveClick("/car/group/create")}
                >
                  저장하고 모델그룹 등록하기
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
                size="large"
              >
                브랜드 추가하기
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
