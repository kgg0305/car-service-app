import { Space, Input, Button, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../assets/styles/pages/auth/Auth.module.css";
import { login, setForm } from "../../store/reducers/auth";

function Login() {
  const {
    validation_user_id,
    validation_password,
    form_user_id,
    form_password,
  } = useSelector((state) => ({
    validation_user_id: state.auth.validation.user_id,
    validation_password: state.auth.validation.password,
    form_user_id: state.auth.form.user_id,
    form_password: state.auth.form.password,
  }));

  const dispatch = useDispatch();

  const handleSubmit = () => dispatch(login(form_user_id, form_password));
  const onFormChange = (name, value) =>
    dispatch(setForm({ name: name, value: value }));

  return (
    <div className={styles.bodyPanel}>
      <Space direction="vertical" align="center" size={40}>
        <label className={styles.headerLabel}>사용자 로그인</label>
        <Form onFinish={handleSubmit} autoComplete="off">
          <Space direction="vertical" align="center" size={30}>
            <Space direction="vertical" size={5}>
              <label className={styles.fieldLabel}>사용자 아이디</label>
              <Input
                name="user_id"
                value={form_user_id}
                onChange={(e) => onFormChange(e.target.name, e.target.value)}
                size="large"
                style={{ width: 300 }}
              />
              <label
                hidden={!validation_user_id}
                className={styles.validationLabel}
              >
                등록되지 않은 아이디입니다.
              </label>
            </Space>
            <Space direction="vertical" size={5}>
              <label className={styles.fieldLabel}>비밀번호</label>
              <Input.Password
                name="password"
                value={form_password}
                onChange={(e) => onFormChange(e.target.name, e.target.value)}
                size="large"
                style={{ width: 300 }}
              />
              <label
                hidden={!validation_password}
                className={styles.validationLabel}
              >
                잘못된 비밀번호입니다.
              </label>
            </Space>
            <Button
              htmlType="submit"
              className={styles.submitButton}
              size="large"
              style={{ width: 300 }}
            >
              로그인
            </Button>
          </Space>
        </Form>
        <label className={styles.footerLabel}>
          비밀번호를 잊어버리셨을 경우, 관리자에게 문의해 주세요
        </label>
      </Space>
    </div>
  );
}

export default Login;
