import { Divider, Space, Row, Select, Col, Button } from "antd";
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
  download,
  uploadExcel,
} from "../../../store/reducers/car/extra/list";

// 목록페지
function List() {
  const {
    offset,
    brandOptionList,
    groupOptionList,
    modelOptionList,
    dataSource,
    dataLength,
    searchData,
  } = useSelector((state) => ({
    offset: state.extraList.offset,
    brandOptionList: state.extraList.brandOptionList,
    groupOptionList: state.extraList.groupOptionList,
    modelOptionList: state.extraList.modelOptionList,
    dataSource: state.extraList.dataSource,
    dataLength: state.extraList.dataLength,
    searchData: state.extraList.searchData,
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
  const onDownloadClick = () => dispatch(download());
  const onUploadClick = (excel) => dispatch(uploadExcel(excel));

  const columns = [
    {
      title: "번호",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      width: 100,
    },
    {
      title: "브랜드",
      dataIndex: "brand_name",
      key: "brand_name",
      align: "center",
      width: 364,
    },
    {
      title: "모델",
      dataIndex: "model_name",
      key: "model_name",
      align: "center",
      width: 364,
    },
    {
      title: "등록지역",
      dataIndex: "registered_area",
      key: "registered_area",
      align: "center",
      width: 150,
    },
    {
      title: "면세조건",
      dataIndex: "displacement",
      key: "displacement",
      align: "center",
      width: 150,
    },
    {
      title: "취득세",
      dataIndex: "acquisition_tax",
      key: "acquisition_tax",
      align: "center",
      width: 150,
    },
    {
      title: "채권할인",
      dataIndex: "bond_discount",
      key: "bond_discount",
      align: "center",
      width: 150,
    },
    {
      title: "탁송",
      dataIndex: "consignment",
      key: "consignment",
      align: "center",
      width: 150,
    },
  ];

  const tableDataSource = {
    topItems: [
      {
        type: Constants.inputTypes.button,
        onClick: onDownloadClick,
        label: "엑셀 다운로드",
        style: "white-button table-data-button",
      },
      {
        type: Constants.inputTypes.upload,
        name: "excel",
        action: onUploadClick,
        accept: ".xlsx",
        label: "엑셀 등록",
        style: "black-button table-data-button",
      },
    ],
    tableData: dataSource,
    tableColumns: columns,
  };

  return (
    <Space direction="vertical" size={18} className="main-layout">
      {/* Page Header */}
      <Space direction="vertical" size={11}>
        <label className="main-header-title">면세조건/등록지역/탁송</label>
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
            <Col flex="auto" className="table-value">
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
                  style={{ width: 300 }}
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
                  style={{ width: 300 }}
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
                  style={{ width: 300 }}
                >
                  {modelOptionList
                    .filter((item) => item.group_id === searchData.group_id)
                    .map((optionItem, optionIndex) => (
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

      {dataLength > 10 ? (
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
