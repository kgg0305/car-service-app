import { brandService } from "../../../../services/brandService";
import { carKindService } from "../../../../services/carKindService";
import { groupService } from "../../../../services/groupService";
import { modelService } from "../../../../services/modelService";

const prefix = "car/group/edit/";

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

// 초기화
export const init = (idx) => async (dispatch) => {
  try {
    const bodyInfo = await groupService.get(idx);
    const brandOptionList = await brandService.getOptionList();
    const carKindOptionList = await carKindService.getOptionList();

    const updatedBodyInfo = {
      ...bodyInfo,
      origin_name: bodyInfo.group_name,
    };

    dispatch({
      type: INIT,
      payload: {
        bodyInfo: updatedBodyInfo,
        brandOptionList: brandOptionList,
        carKindOptionList: carKindOptionList,
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

// 증복명 검사
export const checkName = (name) => async (dispatch, getState) => {
  try {
    const state = getState();
    const bodyInfo = state.groupEdit.bodyInfo;
    if (bodyInfo.origin_name !== name) {
      const result = await groupService.checkName(name);

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

// 항목값 설정
export const setBody = (name, value) => ({
  type: SET_BODY,
  payload: {
    name: name,
    value: value,
  },
});

// 등록
export const save = (url) => async (dispatch, getState) => {
  const state = getState();
  const bodyInfo = state.groupEdit.bodyInfo;

  const validation = [];
  if (bodyInfo.check_name !== "not-exist") {
    validation.push({
      title: "정보",
      name: "그룹명 중복체크",
    });
  }
  if (bodyInfo.brand_id === null) {
    validation.push({
      title: "정보",
      name: "브랜드",
    });
  }
  if (bodyInfo.group_name === "") {
    validation.push({
      title: "정보",
      name: "모델그룹",
    });
  }
  if (bodyInfo.car_kind_id === null) {
    validation.push({
      title: "정보",
      name: "차종",
    });
  }

  if (validation.length > 0) {
    dispatch(showValidation(validation));
  } else {
    try {
      await groupService.update(bodyInfo);

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
    await modelService.removeByGroup(idx);
    await groupService.remove(idx);

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
  brandOptionList: [],
  carKindOptionList: [],
  bodyInfo: {
    idx: 1,
    brand_id: null,
    group_name: "",
    car_kind_id: null,
    is_use: 0,
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
        brandOptionList: action.payload.brandOptionList,
        carKindOptionList: action.payload.carKindOptionList,
        confirm: {
          ...initialState.confirm,
          name: action.payload.bodyInfo.group_name,
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
          check_name:
            action.payload.name === "group_name"
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
