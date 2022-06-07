import { Col, Divider, Row, Space, Button, Select, Input } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
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
  download,
} from "../../../store/reducers/estimation/assignment/list";

// 목록페지
function List() {
  const { offset, dataSource, dataLength, searchData, summaryData } =
    useSelector((state) => ({
      offset: state.assignmentList.offset,
      dataSource: state.assignmentList.dataSource,
      dataLength: state.assignmentList.dataLength,
      searchData: state.assignmentList.searchData,
      summaryData: state.assignmentList.summaryData,
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

  const columns = [
    {
      title: "번호",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      width: 100,
    },
    {
      title: "지점",
      dataIndex: "group_id",
      key: "group_id",
      align: "center",
      width: 164,
      render: (group_id) =>
        Constants.userAreaGroupOptions.filter((item) => item.value === group_id)
          .length
          ? Constants.userAreaGroupOptions.filter(
              (item) => item.value === group_id
            )[0].label
          : "",
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 164,
    },
    {
      title: "견적서",
      dataIndex: "quotation",
      key: "quotation",
      align: "center",
      width: 164,
    },
    {
      title: "대기",
      dataIndex: "wait",
      key: "wait",
      align: "center",
      width: 164,
    },
    {
      title: "상담",
      dataIndex: "business",
      key: "business",
      align: "center",
      width: 164,
    },
    {
      title: "계약",
      dataIndex: "contract",
      key: "contract",
      align: "center",
      width: 164,
    },
    {
      title: "출고",
      dataIndex: "release",
      key: "release",
      align: "center",
      width: 164,
    },
    {
      title: "종료",
      dataIndex: "close",
      key: "close",
      align: "center",
      width: 164,
    },
    {
      title: "관리",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      width: 164,
      render: (idx) => (
        <Row justify="center">
          <Col>
            <Space size={15} split={<Divider type="vertical" />}>
              <Link to={"/estimation/assignment/manage/" + idx}>
                <Button className="black-button small-button rounded-button">
                  할당관리
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
        onClick: onDownloadClick,
        label: "엑셀로 내려받기",
        style: "black-button big-button create-button",
        width: 150,
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
              <label className="table-header-label">지점</label>
            </Col>
            <Col flex="636px" className="table-value">
              <Space size={6}>
                <Select
                  name="group_id"
                  value={searchData.group_id}
                  onChange={(value) => {
                    onSearchComponentChange("group_id", value);
                  }}
                  suffixIcon={<CaretDownOutlined />}
                  placeholder="지점 선택"
                  size="large"
                  style={{ width: 200 }}
                >
                  {Constants.userAreaGroupOptions.map(
                    (optionItem, optionIndex) => (
                      <Select.Option key={optionIndex} value={optionItem.value}>
                        {optionItem.label}
                      </Select.Option>
                    )
                  )}
                </Select>
              </Space>
            </Col>
            <Col flex="154px" className="table-header">
              <label className="table-header-label">이름</label>
            </Col>
            <Col flex="auto" className="table-value">
              <Space size={6}>
                <Input
                  name="name"
                  value={searchData.name}
                  onChange={(e) => {
                    onSearchComponentChange(e.target.name, e.target.value);
                  }}
                  size="large"
                  style={{ width: 200 }}
                  placeholder="이름 입력"
                />
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
