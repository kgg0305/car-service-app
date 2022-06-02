import { brandService } from "../../../../services/brandService";
import { contentService } from "../../../../services/contentService";
import { groupService } from "../../../../services/groupService";
import { modelService } from "../../../../services/modelService";
import { rankService } from "../../../../services/rankService";

const prefix = "content/carRank/edit/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_VALIDATION = prefix + "SHOW_VALIDATION";
const CLOSE_VALIDATION = prefix + "CLOSE_VALIDATION";
const SHOW_CONFIRM = prefix + "SHOW_CONFIRM";
const CLOSE_CONFIRM = prefix + "CLOSE_CONFIRM";
const ADD_MODEL = prefix + "ADD_MODEL";
const DELETE_MODEL = prefix + "DELETE_MODEL";
const SET_MODEL = prefix + "SET_MODEL";
const SET_BODY = prefix + "SET_BODY";
const MOVE_UP = prefix + "MOVE_UP";
const MOVE_DOWN = prefix + "MOVE_DOWN";
const SAVE = prefix + "SAVE";
const REMOVE = prefix + "REMOVE";

export const init = (idx) => async (dispatch) => {
  try {
    const brandOptionList = await brandService.getOptionList();
    const groupOptionList = await groupService.getOptionList();
    const modelOptionList = await modelService.getOptionList();
    const bodyInfo = await rankService.get(1);
    const modelBodyList = [];

    for (let index = 0; index < bodyInfo.ids.split(",").length; index++) {
      const id = bodyInfo.ids.split(",")[index];
      modelBodyList.push({
        ...(await modelService.get(id)),
        number: index + 1,
      });
    }

    dispatch({
      type: INIT,
      payload: {
        brandOptionList: brandOptionList,
        groupOptionList: groupOptionList,
        modelOptionList: modelOptionList,
        bodyInfo: bodyInfo,
        modelBodyList: modelBodyList,
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
export const addModel = () => ({
  type: ADD_MODEL,
});
export const deleteModel = (number) => ({
  type: DELETE_MODEL,
  payload: {
    number: number,
  },
});
export const setModel = (number, name, value) => async (dispatch) => {
  dispatch({
    type: SET_MODEL,
    payload: {
      number: number,
      name: name,
      value: value,
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
export const moveUp = (index, modelBodyList) => (dispatch) => {
  if (index > 0) {
    const current_item = modelBodyList[index];
    const top_item = modelBodyList[index - 1];

    dispatch({
      type: MOVE_UP,
      payload: {
        index: index,
        current_item: current_item,
        top_item: top_item,
      },
    });
  }
};
export const moveDown = (index, modelBodyList) => (dispatch) => {
  if (index < modelBodyList.length - 1) {
    const current_item = modelBodyList[index];
    const bottom_item = modelBodyList[index + 1];

    dispatch({
      type: MOVE_DOWN,
      payload: {
        index: index,
        current_item: current_item,
        bottom_item: bottom_item,
      },
    });
  }
};
export const save = (url, bodyInfo, modelBodyList) => async (dispatch) => {
  const validation = [];
  modelBodyList.map((body) => {
    if (body.brand_id === null) {
      validation.push({
        title: "순위 " + (body.number < 10 ? "0" + body.number : body.number),
        name: "브랜드",
      });
    }
    if (body.group_id === null) {
      validation.push({
        title: "순위 " + (body.number < 10 ? "0" + body.number : body.number),
        name: "그룹",
      });
    }
    if (body.idx === null) {
      validation.push({
        title: "순위 " + (body.number < 10 ? "0" + body.number : body.number),
        name: "모델",
      });
    }
  });

  if (validation.length > 0) {
    dispatch(showValidation(validation));
  } else {
    try {
      const updateRankBodyInfo = {
        ...bodyInfo,
        ids: modelBodyList.map((body) => body.idx).join(","),
      };

      await rankService.update(updateRankBodyInfo);

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
    await rankService.remove(idx);

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
  brandOptionList: [],
  groupOptionList: [],
  modelOptionList: [],
  bodyInfo: {
    type: null,
    ids: "",
  },
  modelBodyList: [],
};

export default function edit(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        brandOptionList: action.payload.brandOptionList,
        groupOptionList: action.payload.groupOptionList,
        modelOptionList: action.payload.modelOptionList,
        bodyInfo: action.payload.bodyInfo,
        modelBodyList: action.payload.modelBodyList,
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
    case ADD_MODEL:
      return {
        ...state,
        modelBodyList: [
          ...state.modelBodyList,
          {
            ...initialState.modelBodyList[0],
            number:
              state.modelBodyList[state.modelBodyList.length - 1].number + 1,
            brand_id: null,
            group_id: null,
            model_id: null,
          },
        ],
      };
    case DELETE_MODEL:
      return {
        ...state,
        modelBodyList: state.modelBodyList.filter(
          (body) => body.number !== action.payload.number
        ),
      };
    case SET_MODEL:
      return {
        ...state,
        modelBodyList: state.modelBodyList.map((body) =>
          body.number === action.payload.number
            ? {
                ...body,
                group_id:
                  action.payload.name == "brand_id" ? null : body.group_id,
                model_id:
                  action.payload.name == "brand_id" ||
                  action.payload.name == "group_id"
                    ? null
                    : body.model_id,
                [action.payload.name]: action.payload.value,
              }
            : body
        ),
      };
    case MOVE_UP:
      return {
        ...state,
        modelBodyList: state.modelBodyList.map((item, itemIndex) =>
          itemIndex === action.payload.index
            ? action.payload.top_item
            : itemIndex === action.payload.index - 1
            ? action.payload.current_item
            : item
        ),
      };
    case MOVE_DOWN:
      return {
        ...state,
        modelBodyList: state.modelBodyList.map((item, itemIndex) =>
          itemIndex === action.payload.index
            ? action.payload.bottom_item
            : itemIndex === action.payload.index + 1
            ? action.payload.current_item
            : item
        ),
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
