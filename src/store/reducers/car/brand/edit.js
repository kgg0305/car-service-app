import { GetBase64 } from "../../../../constants/GlobalFunctions";
import { brandService } from "../../../../services/brandService";

const prefix = "car/brand/edit/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_VALIDATION = prefix + "SHOW_VALIDATION";
const CLOSE_VALIDATION = prefix + "CLOSE_VALIDATION";
const SHOW_CONFIRM = prefix + "SHOW_CONFIRM";
const CLOSE_CONFIRM = prefix + "CLOSE_CONFIRM";
const CHECK_NAME = prefix + "CHECK_NAME";
const PREVIEW = prefix + "PREVIEW";
const SET_BODY = prefix + "SET_BODY";
const SAVE = prefix + "SAVE";
const REMOVE = prefix + "REMOVE";

export const init = (idx) => async (dispatch) => {
  try {
    const bodyInfo = await brandService.get(idx);

    const updatedBodyInfo = {
      ...bodyInfo,
      origin_name: bodyInfo.brand_name,
      check_name: "",
      preview: "",
    };

    dispatch({
      type: INIT,
      payload: {
        bodyInfo: updatedBodyInfo,
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
export const checkName = (name) => async (dispatch, getState) => {
  try {
    const state = getState();
    const bodyInfo = state.brandEdit.bodyInfo;
    if (bodyInfo.origin_name !== name) {
      const result = await brandService.checkName(name);

      dispatch({
        type: CHECK_NAME,
        payload: {
          check_name: result ? "exist" : "not-exist",
        },
      });
    } else {
      dispatch({
        type: CHECK_NAME,
        payload: {
          check_name: "not-exist",
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
};
export const preview = (file) => async (dispatch) => {
  if (!file.url && !file.preview) {
    file.preview = await GetBase64(file.originFileObj);
  }
  dispatch({
    type: PREVIEW,
    payload: {
      preview: file.preview,
    },
  });
};
export const setBody = (name, value) => ({
  type: SET_BODY,
  payload: {
    name: name,
    value: value,
  },
});
export const save = (url) => async (dispatch, getState) => {
  const state = getState();
  const bodyInfo = state.brandEdit.bodyInfo;

  const validation = [];
  if (bodyInfo.check_name !== "not-exist") {
    validation.push({
      title: "정보",
      name: "브랜드명 중복체크",
    });
  }
  if (bodyInfo.brand_name === "") {
    validation.push({
      title: "정보",
      name: "브랜드",
    });
  }
  if (bodyInfo.sequence === null) {
    validation.push({
      title: "정보",
      name: "순서",
    });
  }
  if (bodyInfo.nation === null) {
    validation.push({
      title: "정보",
      name: "국가",
    });
  }
  if (bodyInfo.is_income === null) {
    validation.push({
      title: "정보",
      name: "수입여부",
    });
  }
  if (bodyInfo.public_uri === "") {
    validation.push({
      title: "정보",
      name: "공식사이트",
    });
  }
  if (bodyInfo.room_uri === "") {
    validation.push({
      title: "정보",
      name: "전시장 안내",
    });
  }
  if (bodyInfo.service_uri === "") {
    validation.push({
      title: "정보",
      name: "서비스 센터",
    });
  }
  if (bodyInfo.deposit_uri === "") {
    validation.push({
      title: "정보",
      name: "보증금 안내",
    });
  }

  if (validation.length > 0) {
    dispatch(showValidation(validation));
  } else {
    try {
      await brandService.update(bodyInfo);

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
    await brandService.remove(idx);

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
  },
  bodyInfo: {
    idx: 1,
    brand_name: "",
    sequence: 1,
    nation: null,
    is_income: null,
    is_use: "0",
    public_uri: "",
    room_uri: "",
    service_uri: "",
    deposit_uri: "",
    logo: {},
    preview: "",
    check_name: "",
    origin_name: "",
  },
};

export default function edit(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        bodyInfo: action.payload.bodyInfo,
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
    case PREVIEW:
      return {
        ...state,
        bodyInfo: {
          ...state.bodyInfo,
          preview: action.payload.preview,
        },
      };
    case SET_BODY:
      return {
        ...state,
        bodyInfo: {
          ...state.bodyInfo,
          check_name:
            action.payload.name === "brand_name"
              ? ""
              : state.bodyInfo.check_name,
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
