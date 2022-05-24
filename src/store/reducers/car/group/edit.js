import { brandService } from "../../../../services/brandService";
import { carKindService } from "../../../../services/carKindService";
import { groupService } from "../../../../services/groupService";

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

export const init = (idx) => async (dispatch) => {
  try {
    const bodyInfo = await groupService.get(idx);
    const brandOptionList = await brandService.getOptionList();
    const carKindOptionList = await carKindService.getOptionList();

    dispatch({
      type: INIT,
      payload: {
        bodyInfo: bodyInfo,
        brandOptionList: brandOptionList,
        carKindOptionList: carKindOptionList,
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
    const result = await groupService.checkName(name);

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
export const setBody = (name, value) => ({
  type: SET_BODY,
  payload: {
    name: name,
    value: value,
  },
});
export const save = (url, bodyInfo) => async (dispatch) => {
  const validation = [];
  if (bodyInfo.brand_id === null) {
    validation.push({
      title: "정보 ",
      name: "브랜드",
    });
  }
  if (bodyInfo.group_name === "") {
    validation.push({
      title: "정보 ",
      name: "모델그룹",
    });
  }
  if (bodyInfo.car_kind_id === null) {
    validation.push({
      title: "정보 ",
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
export const remove = (url, idx) => async (dispatch) => {
  try {
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

const initialState = {
  redirectTo: "",
  validation: {
    show: false,
    list: [],
  },
  confirm: {
    show: false,
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
