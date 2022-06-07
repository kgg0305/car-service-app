import { Col, Divider, Row, Space, Button, Switch } from "antd";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import TableList from "../../../components/TableList";
import { Constants } from "../../../constants/Constants";
import AlertDeleteModal from "../../../components/AlertDeleteModal";
import { useDispatch, useSelector } from "react-redux";
import {
  init,
  showMore,
  removeRedirectTo,
  showConfirm,
  remove,
  setUse,
  closeConfirm,
  save,
} from "../../../store/reducers/car/group/manage";

// 목록페지
function Manage() {
  let { brand_id } = useParams();
  let navigate = useNavigate();

  const { redirectTo, offset, confirm, brandBodyInfo, dataSource, dataLength } =
    useSelector((state) => ({
      redirectTo: state.groupManage.redirectTo,
      offset: state.groupManage.offset,
      confirm: state.groupManage.confirm,
      brandBodyInfo: state.groupManage.brandBodyInfo,
      dataSource: state.groupManage.dataSource,
      dataLength: state.groupManage.dataLength,
    }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (redirectTo) {
      const redirectURL = redirectTo;
      dispatch(removeRedirectTo());
      navigate(redirectURL);
    }
    dispatch(init(brand_id));
  }, [redirectTo, dispatch]);

  const onTableMoreClick = () => dispatch(showMore());
  const onDeleteClick = async (idx) => dispatch(showConfirm(idx));
  const deleteInfo = async (idx) => dispatch(remove(idx));
  const onIsUseChange = (idx, value) => dispatch(setUse(idx, value));
  const onCloseConfirmClick = () => dispatch(closeConfirm());
  const onSaveClick = (url) => dispatch(save(url));

  const columns = [
    {
      title: "번호",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      width: 153,
    },
    {
      title: "브랜드",
      dataIndex: "brand_name",
      key: "brand_name",
      align: "center",
      width: 413,
    },
    {
      title: "모델그룹",
      dataIndex: "group_name",
      key: "group_name",
      align: "center",
      width: 413,
    },
    {
      title: "차종",
      dataIndex: "kind_name",
      key: "kind_name",
      align: "center",
      width: 188,
    },
    {
      title: "사용여부",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      width: 191,
      render: (idx) => renderIsUseField(idx),
    },
    {
      title: "관리",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      width: 220,
      render: (idx) => (
        <Row justify="center">
          <Col>
            <Space size={15} split={<Divider type="vertical" />}>
              <Link to={"/car/group/edit/" + idx}>
                <Button className="black-button small-button rounded-button">
                  수정
                </Button>
              </Link>
              <Button
                className="white-button small-button rounded-button"
                onClick={() => onDeleteClick(idx)}
                size="large"
              >
                삭제
              </Button>
            </Space>
          </Col>
        </Row>
      ),
    },
  ];

  const tableDataSource = {
    title: brandBodyInfo.brand_name,
    tableData: dataSource,
    tableColumns: columns,
  };

  const renderIsUseField = (idx) => {
    return (
      <Row justify="center">
        <Col>
          <Space size={11}>
            <Switch
              className="manage-switch"
              checked={
                dataSource.filter((item) => item.idx === idx)[0].is_use === "0"
                  ? false
                  : true
              }
              onClick={(checked) => onIsUseChange(idx, checked ? "1" : "0")}
            />
            <label className="switch-label">
              {
                Constants.availableOptions.filter(
                  (item) =>
                    item.value ===
                    dataSource.filter((item) => item.idx === idx)[0].is_use
                )[0].label
              }
            </label>
          </Space>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Space direction="vertical" size={18} className="main-layout">
        {/* Page Header */}
        <Space direction="vertical" size={11}>
          <Space size={1140}>
            <label className="main-header-title">모델그룹 관리</label>
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
                className="black-button"
                size="large"
                onClick={() => onSaveClick("/car/brand")}
              >
                저장하고 나가기
              </Button>
            </Space>
          </Space>
          <Divider className="main-body-divider" />
        </Space>

        {/* Body Section */}
        <TableList dataSource={tableDataSource} />

        {dataLength > 10 ? (
          <Row justify="center">
            <label className="show-more-label" onClick={onTableMoreClick}>
              더보기
            </label>
          </Row>
        ) : (
          <div style={{ height: 69 }}></div>
        )}
      </Space>
      <AlertDeleteModal
        name={confirm.name}
        visible={confirm.show}
        onConfirmClick={() => deleteInfo(confirm.idx)}
        onCancelClick={onCloseConfirmClick}
      />
    </>
  );
}

export default Manage;
