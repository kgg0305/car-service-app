import React from "react";
import { Space, Button, Modal } from "antd";
import delete_icon from "../assets/images/delete-icon.png";

// 삭제확인창
function AlertDeleteModal({ name, visible, onConfirmClick, onCancelClick }) {
  return (
    <Modal
      centered
      width={350}
      closable={false}
      visible={visible}
      footer={[
        <Space size={200}>
          <Button
            className="alert-button delete-button"
            onClick={onConfirmClick}
            size="large"
          >
            삭제
          </Button>
          <Button
            className="alert-button cancel-button"
            onClick={onCancelClick}
          >
            취소
          </Button>
        </Space>,
      ]}
    >
      <Space
        direction="vertical"
        size={10}
        align="center"
        style={{ width: "100%" }}
      >
        <img src={delete_icon} />
        <label className="alert-content-label">[{name}]</label>
        <label className="alert-content-label">
          등록된 차량정보 전체를 삭제 하시겠습니까?
        </label>
      </Space>
    </Modal>
  );
}

export default AlertDeleteModal;
