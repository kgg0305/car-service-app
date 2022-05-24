import { Col, Divider, Row, Space, Button, Switch } from "antd";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { GetGroupInfoAPI } from "../../../api/Group";
import {
  DeleteModelInfoAPI,
  GetModelListAPI,
  UpdateModelAPI,
} from "../../../api/Model";
import TableList from "../../../components/TableList";
import { Constants } from "../../../constants/Constants";
import { GetDateFullTimeStringUsingKorFromDate } from "../../../constants/GlobalFunctions";
import AlertDeleteModal from "../../../components/AlertDeleteModal";

// 목록페지
function Manage() {
  let { group_id } = useParams();
  const [offset, setOffset] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState({
    idx: null,
    show: false,
  });
  const [dataSource, setDataSource] = useState([]);
  const [groupBodyInfo, setGroupBodyInfo] = useState({
    group_name: "",
  });

  const initComponent = async () => {
    const initDataSource = await GetModelListAPI(offset, {
      group_id: group_id,
    });
    const initGroupBodyInfo = await GetGroupInfoAPI(group_id);

    setDataSource(initDataSource);
    setGroupBodyInfo(initGroupBodyInfo);
  };

  useEffect(() => {
    initComponent();
  }, []);

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
      dataIndex: "created_date",
      key: "created_date",
      align: "center",
      render: (created_date) =>
        GetDateFullTimeStringUsingKorFromDate(new Date(created_date)),
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

  const onTableMoreClick = async () => {
    const initDataSource = await GetModelListAPI(offset + 10, {
      group_id: group_id,
    });
    setOffset(offset + initDataSource.length);

    setDataSource([...dataSource, ...initDataSource]);
  };

  const onIsUseChange = async (idx, value) => {
    const model_info = {
      ...dataSource.filter((item) => item.idx === idx)[0],
      is_use: value,
    };

    await UpdateModelAPI(model_info);

    setDataSource(
      dataSource.map((item) => ({
        ...item,
        is_use: item.idx === idx ? value : item.is_use,
      }))
    );
  };

  const onDeleteClick = async (idx) => {
    setShowDeleteModal({
      idx: idx,
      show: true,
    });
  };

  const deleteInfo = async () => {
    await DeleteModelInfoAPI(showDeleteModal.idx);
    const initDataSource = await GetModelListAPI(0, {
      group_id: group_id,
    });
    setDataSource(initDataSource);
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
        visible={showDeleteModal.show}
        onConfirmClick={() => deleteInfo()}
        onCancelClick={() =>
          setShowDeleteModal({ ...showDeleteModal, show: false })
        }
      />
    </>
  );
}

export default Manage;
