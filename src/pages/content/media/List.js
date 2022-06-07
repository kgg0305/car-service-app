import {
  Col,
  Divider,
  Row,
  Space,
  Progress,
  Button,
  DatePicker,
  Select,
} from "antd";
import React, { useState } from "react";
import moment from "moment";
import { CaretDownOutlined } from "@ant-design/icons";
import TableList from "../../../components/TableList";
import { Constants } from "../../../constants/Constants";
import styles from "../../../assets/styles/pages/content/Media.module.css";
import { GetDateStringFromDate } from "../../../constants/GlobalFunctions";

// 목록페지
function List() {
  const onSearchComponentChange = () => {};
  const onResetClick = () => {};
  const onSearchClick = () => {};
  const searchData = {};

  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      rank: "1",
      name: "줌자동차",
      view: "999,999,999",
      rate: 20,
      average: "999 시간",
    },
    {
      key: 2,
      rank: "1",
      name: "줌자동차",
      view: "999,999,999",
      rate: 30,
      average: "999 시간",
    },
  ]);

  const columns = [
    {
      title: "순위",
      dataIndex: "rank",
      key: "rank",
      align: "center",
      width: 104,
    },
    {
      title: "매체명",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 300,
    },
    {
      title: "페이지뷰(PV)",
      dataIndex: "view",
      key: "view",
      align: "center",
      width: 200,
    },
    {
      title: "비율",
      dataIndex: "rate",
      key: "rate",
      align: "center",
      width: 700,
      render: (rate) => (
        <Progress
          type="line"
          strokeWidth={30}
          strokeColor="#3FA9CB"
          strokeLinecap="square"
          percent={rate}
          style={{ paddingLeft: 14, paddingRight: 42 }}
        />
      ),
    },
    {
      title: "평균체류시간",
      dataIndex: "average",
      key: "average",
      align: "center",
      width: 277,
    },
  ];

  const tableList = {
    title: "페이지뷰 순위",
    tableData: dataSource,
    tableColumns: columns,
  };

  return (
    <Space direction="vertical" size={18} className="main-layout">
      {/* Page Header */}
      <Space direction="vertical" size={11}>
        <label className="main-header-title">매체별 페이지뷰</label>
        <Divider className="main-body-divider" />
      </Space>

      {/* Search Section */}
      <Space
        className="search-layout"
        direction="vertical"
        size={20}
        style={{ height: 215 }}
      >
        <label className="sub-title-label">검색</label>
        <Space direction="vertical" size={0}>
          <Row
            key={1}
            gutter={[0]}
            align="middle"
            style={{ height: 80 }}
            className="search-table-layout"
          >
            <Col flex="154px" className="table-header">
              <label className="table-header-label">날짜</label>
            </Col>
            <Col flex="797px" className="table-value">
              <Space size={30}>
                <Space size={2}>
                  <Button
                    key={1}
                    onClick={() => onSearchComponentChange("date_period", 0)}
                    size="large"
                    className={
                      "date-button " +
                      (searchData.date_period === 0
                        ? "black-button"
                        : "white-button")
                    }
                  >
                    전체
                  </Button>
                  <Button
                    key={2}
                    onClick={() => onSearchComponentChange("date_period", 1)}
                    size="large"
                    className={
                      "date-button " +
                      (searchData.date_period === 1
                        ? "black-button"
                        : "white-button")
                    }
                  >
                    오늘
                  </Button>
                  <Button
                    key={3}
                    onClick={() => onSearchComponentChange("date_period", 2)}
                    size="large"
                    className={
                      "date-button " +
                      (searchData.date_period === 2
                        ? "black-button"
                        : "white-button")
                    }
                  >
                    어제
                  </Button>
                  <Button
                    key={4}
                    onClick={() => onSearchComponentChange("date_period", 3)}
                    size="large"
                    className={
                      "date-button " +
                      (searchData.date_period === 3
                        ? "black-button"
                        : "white-button")
                    }
                  >
                    3일
                  </Button>
                  <Button
                    key={5}
                    onClick={() => onSearchComponentChange("date_period", 4)}
                    size="large"
                    className={
                      "date-button " +
                      (searchData.date_period === 4
                        ? "black-button"
                        : "white-button")
                    }
                  >
                    7일
                  </Button>
                  <Button
                    key={6}
                    onClick={() => onSearchComponentChange("date_period", 5)}
                    size="large"
                    className={
                      "date-button " +
                      (searchData.date_period === 5
                        ? "black-button"
                        : "white-button")
                    }
                  >
                    1개월
                  </Button>
                  <Button
                    key={7}
                    onClick={() => onSearchComponentChange("date_period", 6)}
                    size="large"
                    className={
                      "date-button " +
                      (searchData.date_period === 6
                        ? "black-button"
                        : "white-button")
                    }
                  >
                    3개월
                  </Button>
                </Space>
                <Space size={6}>
                  <DatePicker
                    key={8}
                    name="s_date"
                    value={searchData.s_date ? moment(searchData.s_date) : ""}
                    onChange={(value) => {
                      onSearchComponentChange(
                        "s_date",
                        GetDateStringFromDate(new Date(value.toString()))
                      );
                    }}
                    placeholder="시작일"
                    style={{ width: 150 }}
                    size="large"
                  />
                  <label>~</label>
                  <DatePicker
                    key={9}
                    name="e_date"
                    value={searchData.e_date ? moment(searchData.e_date) : ""}
                    onChange={(value) => {
                      onSearchComponentChange(
                        "e_date",
                        GetDateStringFromDate(new Date(value.toString()))
                      );
                    }}
                    placeholder="종료일"
                    style={{ width: 150 }}
                    size="large"
                  />
                </Space>
              </Space>
            </Col>
            <Col flex="154px" className="table-header">
              <label className="table-header-label">매체</label>
            </Col>
            <Col flex="auto" className="table-value">
              <Select
                name="idx"
                value={searchData.idx}
                onChange={(value) => {
                  onSearchComponentChange("idx", value);
                }}
                suffixIcon={<CaretDownOutlined />}
                placeholder="선택"
                size="large"
                style={{ width: 200 }}
              >
                {Constants.purchaseMethodOptions.map(
                  (optionItem, optionIndex) => (
                    <Select.Option key={optionIndex} value={optionItem.value}>
                      {optionItem.label}
                    </Select.Option>
                  )
                )}
              </Select>
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

      <Space direction="vertical" size={20}>
        <label className="sub-title-label">페이지뷰 요약</label>
        <Row gutter={[20]}>
          <Col>
            <div className={styles.summaryBody}>
              <Space direction="vertical" size={20}>
                <label className={styles.summaryHeaderLabel}>
                  페이지뷰(PV)
                </label>
                <label className={styles.summaryValueLabel}>999,999,999</label>
              </Space>
            </div>
          </Col>
          <Col>
            <div className={styles.summaryBody}>
              <Space direction="vertical" size={20}>
                <label className={styles.summaryHeaderLabel}>
                  신규방문자 PV
                </label>
                <label className={styles.summaryValueLabel}>999,999,999</label>
              </Space>
            </div>
          </Col>
          <Col>
            <div className={styles.summaryBody}>
              <Space direction="vertical" size={20}>
                <label className={styles.summaryHeaderLabel}>재방문자 PV</label>
                <label className={styles.summaryValueLabel}>999,999,999</label>
              </Space>
            </div>
          </Col>
          <Col>
            <div className={styles.summaryBody}>
              <Space direction="vertical" size={20}>
                <label className={styles.summaryHeaderLabel}>방문횟수</label>
                <label className={styles.summaryValueLabel}>999,999,999</label>
              </Space>
            </div>
          </Col>
          <Col>
            <div className={styles.summaryBody}>
              <Space direction="vertical" size={20}>
                <label className={styles.summaryHeaderLabel}>방문당 PV</label>
                <label className={styles.summaryValueLabel}>999,999,999</label>
              </Space>
            </div>
          </Col>
        </Row>
      </Space>

      <Space direction="vertical" size={20}>
        <label className="sub-title-label">페이지뷰 그래프</label>
        <div className={styles.graphBody}></div>
      </Space>

      {/* Body Section */}
      <TableList dataSource={tableList} />
      <div style={{ height: 69 }}></div>
    </Space>
  );
}

export default List;
