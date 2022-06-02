import { Divider, Row, Space } from "antd";
import React, { useEffect } from "react";
import TableList from "../../../components/TableList";
import { Constants } from "../../../constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import { init, showMore } from "../../../store/reducers/content/movieRank/list";

// 목록페지
function List() {
  const { offset, dataSource, bodyInfo } = useSelector((state) => ({
    offset: state.movieRankList.offset,
    dataSource: state.movieRankList.dataSource,
    bodyInfo: state.movieRankList.bodyInfo,
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
    },
    {
      title: "콘텐츠",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
  ];

  const tableList = {
    title: "등록일 " + bodyInfo.created_at,
    topItems: [
      {
        type: Constants.inputTypes.button,
        link: "/content/movieRank/edit",
        label: "순위 수정",
        style: "white-button big-button",
        width: 150,
      },
      {
        type: Constants.inputTypes.button,
        link: "/content/movieRank/create",
        label: "순위 등록",
        style: "black-button big-button",
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
          <label className="main-header-title">동영상 인기순위</label>
          <Divider className="main-body-divider" />
        </Space>

        {/* Body Section */}
        <TableList dataSource={tableList} />

        <Row justify="center">
          <label className="show-more-label" onClick={onTableMoreClick}>
            더보기
          </label>
        </Row>
      </Space>
    </>
  );
}

export default List;
