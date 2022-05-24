import React from "react";
import { Space, Button, Modal } from "antd";
import delete_icon from "../assets/images/delete-icon.png";

// 삭제확인창
function AlertDeleteModal({ visible, onConfirmClick, onCancelClick }) {
  return (
    <Modal
      centered
      width={325}
      closable={false}
      visible={visible}
      footer={[
        <Space size={150}>
          <Button
            className="alert-button"
            onClick={onConfirmClick}
            size="large"
          >
            확인
          </Button>
          <Button className="alert-button" onClick={onCancelClick}>
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
        <label className="alert-content-label">삭제 하시겠습니까?</label>
      </Space>
    </Modal>
  );
}

export default AlertDeleteModal;
