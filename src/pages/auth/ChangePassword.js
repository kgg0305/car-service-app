import { Space, Input, Button, Form } from "antd";
import styles from "../../assets/styles/pages/auth/Auth.module.css";
import { useSelector, useDispatch } from "react-redux";
import { changePassword, setChangeForm } from "../../store/reducers/auth";

function ChangePassword() {
  const {
    danger_password,
    short_password,
    match_password,
    new_password,
    old_password,
  } = useSelector((state) => ({
    danger_password: state.auth.changeValidation.danger_password,
    short_password: state.auth.changeValidation.short_password,
    match_password: state.auth.changeValidation.match_password,
    new_password: state.auth.changeForm.new_password,
    old_password: state.auth.changeForm.old_password,
  }));

  const dispatch = useDispatch();

  const handleSubmit = () => dispatch(changePassword());
  const onFormChange = (name, value) =>
    dispatch(setChangeForm({ name: name, value: value }));

  return (
    <div className={styles.bodyPanel}>
      <Space direction="vertical" align="center" size={40}>
        <label className={styles.headerLabel}>비밀번호 변경</label>
        <Form onFinish={handleSubmit} autoComplete="off">
          <Space direction="vertical" align="center" size={30}>
            <Space direction="vertical" size={5}>
              <label className={styles.fieldLabel}>비밀번호 입력</label>
              <Input.Password
                name="new_password"
                value={new_password}
                onChange={(e) => onFormChange(e.target.name, e.target.value)}
                size="large"
                style={{ width: 300 }}
              />
              {danger_password ? (
                <label className={styles.validationLabel}>
                  {short_password
                    ? "글자수가 부족합니다."
                    : "사용할 수 없는 비밀번호 입니다."}
                </label>
              ) : (
                ""
              )}
            </Space>
            <Space direction="vertical" size={5}>
              <label className={styles.fieldLabel}>비밀번호 확인</label>
              <Input.Password
                name="old_password"
                value={old_password}
                onChange={(e) => onFormChange(e.target.name, e.target.value)}
                size="large"
                style={{ width: 300 }}
              />
              {match_password ? (
                <label className={styles.validationLabel}>
                  비밀번호가 일치하지 않습니다.
                </label>
              ) : (
                ""
              )}
            </Space>
            <Button
              htmlType="submit"
              className={styles.submitButton}
              size="large"
              style={{ width: 300 }}
            >
              변경하기
            </Button>
          </Space>
        </Form>
        <label className={styles.footerLabel}>
          이후 비밀번호는 [설정] - [내 정보 관리]에서 변경이 가능합니다.
        </label>
      </Space>
    </div>
  );
}

export default ChangePassword;
