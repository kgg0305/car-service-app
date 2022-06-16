import { Divider, Row, Space } from "antd";
import React, { useEffect } from "react";
import TableList from "../../../components/TableList";
import { Constants } from "../../../constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import { init, showMore } from "../../../store/reducers/content/movieRank/list";

// 목록페지
function List() {
  const { offset, dataSource, dataLength, bodyInfo } = useSelector((state) => ({
    offset: state.movieRankList.offset,
    dataSource: state.movieRankList.dataSource,
    dataLength: state.movieRankList.dataLength,
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
      width: "100px",
    },
    {
      title: "콘텐츠",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
  ];

  const tableList = {
    title: "등록일",
    subTitle1: bodyInfo.reg_date_text,
    subTitle2: bodyInfo.reg_time_text,
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
          <label className="main-header-title">동영상 인기순위</label>
          <Divider className="main-body-divider" />
        </Space>

        {/* Body Section */}
        <TableList dataSource={tableList} />

        {dataLength > 10 && dataLength > offset + 10 ? (
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
