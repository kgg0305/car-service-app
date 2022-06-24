import { userService } from "../../../../services/userService";
import { setToken } from "../../auth";

const prefix = "user/mine/detail/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_VALIDATION = prefix + "SHOW_VALIDATION";
const CLOSE_VALIDATION = prefix + "CLOSE_VALIDATION";
const SHOW_CONFIRM = prefix + "SHOW_CONFIRM";
const CLOSE_CONFIRM = prefix + "CLOSE_CONFIRM";
const SET_BODY = prefix + "SET_BODY";
const SAVE = prefix + "SAVE";
const REMOVE = prefix + "REMOVE";

// 초기화
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

// 재로딩 경로 삭제
export const removeRedirectTo = () => ({
  type: REMOVE_REDIRECTTO,
});

// 유효검사창 현시
export const showValidation = (list) => ({
  type: SHOW_VALIDATION,
  payload: {
    list: list,
  },
});

// 유효검사창 닫기
export const closeValidation = () => ({
  type: CLOSE_VALIDATION,
});
export const showConfirm = () => ({
  type: SHOW_CONFIRM,
});
export const closeConfirm = () => ({
  type: CLOSE_CONFIRM,
});

// 항목값 설정
export const setBody = (name, value) => ({
  type: SET_BODY,
  payload: {
    name: name,
    value: value,
  },
});

// 등록
export const save = (url, bodyInfo) => async (dispatch) => {
  const validation = [];
  if (bodyInfo.name === "") {
    validation.push({
      title: "정보",
      name: "이름",
    });
  }
  if (bodyInfo.password === "") {
    validation.push({
      title: "정보",
      name: "비밀번호",
    });
  }
  if (bodyInfo.phone === "") {
    validation.push({
      title: "정보",
      name: "연락처",
    });
  }
  if (bodyInfo.email === "") {
    validation.push({
      title: "정보",
      name: "이메일",
    });
  }

  if (validation.length > 0) {
    dispatch(showValidation(validation));
  } else {
    try {
      await userService.update(bodyInfo);

      dispatch(setToken(bodyInfo));

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

// 삭제
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

// 초기상태값
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
    idx: null,
    type_id: null,
    type_name: "",
    group_id: null,
    group_name: "",
    name: "",
    password: "",
    user_id: "",
    phone: "",
    email: "",
  },
};

export default function detail(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        brandOptionList: action.payload.brandOptionList,
        groupOptionList: action.payload.groupOptionList,
        modelOptionList: action.payload.modelOptionList,
        modelBodyInfo: action.payload.modelBodyInfo,
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
    case SET_BODY:
      return {
        ...state,
        bodyInfo: {
          ...state.bodyInfo,
          [action.payload.name]: action.payload.value,
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
