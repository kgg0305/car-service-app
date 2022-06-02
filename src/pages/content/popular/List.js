import { Col, Divider, Row, Space, Button, Image } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import TableList from "../../../components/TableList";
import { useDispatch, useSelector } from "react-redux";
import { init, showMore } from "../../../store/reducers/content/popular/list";
import { GetDateFullTimeStringUsingKorFromDate } from "../../../constants/GlobalFunctions";

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
      dataIndex: "idx",
      key: "idx",
      align: "center",
    },
    {
      title: "이미지",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      render: (idx) => renderPicture(idx),
    },
    {
      title: "브랜드",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      render: (idx) => renderBrandField(idx),
    },
    {
      title: "모델",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      render: (idx) => renderModelField(idx),
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
      title: "관리",
      dataIndex: "idx",
      key: "idx",
      align: "center",
      render: (idx) => (
        <Row justify="center">
          <Col>
            <Space size={15} split={<Divider type="vertical" />}>
              <Link to={"/content/popular/edit/" + idx}>
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

  const renderPicture = (idx) => {
    const popular_info = dataSource.filter((item) => item.idx === idx)[0];
    const image_path = popular_info["picture_" + popular_info.picture_index];
    return (
      <Image
        src={
          image_path
            ? window.location.origin + "/uploads/model/" + image_path
            : ""
        }
      />
    );
  };

  const renderBrandField = (idx) => {
    const popular_info = dataSource.filter((item) => item.idx === idx)[0];
    const brand_name = brandOptionList.filter(
      (item) => item.value == popular_info.brand_id
    ).length
      ? brandOptionList.filter((item) => item.value == popular_info.brand_id)[0]
          .label
      : "";
    return (
      <Link to={"/car/brand/edit/" + popular_info.brand_id}>{brand_name}</Link>
    );
  };

  const renderModelField = (idx) => {
    const popular_info = dataSource.filter((item) => item.idx === idx)[0];
    return (
      <Link to={"/car/model/edit/" + popular_info.model_id}>
        {popular_info.model_name}
      </Link>
    );
  };

  return (
    <>
      <Space direction="vertical" size={18} className="main-layout">
        {/* Page Header */}
        <Space direction="vertical" size={11}>
          <label className="main-header-title">포토갤러리 관리</label>
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
