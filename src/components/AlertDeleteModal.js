import React from "react";
import { Space, Button, Modal } from 'antd';
import alert_icon from '../assets/images/alert-icon.png';

function AlertDeleteModal({ visible, onConfirmClick, onCancelClick, validationList }) {
    return (
        <Modal
            centered
            width={325}
            closable={false}
            visible={visible}
            footer={[
                <Space size={150}>
                    <Button className='alert-button' onClick={onConfirmClick}>확인</Button>
                    <Button className='alert-button' onClick={onCancelClick}>취소</Button>
                </Space>
            ]}
        >
            <Space direction='vertical' size={10} align='center' style={{width:'100%'}}>
                <img src={alert_icon} />
                <label className='alert-content-label'>
                    {
                        validationList.map(validation => (
                            '정보' + (validation.number < 10 ? '0' + validation.number : validation.number) + ' - ' + validation.name
                        )).join(', ')
                    }
                </label>
                <label className='alert-content-label'>작성되지 않은 정보가 있습니다.</label>
            </Space>
            
        </Modal>
    );
}

export default AlertDeleteModal;