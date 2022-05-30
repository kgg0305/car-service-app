import React from "react";
import { Col, Divider, Input, Row, Space, Table } from "antd";
import { Link } from "react-router-dom";
import ContentItem from "./ContentItem";
import styles from "../assets/styles/components/TableList.module.css";

// 목록테이블
function TableList({ dataSource }) {
  return (
    <Space className={styles.tableList} direction="vertical" size={20}>
      <Space
        size={10}
        direction="vertical"
        split={<Divider className={styles.headerDivider} />}
      >
        <Row justify="bottom">
          <Col>
            <label className={styles.headerLabel}>
              {dataSource.title ? dataSource.title : "목록"}
            </label>
          </Col>
          <Col flex="auto" />
          <Col>
            {dataSource.topItems ? (
              <Space>
                {dataSource.topItems.map((item, index) =>
                  item.link ? (
                    <Link key={index} to={item.link}>
                      <ContentItem item={item} key={index} />
                    </Link>
                  ) : (
                    <ContentItem item={item} key={index} />
                  )
                )}
              </Space>
            ) : (
              ""
            )}
          </Col>
        </Row>
        {dataSource.subItems ? (
          <Space size={40}>
            {dataSource.subItems.map((item, index) => (
              <Row key={index} align="middle" gutter={[6]}>
                <Col>
                  <label className={styles.subHeaderLabel}>{item.label}</label>
                </Col>
                <Col>
                  <ContentItem item={item} key={index} value={item.value} />
                </Col>
              </Row>
            ))}
          </Space>
        ) : (
          <></>
        )}
      </Space>

      <Table
        dataSource={dataSource.tableData}
        columns={dataSource.tableColumns}
        pagination={false}
        bordered
        locale={{ emptyText: "등록된 정보가 없습니다." }}
      />
    </Space>
  );
}

export default TableList;
