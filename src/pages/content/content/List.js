import {
  Col,
  Divider,
  Row,
  Space,
  Button,
  Switch,
  DatePicker,
  Select,
  Input,
} from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertDeleteModal from "../../../components/AlertDeleteModal";
import TableList from "../../../components/TableList";
import { Constants } from "../../../constants/Constants";
import {
  GetDateFullTimeStringUsingKorFromDate,
  GetDateStringFromDate,
} from "../../../constants/GlobalFunctions";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  init,
  reset,
  search,
  setSearch,
  showMore,
  showConfirm,
  closeConfirm,
  remove,
  setUse,
  removeRedirectTo,
} from "../../../store/reducers/content/content/list";

// 목록페지
function List() {
  let navigate = useNavigate();

  const { redirectTo, offset, dataSource, searchData, confirm } = useSelector(
    (state) => ({
      redirectTo: state.contentList.redirectTo,
      offset: state.contentList.offset,
      dataSource: state.contentList.dataSource,
      searchData: state.contentList.searchData,
      confirm: state.contentList.confirm,
    })
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (redirectTo) {
      const redirectURL = redirectTo;
      dispatch(removeRedirectTo());
      navigate(redirectURL);
    }
    dispatch(init());
  }, [redirectTo, dispatch]);

  const onTableMoreClick = () => dispatch(showMore(offset + 10));
  const onClickSearch = () => dispatch(search(searchData));
  const onClickReset = () => dispatch(reset());
  const onChangeSearchComponent = (name, value) =>
    dispatch(setSearch(name, value));
  const onDeleteClick = async (idx) => dispatch(showConfirm(idx));
  const onCloseConfirmClick = () => dispatch(closeConfirm());
  const deleteInfo = async (idx) => dispatch(remove("/content/content", idx));
  const onChangeUse = (idx, checked) =>
    dispatch(setUse(dataSource, idx, checked));

  const columns = [
    {
      title: "번호",
      dataIndex: "idx",
      key: "idx",
      align: "center",
    },
    {
      title: "매체명",
      dataIndex: "media_type",
      key: "media_type",
      align: "center",
    },
    {
      title: "카테고리",
      dataIndex: "category_id",
      key: "category_id",
      align: "center",
    },
    {
      title: "콘텐츠 제목",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "추천뉴스",
      dataIndex: "recommendation",
      key: "recommendation",
      align: "center",
    },
    {
      title: "조회수",
      dataIndex: "views",
      key: "views",
      align: "center",
    },
    {
      title: "등록일",
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      render: (created_at) =>
        GetDateFullTimeStringUsingKorFromDate(new Date(created_at)),
    },
    {
      title: "사용여부",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      render: (idx) => renderSwitchComponent(idx),
    },
    {
      title: "관리",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      render: (idx) => (
        <Row justify="center">
          <Col>
            <Button
              className="black-button small-button rounded-button"
              onClick={() => onDeleteClick(idx)}
              size="large"
            >
              삭제
            </Button>
          </Col>
        </Row>
      ),
    },
  ];

  const tableDataSource = {
    tableData: dataSource,
    tableColumns: columns,
  };

  const renderSwitchComponent = (idx) => {
    return (
      <Row justify="center" gutter={[11]}>
        <Col>
          <Switch
            checked={
              dataSource.filter((item) => item.idx === idx)[0].is_use === "0"
                ? false
                : true
            }
            onClick={(checked) => onChangeUse(idx, checked)}
          />
        </Col>
        <Col>
          <label className="switch-label">
            {
              Constants.availableOptions.filter(
                (item) =>
                  item.value ===
                  dataSource.filter((item) => item.idx === idx)[0].is_use
              )[0].label
            }
          </label>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Space direction="vertical" size={18} className="main-layout">
        {/* Page Header */}
        <Space direction="vertical" size={18}>
          <label className="main-header-title">콘텐츠 관리</label>
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
                      onChangeSearchComponent(
                        "s_date",
                        GetDateStringFromDate(new Date(value.toString()))
                      );
                    }}
                    placeholder="시작일"
                    size="large"
                  />
                  <DatePicker
                    key={9}
                    name="e_date"
                    value={searchData.e_date ? moment(searchData.e_date) : ""}
                    onChange={(value) => {
                      onChangeSearchComponent(
                        "e_date",
                        GetDateStringFromDate(new Date(value.toString()))
                      );
                    }}
                    placeholder="종료일"
                    size="large"
                  />
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
                    onChangeSearchComponent("idx", value);
                  }}
                  suffixIcon={<CaretDownOutlined />}
                  placeholder="선택"
                  size="large"
                  style={{ width: 150 }}
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
            <Row
              key={2}
              gutter={[0]}
              align="middle"
              style={{ height: 80 }}
              className="table"
            >
              <Col flex="154px" className="table-header">
                <label className="table-header-label">검색어</label>
              </Col>
              <Col flex="auto" className="table-value">
                <Space size={6}>
                  <Input
                    name="title"
                    value={searchData.title}
                    onChange={(e) => {
                      onChangeSearchComponent(e.target.name, e.target.value);
                    }}
                    size="large"
                    style={{ width: 200 }}
                    placeholder="검색어 입력"
                  />
                </Space>
              </Col>
              <Col flex="154px" className="table-header">
                <label className="table-header-label">카테고리</label>
              </Col>
              <Col flex="auto" className="table-value">
                <Select
                  name="category_id"
                  value={searchData.category_id}
                  onChange={(value) => {
                    onChangeSearchComponent("category_id", value);
                  }}
                  suffixIcon={<CaretDownOutlined />}
                  placeholder="선택"
                  size="large"
                  style={{ width: 150 }}
                >
                  {Constants.dateTypeOptions.map((optionItem, optionIndex) => (
                    <Select.Option key={optionIndex} value={optionItem.value}>
                      {optionItem.label}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
              <Col flex="154px" className="table-header">
                <label className="table-header-label">추천뉴스</label>
              </Col>
              <Col flex="auto" className="table-value">
                <Select
                  name="is_recommend"
                  value={searchData.is_recommend}
                  onChange={(value) => {
                    onChangeSearchComponent("is_recommend", value);
                  }}
                  suffixIcon={<CaretDownOutlined />}
                  placeholder="선택"
                  size="large"
                  style={{ width: 150 }}
                >
                  {Constants.isRecommendOptions.map(
                    (optionItem, optionIndex) => (
                      <Select.Option key={optionIndex} value={optionItem.value}>
                        {optionItem.label}
                      </Select.Option>
                    )
                  )}
                </Select>
              </Col>
              <Col flex="154px" className="table-header">
                <label className="table-header-label">사용여부</label>
              </Col>
              <Col flex="auto" className="table-value">
                <Select
                  name="is_use"
                  value={searchData.is_use}
                  onChange={(value) => {
                    onChangeSearchComponent("is_use", value);
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
              </Col>
            </Row>
          </Space>
          <Row key={2} justify="center" gutter={[17, 0]}>
            <Col>
              <Button
                className="white-button big-button"
                onClick={onClickReset}
              >
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
      <AlertDeleteModal
        visible={confirm.show}
        onConfirmClick={() => deleteInfo(confirm.idx)}
        onCancelClick={onCloseConfirmClick}
      />
    </>
  );
}

export default List;
