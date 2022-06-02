import {
  Col,
  Divider,
  Row,
  Space,
  Select,
  Button,
  Input,
  InputNumber,
  DatePicker,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import React, { useEffect } from "react";
import AlertModal from "../../../components/AlertModal";
import { CaretUpFilled, CaretDownFilled } from "@ant-design/icons";
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
} from "../../../store/reducers/content/recommendation/create";

const { Option } = Select;

// 등록페지
function Create() {
  let navigate = useNavigate();

  const { redirectTo, validation, bodyInfo, contentBodyList } = useSelector(
    (state) => ({
      redirectTo: state.recommendationCreate.redirectTo,
      validation: state.recommendationCreate.validation,
      bodyInfo: state.recommendationCreate.bodyInfo,
      contentBodyList: state.recommendationCreate.contentBodyList,
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
    dispatch(save("/content/recommendation", bodyInfo, contentBodyList));

  const renderContentBodyList = () => {
    return contentBodyList.map((body, index) => (
      <Row
        gutter={[0]}
        align="middle"
        style={{ height: 80 }}
        className="detail-table-layout"
      >
        <Col flex="154px" className="table-header-col-section">
          <Space direction="vertical" style={{ paddingLeft: "10px" }}>
            <CaretUpFilled
              style={{ fontSize: "30px", cursor: "pointer" }}
              onClick={() => onUpMoveClick(index)}
            />
            <CaretDownFilled
              style={{ fontSize: "30px", cursor: "pointer" }}
              onClick={() => onDownMoveClick(index)}
            />
          </Space>
          <label>
            순서 {body.number < 10 ? "0" + body.number : body.number}
          </label>
        </Col>
        <Col flex="auto" className="table-value-col-section">
          <Space size={10}>
            <InputNumber
              name="idx"
              value={body.idx}
              onChange={(number) => {
                onContentComponentChange(body.number, "idx", number);
              }}
              size="large"
              controls={false}
              placeholder="콘텐츠 번호 또는 줌 자동차 뉴스의 URL 입력"
              style={{ width: 500 }}
            />
            <Input
              name="title"
              value={body.title}
              size="large"
              readOnly={true}
              placeholder="콘텐츠 번호 또는 줌 자동차 뉴스의 URL 입력"
              style={{ width: 500 }}
            />
          </Space>
        </Col>
        <Col flex="auto" />
        <Col className="table-value-col-section">
          <Space size={13}>
            {contentBodyList.length == index + 1 ? (
              <>
                {contentBodyList.length != 1 ? (
                  <Button
                    className="white-button"
                    onClick={() => onDeleteContentComponentClick(body.number)}
                    size="large"
                  >
                    삭제
                  </Button>
                ) : (
                  ""
                )}
                <Button
                  className="black-button"
                  onClick={() => onAddContentComponentClick(body.number)}
                  size="large"
                >
                  추가
                </Button>
              </>
            ) : (
              <Button
                className="white-button"
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
              <label className="main-header-title">추천뉴스 등록</label>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space size={10}>
                <Link to="/content/recommendation">
                  <Button
                    className="white-button cancel-detail-button"
                    size="large"
                  >
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
        <Space direction="vertical" size={40} style={{ paddingBottom: 112 }}>
          <Space
            direction="vertical"
            size={59}
            split={<Divider className="detail-body-divider" dashed />}
          >
            <Space direction="vertical" size={20}>
              <Row align="middle">
                <Col>
                  <label className="detail-sub-title">발행일 선택</label>
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
                    <label>발행일</label>
                  </Col>
                  <Col flex="auto" className="table-value-col-section">
                    <Space size={10}>
                      <DatePicker
                        name="publish_date"
                        value={moment(bodyInfo.publish_date)}
                        onChange={(value) => {
                          onComponentChange("publish_date", value.toString());
                        }}
                        size="large"
                      />
                      <label>
                        선택한 날짜를 기준으로 자동발행 됩니다. (예약발행)
                      </label>
                    </Space>
                  </Col>
                </Row>
              </Space>
            </Space>
            <Space direction="vertical" size={20}>
              <Row align="middle">
                <Col>
                  <label className="detail-sub-title">뉴스 선택</label>
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
