import { Col, Divider, Row, Space, Button, InputNumber } from "antd";
import React, { useEffect } from "react";
import TableList from "../../../components/TableList";
import { Constants } from "../../../constants/Constants";
import { GetDateStringFromDate } from "../../../constants/GlobalFunctions";
import { useDispatch, useSelector } from "react-redux";
import {
  init,
  add,
  setAdd,
  showMore,
} from "../../../store/reducers/estimation/count/list";

// 목록페지
function List() {
  const { offset, dataSource, addData } = useSelector((state) => ({
    offset: state.countList.offset,
    dataSource: state.countList.dataSource,
    addData: state.countList.addData,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const onTableMoreClick = () => dispatch(showMore(offset + 10));
  const onClickAdd = () => dispatch(add(addData, offset));
  const onChangeAddComponent = (name, value) => dispatch(setAdd(name, value));

  const columns = [
    {
      title: "날짜",
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      render: (created_at) => GetDateStringFromDate(new Date(created_at)),
    },
    {
      title: "렌트/리스 문의 카운트",
      dataIndex: "rent",
      key: "rent",
      align: "center",
      children: [
        {
          title: "의뢰수",
          dataIndex: "rent_request",
          key: "rent_request",
          align: "center",
        },
        {
          title: "관리자 입력수",
          dataIndex: "rent_admin",
          key: "rent_admin",
          align: "center",
        },
        {
          title: "누계",
          dataIndex: "idx",
          key: "idx",
          align: "center",
          render: (idx) => renderRentTotal(idx),
        },
      ],
    },
    {
      title: "신차문의 카운트",
      dataIndex: "new",
      key: "new",
      align: "center",
      children: [
        {
          title: "의뢰수",
          dataIndex: "new_request",
          key: "new_request",
          align: "center",
        },
        {
          title: "관리자 입력수",
          dataIndex: "new_admin",
          key: "new_admin",
          align: "center",
        },
        {
          title: "누계",
          dataIndex: "idx",
          key: "idx",
          align: "center",
          render: (idx) => renderNewTotal(idx),
        },
      ],
    },
  ];

  const tableDataSource = {
    topItems: [
      {
        type: Constants.inputTypes.select,
        name: "year",
        width: 130,
        data: Constants.yearOptions,
      },
      {
        type: Constants.inputTypes.select,
        name: "month",
        width: 130,
        data: Constants.monthOptions,
      },
      {
        type: Constants.inputTypes.button,
        label: "시간대별 카운트 자동설정",
        link: "/estimation/setting",
        style: "white-button",
      },
    ],
    tableData: dataSource,
    tableColumns: columns,
  };

  const renderRentTotal = (idx) => {
    return (
      dataSource.filter((item) => item.idx === idx)[0].rent_request +
      dataSource.filter((item) => item.idx === idx)[0].rent_admin
    );
  };

  const renderNewTotal = (idx) => {
    return (
      dataSource.filter((item) => item.idx === idx)[0].new_request +
      dataSource.filter((item) => item.idx === idx)[0].new_admin
    );
  };

  return (
    <Space direction="vertical" size={18} className="main-layout">
      {/* Page Header */}
      <Space direction="vertical" size={18}>
        <label className="main-header-title">견적신청 목록</label>
        <Divider className="main-body-divider" />
      </Space>

      {/* Search Section */}
      <Space direction="vertical" size={20}>
        <label className="title-label">검색</label>
        <Space direction="vertical" size={0}>
          <Row
            key={1}
            gutter={[0]}
            align="middle"
            style={{ height: 80 }}
            className="table"
          >
            <Col flex="154px" className="table-header">
              <label className="table-header-label">관리자 입력</label>
            </Col>
            <Col flex="auto" className="table-value">
              <Space size={6}>
                <label>랜스/리스 문의 카운트</label>
                <InputNumber
                  name="rent_admin"
                  value={addData.rent_admin}
                  onChange={(number) => {
                    onChangeAddComponent("rent_admin", number);
                  }}
                  size="large"
                  maxLength={6}
                  style={{ width: 150 }}
                  controls={false}
                />
                <label>신차 문의 카운트</label>
                <InputNumber
                  name="new_admin"
                  value={addData.new_admin}
                  onChange={(number) => {
                    onChangeAddComponent("new_admin", number);
                  }}
                  size="large"
                  maxLength={6}
                  style={{ width: 150 }}
                  controls={false}
                />
                <label>
                  {GetDateStringFromDate(new Date())} 날짜에 입력 됩니다
                </label>
              </Space>
            </Col>
          </Row>
        </Space>

        <Row key={2} justify="center" gutter={[17, 0]}>
          <Col>
            <Button
              className="black-button big-button"
              onClick={() => onClickAdd(addData)}
            >
              저장
            </Button>
          </Col>
        </Row>
      </Space>

      {/* Body Section */}
      <TableList dataSource={tableDataSource} />

      <Row justify="center">
        <label className="show-more-label" onClick={onTableMoreClick}>
          더보기
        </label>
      </Row>
    </Space>
  );
}

export default List;
