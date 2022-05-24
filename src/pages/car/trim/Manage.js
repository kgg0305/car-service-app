import { Col, Divider, Row, Space, Button, Select, Switch } from "antd";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { GetLineupInfoAPI } from "../../../api/Lineup";
import {
  DeleteTrimInfoAPI,
  GetTrimListAPI,
  UpdateTrimAPI,
} from "../../../api/Trim";
import TableList from "../../../components/TableList";
import { Constants } from "../../../constants/Constants";
import { CaretDownOutlined } from "@ant-design/icons";
import AlertDeleteModal from "../../../components/AlertDeleteModal";

// 목록페지
function Manage() {
  let { lineup_id } = useParams();
  const [offset, setOffset] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState({
    idx: null,
    show: false,
  });
  const [dataSource, setDataSource] = useState([]);
  const [lineupBodyInfo, setLineupBodyInfo] = useState({
    lineup_name: "",
  });

  const initComponent = async () => {
    const initDataSource = await GetTrimListAPI(offset, {
      lineup_id: lineup_id,
    });
    const initLineupBodyInfo = await GetLineupInfoAPI(lineup_id);

    setDataSource(initDataSource);
    setLineupBodyInfo(initLineupBodyInfo);
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
      title: "라인업",
      dataIndex: "lineup_name",
      key: "lineup_name",
      align: "center",
    },
    {
      title: "트림",
      dataIndex: "trim_name",
      key: "trim_name",
      align: "center",
    },
    {
      title: "사용여부",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      render: (idx) => renderIsUseField(idx),
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
              <Link to={"/car/trim/edit/" + idx}>
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
    title: lineupBodyInfo.lineup_name,
    tableData: dataSource,
    tableColumns: columns,
  };

  const onTableMoreClick = async () => {
    const initDataSource = await GetTrimListAPI(offset + 10, {
      lineup_id: lineup_id,
    });
    setOffset(offset + initDataSource.length);

    setDataSource([...dataSource, ...initDataSource]);
  };

  const onIsUseChange = async (idx, value) => {
    const trim_info = {
      ...dataSource.filter((item) => item.idx === idx)[0],
      is_use: value,
    };

    await UpdateTrimAPI(trim_info);

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
    await DeleteTrimInfoAPI(showDeleteModal.idx);
    const initDataSource = await GetTrimListAPI(0, {
      lineup_id: lineup_id,
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
          <label className="main-header-title">트림 관리</label>
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
