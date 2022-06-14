import React from "react";
import { Space, Button, Modal } from "antd";
import alert_icon from "../assets/images/alert-icon.png";

// 유효성검사창
function AlertModal({ visible, onConfirmClick, validationList }) {
  return (
    <Modal
      centered
      width={325}
      closable={false}
      visible={visible}
      transitionName=""
      footer={[
        <Button
          className="alert-button confirm-button"
          onClick={onConfirmClick}
          size="large"
        >
          확인
        </Button>,
      ]}
    >
      <Space
        direction="vertical"
        size={10}
        align="center"
        style={{ width: "100%" }}
      >
        <img src={alert_icon} />
        <label className="alert-content-label">
          {validationList
            .map((validation) => validation.title + " - " + validation.name)
            .join(", ")}
        </label>
        <label className="alert-content-label">
          작성되지 않은 정보가 있습니다.
        </label>
      </Space>
    </Modal>
  );
}

export default AlertModal;
