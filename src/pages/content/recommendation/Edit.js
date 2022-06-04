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
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import moment from "moment";
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
  closeConfirm,
  showConfirm,
  remove,
} from "../../../store/reducers/content/recommendation/edit";

const { Option } = Select;

// 수정페지
function Edit() {
  let { id } = useParams();
  let navigate = useNavigate();

  const { redirectTo, validation, confirm, bodyInfo, contentBodyList } =
    useSelector((state) => ({
      redirectTo: state.recommendationEdit.redirectTo,
      validation: state.recommendationEdit.validation,
      confirm: state.recommendationEdit.confirm,
      bodyInfo: state.recommendationEdit.bodyInfo,
      contentBodyList: state.recommendationEdit.contentBodyList,
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
  const onAddContentComponentClick = () => dispatch(addContent());
  const onContentComponentChange = (number, name, value) =>
    dispatch(setContent(number, name, value));
  const onDeleteContentComponentClick = (number) =>
    dispatch(deleteContent(number));
  const onUpMoveClick = (index) => dispatch(moveUp(index, contentBodyList));
  const onDownMoveClick = (index) => dispatch(moveDown(index, contentBodyList));
  const onSaveClick = (url) =>
    dispatch(save("/content/recommendation", bodyInfo, contentBodyList));
  const onDeleteClick = async () => dispatch(showConfirm());
  const deleteInfo = async () =>
    dispatch(remove("/content/recommendation", id));

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
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
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
              style={{ width: 750 }}
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
              <label className="main-header-title">추천뉴스 수정</label>
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
          <Space direction="vertical" size={40}>
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
                        style={{ width: 150 }}
                        size="large"
                      />
                      <label className="description-label">
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

export default Edit;
