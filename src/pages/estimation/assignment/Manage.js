import { Col, Divider, Row, Space, Button, Select } from "antd";
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
  assign,
  setGroup,
} from "../../../store/reducers/estimation/assignment/manage";

const { Option } = Select;

// 관리페지
function Manage() {
  const { offset, dataSource, searchData, userOptionList, summaryData } =
    useSelector((state) => ({
      offset: state.assignmentManage.offset,
      dataSource: state.assignmentManage.dataSource,
      searchData: state.assignmentManage.searchData,
      userOptionList: state.assignmentManage.userOptionList,
      summaryData: state.assignmentManage.summaryData,
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
      width: 100,
    },
    {
      title: "유입경로",
      dataIndex: "purchase_path",
      key: "purchase_path",
      align: "center",
      width: 125,
    },
    {
      title: "구입방법",
      dataIndex: "purchase_method",
      key: "purchase_method",
      align: "center",
      width: 104,
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
      width: 125,
    },
    {
      title: "연락처",
      dataIndex: "client_phone",
      key: "client_phone",
      align: "center",
      width: 187,
    },
    {
      title: "브랜드",
      dataIndex: "brand_name",
      key: "brand_name",
      align: "center",
      width: 208,
    },
    {
      title: "차종",
      dataIndex: "kind_name",
      key: "kind_name",
      align: "center",
      width: 208,
    },
    {
      title: "지점",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      width: 180,
      render: (idx) => renderAreaGroupSelect(idx),
    },
    {
      title: "인원",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      width: 179,
      render: (idx) => renderUserSelect(idx),
    },
    {
      title: "관리",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      width: 160,
      render: (idx) => (
        <Row justify="center">
          <Col>
            <Space size={15} split={<Divider type="vertical" />}>
              <Link to={"/estimation/quotation/detail/" + idx}>
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
