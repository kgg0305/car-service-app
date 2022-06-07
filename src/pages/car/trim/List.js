import { Col, Divider, Row, Space, Button, Select } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import TableList from "../../../components/TableList";
import { Constants } from "../../../constants/Constants";
import { CaretDownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  init,
  reset,
  search,
  setSearch,
  showMore,
} from "../../../store/reducers/car/trim/list";

// 목록페지
function List() {
  const {
    offset,
    brandOptionList,
    groupOptionList,
    modelOptionList,
    lineupOptionList,
    dataSource,
    dataLength,
    searchData,
  } = useSelector((state) => ({
    offset: state.trimList.offset,
    brandOptionList: state.trimList.brandOptionList,
    groupOptionList: state.trimList.groupOptionList,
    modelOptionList: state.trimList.modelOptionList,
    lineupOptionList: state.trimList.lineupOptionList,
    dataSource: state.trimList.dataSource,
    dataLength: state.trimList.dataLength,
    searchData: state.trimList.searchData,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const onTableMoreClick = () => dispatch(showMore());
  const onSearchClick = () => dispatch(search());
  const onResetClick = () => dispatch(reset());
  const onSearchComponentChange = (name, value) =>
    dispatch(setSearch(name, value));

  const columns = [
    {
      title: "번호",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      width: 98,
    },
    {
      title: "브랜드",
      dataIndex: "brand_name",
      key: "brand_name",
      align: "center",
      width: 150,
    },
    {
      title: "모델그룹",
      dataIndex: "group_name",
      key: "group_name",
      align: "center",
      width: 150,
    },
    {
      title: "모델",
      dataIndex: "model_name",
      key: "model_name",
      align: "center",
      width: 214,
    },
    {
      title: "라인업",
      dataIndex: "lineup_name",
      key: "lineup_name",
      align: "center",
      width: 440,
    },
    {
      title: "트림",
      dataIndex: "trim_name",
      key: "trim_name",
      align: "center",
      width: 186,
    },
    {
      title: "사용여부",
      dataIndex: "is_use",
      key: "is_use",
      align: "center",
      width: 124,
      render: (is_use) =>
        Constants.availableOptions.filter((item) => item.value == is_use)[0]
          .label,
    },
    {
      title: "관리",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      width: 220,
      render: (idx) => (
        <Row justify="center">
          <Col>
            <Link to={"/car/trim/edit/" + idx + "/0"}>
              <Button className="black-button small-button rounded-button">
                수정
              </Button>
            </Link>
          </Col>
        </Row>
      ),
    },
  ];

  const tableDataSource = {
    topItems: [
      {
        type: Constants.inputTypes.button,
        link: "/car/trim/create",
        label: "등록",
        style: "black-button big-button create-button",
        width: 150,
      },
    ],
    tableData: dataSource,
    tableColumns: columns,
  };

  return (
    <Space direction="vertical" size={18} className="main-layout">
      {/* Page Header */}
      <Space direction="vertical" size={11}>
        <label className="main-header-title">트림 목록</label>
        <Divider className="main-body-divider" />
      </Space>

      {/* Search Section */}
      <Space className="search-layout" direction="vertical" size={20}>
        <label className="title-label">검색</label>
        <Space direction="vertical" size={0}>
          <Row
            key={1}
            gutter={[0]}
            align="middle"
            style={{ height: 80 }}
            className="search-table-layout"
          >
            <Col flex="154px" className="table-header">
              <label className="table-header-label">차량</label>
            </Col>
            <Col flex="1077px" className="table-value">
              <Space size={6}>
                <Select
                  name="brand_id"
                  value={searchData.brand_id}
                  onChange={(value) => {
                    onSearchComponentChange("brand_id", value);
                  }}
                  suffixIcon={<CaretDownOutlined />}
                  placeholder="브랜드 선택"
                  size="large"
                  style={{ width: 250 }}
                >
                  {brandOptionList.map((optionItem, optionIndex) => (
                    <Select.Option key={optionIndex} value={optionItem.value}>
                      {optionItem.label}
                    </Select.Option>
                  ))}
                </Select>
                <Select
                  name="group_id"
                  value={searchData.group_id}
                  onChange={(value) => {
                    onSearchComponentChange("group_id", value);
                  }}
                  suffixIcon={<CaretDownOutlined />}
                  placeholder="모델그룹 선택"
                  size="large"
                  style={{ width: 250 }}
                >
                  {groupOptionList
                    .filter((item) => item.brand_id == searchData.brand_id)
                    .map((optionItem, optionIndex) => (
                      <Select.Option key={optionIndex} value={optionItem.value}>
                        {optionItem.label}
                      </Select.Option>
                    ))}
                </Select>
                <Select
                  name="model_id"
                  value={searchData.model_id}
                  onChange={(value) => {
                    onSearchComponentChange("model_id", value);
                  }}
                  suffixIcon={<CaretDownOutlined />}
                  placeholder="모델 선택"
                  size="large"
                  style={{ width: 250 }}
                >
                  {modelOptionList
                    .filter((item) => item.group_id === searchData.group_id)
                    .map((optionItem, optionIndex) => (
                      <Select.Option key={optionIndex} value={optionItem.value}>
                        {optionItem.label}
                      </Select.Option>
                    ))}
                </Select>
                <Select
                  name="lineup_id"
                  value={searchData.lineup_id}
                  onChange={(value) => {
                    onSearchComponentChange("lineup_id", value);
                  }}
                  suffixIcon={<CaretDownOutlined />}
                  placeholder="라인업 선택"
                  size="large"
                  style={{ width: 250 }}
                >
                  {lineupOptionList
                    .filter((item) => item.model_id === searchData.model_id)
                    .map((optionItem, optionIndex) => (
                      <Select.Option key={optionIndex} value={optionItem.value}>
                        {optionItem.label}
                      </Select.Option>
                    ))}
                </Select>
              </Space>
            </Col>
            <Col flex="154px" className="table-header">
              <label className="table-header-label">사용여부</label>
            </Col>
            <Col flex="auto" className="table-value">
              <Space size={6}>
                <Select
                  name="is_use"
                  value={searchData.is_use}
                  onChange={(value) => {
                    onSearchComponentChange("is_use", value);
                  }}
                  suffixIcon={<CaretDownOutlined />}
                  placeholder="선택"
                  size="large"
                  style={{ width: 150 }}
                >
                  {Constants.availableOptions.map((optionItem, optionIndex) => (
                    <Select.Option key={optionIndex} value={optionItem.value}>
                      {optionItem.label}
                    </Select.Option>
                  ))}
                </Select>
              </Space>
            </Col>
          </Row>
        </Space>

        <Row key={2} justify="center" gutter={[17, 0]}>
          <Col>
            <Button className="white-button big-button" onClick={onResetClick}>
              초기화
            </Button>
          </Col>
          <Col>
            <Button
              className="black-button big-button search-button"
              onClick={() => onSearchClick(searchData)}
            >
              검색
            </Button>
          </Col>
        </Row>
      </Space>

      {/* Body Section */}
      <TableList dataSource={tableDataSource} />

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
  );
}

export default List;
