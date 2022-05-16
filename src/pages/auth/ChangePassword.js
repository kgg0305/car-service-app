import { Space, Input, Button } from 'antd';
import styles from '../../assets/styles/pages/auth/Auth.module.css';

function Login() {
    return (
        <div className={styles.bodyPanel}>
            <Space direction='vertical' align='center' size={40}>
                <label className={styles.headerLabel}>사용자 로그인</label>
                <Space direction='vertical' align='center' size={30}>
                    <Space direction='vertical' size={5}>
                        <label className={styles.fieldLabel}>사용자 아이디</label>
                        <Input size='large' style={{ width: 300 }} />
                        <label className={styles.validationLabel }>등록되지 않은 아이디입니다.</label>
                    </Space>
                    <Space direction='vertical' size={5}>
                        <label className={styles.fieldLabel}>사용자 아이디</label>
                        <Input size='large' style={{ width: 300 }} />
                        <label className={styles.validationLabel }>등록되지 않은 아이디입니다.</label>
                    </Space>
                    <Button className={styles.submitButton} size='large' style={{width: 300}}>로그인</Button>
                </Space>
                <label className={styles.footerLabel}>비밀번호를 잊어버리셨을 경우, 관리자에게 문의해 주세요</label>
            </Space>
        </div>
    );
}

export default Login;