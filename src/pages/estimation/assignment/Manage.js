import { Col, Divider, Row, Space, Button, Select } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import TableList from "../../../components/TableList";
import { Constants } from "../../../constants/Constants";

const { Option } = Select;

// 관리페지
function Manage() {
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      number: "1",
      path: "naverblog",
      method: "렌트",
      name: "김철수",
      contact: "010-0000-0000",
      brand: "제네시스",
      type: "G80",
      area: "",
      member: "",
      manage: "",
    },
    {
      key: 1,
      number: "1",
      path: "naverblog",
      method: "렌트",
      name: "김철수",
      contact: "010-0000-0000",
      brand: "제네시스",
      type: "G80",
      area: "",
      member: "",
      manage: "",
    },
  ]);

  const columns = [
    {
      title: "번호",
      dataIndex: "number",
      key: "number",
      align: "center",
    },
    {
      title: "유입경로",
      dataIndex: "path",
      key: "path",
      align: "center",
    },
    {
      title: "구입방법",
      dataIndex: "method",
      key: "method",
      align: "center",
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "연락처",
      dataIndex: "contact",
      key: "contact",
      align: "center",
    },
    {
      title: "브랜드",
      dataIndex: "brand",
      key: "brand",
      align: "center",
    },
    {
      title: "차종",
      dataIndex: "type",
      key: "type",
      align: "center",
    },
    {
      title: "지점",
      dataIndex: "area",
      key: "area",
      align: "center",
      render: (path) => (
        <Row justify="center">
          <Col>
            <Select
              size="large"
              suffixIcon={<CaretDownOutlined />}
              placeholder={"선택"}
              style={{ width: 130 }}
            >
              {
                <Select.Option key={1} value={1}>
                  1
                </Select.Option>
              }
            </Select>
          </Col>
        </Row>
      ),
    },
    {
      title: "인원",
      dataIndex: "member",
      key: "member",
      align: "center",
      render: (path) => (
        <Row justify="center">
          <Col>
            <Select
              size="large"
              suffixIcon={<CaretDownOutlined />}
              placeholder={"선택"}
              style={{ width: 130 }}
            >
              {
                <Select.Option key={1} value={1}>
                  1
                </Select.Option>
              }
            </Select>
          </Col>
        </Row>
      ),
    },
    {
      title: "관리",
      dataIndex: "manage",
      key: "manage",
      align: "center",
      render: (path) => (
        <Row justify="center">
          <Col>
            <Space size={15} split={<Divider type="vertical" />}>
              <Link to="/estimation/request/detail">
                <Button className="black-button small-button rounded-button">
                  상세보기
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
        link: "/car/model/create",
        label: "등록",
        style: "black-button big-button",
        width: 150,
      },
    ],
    subItems: [
      {
        type: Constants.inputTypes.input,
        disabled: true,
        label: "견적서",
        value: "999,999,999",
        width: 130,
      },
      {
        type: Constants.inputTypes.input,
        disabled: true,
        label: "대기",
        value: "999,999,999",
        width: 130,
      },
      {
        type: Constants.inputTypes.input,
        disabled: true,
        label: "상담",
        value: "999,999,999",
        width: 130,
      },
      {
        type: Constants.inputTypes.input,
        disabled: true,
        label: "계약",
        value: "999,999,999",
        width: 130,
      },
      {
        type: Constants.inputTypes.input,
        disabled: true,
        label: "출고",
        value: "999,999,999",
        width: 130,
      },
      {
        type: Constants.inputTypes.input,
        disabled: true,
        label: "종료",
        value: "999,999,999",
        width: 130,
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
          <Row justify="middle">
            <Col>
              <label className="main-header-title">할당 관리</label>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space size={10}>
                <Link to="/car/group">
                  <Button
                    className="white-button cancel-detail-button"
                    size="large"
                  >
                    취소
                  </Button>
                </Link>
                <Button className="black-button" size="large">
                  저장하고 나가기
                </Button>
              </Space>
            </Col>
          </Row>
          <Divider className="main-body-divider" />
        </Space>

        {/* Body Section */}
        <TableList dataSource={tableList} />
      </Space>
    </>
  );
}

export default Manage;
