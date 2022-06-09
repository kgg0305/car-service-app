import {
  GetBase64,
  GetDateStringFromDate,
  GetTimeStringFromDate,
} from "../../../../constants/GlobalFunctions";
import { quotationService } from "../../../../services/quotationService";

const prefix = "estimation/quotation/detail/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_VALIDATION = prefix + "SHOW_VALIDATION";
const CLOSE_VALIDATION = prefix + "CLOSE_VALIDATION";
const SHOW_CONFIRM = prefix + "SHOW_CONFIRM";
const CLOSE_CONFIRM = prefix + "CLOSE_CONFIRM";
const SET_BODY = prefix + "SET_BODY";
const SAVE = prefix + "SAVE";
const REMOVE = prefix + "REMOVE";

export const init = (idx) => async (dispatch) => {
  try {
    const bodyInfo = await quotationService.get(idx);

    const reg_date_text1 = GetDateStringFromDate(new Date(bodyInfo.created_at));
    const reg_date_text2 = GetTimeStringFromDate(new Date(bodyInfo.created_at));

    bodyInfo.reg_date_text1 = reg_date_text1;
    bodyInfo.reg_date_text2 = reg_date_text2;

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
export const setBody = (name, value) => ({
  type: SET_BODY,
  payload: {
    name: name,
    value: value,
  },
});
export const save = (url, bodyInfo) => async (dispatch) => {
  try {
    await quotationService.update(bodyInfo);

    dispatch({
      type: SAVE,
      payload: {
        url: url,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
export const remove = (url, idx) => async (dispatch) => {
  try {
    await quotationService.remove(idx);

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
    idx: null,
    purchase_path: "",
    purchase_method: null,
    created_at: null,
    reg_date_text1: "",
    reg_date_text2: "",
    client_name: "",
    client_phone: "",
    brand_id: null,
    brand_name: "",
    model_name: "",
    lineup_name: "",
    car_kind_id: null,
    trim_id: "",
    trim_name: "",
    is_business: null,
    is_contract: null,
    contract_date: null,
    is_release: null,
    release_date: null,
    is_close: null,
    note: "",
  },
};

export default function detail(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        bodyInfo: action.payload.bodyInfo,
        confirm: {
          ...initialState.confirm,
          name: action.payload.bodyInfo.client_name,
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
          is_contract:
            action.payload.name === "is_business"
              ? null
              : state.bodyInfo.is_contract,
          is_release:
            action.payload.name === "is_business" ||
            action.payload.name === "is_contract"
              ? null
              : state.bodyInfo.is_release,
          is_close:
            action.payload.name === "is_business" ||
            action.payload.name === "is_contract" ||
            action.payload.name === "is_release"
              ? null
              : state.bodyInfo.is_close,
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
