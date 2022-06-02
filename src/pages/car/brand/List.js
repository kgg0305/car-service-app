import { Col, Divider, Row, Space, Select, Button, Image } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import TableList from "../../../components/TableList";
import { Constants } from "../../../constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import {
  init,
  reset,
  search,
  setSearch,
  showMore,
} from "../../../store/reducers/car/brand/list";
import { CaretDownOutlined } from "@ant-design/icons";

const { Option } = Select;

// 목록페지
function List() {
  const { offset, brandOptionList, dataSource, searchData } = useSelector(
    (state) => ({
      offset: state.brandList.offset,
      brandOptionList: state.brandList.brandOptionList,
      dataSource: state.brandList.dataSource,
      searchData: state.brandList.searchData,
    })
  );

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
      width: 154,
    },
    {
      title: "로고",
      dataIndex: "logo",
      key: "logo",
      align: "center",
      width: 192.5,
      render: (path) => (
        <Image
          width={50}
          height={50}
          src={window.location.origin + "/uploads/brand/" + path}
        />
      ),
    },
    {
      title: "브랜드",
      dataIndex: "brand_name",
      key: "brand_name",
      align: "center",
      width: 422,
    },
    {
      title: "순서",
      dataIndex: "sequence",
      key: "sequence",
      align: "center",
      width: 169,
    },
    {
      title: "사용여부",
      dataIndex: "is_use",
      key: "is_use",
      align: "center",
      width: 211,
      render: (is_use) =>
        Constants.availableOptions.filter((item) => item.value == is_use)[0]
          .label,
    },
    {
      title: "등록 차량수",
      dataIndex: "model_count",
      key: "model_count",
      align: "center",
      width: 211,
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
            <Space size={15} split={<Divider type="vertical" />}>
              <Link to={"/car/group/manage/" + idx}>
                <Button className="white-button small-button rounded-button">
                  그룹관리
                </Button>
              </Link>
              <Link to={"/car/brand/edit/" + idx}>
                <Button className="black-button small-button rounded-button">
                  수정
                </Button>
              </Link>
            </Space>
          </Col>
        </Row>
      ),
    },
  ];

  const tableDataSource = {
    topItems: [
      {
        type: Constants.inputTypes.button,
        link: "/car/brand/create",
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
        <label className="main-header-title">브랜드 목록</label>
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
              <label className="table-header-label">차량선택</label>
            </Col>
            <Col flex="auto" className="table-value">
              <Space size={6}>
                <Select
                  name="idx"
                  value={searchData.idx}
                  onChange={(value) => {
                    onSearchComponentChange("idx", value);
                  }}
                  suffixIcon={<CaretDownOutlined />}
                  placeholder="브랜드 선택"
                  size="large"
                  style={{ width: 400 }}
                >
                  {brandOptionList.map((optionItem, optionIndex) => (
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

      <Row justify="center">
        <label className="show-more-label" onClick={onTableMoreClick}>
          더보기
        </label>
      </Row>
    </Space>
  );
}

export default List;
