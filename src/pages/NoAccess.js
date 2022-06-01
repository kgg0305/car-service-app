import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeRedirectTo, init } from "../store/reducers/role";

function NoAccess() {
  let navigate = useNavigate();

  const { token, redirectTo, refreshed } = useSelector((state) => ({
    token: state.auth.token,
    redirectTo: state.role.redirectTo,
    refreshed: state.role.refreshed,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (redirectTo && !refreshed) {
      const redirectURL = redirectTo;
      dispatch(removeRedirectTo());
      navigate(redirectURL);
    }
    dispatch(init());
  }, [redirectTo, dispatch]);

  return (
    <div className="no-access-page">
      <label>사용자권한이 없습니다. 관리자에게 문의해주세요.</label>
    </div>
  );
}

export default NoAccess;
