import preview_default_image from "../../../../assets/images/preview-default-image.png";
import { GetBase64 } from "../../../../constants/GlobalFunctions";
import { brandService } from "../../../../services/brandService";
import { discountConditionService } from "../../../../services/discountConditionService";
import { discountKindService } from "../../../../services/discountKindService";
import { groupService } from "../../../../services/groupService";
import { lineupService } from "../../../../services/lineupService";
import { modelColorService } from "../../../../services/modelColorService";
import { modelLineupService } from "../../../../services/modelLineupService";
import { modelService } from "../../../../services/modelService";
import { modelTrimService } from "../../../../services/modelTrimService";

const prefix = "car/model/edit/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_VALIDATION = prefix + "SHOW_VALIDATION";
const CLOSE_VALIDATION = prefix + "CLOSE_VALIDATION";
const SHOW_CONFIRM = prefix + "SHOW_CONFIRM";
const CLOSE_CONFIRM = prefix + "CLOSE_CONFIRM";
const CHECK_NAME = prefix + "CHECK_NAME";
const PREVIEW = prefix + "PREVIEW";
const SET_BODY = prefix + "SET_BODY";
const ADD_LINEUP_BODY = prefix + "ADD_LINEUP_BODY";
const DELETE_LINEUP_BODY = prefix + "DELETE_LINEUP_BODY";
const SET_LINEUP_BODY = prefix + "SET_LINEUP_BODY";
const ADD_COLOR_BODY = prefix + "ADD_COLOR_BODY";
const DELETE_COLOR_BODY = prefix + "DELETE_COLOR_BODY";
const SET_COLOR_BODY = prefix + "SET_COLOR_BODY";
const ADD_TRIM_BODY = prefix + "ADD_TRIM_BODY";
const DELETE_TRIM_BODY = prefix + "DELETE_TRIM_BODY";
const SET_TRIM_BODY = prefix + "SET_TRIM_BODY";
const SET_DISCOUNT_BODY = prefix + "SET_DISCOUNT_BODY";
const PUT_DISCOUNT_BODY = prefix + "PUT_DISCOUNT_BODY";
const MOVE_UP = prefix + "MOVE_UP";
const MOVE_DOWN = prefix + "MOVE_DOWN";
const SAVE = prefix + "SAVE";
const REMOVE = prefix + "REMOVE";

export const init = (idx) => async (dispatch) => {
  try {
    let bodyInfo = await modelService.get(idx);
    for (let i = 1; i <= 8; i++) {
      if (bodyInfo["picture_" + i] === "") {
        bodyInfo["preview_" + i] = preview_default_image;
        bodyInfo["picture_" + i] = initialState.bodyInfo["picture_" + i];
      } else {
        bodyInfo["preview_" + i] = bodyInfo["picture_" + i];
        bodyInfo["picture_" + i] = { uid: "" };
      }
    }
    const brandOptionList = await brandService.getOptionList();
    const groupOptionList = await groupService.getOptionList();
    const lineupBodyList = await modelLineupService.getList(0, {
      model_id: idx,
    });
    const colorBodyList = await modelColorService.getList(0, {
      model_id: idx,
    });
    const trimBodyList = await modelTrimService.getList(0, {
      model_id: idx,
    });
    const initDiscountKindList = await discountKindService.getList(0, {
      brand_id: bodyInfo.brand_id,
    });
    let discountBodyList = [];
    for (let i = 0; i < initDiscountKindList.length; i++) {
      const discountInfo = initDiscountKindList[i];
      const conditionList = await discountConditionService.getList(0, {
        discount_kind_id: discountInfo.idx,
      });

      discountBodyList.push({
        ...discountInfo,
        discount_condition_list: conditionList.map((conditionBody) => ({
          ...conditionBody,
          is_use: bodyInfo.discount_condition_ids
            .split(",")
            .some((item) => item === conditionBody.idx.toString())
            ? "0"
            : "1",
        })),
      });
    }
    const lineupIdList = lineupBodyList.map((item) => item.idx);
    const colorIdList = colorBodyList.map((item) => item.idx);
    const trimIdList = trimBodyList.map((item) => item.idx);

    const updatedBodyInfo = {
      ...bodyInfo,
      origin_name: bodyInfo.model_name,
    };

    dispatch({
      type: INIT,
      payload: {
        bodyInfo: updatedBodyInfo,
        brandOptionList: brandOptionList,
        groupOptionList: groupOptionList,
        lineupBodyList: lineupBodyList,
        colorBodyList: colorBodyList,
        trimBodyList: trimBodyList,
        discountBodyList: discountBodyList,
        lineupIdList: lineupIdList,
        colorIdList: colorIdList,
        trimIdList: trimIdList,
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
    const bodyInfo = state.modelEdit.bodyInfo;
    if (bodyInfo.origin_name !== name) {
      const result = await modelService.checkName(name);

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
export const preview = (number, file) => async (dispatch) => {
  if (file && !file.url && !file.preview) {
    file.preview = await GetBase64(file.originFileObj);
  }

  if (file) {
    dispatch({
      type: PREVIEW,
      payload: {
        number: number,
        preview: file.preview,
      },
    });
  } else {
    dispatch({
      type: PREVIEW,
      payload: {
        number: number,
        preview: preview_default_image,
      },
    });
  }
};
export const setBody = (name, value) => async (dispatch) => {
  try {
    if (name === "brand_id") {
      dispatch({
        type: SET_BODY,
        payload: {
          name: "group_id",
          value: null,
        },
      });

      const initDiscountKindList = await discountKindService.getList(0, {
        brand_id: value,
      });

      let discountBodyList = [];
      for (let i = 0; i < initDiscountKindList.length; i++) {
        const discountInfo = initDiscountKindList[i];
        const conditionList = await discountConditionService.getList(0, {
          discount_kind_id: discountInfo.idx,
        });

        discountBodyList.push({
          ...discountInfo,
          discount_condition_list: conditionList.map((conditionBody) => ({
            ...conditionBody,
            is_use: "0",
          })),
        });
      }

      dispatch({
        type: PUT_DISCOUNT_BODY,
        payload: {
          discountBodyList: discountBodyList,
        },
      });
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
export const addLineupBody = () => ({
  type: ADD_LINEUP_BODY,
});
export const deleteLineupBody = (number) => ({
  type: DELETE_LINEUP_BODY,
  payload: {
    number: number,
  },
});
export const setLineupBody = (number, name, value) => ({
  type: SET_LINEUP_BODY,
  payload: {
    number: number,
    name: name,
    value: value,
  },
});
export const addColorBody = () => ({
  type: ADD_COLOR_BODY,
});
export const deleteColorBody = (number) => ({
  type: DELETE_COLOR_BODY,
  payload: {
    number: number,
  },
});
export const setColorBody = (number, name, value) => ({
  type: SET_COLOR_BODY,
  payload: {
    number: number,
    name: name,
    value: value,
  },
});
export const addTrimBody = () => ({
  type: ADD_TRIM_BODY,
});
export const deleteTrimBody = (number) => ({
  type: DELETE_TRIM_BODY,
  payload: {
    number: number,
  },
});
export const setTrimBody = (number, name, value) => ({
  type: SET_TRIM_BODY,
  payload: {
    number: number,
    name: name,
    value: value,
  },
});
export const setDiscountBody = (kind_id, condition_id, name, value) => ({
  type: SET_DISCOUNT_BODY,
  payload: {
    kind_id: kind_id,
    condition_id: condition_id,
    name: name,
    value: value,
  },
});
export const deletePicture = (number) => (dispatch) => {
  let name = "picture_" + number;
  dispatch(setBody(name, { uid: "__AUTO__" }));

  dispatch(preview(number, null));
};
export const moveUp = (name, index) => (dispatch, getState) => {
  const state = getState();
  const bodyList = state.modelEdit[name];
  if (index > 0) {
    const current_item = bodyList[index];
    const top_item = bodyList[index - 1];

    dispatch({
      type: MOVE_UP,
      payload: {
        name: name,
        index: index,
        current_item: current_item,
        top_item: top_item,
      },
    });
  }
};
export const moveDown = (name, index) => (dispatch, getState) => {
  const state = getState();
  const bodyList = state.modelEdit[name];
  if (index < bodyList.length - 1) {
    const current_item = bodyList[index];
    const bottom_item = bodyList[index + 1];

    dispatch({
      type: MOVE_DOWN,
      payload: {
        name: name,
        index: index,
        current_item: current_item,
        bottom_item: bottom_item,
      },
    });
  }
};
export const save = (url) => async (dispatch, getState) => {
  const state = getState();
  const bodyInfo = state.modelEdit.bodyInfo;
  const lineupBodyList = state.modelEdit.lineupBodyList;
  const colorBodyList = state.modelEdit.colorBodyList;
  const trimBodyList = state.modelEdit.trimBodyList;
  const discountBodyList = state.modelEdit.discountBodyList;
  const lineupIdList = state.modelEdit.lineupIdList;
  const colorIdList = state.modelEdit.colorIdList;
  const trimIdList = state.modelEdit.trimIdList;

  const validation = [];
  if (bodyInfo.check_name !== "not-exist") {
    validation.push({
      title: "정보",
      name: "모델명 중복체크",
    });
  }
  if (bodyInfo.brand_id === null) {
    validation.push({
      title: "정보",
      name: "브랜드명",
    });
  }
  if (bodyInfo.group_id === null) {
    validation.push({
      title: "정보",
      name: "그룹명",
    });
  }
  if (bodyInfo.model_name === "") {
    validation.push({
      title: "정보",
      name: "모델",
    });
  }
  if (bodyInfo.is_new === null) {
    validation.push({
      title: "정보",
      name: "신차여부",
    });
  }
  if (bodyInfo.release_date === null) {
    validation.push({
      title: "정보",
      name: "출시일",
    });
  }
  if (bodyInfo.sequence === "") {
    validation.push({
      title: "정보",
      name: "순서",
    });
  }
  if (bodyInfo.is_use === null) {
    validation.push({
      title: "정보",
      name: "사용여부",
    });
  }

  lineupBodyList.map((body, index) => {
    if (body.name === "") {
      validation.push({
        title: "공통옵션 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "옵션이름",
      });
    }
    if (body.price === 0) {
      validation.push({
        title: "공통옵션 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "가격",
      });
    }
    if (body.detail === "") {
      validation.push({
        title: "공통옵션 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "세부내용",
      });
    }
  });

  colorBodyList.map((body, index) => {
    if (body.name === "") {
      validation.push({
        title: "색상 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "색상이름",
      });
    }
    if (body.price === 0) {
      validation.push({
        title: "색상 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "가격",
      });
    }
  });

  trimBodyList.map((body, index) => {
    if (body.name === "") {
      validation.push({
        title: "옵션 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "옵션이름",
      });
    }
    if (body.price === 0) {
      validation.push({
        title: "옵션 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "가격",
      });
    }
    if (body.detail === "") {
      validation.push({
        title: "옵션 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "세부내용",
      });
    }
  });

  if (validation.length > 0) {
    dispatch(showValidation(validation));
  } else {
    try {
      let discount_condition_id_array = [];
      discountBodyList.map((kindBody) =>
        kindBody.discount_condition_list
          .filter((conditionBody) => conditionBody.is_use === "0")
          .map((conditionBody) =>
            discount_condition_id_array.push(conditionBody.idx)
          )
      );

      await modelService.update({
        ...bodyInfo,
        discount_condition_ids: discount_condition_id_array.join(","),
      });

      //delete lineup
      for (let i = 0; i < lineupIdList.length; i++) {
        const element = lineupIdList[i];
        if (!lineupBodyList.some((item) => item.idx === element)) {
          modelLineupService.remove(element);
        }
      }

      //update lineup
      for (let i = 0; i < lineupBodyList.length; i++) {
        const element = lineupBodyList[i];
        if (element.idx) {
          await modelLineupService.update(element);
        }
      }

      //create lineup
      const tempLineupBodyList = lineupBodyList
        .filter((body) => body.idx === null)
        .map((body) => ({
          ...body,
          model_id: bodyInfo.idx,
        }));

      if (tempLineupBodyList.length > 0) {
        await modelLineupService.create(tempLineupBodyList);
      }

      //delete color
      for (let i = 0; i < colorIdList.length; i++) {
        const element = colorIdList[i];
        if (!colorBodyList.some((item) => item.idx === element)) {
          modelColorService.remove(element);
        }
      }

      //update color
      for (let i = 0; i < colorBodyList.length; i++) {
        const element = colorBodyList[i];
        if (element.idx) {
          await modelColorService.update(element);
        }
      }

      //create color
      const tempColorBodyList = colorBodyList
        .filter((body) => body.idx === null)
        .map((body) => ({
          ...body,
          model_id: bodyInfo.idx,
        }));

      if (tempColorBodyList.length > 0) {
        await modelColorService.create(tempColorBodyList);
      }

      //delete trim
      for (let i = 0; i < trimIdList.length; i++) {
        const element = trimIdList[i];
        if (!trimBodyList.some((item) => item.idx === element)) {
          modelTrimService.remove(element);
        }
      }

      //update trim
      for (let i = 0; i < trimBodyList.length; i++) {
        const element = trimBodyList[i];
        if (element.idx) {
          await modelTrimService.update(element);
        }
      }

      //create trim
      const tempTrimBodyList = trimBodyList
        .filter((body) => body.idx === null)
        .map((body) => ({
          ...body,
          model_id: bodyInfo.idx,
        }));

      if (tempTrimBodyList.length > 0) {
        await modelTrimService.create(tempTrimBodyList);
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
    await lineupService.removeByModel(idx);
    await modelService.remove(idx);

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
  bodyInfo: {
    idx: null,
    brand_id: null,
    group_id: null,
    is_new: null,
    model_name: "",
    release_date: new Date(),
    sequence: 1,
    is_use: "0",
    discount_condition_ids: "",
    picture_1: { uid: "__AUTO__" },
    picture_2: { uid: "__AUTO__" },
    picture_3: { uid: "__AUTO__" },
    picture_4: { uid: "__AUTO__" },
    picture_5: { uid: "__AUTO__" },
    picture_6: { uid: "__AUTO__" },
    picture_7: { uid: "__AUTO__" },
    picture_8: { uid: "__AUTO__" },
    preview_1: preview_default_image,
    preview_2: preview_default_image,
    preview_3: preview_default_image,
    preview_4: preview_default_image,
    preview_5: preview_default_image,
    preview_6: preview_default_image,
    preview_7: preview_default_image,
    preview_8: preview_default_image,
    check_name: preview_default_image,
    origin_name: preview_default_image,
  },
  lineupBodyList: [],
  colorBodyList: [],
  trimBodyList: [],
  discountBodyList: [],
  lineupIdList: [],
  colorIdList: [],
  trimIdList: [],
};

export default function create(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        bodyInfo: action.payload.bodyInfo,
        brandOptionList: action.payload.brandOptionList,
        groupOptionList: action.payload.groupOptionList,
        lineupBodyList: action.payload.lineupBodyList.map((body, index) => ({
          ...body,
          number: index + 1,
        })),
        colorBodyList: action.payload.colorBodyList.map((body, index) => ({
          ...body,
          number: index + 1,
        })),
        trimBodyList: action.payload.trimBodyList.map((body, index) => ({
          ...body,
          number: index + 1,
        })),
        discountBodyList: action.payload.discountBodyList,
        lineupIdList: action.payload.lineupIdList,
        colorIdList: action.payload.colorIdList,
        trimIdList: action.payload.trimIdList,
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
          ["preview_" + action.payload.number]: action.payload.preview,
        },
      };
    case SET_BODY:
      return {
        ...state,
        bodyInfo: {
          ...state.bodyInfo,
          check_name:
            action.payload.name === "model_name"
              ? ""
              : state.bodyInfo.check_name,
          [action.payload.name]: action.payload.value,
        },
      };
    case ADD_LINEUP_BODY:
      return {
        ...state,
        lineupBodyList: [
          ...state.lineupBodyList,
          {
            ...initialState.lineupBodyList[0],
            number:
              state.lineupBodyList[state.lineupBodyList.length - 1].number + 1,
          },
        ],
      };
    case DELETE_LINEUP_BODY:
      return {
        ...state,
        lineupBodyList: state.lineupBodyList.filter(
          (body) => body.number !== action.payload.number
        ),
      };
    case SET_LINEUP_BODY:
      return {
        ...state,
        lineupBodyList: state.lineupBodyList.map((body) =>
          body.number === action.payload.number
            ? {
                ...body,
                [action.payload.name]: action.payload.value,
              }
            : body
        ),
      };
    case ADD_COLOR_BODY:
      return {
        ...state,
        colorBodyList: [
          ...state.colorBodyList,
          {
            ...initialState.colorBodyList[0],
            number:
              state.colorBodyList[state.colorBodyList.length - 1].number + 1,
          },
        ],
      };
    case DELETE_COLOR_BODY:
      return {
        ...state,
        colorBodyList: state.colorBodyList.filter(
          (body) => body.number !== action.payload.number
        ),
      };
    case SET_COLOR_BODY:
      return {
        ...state,
        colorBodyList: state.colorBodyList.map((body) =>
          body.number === action.payload.number
            ? {
                ...body,
                [action.payload.name]: action.payload.value,
              }
            : body
        ),
      };
    case ADD_TRIM_BODY:
      return {
        ...state,
        trimBodyList: [
          ...state.trimBodyList,
          {
            ...initialState.trimBodyList[0],
            number:
              state.trimBodyList[state.trimBodyList.length - 1].number + 1,
          },
        ],
      };
    case DELETE_TRIM_BODY:
      return {
        ...state,
        trimBodyList: state.trimBodyList.filter(
          (body) => body.number !== action.payload.number
        ),
      };
    case SET_TRIM_BODY:
      return {
        ...state,
        trimBodyList: state.trimBodyList.map((body) =>
          body.number === action.payload.number
            ? {
                ...body,
                [action.payload.name]: action.payload.value,
              }
            : body
        ),
      };
    case SET_DISCOUNT_BODY:
      return {
        ...state,
        discountBodyList: state.discountBodyList.map((kindBody) =>
          kindBody.idx === action.payload.kind_id
            ? {
                ...kindBody,
                discount_condition_list: kindBody.discount_condition_list.map(
                  (conditionBody) =>
                    conditionBody.idx === action.payload.condition_id
                      ? {
                          ...conditionBody,
                          [action.payload.name]: action.payload.value,
                        }
                      : conditionBody
                ),
              }
            : kindBody
        ),
      };
    case PUT_DISCOUNT_BODY:
      return {
        ...state,
        discountBodyList: action.payload.discountBodyList,
      };
    case MOVE_UP:
      return {
        ...state,
        [action.payload.name]: state[action.payload.name].map(
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
        [action.payload.name]: state[action.payload.name].map(
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
