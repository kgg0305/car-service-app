import { brandService } from "../../../../services/brandService";
import { groupService } from "../../../../services/groupService";
import { lineupService } from "../../../../services/lineupService";
import { modelService } from "../../../../services/modelService";
import { modelTrimService } from "../../../../services/modelTrimService";
import { trimService } from "../../../../services/trimService";
import { trimSpecificationService } from "../../../../services/trimSpecificationService";

const prefix = "car/trim/edit/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_VALIDATION = prefix + "SHOW_VALIDATION";
const CLOSE_VALIDATION = prefix + "CLOSE_VALIDATION";
const SHOW_CONFIRM = prefix + "SHOW_CONFIRM";
const CLOSE_CONFIRM = prefix + "CLOSE_CONFIRM";
const CHECK_NAME = prefix + "CHECK_NAME";
const SET_BODY = prefix + "SET_BODY";
const SET_BRAND_BODY = prefix + "SET_BRAND_BODY";
const SET_LINEUP_BODY = prefix + "SET_LINEUP_BODY";
const ADD_SPECIFICATION_BODY = prefix + "ADD_SPECIFICATION_BODY";
const SET_SPECIFICATION_BODY = prefix + "SET_SPECIFICATION_BODY";
const DELETE_SPECIFICATION_BODY = prefix + "DELETE_SPECIFICATION_BODY";
const SET_TRIM_BODY = prefix + "SET_TRIM_BODY";
const PUT_TRIM_BODY = prefix + "PUT_TRIM_BODY";
const SET_DETAIL_BODY = prefix + "SET_DETAIL_BODY";
const MOVE_UP = prefix + "MOVE_UP";
const MOVE_DOWN = prefix + "MOVE_DOWN";
const SAVE = prefix + "SAVE";
const REMOVE = prefix + "REMOVE";

export const init = (idx) => async (dispatch) => {
  try {
    const bodyInfo = await trimService.get(idx);
    const specificationBodyList = await trimSpecificationService.getList(0, {
      trim_id: bodyInfo.idx,
    });
    const trimBodyList = await modelTrimService.getList(0, {
      model_id: bodyInfo.model_id,
    });
    const specificationIdList = specificationBodyList.map((item) => item.idx);
    const brandOptionList = await brandService.getOptionList();
    const groupOptionList = await groupService.getOptionList();
    const modelOptionList = await modelService.getOptionList();
    const lineupOptionList = await lineupService.getOptionList();
    const brandBodyInfo = await brandService.get(bodyInfo.brand_id);
    const lineupBodyInfo = await lineupService.get(bodyInfo.lineup_id);
    const detailBodyInfo = JSON.parse(bodyInfo.detail_meta)
      ? JSON.parse(bodyInfo.detail_meta)
      : {};

    const updatedBodyInfo = {
      ...bodyInfo,
      origin_name: bodyInfo.trim_name,
    };

    dispatch({
      type: INIT,
      payload: {
        bodyInfo: updatedBodyInfo,
        brandOptionList: brandOptionList,
        groupOptionList: groupOptionList,
        modelOptionList: modelOptionList,
        lineupOptionList: lineupOptionList,
        specificationBodyList: specificationBodyList.map((body, index) => ({
          ...body,
          number: index + 1,
        })),
        trimBodyList: trimBodyList,
        specificationIdList: specificationIdList,
        detailBodyInfo: detailBodyInfo,
        brandBodyInfo: brandBodyInfo,
        lineupBodyInfo: lineupBodyInfo,
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
    const bodyInfo = state.trimEdit.bodyInfo;
    if (bodyInfo.origin_name !== name) {
      const result = await trimService.checkName(name);

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
export const setBody = (name, value) => async (dispatch) => {
  try {
    if (name === "brand_id") {
      const brand_info = await brandService.get(value);
      dispatch(setBrandBody(brand_info));
    }

    if (name === "lineup_id") {
      const lineup_info = await lineupService.get(value);
      dispatch(setLineupBody(lineup_info));
    }

    if (name === "brand_id" || name === "group_id") {
      dispatch(putTrimBody([]));
    }

    if (name === "model_id") {
      const initModelTrimBodyList = await modelTrimService.getList(0, {
        model_id: value,
      });
      dispatch(
        putTrimBody(
          initModelTrimBodyList.map((item) => ({
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
export const setBrandBody = (body) => ({
  type: SET_BRAND_BODY,
  payload: {
    brandBodyInfo: body,
  },
});
export const setLineupBody = (body) => ({
  type: SET_LINEUP_BODY,
  payload: {
    lineupBodyInfo: body,
  },
});
export const addSpecificationBody = () => ({
  type: ADD_SPECIFICATION_BODY,
});
export const setSpecificationBody = (number, name, value) => ({
  type: SET_SPECIFICATION_BODY,
  payload: {
    number: number,
    name: name,
    value: value,
  },
});
export const deleteSpecificationBody = (number) => ({
  type: DELETE_SPECIFICATION_BODY,
  payload: {
    number: number,
  },
});
export const setTrimBody = (idx, name, value) => ({
  type: SET_TRIM_BODY,
  payload: {
    idx: idx,
    name: name,
    value: value,
  },
});
export const putTrimBody = (trimBodyList) => ({
  type: PUT_TRIM_BODY,
  payload: {
    trimBodyList: trimBodyList,
  },
});
export const setDetailBody = (name, value) => ({
  type: SET_DETAIL_BODY,
  payload: {
    name: name,
    value: value,
  },
});
export const moveUp = (index) => (dispatch, getState) => {
  const state = getState();
  const specificationBodyList = state.trimEdit.specificationBodyList;
  if (index > 0) {
    const current_item = specificationBodyList[index];
    const top_item = specificationBodyList[index - 1];

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
export const moveDown = (index) => (dispatch, getState) => {
  const state = getState();
  const specificationBodyList = state.trimEdit.specificationBodyList;
  if (index < specificationBodyList.length - 1) {
    const current_item = specificationBodyList[index];
    const bottom_item = specificationBodyList[index + 1];

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
export const save = (url) => async (dispatch, getState) => {
  const state = getState();
  const bodyInfo = state.trimEdit.bodyInfo;
  const specificationBodyList = state.trimEdit.specificationBodyList;
  const specificationIdList = state.trimEdit.specificationIdList;
  const trimBodyList = state.trimEdit.trimBodyList;
  const detailBodyInfo = state.trimEdit.detailBodyInfo;

  const validation = [];
  if (bodyInfo.check_name !== "not-exist") {
    validation.push({
      title: "정보",
      name: "트림명 중복체크",
    });
  }
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
  if (bodyInfo.lineup_id === null) {
    validation.push({
      title: "정보 ",
      name: "차량(라인업)",
    });
  }
  if (bodyInfo.trim_name === "") {
    validation.push({
      title: "정보 ",
      name: "트림",
    });
  }
  if (bodyInfo.gearbox_type === null) {
    validation.push({
      title: "정보 ",
      name: "변속기",
    });
  }
  if (bodyInfo.price === "") {
    validation.push({
      title: "정보 ",
      name: "가격",
    });
  }

  specificationBodyList.map((body, index) => {
    if (body.specification_id === null) {
      validation.push({
        title: "사양 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "카테고리",
      });
    }
    if (body.detail === "") {
      validation.push({
        title: "사양 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "상세내용",
      });
    }
  });

  if (validation.length > 0) {
    dispatch(showValidation(validation));
  } else {
    try {
      await trimService.update({
        ...bodyInfo,
        model_trim_ids: trimBodyList
          .filter((item) => item.is_use === "0")
          .map((item) => item.idx)
          .join(","),
        detail_meta: JSON.stringify(detailBodyInfo),
      });

      //delete specification
      for (let i = 0; i < specificationIdList.length; i++) {
        const element = specificationIdList[i];
        if (!specificationBodyList.some((item) => item.idx === element)) {
          trimSpecificationService.remove(element);
        }
      }

      //update specification
      for (let i = 0; i < specificationBodyList.length; i++) {
        const element = specificationBodyList[i];
        if (element.idx) {
          await trimSpecificationService.update(element);
        }
      }

      //create specification
      const tempSpecificationBodyList = specificationBodyList
        .filter((body) => body.idx === null)
        .map((body) => ({
          ...body,
          trim_id: bodyInfo.idx,
        }));

      if (tempSpecificationBodyList.length > 0) {
        await trimSpecificationService.create(tempSpecificationBodyList);
      }

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
    await trimService.remove(idx);

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
  lineupOptionList: [],
  bodyInfo: {
    brand_id: null,
    group_id: null,
    model_id: null,
    lineup_id: null,
    trim_name: "",
    gearbox_type: null,
    price: 0,
    is_use: null,
    check_name: "",
    origin_name: "",
  },
  brandBodyInfo: {
    is_income: "0",
  },
  lineupBodyInfo: {
    fule_kind: "0",
  },
  specificationBodyList: [
    {
      number: 1,
    },
  ],
  trimBodyList: [],
  specificationIdList: [],
  detailBodyInfo: {},
};

export default function edit(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        bodyInfo: action.payload.bodyInfo,
        specificationBodyList: action.payload.specificationBodyList,
        trimBodyList: action.payload.trimBodyList.map((body) => ({
          ...body,
          is_use: action.payload.bodyInfo.model_trim_ids
            .split(",")
            .some((item) => item === body.idx.toString())
            ? "0"
            : "1",
        })),
        brandOptionList: action.payload.brandOptionList,
        groupOptionList: action.payload.groupOptionList,
        modelOptionList: action.payload.modelOptionList,
        lineupOptionList: action.payload.lineupOptionList,
        specificationIdList: action.payload.specificationIdList,
        detailBodyInfo: action.payload.detailBodyInfo,
        brandBodyInfo: action.payload.brandBodyInfo,
        lineupBodyInfo: action.payload.lineupBodyInfo,
        confirm: {
          ...initialState.confirm,
          name: action.payload.bodyInfo.trim_name,
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
        detailBodyInfo:
          action.payload.name === "lineup_id" ? {} : state.detailBodyInfo,
        bodyInfo: {
          ...state.bodyInfo,
          group_id:
            action.payload.name === "brand_id" ? null : state.bodyInfo.group_id,
          model_id:
            action.payload.name === "brand_id" ||
            action.payload.name === "group_id"
              ? null
              : state.bodyInfo.model_id,
          lineup_id:
            action.payload.name === "brand_id" ||
            action.payload.name === "group_id" ||
            action.payload.name === "model_id"
              ? null
              : state.bodyInfo.lineup_id,
          check_name:
            action.payload.name === "trim_name"
              ? ""
              : state.bodyInfo.check_name,
          [action.payload.name]: action.payload.value,
        },
      };
    case SET_BRAND_BODY:
      return {
        ...state,
        brandBodyInfo: action.payload.brandBodyInfo,
      };
    case SET_LINEUP_BODY:
      return {
        ...state,
        lineupBodyInfo: action.payload.lineupBodyInfo,
      };
    case ADD_SPECIFICATION_BODY:
      return {
        ...state,
        specificationBodyList: [
          ...state.specificationBodyList,
          {
            number:
              state.specificationBodyList[
                state.specificationBodyList.length - 1
              ].number + 1,
          },
        ],
      };
    case SET_SPECIFICATION_BODY:
      return {
        ...state,
        specificationBodyList: state.specificationBodyList.map((body) =>
          body.number === action.payload.number
            ? {
                ...body,
                [action.payload.name]: action.payload.value,
              }
            : body
        ),
      };
    case DELETE_SPECIFICATION_BODY:
      return {
        ...state,
        specificationBodyList: state.specificationBodyList.filter(
          (body) => body.number !== action.payload.number
        ),
      };
    case SET_TRIM_BODY:
      return {
        ...state,
        trimBodyList: state.trimBodyList.map((body) =>
          body.idx === action.payload.idx
            ? {
                ...body,
                [action.payload.name]: action.payload.value,
              }
            : body
        ),
      };
    case PUT_TRIM_BODY:
      return {
        ...state,
        trimBodyList: action.payload.trimBodyList,
      };
    case SET_DETAIL_BODY:
      return {
        ...state,
        detailBodyInfo: {
          ...state.detailBodyInfo,
          [action.payload.name]: action.payload.value,
        },
      };
    case MOVE_UP:
      return {
        ...state,
        specificationBodyList: state.specificationBodyList.map(
          (item, itemIndex) =>
            itemIndex === action.payload.index
              ? {
                  ...action.payload.top_item,
                  idx: item.idx,
                }
              : itemIndex === action.payload.index - 1
              ? {
                  ...action.payload.current_item,
                  idx: item.idx,
                }
              : item
        ),
      };
    case MOVE_DOWN:
      return {
        ...state,
        specificationBodyList: state.specificationBodyList.map(
          (item, itemIndex) =>
            itemIndex === action.payload.index
              ? {
                  ...action.payload.bottom_item,
                  idx: item.idx,
                }
              : itemIndex === action.payload.index + 1
              ? {
                  ...action.payload.current_item,
                  idx: item.idx,
                }
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
