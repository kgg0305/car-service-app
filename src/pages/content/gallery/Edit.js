import { Col, Divider, Row, Space, Select, Button, Image } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import preview_default_image from "../../../assets/images/preview-default-image.png";
import AlertModal from "../../../components/AlertModal";
import { useDispatch, useSelector } from "react-redux";
import {
  init,
  save,
  setBody,
  closeValidation,
  removeRedirectTo,
  closeConfirm,
  showConfirm,
  remove,
} from "../../../store/reducers/content/gallery/edit";

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
    brandOptionList,
    groupOptionList,
    modelOptionList,
    modelBodyInfo,
  } = useSelector((state) => ({
    redirectTo: state.galleryEdit.redirectTo,
    validation: state.galleryEdit.validation,
    confirm: state.galleryEdit.confirm,
    bodyInfo: state.galleryEdit.bodyInfo,
    brandOptionList: state.galleryEdit.brandOptionList,
    groupOptionList: state.galleryEdit.groupOptionList,
    modelOptionList: state.galleryEdit.modelOptionList,
    modelBodyInfo: state.galleryEdit.modelBodyInfo,
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
  const onPictureClick = (picture_index) =>
    dispatch(setBody("picture_index", picture_index));
  const onSaveClick = () => dispatch(save("/content/gallery"));
  const onDeleteClick = async () => dispatch(showConfirm());
  const deleteInfo = async () => dispatch(remove("/content/gallery", id));

  const renderPictureList = () => {
    const image_path_array = [
      modelBodyInfo.picture_1,
      modelBodyInfo.picture_2,
      modelBodyInfo.picture_3,
      modelBodyInfo.picture_4,
      modelBodyInfo.picture_5,
      modelBodyInfo.picture_6,
      modelBodyInfo.picture_7,
      modelBodyInfo.picture_8,
    ];
    return bodyInfo.model_id !== null ? (
      image_path_array.map((path, index) => (
        <Col style={{ textAlign: "center" }}>
          <Space direction="vertical" size={5}>
            <label>사진 {index + 1 < 10 ? "0" + (index + 1) : index + 1}</label>
            <div
              className={
                bodyInfo.picture_index === index + 1
                  ? "edit-image picture-selected"
                  : "edit-image image-upload"
              }
            >
              <Image
                src={
                  path === ""
                    ? preview_default_image
                    : window.location.origin + "/uploads/model/" + path
                }
              />
            </div>
            <Button
              className="black-button gallery-select-button"
              size="large"
              onClick={() => onPictureClick(index + 1)}
            >
              선택
            </Button>
          </Space>
        </Col>
      ))
    ) : (
      <label className="gallery-no-result">선택된 차량 정보가 없습니다.</label>
    );
  };

  return (
    <>
      <Space direction="vertical" size={18} className="main-layout">
        {/* Page Header */}
        <Space direction="vertical" size={11}>
          <Row justify="middle">
            <Col>
              <label className="main-header-title">포토갤러리 수정</label>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space size={10}>
                <Link to="/content/gallery">
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
                    <label>차량검색</label>
                  </Col>
                  <Col flex="auto" className="table-value-col-section">
                    <Space size={6}>
                      <Select
                        name="brand_id"
                        value={bodyInfo.brand_id}
                        onChange={(value) => {
                          onComponentChange("brand_id", value);
                        }}
                        suffixIcon={<CaretDownOutlined />}
                        placeholder="브랜드 선택"
                        size="large"
                        style={{ width: 250 }}
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
                        suffixIcon={<CaretDownOutlined />}
                        placeholder="모델그룹 선택"
                        size="large"
                        style={{ width: 250 }}
                      >
                        {groupOptionList
                          .filter((item) => item.brand_id == bodyInfo.brand_id)
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
                        suffixIcon={<CaretDownOutlined />}
                        placeholder="모델 선택"
                        size="large"
                        style={{ width: 250 }}
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
                    </Space>
                  </Col>
                </Row>
                <Row
                  gutter={[0]}
                  align="middle"
                  style={{ height: 275 }}
                  className="detail-table-layout"
                >
                  <Col flex="154px" className="table-header-col-section">
                    <label>사진</label>
                  </Col>
                  <Col flex="auto" className="table-value-col-section">
                    <Row gutter={[10]}>{renderPictureList()}</Row>
                  </Col>
                </Row>
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

export default Edit;
