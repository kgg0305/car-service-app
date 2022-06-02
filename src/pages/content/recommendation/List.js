import { Col, Divider, Row, Space, Button, Image, Modal, Input } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import lockIcon from "../../../assets/images/lock-icon.png";
import checkIcon from "../../../assets/images/check-icon.png";
import clockIcon from "../../../assets/images/clock-icon.png";
import historyIcon from "../../../assets/images/history-icon.png";
import TableList from "../../../components/TableList";
import { Constants } from "../../../constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import {
  init,
  showMore,
  showDetailModal,
  closeDetailModal,
  publish,
} from "../../../store/reducers/content/recommendation/list";
import { GetDateStringFromDate } from "../../../constants/GlobalFunctions";

// 목록페지
function List() {
  const { offset, dataSource, detailModal } = useSelector((state) => ({
    offset: state.recommendationList.offset,
    dataSource: state.recommendationList.dataSource,
    detailModal: state.recommendationList.detailModal,
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
      title: "발행일",
      dataIndex: "publish_date",
      key: "publish_date",
      align: "center",
      render: (publish_date) => GetDateStringFromDate(new Date(publish_date)),
    },
    {
      title: "콘텐츠 목록",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      render: (idx) => renderContentListField(idx),
    },
    {
      title: "콘텐츠 수",
      dataIndex: "content_count",
      key: "content_count",
      align: "center",
    },
    {
      title: "발행여부/상태",
      dataIndex: "publish_date",
      key: "publish_date",
      align: "center",
      render: (publish_date) => renderStatusField(publish_date),
    },
    {
      title: "관리",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      render: (idx) => renderManageField(idx),
    },
  ];

  const tableDataSource = {
    topItems: [
      {
        type: Constants.inputTypes.label,
        label: "발행완료",
        icon: <Image src={checkIcon} />,
      },
      {
        type: Constants.inputTypes.label,
        label: "오늘발행",
        icon: <Image src={clockIcon} />,
      },
      {
        type: Constants.inputTypes.label,
        label: "발행예약",
        icon: <Image src={historyIcon} />,
      },
      {
        type: Constants.inputTypes.button,
        link: "/content/recommendation/create",
        label: "등록",
        style: "black-button big-button create-button",
        width: 150,
      },
    ],
    tableData: dataSource,
    tableColumns: columns,
  };

  const renderStatusField = (publish_date) => {
    let current_date = new Date();
    let current_time = current_date.getTime();
    let day_current_time = current_date;
    day_current_time.setDate(current_date.getDate() + 1);
    day_current_time = day_current_time.getTime();
    let publish_time = new Date(publish_date).getTime();
    return (
      <Row justify="center">
        <Col>
          {publish_time < current_time ? (
            <Image src={checkIcon} preview={false} />
          ) : current_time < publish_time && publish_time < day_current_time ? (
            <Image src={clockIcon} preview={false} />
          ) : (
            <Image src={historyIcon} preview={false} />
          )}
        </Col>
      </Row>
    );
  };

  const renderManageField = (idx) => {
    let current_time = new Date().getTime();
    return (
      <Row justify="center">
        <Col>
          {new Date(
            dataSource.filter((item) => item.idx === idx)[0].publish_date
          ).getTime() < current_time ? (
            <Image src={lockIcon} preview={false} />
          ) : (
            <Space size={15} split={<Divider type="vertical" />}>
              <Button
                className="white-button small-button rounded-button"
                onClick={() => onPublishClick(idx)}
              >
                즉시반영
              </Button>
              <Link to={"/content/recommendation/edit/" + idx}>
                <Button className="black-button small-button rounded-button">
                  수정
                </Button>
              </Link>
            </Space>
          )}
        </Col>
      </Row>
    );
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
          <label className="main-header-title">추천뉴스 관리</label>
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
