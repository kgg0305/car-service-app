import { Col, Row, Space, Input } from "antd";
import React, { useState, useEffect } from "react";
import TableList from "../../../components/TableList";
import { useDispatch, useSelector } from "react-redux";
import {
  init,
  setDataSource,
} from "../../../store/reducers/estimation/setting/list";

// 목록페지
function List() {
  const { dataSource } = useSelector((state) => ({
    dataSource: state.settingList.dataSource,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const onComponentChange = (idx, name, value) =>
    dispatch(setDataSource(dataSource, idx, name, value));

  const columns = [
    {
      title: "시간대",
      dataIndex: "hour",
      key: "hour",
      align: "center",
      render: (hour) => hour + "시 ~",
    },
    {
      title: "리스/렌탈 문의 (최저~최고값)",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      render: (idx) => (
        <Row justify="center">
          <Col>
            <Space size={20}>
              <Input
                name="rent_min"
                value={dataSource[idx - 1].rent_min}
                onChange={(e) => {
                  onComponentChange(idx, e.target.name, e.target.value);
                }}
                key={0}
                size="large"
                style={{ width: 130 }}
                placeholder="숫자입력"
              />
              <label>~</label>
              <Input
                name="rent_max"
                value={dataSource[idx - 1].rent_max}
                onChange={(e) => {
                  onComponentChange(idx, e.target.name, e.target.value);
                }}
                key={1}
                size="large"
                style={{ width: 130 }}
                placeholder="숫자입력"
              />
            </Space>
          </Col>
        </Row>
      ),
    },
    {
      title: "신차문의 (최저~최고값)",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      render: (idx) => (
        <Row justify="center">
          <Col>
            <Space size={20}>
              <Input
                name="new_min"
                value={dataSource[idx - 1].new_min}
                onChange={(e) => {
                  onComponentChange(idx, e.target.name, e.target.value);
                }}
                key={0}
                size="large"
                style={{ width: 130 }}
                placeholder="숫자입력"
              />
              <label>~</label>
              <Input
                name="new_max"
                value={dataSource[idx - 1].new_max}
                onChange={(e) => {
                  onComponentChange(idx, e.target.name, e.target.value);
                }}
                key={1}
                size="large"
                style={{ width: 130 }}
                placeholder="숫자입력"
              />
            </Space>
          </Col>
        </Row>
      ),
    },
  ];

  const tableDataSource = {
    title: "시간대별 카운트 자동입력 설정",
    tableData: dataSource,
    tableColumns: columns,
  };

  return (
    <Space direction="vertical" size={18} className="main-layout">
      {/* Body Section */}
      <TableList dataSource={tableDataSource} />
    </Space>
  );
}

export default List;
