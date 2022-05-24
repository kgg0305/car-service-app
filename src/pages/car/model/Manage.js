import { Col, Divider, Row, Space, Button, Switch } from "antd";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import TableList from "../../../components/TableList";
import { Constants } from "../../../constants/Constants";
import { GetDateFullTimeStringUsingKorFromDate } from "../../../constants/GlobalFunctions";
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
} from "../../../store/reducers/car/model/manage";

// 목록페지
function Manage() {
  let { group_id } = useParams();
  let navigate = useNavigate();

  const { redirectTo, offset, confirm, groupBodyInfo, dataSource } =
    useSelector((state) => ({
      redirectTo: state.modelManage.redirectTo,
      offset: state.modelManage.offset,
      confirm: state.modelManage.confirm,
      groupBodyInfo: state.modelManage.groupBodyInfo,
      dataSource: state.modelManage.dataSource,
    }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (redirectTo) {
      const redirectURL = redirectTo;
      dispatch(removeRedirectTo());
      navigate(redirectURL);
    }
    dispatch(init(group_id));
  }, [redirectTo, dispatch]);

  const onTableMoreClick = () => dispatch(showMore(offset + 10));
  const onDeleteClick = async (idx) => dispatch(showConfirm(idx));
  const deleteInfo = async (idx) =>
    dispatch(remove("/car/model/manage/" + group_id, idx));
  const onIsUseChange = (idx, value) =>
    dispatch(setUse(idx, value, dataSource));
  const onCloseConfirmClick = () => dispatch(closeConfirm());

  const columns = [
    {
      title: "번호",
      dataIndex: "idx",
      key: "idx",
      align: "center",
    },
    {
      title: "브랜드",
      dataIndex: "brand_name",
      key: "brand_name",
      align: "center",
    },
    {
      title: "모델그룹",
      dataIndex: "group_name",
      key: "group_name",
      align: "center",
    },
    {
      title: "모델",
      dataIndex: "model_name",
      key: "model_name",
      align: "center",
    },
    {
      title: "순서",
      dataIndex: "sequence",
      key: "sequence",
      align: "center",
    },
    {
      title: "신차여부",
      dataIndex: "is_new",
      key: "is_new",
      align: "center",
      render: (is_new) => (is_new == 0 ? "예" : "아니오"),
    },
    {
      title: "사용여부",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      render: (idx) => renderIsUseField(idx),
    },
    {
      title: "등록일",
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      render: (created_at) =>
        GetDateFullTimeStringUsingKorFromDate(new Date(created_at)),
    },
    {
      title: "관리",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      render: (idx) => (
        <Row justify="center">
          <Col>
            <Space size={15} split={<Divider type="vertical" />}>
              <Link to={"/car/model/edit/" + idx}>
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
    title: groupBodyInfo.group_name,
    tableData: dataSource,
    tableColumns: columns,
  };

  const renderIsUseField = (idx) => {
    return (
      <Switch
        checked={
          dataSource.filter((item) => item.idx === idx)[0].is_use === "0"
            ? false
            : true
        }
        onClick={(checked) => onIsUseChange(idx, checked ? "1" : "0")}
      >
        <label className="switch-label">
          {
            Constants.availableOptions.filter(
              (item) =>
                item.value ===
                dataSource.filter((item) => item.idx === idx)[0].is_use
            )[0].label
          }
        </label>
      </Switch>
    );
  };

  return (
    <>
      <Space direction="vertical" size={18} className="main-layout">
        {/* Page Header */}
        <Space direction="vertical" size={18}>
          <label className="main-header-title">모델 관리</label>
          <Divider className="main-body-divider" />
        </Space>

        {/* Body Section */}
        <TableList dataSource={tableDataSource} />

        <Row justify="center">
          <label className="show-more-label" onClick={onTableMoreClick}>
            더보기
          </label>
        </Row>
      </Space>
      <AlertDeleteModal
        visible={confirm.show}
        onConfirmClick={() => deleteInfo(confirm.idx)}
        onCancelClick={onCloseConfirmClick}
      />
    </>
  );
}

export default Manage;
