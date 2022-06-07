import { Divider, Space, Row } from "antd";
import React, { useEffect } from "react";
import TableList from "../../../components/TableList";
import { Constants } from "../../../constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import {
  init,
  showMore,
  onTableMoreClick,
} from "../../../store/reducers/content/carRank/list";

// 목록페지
function List() {
  const { offset, dataSource, bodyInfo, dataLength } = useSelector((state) => ({
    offset: state.carRankList.offset,
    dataSource: state.carRankList.dataSource,
    dataLength: state.carRankList.dataLength,
    bodyInfo: state.carRankList.bodyInfo,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const onTableMoreClick = () => dispatch(showMore());

  const columns = [
    {
      title: "순위",
      dataIndex: "number",
      key: "number",
      align: "center",
      width: 100,
    },
    {
      title: "수입여부",
      dataIndex: "is_income",
      key: "is_income",
      align: "center",
      width: 150,
      render: (is_income) =>
        Constants.incomeOptions.filter((item) => item.value == is_income).length
          ? Constants.incomeOptions.filter((item) => item.value == is_income)[0]
              .label
          : "",
    },
    {
      title: "브랜드",
      dataIndex: "brand_name",
      key: "brand_name",
      align: "center",
      width: 443,
    },
    {
      title: "모델그룹",
      dataIndex: "group_name",
      key: "group_name",
      align: "center",
      width: 443,
    },
    {
      title: "모델",
      dataIndex: "model_name",
      key: "model_name",
      align: "center",
      width: 443,
    },
  ];

  const tableList = {
    title: "등록일",
    subTitle1: bodyInfo.created_at.split(" ")[0],
    subTitle2:
      bodyInfo.created_at.split(" ")[1] + bodyInfo.created_at.split(" ")[2],
    topItems: [
      {
        type: Constants.inputTypes.button,
        link: "/content/carRank/edit",
        label: "순위 수정",
        style: "white-button big-button",
        width: 150,
      },
      {
        type: Constants.inputTypes.button,
        link: "/content/carRank/create",
        label: "순위 등록",
        style: "black-button big-button create-button",
        width: 150,
      },
    ],
    tableData: dataSource,
    tableColumns: columns,
  };

  return (
    <>
      <Space direction="vertical" size={18} className="main-layout">
        {/* Page Header */}
        <Space direction="vertical" size={11}>
          <label className="main-header-title">자동차 인기순위</label>
          <Divider className="main-body-divider" />
        </Space>

        {/* Body Section */}
        <TableList dataSource={tableList} />

        {dataLength > 10 && dataLength > 10 * (offset + 1) ? (
          <Row justify="center">
            <label className="show-more-label" onClick={onTableMoreClick}>
              더보기
            </label>
          </Row>
        ) : (
          <div style={{ height: 69 }}></div>
        )}
      </Space>
    </>
  );
}

export default List;
