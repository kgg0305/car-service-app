import { Col, Divider, Row, Space, Button, Image } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import TableList from "../../../components/TableList";
import { useDispatch, useSelector } from "react-redux";
import { init, showMore } from "../../../store/reducers/content/popular/list";

// 목록페지
function List() {
  const { offset, dataSource, brandOptionList } = useSelector((state) => ({
    offset: state.popularList.offset,
    dataSource: state.popularList.dataSource,
    brandOptionList: state.popularList.brandOptionList,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const onTableMoreClick = () => dispatch(showMore());

  const columns = [
    {
      title: "노출순서",
      dataIndex: "order",
      key: "order",
      align: "center",
    },
    {
      title: "이미지",
      dataIndex: "picture",
      key: "picture",
      align: "center",
      render: (path) => <Image src={path} />,
    },
    {
      title: "브랜드",
      dataIndex: "brand_id",
      key: "brand_id",
      align: "center",
      render: (brand_id) =>
        brandOptionList.filter((item) => item.value == brand_id).length
          ? brandOptionList.filter((item) => item.value == brand_id)[0].label
          : "",
    },
    {
      title: "모델",
      dataIndex: "model_name",
      key: "model_name",
      align: "center",
    },
    {
      title: "등록일",
      dataIndex: "created_date",
      key: "created_date",
      align: "center",
    },
    {
      title: "관리",
      dataIndex: "model_id",
      key: "model_id",
      align: "center",
      render: (model_id) => (
        <Row justify="center">
          <Col>
            <Space size={15} split={<Divider type="vertical" />}>
              <Link to={"/content/popular/edit/" + model_id}>
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

  const tableList = {
    tableData: dataSource,
    tableColumns: columns,
  };

  return (
    <>
      <Space direction="vertical" size={18} className="main-layout">
        {/* Page Header */}
        <Space direction="vertical" size={18}>
          <label className="main-header-title">인기포토 관리</label>
          <Divider className="main-body-divider" />
        </Space>

        {/* Body Section */}
        <TableList dataSource={tableList} />

        <Row justify="center">
          <label className="show-more-label" onClick={onTableMoreClick}>
            더보기
          </label>
        </Row>
      </Space>
    </>
  );
}

export default List;
