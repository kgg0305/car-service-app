import { brandService } from "../../../../services/brandService";
import { groupService } from "../../../../services/groupService";
import { lineupService } from "../../../../services/lineupService";
import { modelColorService } from "../../../../services/modelColorService";
import { modelLineupService } from "../../../../services/modelLineupService";
import { modelService } from "../../../../services/modelService";

const prefix = "car/lineup/edit/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_VALIDATION = prefix + "SHOW_VALIDATION";
const CLOSE_VALIDATION = prefix + "CLOSE_VALIDATION";
const SHOW_CONFIRM = prefix + "SHOW_CONFIRM";
const CLOSE_CONFIRM = prefix + "CLOSE_CONFIRM";
const CHECK_NAME = prefix + "CHECK_NAME";
const SET_BODY = prefix + "SET_BODY";
const SET_LINEUP_BODY = prefix + "SET_LINEUP_BODY";
const SET_COLOR_BODY = prefix + "SET_COLOR_BODY";
const PUT_LINEUP_BODY = prefix + "PUT_LINEUP_BODY";
const PUT_COLOR_BODY = prefix + "PUT_COLOR_BODY";
const SAVE = prefix + "SAVE";
const REMOVE = prefix + "REMOVE";

export const init = (idx) => async (dispatch) => {
  try {
    const bodyInfo = await lineupService.get(idx);
    const lineupBodyList = await modelLineupService.getList(0, {
      model_id: bodyInfo.model_id,
    });
    const colorBodyList = await modelColorService.getList(0, {
      model_id: bodyInfo.model_id,
    });
    const brandOptionList = await brandService.getOptionList();
    const groupOptionList = await groupService.getOptionList();
    const modelOptionList = await modelService.getOptionList();

    dispatch({
      type: INIT,
      payload: {
        bodyInfo: bodyInfo,
        brandOptionList: brandOptionList,
        groupOptionList: groupOptionList,
        modelOptionList: modelOptionList,
        lineupBodyList: lineupBodyList,
        colorBodyList: colorBodyList,
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
    const result = await lineupService.checkName(name);

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
export const setBody = (name, value) => async (dispatch) => {
  try {
    if (name === "brand_id" || name === "group_id") {
      dispatch(putLineupBody([]));
      dispatch(putColorBody([]));
    }

    if (name === "model_id") {
      const initModelLineupBodyList = await modelLineupService.getList(0, {
        model_id: value,
      });
      dispatch(
        putLineupBody(
          initModelLineupBodyList.map((item) => ({
            ...item,
            is_use: "0",
          }))
        )
      );

      const initModelColorBodyList = await modelColorService.getList(0, {
        model_id: value,
      });
      dispatch(
        putColorBody(
          initModelColorBodyList.map((item) => ({
            ...item,
            is_use: "0",
          }))
        )
      );
    }

    dispatch({
      type: SET_BODY,
      payload: {
        name: name,
        value: value,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
export const setLineupBody = (idx, name, value) => ({
  type: SET_LINEUP_BODY,
  payload: {
    idx: idx,
    name: name,
    value: value,
  },
});
export const setColorBody = (idx, name, value) => ({
  type: SET_COLOR_BODY,
  payload: {
    idx: idx,
    name: name,
    value: value,
  },
});
export const putLineupBody = (lineupBodyList) => ({
  type: PUT_LINEUP_BODY,
  payload: {
    lineupBodyList: lineupBodyList,
  },
});
export const putColorBody = (colorBodyList) => ({
  type: PUT_COLOR_BODY,
  payload: {
    colorBodyList: colorBodyList,
  },
});
export const save =
  (url, bodyInfo, lineupBodyList, colorBodyList) => async (dispatch) => {
    const validation = [];
    if (bodyInfo.brand_id === null) {
      validation.push({
        title: "정보 ",
        name: "차량(브랜드)",
      });
    }
    if (bodyInfo.group_id === null) {
      validation.push({
        title: "정보 ",
        name: "차량(모델그룹)",
      });
    }
    if (bodyInfo.model_id === null) {
      validation.push({
        title: "정보 ",
        name: "차량(모델)",
      });
    }
    if (bodyInfo.lineup_name === "") {
      validation.push({
        title: "정보 ",
        name: "라인업",
      });
    }
    if (bodyInfo.fule_kind === null) {
      validation.push({
        title: "정보 ",
        name: "연료",
      });
    }
    if (bodyInfo.year_type === "") {
      validation.push({
        title: "정보 ",
        name: "연식",
      });
    }

    if (validation.length > 0) {
      dispatch(showValidation(validation));
    } else {
      try {
        await lineupService.update({
          ...bodyInfo,
          model_lineup_ids: lineupBodyList
            .filter((item) => item.is_use === "0")
            .map((item) => item.idx)
            .join(","),
          model_color_ids: colorBodyList
            .filter((item) => item.is_use === "0")
            .map((item) => item.idx)
            .join(","),
        });

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
    await lineupService.remove(idx);

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
  groupOptionList: [],
  modelOptionList: [],
  bodyInfo: {
    brand_id: null,
    group_id: null,
    model_id: null,
    model_lineup_ids: "",
    model_color_ids: "",
    lineup_name: "",
    fule_kind: null,
    year_type: new Date().getFullYear(),
    is_use: "0",
    is_use_lineup: "",
    is_use_color: "",
    created_date: new Date(),
    check_name: "",
  },
  lineupBodyList: [],
  colorBodyList: [],
};

export default function edit(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        bodyInfo: action.payload.bodyInfo,
        lineupBodyList: action.payload.lineupBodyList.map((body) => ({
          ...body,
          is_use: action.payload.bodyInfo.model_lineup_ids
            .split(",")
            .some((item) => item === body.idx.toString())
            ? "0"
            : "1",
        })),
        colorBodyList: action.payload.colorBodyList.map((body) => ({
          ...body,
          is_use: action.payload.bodyInfo.model_color_ids
            .split(",")
            .some((item) => item === body.idx.toString())
            ? "0"
            : "1",
        })),
        brandOptionList: action.payload.brandOptionList,
        groupOptionList: action.payload.groupOptionList,
        modelOptionList: action.payload.modelOptionList,
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
            action.payload.name === "brand_id" ? null : state.bodyInfo.group_id,
          model_id:
            action.payload.name === "brand_id" ||
            action.payload.name === "group_id"
              ? null
              : state.bodyInfo.model_id,
          [action.payload.name]: action.payload.value,
        },
      };
    case SET_LINEUP_BODY:
      return {
        ...state,
        lineupBodyList: state.lineupBodyList.map((body) =>
          body.idx === action.payload.idx
            ? {
                ...body,
                [action.payload.name]: action.payload.value,
              }
            : body
        ),
      };
    case SET_COLOR_BODY:
      return {
        ...state,
        colorBodyList: state.colorBodyList.map((body) =>
          body.idx === action.payload.idx
            ? {
                ...body,
                [action.payload.name]: action.payload.value,
              }
            : body
        ),
      };
    case PUT_LINEUP_BODY:
      return {
        ...state,
        lineupBodyList: action.payload.lineupBodyList,
      };
    case PUT_COLOR_BODY:
      return {
        ...state,
        colorBodyList: action.payload.colorBodyList,
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
