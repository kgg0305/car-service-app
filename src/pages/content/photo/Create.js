import { Col, Divider, Row, Space, Select, Button, Input } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Constants } from "../../../constants/Constants";
import AlertModal from "../../../components/AlertModal";
import { useDispatch, useSelector } from "react-redux";
import {
  init,
  save,
  setBody,
  closeValidation,
  removeRedirectTo,
  addContent,
  deleteContent,
  moveUp,
  moveDown,
  setContent,
} from "../../../store/reducers/content/photo/create";

const { Option } = Select;

// 등록페지
function Create() {
  let navigate = useNavigate();

  const { redirectTo, validation, bodyInfo, contentBodyList } = useSelector(
    (state) => ({
      redirectTo: state.photoCreate.redirectTo,
      validation: state.photoCreate.validation,
      bodyInfo: state.photoCreate.bodyInfo,
      contentBodyList: state.photoCreate.contentBodyList,
    })
  );

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
  const onAddContentComponentClick = () => dispatch(addContent());
  const onContentComponentChange = (number, name, value) =>
    dispatch(setContent(number, name, value));
  const onDeleteContentComponentClick = (number) =>
    dispatch(deleteContent(number));
  const onComponentChange = (name, value) => dispatch(setBody(name, value));
  const onUpMoveClick = (index) => dispatch(moveUp(index, contentBodyList));
  const onDownMoveClick = (index) => dispatch(moveDown(index, contentBodyList));
  const onSaveClick = () =>
    dispatch(save("/content/photo", bodyInfo, contentBodyList));

  const renderContentBodyList = () => {
    return contentBodyList.map((body, index) => (
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
            style={{ paddingLeft: 18, width: "100%" }}
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
            <Input
              name="idx"
              value={body.idx}
              onChange={(e) => {
                onContentComponentChange(
                  body.number,
                  e.target.name,
                  e.target.value
                );
              }}
              size="large"
              placeholder="콘텐츠 번호 또는 줌 자동차 뉴스의 URL 입력"
              style={{ width: 500 }}
            />
            <Input
              name="title"
              value={body.title}
              size="large"
              readOnly={true}
              style={{ width: 740 }}
            />
          </Space>
        </Col>
        <Col className="table-value-col-section">
          <Space size={13}>
            {contentBodyList.length == index + 1 ? (
              <>
                {contentBodyList.length != 1 ? (
                  <Button
                    className="white-button detail-delete-body-button"
                    onClick={() => onDeleteContentComponentClick(body.number)}
                    size="large"
                  >
                    삭제
                  </Button>
                ) : (
                  ""
                )}
                <Button
                  className="black-button detail-add-body-button"
                  onClick={() => onAddContentComponentClick(body.number)}
                  size="large"
                >
                  추가
                </Button>
              </>
            ) : (
              <Button
                className="white-button detail-delete-body-button"
                onClick={() => onDeleteContentComponentClick(body.number)}
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
      <Space direction="vertical" size={18} className="main-layout">
        {/* Page Header */}
        <Space direction="vertical" size={11}>
          <Row justify="middle">
            <Col>
              <label className="main-header-title">포토뉴스 등록</label>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space size={10}>
                <Link to="/content/photo">
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
          <Space direction="vertical" size={59}>
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
                    <label>카테고리</label>
                  </Col>
                  <Col flex="635px" className="table-value-col-section">
                    <Input
                      name="category"
                      value={bodyInfo.category}
                      onChange={(e) => {
                        onComponentChange(e.target.name, e.target.value);
                      }}
                      size="large"
                      style={{ width: 600 }}
                    />
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
                <Row
                  gutter={[0]}
                  align="middle"
                  style={{ height: 80 }}
                  className="detail-table-layout"
                >
                  <Col flex="154px" className="table-header-col-section">
                    <label>태그</label>
                  </Col>
                  <Col flex="auto" className="table-value-col-section">
                    <Input
                      name="tag"
                      value={bodyInfo.tag}
                      onChange={(e) => {
                        onComponentChange(e.target.name, e.target.value);
                      }}
                      size="large"
                      style={{ width: 600 }}
                      placeholder={
                        "콤마 ( , )로 구분해서 작성해 주세요  예시) 현대, 제네시스"
                      }
                    />
                  </Col>
                </Row>
              </Space>
            </Space>
            <Space direction="vertical" size={20}>
              <Row align="middle">
                <Col>
                  <label className="detail-sub-title">콘텐츠 선택</label>
                </Col>
                <Col flex="auto" />
              </Row>
              <Space direction="vertical" size={0}>
                {renderContentBodyList()}
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

export default Create;
