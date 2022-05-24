import { Col, Divider, Row, Space, Button, Select, DatePicker } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import TableList from "../../../components/TableList";
import { Constants } from "../../../constants/Constants";
import { GetDateStringFromDate } from "../../../constants/GlobalFunctions";
import { CaretDownOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  init,
  reset,
  search,
  setSearch,
  showMore,
} from "../../../store/reducers/car/discount/list";

// 목록페지
function List() {
  const {
    offset,
    brandOptionList,
    discountKindOptionList,
    dataSource,
    searchData,
  } = useSelector((state) => ({
    offset: state.discountList.offset,
    brandOptionList: state.discountList.brandOptionList,
    discountKindOptionList: state.discountList.discountKindOptionList,
    dataSource: state.discountList.dataSource,
    searchData: state.discountList.searchData,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const onTableMoreClick = () => dispatch(showMore(offset + 10));
  const onClickSearch = () => dispatch(search(searchData));
  const onClickReset = () => dispatch(reset());
  const onChangeSearchComponent = (name, value) =>
    dispatch(setSearch(name, value));

  const columns = [
    {
      title: "번호",
      dataIndex: "idx",
      key: "idx",
      align: "center",
    },
    {
      title: "브랜드",
      dataIndex: "brand_name",
      key: "brand_name",
      align: "center",
    },
    {
      title: "종류",
      dataIndex: "kind_name",
      key: "kind_name",
      align: "center",
    },
    {
      title: "조건",
      dataIndex: "condition_name",
      key: "condition_name",
      align: "center",
    },
    {
      title: "할인비용",
      dataIndex: "discount_price",
      key: "discount_price",
      align: "center",
    },
    {
      title: "시작일",
      dataIndex: "s_date",
      key: "s_date",
      align: "center",
      render: (s_date) => GetDateStringFromDate(new Date(s_date)),
    },
    {
      title: "종료일",
      dataIndex: "e_date",
      key: "e_date",
      align: "center",
      render: (e_date) => GetDateStringFromDate(new Date(e_date)),
    },
    {
      title: "관리",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      render: (idx) => (
        <Row justify="center">
          <Col>
            <Link to={"/car/discount/edit/" + idx}>
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
        link: "/car/discount/create",
        label: "등록",
        style: "black-button big-button",
        width: 150,
      },
    ],
    tableData: dataSource,
    tableColumns: columns,
  };

  return (
    <Space direction="vertical" size={18} className="main-layout">
      {/* Page Header */}
      <Space direction="vertical" size={18}>
        <label className="main-header-title">할인/비용 목록</label>
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
              <label className="table-header-label">브랜드</label>
            </Col>
            <Col flex="auto" className="table-value">
              <Space size={6}>
                <Select
                  name="brand_id"
                  value={searchData.brand_id}
                  onChange={(value) => {
                    onChangeSearchComponent("brand_id", value);
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
                  name="idx"
                  value={searchData.idx}
                  onChange={(value) => {
                    onChangeSearchComponent("idx", value);
                  }}
                  suffixIcon={<CaretDownOutlined />}
                  placeholder="할인종류 선택"
                  size="large"
                  style={{ width: 300 }}
                >
                  {discountKindOptionList
                    .filter((item) => item.brand_id == searchData.brand_id)
                    .map((optionItem, optionIndex) => (
                      <Select.Option key={optionIndex} value={optionItem.value}>
                        {optionItem.label}
                      </Select.Option>
                    ))}
                </Select>
              </Space>
            </Col>
          </Row>
          <Row
            key={1}
            gutter={[0]}
            align="middle"
            style={{ height: 80 }}
            className="table"
          >
            <Col flex="154px" className="table-header">
              <label className="table-header-label">날짜</label>
            </Col>
            <Col flex="auto" className="table-value">
              <Space size={6}>
                <Button
                  key={1}
                  onClick={() => onChangeSearchComponent("date_period", 0)}
                  size="large"
                  className={
                    searchData.date_period === 0
                      ? "black-button"
                      : "white-button"
                  }
                >
                  전체
                </Button>
                <Button
                  key={2}
                  onClick={() => onChangeSearchComponent("date_period", 1)}
                  size="large"
                  className={
                    searchData.date_period === 1
                      ? "black-button"
                      : "white-button"
                  }
                >
                  오늘
                </Button>
                <Button
                  key={3}
                  onClick={() => onChangeSearchComponent("date_period", 2)}
                  size="large"
                  className={
                    searchData.date_period === 2
                      ? "black-button"
                      : "white-button"
                  }
                >
                  어제
                </Button>
                <Button
                  key={4}
                  onClick={() => onChangeSearchComponent("date_period", 3)}
                  size="large"
                  className={
                    searchData.date_period === 3
                      ? "black-button"
                      : "white-button"
                  }
                >
                  3일
                </Button>
                <Button
                  key={5}
                  onClick={() => onChangeSearchComponent("date_period", 4)}
                  size="large"
                  className={
                    searchData.date_period === 4
                      ? "black-button"
                      : "white-button"
                  }
                >
                  7일
                </Button>
                <Button
                  key={6}
                  onClick={() => onChangeSearchComponent("date_period", 5)}
                  size="large"
                  className={
                    searchData.date_period === 5
                      ? "black-button"
                      : "white-button"
                  }
                >
                  1개월
                </Button>
                <Button
                  key={7}
                  onClick={() => onChangeSearchComponent("date_period", 6)}
                  size="large"
                  className={
                    searchData.date_period === 6
                      ? "black-button"
                      : "white-button"
                  }
                >
                  3개월
                </Button>
                <DatePicker
                  key={8}
                  name="s_date"
                  value={searchData.s_date ? moment(searchData.s_date) : ""}
                  onChange={(value) => {
                    onChangeSearchComponent("s_date", value.toString());
                  }}
                  placeholder="시작일"
                  size="large"
                />
                <DatePicker
                  key={9}
                  name="e_date"
                  value={searchData.e_date ? moment(searchData.e_date) : ""}
                  onChange={(value) => {
                    onChangeSearchComponent("e_date", value.toString());
                  }}
                  placeholder="종료일"
                  size="large"
                />
              </Space>
            </Col>
          </Row>
        </Space>

        <Row key={2} justify="center" gutter={[17, 0]}>
          <Col>
            <Button className="white-button big-button" onClick={onClickReset}>
              초기화
            </Button>
          </Col>
          <Col>
            <Button
              className="black-button big-button"
              onClick={() => onClickSearch(searchData)}
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
