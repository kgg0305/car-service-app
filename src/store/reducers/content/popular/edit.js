import { brandService } from "../../../../services/brandService";
import { groupService } from "../../../../services/groupService";
import { popularService } from "../../../../services/popularService";
import { modelService } from "../../../../services/modelService";
import { photoService } from "../../../../services/photoService";

const prefix = "content/popular/edit/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_VALIDATION = prefix + "SHOW_VALIDATION";
const CLOSE_VALIDATION = prefix + "CLOSE_VALIDATION";
const SHOW_CONFIRM = prefix + "SHOW_CONFIRM";
const CLOSE_CONFIRM = prefix + "CLOSE_CONFIRM";
const SET_BODY = prefix + "SET_BODY";
const PUT_MODEL_BODY = prefix + "PUT_MODEL_BODY";
const SAVE = prefix + "SAVE";
const REMOVE = prefix + "REMOVE";

export const init = (idx) => async (dispatch) => {
  try {
    const brandOptionList = await brandService.getOptionList(idx);
    const groupOptionList = await groupService.getOptionList(idx);
    const modelOptionList = await modelService.getOptionList(idx);
    const bodyInfo = await popularService.get(idx);
    const modelBodyInfo = await modelService.get(bodyInfo.model_id);

    dispatch({
      type: INIT,
      payload: {
        brandOptionList: brandOptionList,
        groupOptionList: groupOptionList,
        modelOptionList: modelOptionList,
        modelBodyInfo: modelBodyInfo,
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
export const setBody = (name, value) => async (dispatch) => {
  let picture_index = 0;
  if (name === "model_id") {
    const modelBodyInfo = await modelService.get(value);
    dispatch(putModelBody(modelBodyInfo));

    for (let i = 1; i <= 8; i++) {
      const picture = modelBodyInfo["picture_" + i];
      if (picture) {
        picture_index = i;
        break;
      }
    }
  }

  dispatch({
    type: SET_BODY,
    payload: {
      name: name,
      value: value,
      picture_index: picture_index,
    },
  });
};
export const putModelBody = (body) => ({
  type: PUT_MODEL_BODY,
  payload: {
    modelBodyInfo: body,
  },
});
export const save = (url) => async (dispatch, getState) => {
  const state = getState();
  const bodyInfo = state.popularEdit.bodyInfo;
  const contentBodyList = state.popularEdit.contentBodyList;

  const validation = [];

  if (validation.length > 0) {
    dispatch(showValidation(validation));
  } else {
    try {
      await popularService.update(bodyInfo);

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
    await photoService.remove(idx);

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
    brand_id: null,
    group_id: null,
    model_id: null,
    picture_index: null,
  },
  brandOptionList: [],
  groupOptionList: [],
  modelOptionList: [],
  modelBodyInfo: {
    idx: null,
    brand_id: null,
    group_id: null,
  },
};

export default function edit(state = initialState, action) {
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
          name: action.payload.bodyInfo.model_name,
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
          group_id:
            action.payload.name === "brand_id" ? null : state.bodyInfo.group_id,
          model_id:
            action.payload.name === "brand_id" ||
            action.payload.name === "group_id"
              ? null
              : state.bodyInfo.model_id,
          picture_index:
            action.payload.name === "model_id"
              ? action.payload.picture_index
              : state.bodyInfo.picture_index,
          [action.payload.name]: action.payload.value,
        },
      };
    case PUT_MODEL_BODY:
      return {
        ...state,
        modelBodyInfo: action.payload.modelBodyInfo,
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
