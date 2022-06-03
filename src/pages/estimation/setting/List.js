import { Col, Row, Space, InputNumber } from "antd";
import React, { useEffect } from "react";
import TableList from "../../../components/TableList";
import { useDispatch, useSelector } from "react-redux";
import {
  init,
  setDataSource,
  save,
} from "../../../store/reducers/estimation/setting/list";
import { Constants } from "../../../constants/Constants";

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
    dispatch(setDataSource(idx, name, value));
  const onSaveClick = () => dispatch(save());

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
        <Row key={"rent_row_" + idx} justify="center">
          <Col>
            <Space key={"rent_space_" + idx} size={20}>
              <InputNumber
                name="rent_min"
                value={dataSource[idx - 1].rent_min}
                onChange={(number) => {
                  onComponentChange(idx, "rent_min", number);
                }}
                key={0}
                size="large"
                style={{ width: 130 }}
                controls={false}
                placeholder="숫자입력"
              />
              <label>~</label>
              <InputNumber
                name="rent_max"
                value={dataSource[idx - 1].rent_max}
                onChange={(number) => {
                  onComponentChange(idx, "rent_max", number);
                }}
                key={1}
                size="large"
                style={{ width: 130 }}
                controls={false}
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
        <Row key={"new_row_" + idx} justify="center">
          <Col>
            <Space key={"new_space_" + idx} size={20}>
              <InputNumber
                name="new_min"
                value={dataSource[idx - 1].new_min}
                onChange={(number) => {
                  onComponentChange(idx, "new_min", number);
                }}
                key={0}
                size="large"
                style={{ width: 130 }}
                controls={false}
                placeholder="숫자입력"
              />
              <label>~</label>
              <InputNumber
                name="new_max"
                value={dataSource[idx - 1].new_max}
                onChange={(number) => {
                  onComponentChange(idx, "new_max", number);
                }}
                key={1}
                size="large"
                style={{ width: 130 }}
                controls={false}
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
    topItems: [
      {
        type: Constants.inputTypes.button,
        onClick: onSaveClick,
        label: "저장하기",
        style: "black-button table-data-button",
      },
    ],
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
