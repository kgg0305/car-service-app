import { Col, Divider, Row, Space, Button, Image, Modal, Input } from "antd";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import TableList from "../../../components/TableList";
import { Constants } from "../../../constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import {
  init,
  showMore,
  showDetailModal,
  closeDetailModal,
  publish,
} from "../../../store/reducers/content/photo/list";

// 목록페지
function List() {
  const { offset, dataSource, detailModal } = useSelector((state) => ({
    offset: state.photoList.offset,
    dataSource: state.photoList.dataSource,
    detailModal: state.photoList.detailModal,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const onTableMoreClick = () => dispatch(showMore());
  const onShowDetailModalClick = (content_ids) =>
    dispatch(showDetailModal(content_ids));
  const onCloseDetailModalClick = () => dispatch(closeDetailModal());
  const onPublishClick = (idx) => dispatch(publish(idx, dataSource));

  const columns = [
    {
      title: "번호",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      width: 100,
    },
    {
      title: "콘텐츠 목록",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      width: 1078,
      render: (idx) => renderContentListField(idx),
    },
    {
      title: "콘텐츠 수",
      dataIndex: "content_count",
      key: "content_count",
      align: "center",
      width: 160,
    },
    {
      title: "사용여부",
      dataIndex: "is_use",
      key: "is_use",
      align: "center",
      width: 120,
      render: (is_use) =>
        Constants.availableOptions.filter((item) => item.value === is_use)[0]
          .label,
    },
    {
      title: "관리",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      width: 120,
      render: (idx) => (
        <Row justify="center">
          <Col>
            <Space size={15} split={<Divider type="vertical" />}>
              <Link to={"/content/photo/edit/" + idx}>
                <Button className="black-button small-button rounded-button">
                  수정
                </Button>
              </Link>
            </Space>
          </Col>
        </Row>
      ),
    },
  ];

  const tableList = {
    topItems: [
      {
        type: Constants.inputTypes.button,
        link: "/content/photo/create",
        label: "포토뉴스 등록",
        style: "black-button big-button create-button",
        width: 150,
      },
    ],
    tableData: dataSource,
    tableColumns: columns,
  };

  const renderContentListField = (idx) => {
    return (
      <Row gutter={[10]} justify="center">
        <Col>
          <label>
            {dataSource.filter((item) => item.idx === idx)[0].content_list_text}
          </label>
        </Col>
        <Col>
          <Button
            className="white-button small-button rounded-button"
            onClick={() =>
              onShowDetailModalClick(
                dataSource.filter((item) => item.idx === idx)[0].content_ids
              )
            }
          >
            상세보기
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Space direction="vertical" size={18} className="main-layout">
        {/* Page Header */}
        <Space direction="vertical" size={11}>
          <label className="main-header-title">포토뉴스 관리</label>
          <Divider className="main-body-divider" />
        </Space>

        {/* Body Section */}
        <TableList dataSource={tableList} />
      </Space>

      <Modal
        centered
        width={1100}
        closable={false}
        visible={detailModal.show}
        title={"콘텐츠 목록  2022-03-31"}
        footer={[
          <Button className="alert-button" onClick={onCloseDetailModalClick}>
            닫기
          </Button>,
        ]}
      >
        <Space direction="vertical" size={20} style={{ width: "100%" }}>
          <Space direction="vertical" size={0} style={{ width: "100%" }}>
            {detailModal.contentList.map((content, index) => (
              <Row
                key={0}
                gutter={[0]}
                align="middle"
                style={{ height: 80 }}
                className="detail-table-layout"
              >
                <Col flex="154px" className="table-header-col-section">
                  <label>순서{index + 1}</label>
                </Col>
                <Col flex="auto" className="table-value-col-section">
                  <Input value={content.title} readOnly={true} />
                </Col>
              </Row>
            ))}
          </Space>
        </Space>
      </Modal>
    </>
  );
}

export default List;
