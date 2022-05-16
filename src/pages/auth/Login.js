import { Space, Input, Button, Form } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { LoginUser } from '../../api/Auth';
import styles from '../../assets/styles/pages/auth/Auth.module.css';

function Login({ setToken }) {
    const [showUserIDAlert, setShowUserIDAlert] = useState(false);
    const [showPasswordAlert, setShowPasswordAlert] = useState(false);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async() => {
        const result = await LoginUser({
            user_id: username,
            password: password
        });

        setShowUserIDAlert(false);
        setShowPasswordAlert(false);

        switch (result.status) {
            case 'successful':
                setToken(result.token);
                break;
            case 'no-user':
                setShowUserIDAlert(true);
                break;
            case 'no-password':
                setShowPasswordAlert(true);
                break;
            default:
                break;
        }
    }

    return (
        <div className={styles.bodyPanel}>
            <Space direction='vertical' align='center' size={40}>
                <label className={styles.headerLabel}>사용자 로그인</label>
                <Form onFinish={handleSubmit} autoComplete="off">
                    <Space direction='vertical' align='center' size={30}>
                        <Space direction='vertical' size={5}>
                            <label className={styles.fieldLabel}>사용자 아이디</label>
                            <Input onChange={e => setUserName(e.target.value)} size='large' style={{ width: 300 }} />
                            <label hidden={!showUserIDAlert} className={styles.validationLabel }>등록되지 않은 아이디입니다.</label>
                        </Space>
                        <Space direction='vertical' size={5}>
                            <label className={styles.fieldLabel}>비밀번호</label>
                            <Input.Password onChange={e => setPassword(e.target.value)} size='large' style={{ width: 300 }} />
                            <label hidden={!showPasswordAlert} className={styles.validationLabel }>잘못된 비밀번호입니다.</label>
                        </Space>
                        <Button htmlType='submit' className={styles.submitButton} size='large' style={{width: 300}}>로그인</Button>
                    </Space>
                </Form>
                <label className={styles.footerLabel}>비밀번호를 잊어버리셨을 경우, 관리자에게 문의해 주세요</label>
            </Space>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;