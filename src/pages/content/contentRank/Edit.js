import {
  Col,
  Divider,
  Row,
  Space,
  Select,
  Button,
  Input,
  InputNumber,
} from "antd";
import { CaretUpFilled, CaretDownFilled } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
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
  closeConfirm,
  showConfirm,
  remove,
} from "../../../store/reducers/content/contentRank/edit";

const { Option } = Select;

// 수정페지
function Edit() {
  let { id } = useParams();
  let navigate = useNavigate();

  const { redirectTo, validation, confirm, bodyInfo, contentBodyList } =
    useSelector((state) => ({
      redirectTo: state.contentRankEdit.redirectTo,
      validation: state.contentRankEdit.validation,
      confirm: state.contentRankEdit.confirm,
      bodyInfo: state.contentRankEdit.bodyInfo,
      contentBodyList: state.contentRankEdit.contentBodyList,
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
  const onSaveClick = () =>
    dispatch(save("/content/contentRank", bodyInfo, contentBodyList));
  const onDeleteClick = async () => dispatch(showConfirm());
  const deleteInfo = async () => dispatch(remove("/content/contentRank", id));

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
              <label className="main-header-title">콘텐츠 인기순위 수정</label>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space size={10}>
                <Link to="/content/contentRank">
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
          <Space direction="vertical" size={0} split={<Divider />}>
            <Row align="middle">
              <Col>
                <label className="detail-sub-title">콘텐츠 선택</label>
              </Col>
              <Col flex="auto" />
            </Row>
            <Space direction="vertical" size={20}>
              <Row gutter={[30]}>
                <Col>
                  <Space size={10}>
                    <label>최소 등록수량</label>
                    <Input
                      size="large"
                      style={{ width: 130 }}
                      value={contentBodyList.length + " / 20"}
                      disabled
                    />
                  </Space>
                </Col>
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
