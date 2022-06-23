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
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
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
} from "../../../store/reducers/user/mine/detail";

const { Option } = Select;

// 상세페지
function Detail() {
  let { id } = useParams();
  let navigate = useNavigate();

  const { redirectTo, validation, confirm, bodyInfo } = useSelector(
    (state) => ({
      redirectTo: state.mineDetail.redirectTo,
      validation: state.mineDetail.validation,
      confirm: state.mineDetail.confirm,
      bodyInfo: state.mineDetail.bodyInfo,
    })
  );

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
  const onSaveClick = (url) => dispatch(save("/user/mine/1", bodyInfo));
  const onDeleteClick = async () => dispatch(showConfirm());
  const deleteInfo = async () => dispatch(remove("/user", id));

  return (
    <>
      <Space direction="vertical" size={18} className="main-layout">
        {/* Page Header */}
        <Space direction="vertical" size={11}>
          <Row justify="middle">
            <Col>
              <label className="main-header-title" style={{ paddingLeft: 68 }}>
                내 정보
              </label>
            </Col>
            <Col flex="auto" />
            <Col>
              <Button
                className="black-button"
                size="large"
                onClick={onSaveClick}
                style={{ width: 150 }}
              >
                저장하기
              </Button>
            </Col>
          </Row>
          <Divider className="main-body-divider" />
        </Space>

        {/* Body Section */}
        <Space direction="vertical" size={40} style={{ paddingBottom: 112 }}>
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
                  <label>이름</label>
                </Col>
                <Col flex="241px" className="table-value-col-section">
                  <Input
                    name="name"
                    value={bodyInfo.name}
                    onChange={(e) => {
                      onComponentChange(e.target.name, e.target.value);
                    }}
                    size="large"
                    placeholder="이름"
                    maxLength={10}
                    style={{ width: 150 }}
                  />
                </Col>
                <Col flex="154px" className="table-header-col-section">
                  <label>아이디</label>
                </Col>
                <Col flex="243px" className="table-value-col-section">
                  <Input
                    name="user_id"
                    value={bodyInfo.user_id}
                    onChange={(e) => {
                      onComponentChange(e.target.user_id, e.target.value);
                    }}
                    size="large"
                    maxLength={15}
                    style={{ width: 150 }}
                    disabled
                  />
                </Col>
                <Col flex="154px" className="table-header-col-section">
                  <label>그룹</label>
                </Col>
                <Col flex="239px" className="table-value-col-section">
                  <Input
                    name="group_name"
                    value={bodyInfo.group_name}
                    onChange={(e) => {
                      onComponentChange(e.target.name, e.target.value);
                    }}
                    size="large"
                    maxLength={15}
                    style={{ width: 150 }}
                    disabled
                  />
                </Col>
                <Col flex="154px" className="table-header-col-section">
                  <label>연락처</label>
                </Col>
                <Col flex="auto" className="table-value-col-section">
                  <Input
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    name="phone"
                    value={bodyInfo.phone}
                    onChange={(e) => {
                      onComponentChange(e.target.name, e.target.value);
                    }}
                    size="large"
                    placeholder="공백없이 - 제외한 숫자 입력"
                    maxLength={12}
                    style={{ width: 200 }}
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
                  <label>비밀번호 변경</label>
                </Col>
                <Col flex="638px" className="table-value-col-section">
                  <Input
                    name="password"
                    value={bodyInfo.password}
                    onChange={(e) => {
                      onComponentChange(e.target.name, e.target.value);
                    }}
                    size="large"
                    placeholder="비밀번호 입력"
                    style={{ width: 250 }}
                  />
                </Col>
                <Col flex="154px" className="table-header-col-section">
                  <label>이메일</label>
                </Col>
                <Col flex="auto" className="table-value-col-section">
                  <Input
                    name="email"
                    value={bodyInfo.email}
                    onChange={(e) => {
                      onComponentChange(e.target.name, e.target.value);
                    }}
                    size="large"
                    placeholder="이메일 입력"
                    style={{ width: 250 }}
                  />
                </Col>
              </Row>
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

export default Detail;
