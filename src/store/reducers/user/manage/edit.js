import { userService } from "../../../../services/userService";

const prefix = "user/manage/edit/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_VALIDATION = prefix + "SHOW_VALIDATION";
const CLOSE_VALIDATION = prefix + "CLOSE_VALIDATION";
const SHOW_CONFIRM = prefix + "SHOW_CONFIRM";
const CLOSE_CONFIRM = prefix + "CLOSE_CONFIRM";
const CHECK_NAME = prefix + "CHECK_NAME";
const SET_BODY = prefix + "SET_BODY";
const SAVE = prefix + "SAVE";
const REMOVE = prefix + "REMOVE";

export const init = (idx) => async (dispatch) => {
  try {
    const bodyInfo = await userService.get(idx);

    dispatch({
      type: INIT,
      payload: {
        bodyInfo: bodyInfo,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
export const removeRedirectTo = () => ({
  type: REMOVE_REDIRECTTO,
});
export const showValidation = (list) => ({
  type: SHOW_VALIDATION,
  payload: {
    list: list,
  },
});
export const closeValidation = () => ({
  type: CLOSE_VALIDATION,
});
export const showConfirm = () => ({
  type: SHOW_CONFIRM,
});
export const closeConfirm = () => ({
  type: CLOSE_CONFIRM,
});
export const checkName = (name) => async (dispatch) => {
  try {
    const result = await userService.checkName(name);

    dispatch({
      type: CHECK_NAME,
      payload: {
        check_name: result ? "exist" : "not-exist",
      },
    });
  } catch (e) {
    console.log(e);
  }
};
export const setBody = (name, value) => (dispatch) => {
  let danger_password = false;
  let short_password = false;

  if (name == "password") {
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;

    const uppercasePassword = uppercaseRegExp.test(value);
    const lowercasePassword = lowercaseRegExp.test(value);
    const digitsPassword = digitsRegExp.test(value);
    const specialCharPassword = specialCharRegExp.test(value);
    const minLengthPassword = minLengthRegExp.test(value);

    if (!minLengthPassword) {
      danger_password = true;
      short_password = true;
    } else if (!uppercasePassword) {
      danger_password = true;
    } else if (!lowercasePassword) {
      danger_password = true;
    } else if (!digitsPassword) {
      danger_password = true;
    } else if (!specialCharPassword) {
      danger_password = true;
    }
  }

  dispatch({
    type: SET_BODY,
    payload: {
      name: name,
      value: value,
      danger_password: danger_password,
      short_password: short_password,
    },
  });
};
export const save = (url, bodyInfo) => async (dispatch) => {
  const validation = [];
  if (bodyInfo.name === "") {
    validation.push({
      title: "정보",
      name: "이름",
    });
  }
  if (bodyInfo.user_id === "") {
    validation.push({
      title: "정보",
      name: "아이디",
    });
  }
  if (bodyInfo.type_id === null) {
    validation.push({
      title: "정보",
      name: "구분",
    });
  }
  if (bodyInfo.group_id === null) {
    validation.push({
      title: "정보",
      name: "그룹",
    });
  }
  if (bodyInfo.password === "") {
    validation.push({
      title: "정보",
      name: "비밀번호",
    });
  }

  if (validation.length > 0) {
    dispatch(showValidation(validation));
  } else {
    try {
      await userService.update(bodyInfo);

      dispatch({
        type: SAVE,
        payload: {
          url: url,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
};
export const remove = (url, idx) => async (dispatch) => {
  try {
    await userService.remove(idx);

    dispatch({
      type: REMOVE,
      payload: {
        url: url,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  redirectTo: "",
  validation: {
    show: false,
    list: [],
  },
  confirm: {
    show: false,
    name: "",
  },
  bodyInfo: {
    number: 1,
    name: "",
    user_id: "",
    type_id: null,
    group_id: null,
    password: "",
    check_name: "",
    danger_password: false,
    short_password: false,
  },
};

export default function edit(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        bodyInfo: action.payload.bodyInfo,
        confirm: {
          ...initialState.confirm,
          name: action.payload.bodyInfo.name,
        },
      };
    case REMOVE_REDIRECTTO:
      return {
        ...state,
        redirectTo: "",
      };
    case SHOW_VALIDATION:
      return {
        ...state,
        validation: {
          ...state.validation,
          show: true,
          list: action.payload.list,
        },
      };
    case CLOSE_VALIDATION:
      return {
        ...state,
        validation: {
          ...state.validation,
          show: false,
        },
      };
    case SHOW_CONFIRM:
      return {
        ...state,
        confirm: {
          ...state.confirm,
          show: true,
        },
      };
    case CLOSE_CONFIRM:
      return {
        ...state,
        confirm: {
          ...state.confirm,
          show: false,
        },
      };
    case CHECK_NAME:
      return {
        ...state,
        bodyInfo: {
          ...state.bodyInfo,
          check_name: action.payload.check_name,
        },
      };
    case SET_BODY:
      return {
        ...state,
        bodyInfo: {
          ...state.bodyInfo,
          group_id:
            action.payload.name == "type_id" ? null : state.bodyInfo.group_id,
          [action.payload.name]: action.payload.value,
          danger_password:
            action.payload.name === "password"
              ? action.payload.danger_password
              : state.danger_password,
          short_password:
            action.payload.name === "password"
              ? action.payload.short_password
              : state.short_password,
        },
      };
    case SAVE:
      return {
        ...state,
        redirectTo: action.payload.url,
      };
    case REMOVE:
      return {
        ...state,
        redirectTo: action.payload.url,
      };
    default:
      return state;
  }
}
