import {
  Col,
  Divider,
  Row,
  Space,
  Button,
  Input,
  Select,
  DatePicker,
} from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import TableList from "../../../components/TableList";
import { Constants } from "../../../constants/Constants";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  init,
  reset,
  search,
  setSearch,
  showMore,
  download,
  assign,
  setGroup,
} from "../../../store/reducers/estimation/quotation/list";
import { GetDateStringFromDate } from "../../../constants/GlobalFunctions";

// 목록페지
function List() {
  const {
    offset,
    dataSource,
    dataLength,
    searchData,
    userOptionList,
    summaryData,
    siderMenuRole,
  } = useSelector((state) => ({
    offset: state.quotationList.offset,
    dataSource: state.quotationList.dataSource,
    dataLength: state.quotationList.dataLength,
    searchData: state.quotationList.searchData,
    userOptionList: state.quotationList.userOptionList,
    summaryData: state.quotationList.summaryData,
    siderMenuRole: state.role.siderMenuRole,
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
  const onGroupChange = (idx, value) => dispatch(setGroup(idx, value));
  const onAssignToChange = (idx, value) => dispatch(assign(idx, value));
  const onDownloadClick = () => dispatch(download());

  const columns = [
    {
      title: "번호",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      width: "100px",
    },
    {
      title: "유입경로",
      dataIndex: "purchase_path",
      key: "purchase_path",
      align: "center",
      width: "124px",
    },
    {
      title: "구입방법",
      dataIndex: "purchase_method",
      key: "purchase_method",
      align: "center",
      width: "103px",
      render: (purchase_method) =>
        Constants.purchaseMethodOptions.filter(
          (item) => item.value == purchase_method
        ).length
          ? Constants.purchaseMethodOptions.filter(
              (item) => item.value == purchase_method
            )[0].label
          : "",
    },
    {
      title: "이름",
      dataIndex: "client_name",
      key: "client_name",
      align: "center",
      width: "124px",
    },
    {
      title: "연락처",
      dataIndex: "client_phone",
      key: "client_phone",
      align: "center",
      width: "186px",
    },
    {
      title: "브랜드",
      dataIndex: "brand_name",
      key: "brand_name",
      align: "center",
      width: "208px",
    },
    {
      title: "차종",
      dataIndex: "kind_name",
      key: "kind_name",
      align: "center",
    },
    {
      title: "지점",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      width: "179px",
      render: (idx) => renderAreaGroupSelect(idx),
    },
    {
      title: "인원",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      width: "178px",
      render: (idx) => renderUserSelect(idx),
    },
    {
      title: "관리",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      width: "160px",
      render: (idx) => (
        <Row justify="center">
          <Col>
            <Link to={"/estimation/quotation/detail/" + idx}>
              <Button className="black-button small-button rounded-button">
                상세보기
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
        onClick: onDownloadClick,
        label: "엑셀로 내려받기",
        style: "black-button table-data-button",
      },
    ],
    subItems: [
      {
        type: Constants.inputTypes.input,
        disabled: true,
        label: "견적서",
        value: summaryData.quotation,
        width: 130,
      },
      {
        type: Constants.inputTypes.input,
        disabled: true,
        label: "대기",
        value: summaryData.wait,
        width: 130,
      },
      {
        type: Constants.inputTypes.input,
        disabled: true,
        label: "상담",
        value: summaryData.business,
        width: 130,
      },
      {
        type: Constants.inputTypes.input,
        disabled: true,
        label: "계약",
        value: summaryData.contract,
        width: 130,
      },
      {
        type: Constants.inputTypes.input,
        disabled: true,
        label: "출고",
        value: summaryData.release,
        width: 130,
      },
      {
        type: Constants.inputTypes.input,
        disabled: true,
        label: "종료",
        value: summaryData.close,
        width: 130,
      },
    ],
    tableData: dataSource,
    tableColumns: columns,
  };

  const renderAreaGroupSelect = (idx) => {
    const quotation_info = dataSource.filter((item) => item.idx === idx)[0];
    return (
      <Row justify="center">
        <Col>
          <Select
            size="large"
            name="group_id"
            value={quotation_info.group_id}
            onChange={(value) => {
              onGroupChange(idx, value);
            }}
            suffixIcon={<CaretDownOutlined />}
            placeholder={"선택"}
            style={{ width: 130 }}
            disabled={siderMenuRole["estimation"][0] === 2 ? false : true}
          >
            {Constants.userAreaGroupOptions.map((optionItem, optionIndex) => (
              <Select.Option key={optionIndex} value={optionItem.value}>
                {optionItem.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
    );
  };

  const renderUserSelect = (idx) => {
    const quotation_info = dataSource.filter((item) => item.idx === idx)[0];
    return (
      <Row justify="center">
        <Col>
          <Select
            size="large"
            name="assign_to"
            value={quotation_info.assign_to}
            onChange={(value) => {
              onAssignToChange(idx, value);
            }}
            suffixIcon={<CaretDownOutlined />}
            placeholder={"선택"}
            style={{ width: 130 }}
            disabled={siderMenuRole["estimation"][0] === 2 ? false : true}
          >
            {userOptionList
              .filter(
                (item) =>
                  item.type_id === "1" &&
                  item.group_id === quotation_info.group_id
              )
              .map((optionItem, optionIndex) => (
                <Select.Option key={optionIndex} value={optionItem.value}>
                  {optionItem.label}
                </Select.Option>
              ))}
          </Select>
        </Col>
      </Row>
    );
  };

  return (
    <Space direction="vertical" size={18} className="main-layout">
      {/* Page Header */}
      <Space direction="vertical" size={11}>
        <label className="main-header-title">견적신청 목록</label>
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
              <label className="table-header-label">날짜</label>
            </Col>
            <Col flex="auto" className="table-value">
              <Space size={30}>
                <Select
                  name="date_type"
                  value={searchData.date_type}
                  onChange={(value) => {
                    onSearchComponentChange("date_type", value);
                  }}
                  suffixIcon={<CaretDownOutlined />}
                  placeholder="등록일"
                  size="large"
                  style={{ width: 130 }}
                >
                  {Constants.dateTypeOptions.map((optionItem, optionIndex) => (
                    <Select.Option key={optionIndex} value={optionItem.value}>
                      {optionItem.label}
                    </Select.Option>
                  ))}
                </Select>
                <Space size={6}>
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
          </Row>
          <Row
            key={2}
            gutter={[0]}
            align="middle"
            style={{ height: 80 }}
            className="search-table-layout"
          >
            <Col flex="154px" className="table-header">
              <label className="table-header-label">검색 I</label>
            </Col>
            <Col flex="auto" className="table-value">
              <Space size={6}>
                <Select
                  name="purchase_method"
                  value={searchData.purchase_method}
                  onChange={(value) => {
                    onSearchComponentChange("purchase_method", value);
                  }}
                  suffixIcon={<CaretDownOutlined />}
                  placeholder="구입방법"
                  size="large"
                  style={{ width: 130 }}
                >
                  {Constants.purchaseMethodOptions.map(
                    (optionItem, optionIndex) => (
                      <Select.Option key={optionIndex} value={optionItem.value}>
                        {optionItem.label}
                      </Select.Option>
                    )
                  )}
                </Select>
                <Select
                  name="search_type"
                  value={searchData.search_type}
                  onChange={(value) => {
                    onSearchComponentChange("search_type", value);
                  }}
                  suffixIcon={<CaretDownOutlined />}
                  placeholder="검색구분"
                  size="large"
                  style={{ width: 130 }}
                >
                  {Constants.searchTypeOptions.map(
                    (optionItem, optionIndex) => (
                      <Select.Option key={optionIndex} value={optionItem.value}>
                        {optionItem.label}
                      </Select.Option>
                    )
                  )}
                </Select>
                <Input
                  name="search_text"
                  value={searchData.search_text}
                  onChange={(e) => {
                    onSearchComponentChange(e.target.name, e.target.value);
                  }}
                  size="large"
                  style={{ width: 200 }}
                  placeholder="검색어 입력"
                />
                <Input
                  name="purchase_path"
                  value={searchData.purchase_path}
                  onChange={(e) => {
                    onSearchComponentChange(e.target.name, e.target.value);
                  }}
                  size="large"
                  style={{ width: 200 }}
                  placeholder="유입경로 입력"
                />
              </Space>
            </Col>
          </Row>
          <Row
            key={3}
            gutter={[0]}
            align="middle"
            style={{ height: 80 }}
            className="search-table-layout"
          >
            <Col flex="154px" className="table-header">
              <label className="table-header-label">검색 II</label>
            </Col>
            <Col flex="auto" className="table-value">
              <Space size={6}>
                <Button
                  key={1}
                  onClick={() => onSearchComponentChange("status", 0)}
                  size="large"
                  className={
                    (searchData.status === 0
                      ? "black-button"
                      : "white-button") + " big-button search-status-button"
                  }
                >
                  전체
                </Button>
                <Button
                  key={2}
                  onClick={() => onSearchComponentChange("status", 1)}
                  size="large"
                  className={
                    (searchData.status === 1
                      ? "black-button"
                      : "white-button") + " big-button search-status-button"
                  }
                >
                  대기중
                </Button>
                <Button
                  key={3}
                  onClick={() => onSearchComponentChange("status", 2)}
                  size="large"
                  className={
                    (searchData.status === 2
                      ? "black-button"
                      : "white-button") + " big-button search-status-button"
                  }
                >
                  상담중
                </Button>
                <Button
                  key={4}
                  onClick={() => onSearchComponentChange("status", 3)}
                  size="large"
                  className={
                    (searchData.status === 3
                      ? "black-button"
                      : "white-button") + " big-button search-status-button"
                  }
                >
                  계약중
                </Button>
                <Button
                  key={5}
                  onClick={() => onSearchComponentChange("status", 4)}
                  size="large"
                  className={
                    (searchData.status === 4
                      ? "black-button"
                      : "white-button") + " big-button search-status-button"
                  }
                >
                  출고중
                </Button>
                <Button
                  key={6}
                  onClick={() => onSearchComponentChange("status", 5)}
                  size="large"
                  className={
                    (searchData.status === 5
                      ? "black-button"
                      : "white-button") + " big-button search-status-button"
                  }
                >
                  종료
                </Button>
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
  );
}

export default List;
