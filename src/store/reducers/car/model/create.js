import preview_default_image from "../../../../assets/images/preview-default-image.png";
import { GetBase64 } from "../../../../constants/GlobalFunctions";
import { brandService } from "../../../../services/brandService";
import { discountConditionService } from "../../../../services/discountConditionService";
import { discountKindService } from "../../../../services/discountKindService";
import { groupService } from "../../../../services/groupService";
import { modelColorService } from "../../../../services/modelColorService";
import { modelLineupService } from "../../../../services/modelLineupService";
import { modelService } from "../../../../services/modelService";
import { modelTrimService } from "../../../../services/modelTrimService";

const prefix = "car/model/create/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_VALIDATION = prefix + "SHOW_VALIDATION";
const CLOSE_VALIDATION = prefix + "CLOSE_VALIDATION";
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
const SAVE = prefix + "SAVE";

export const init = () => async (dispatch) => {
  try {
    const brandOptionList = await brandService.getOptionList();
    const groupOptionList = await groupService.getOptionList();

    dispatch({
      type: INIT,
      payload: {
        brandOptionList: brandOptionList,
        groupOptionList: groupOptionList,
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
export const checkName = (name) => async (dispatch) => {
  try {
    const result = await modelService.checkName(name);

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
export const preveiew = (number, file) => async (dispatch) => {
  if (!file.url && !file.preview) {
    file.preview = await GetBase64(file.originFileObj);
  }

  dispatch({
    type: PREVIEW,
    payload: {
      number: number,
      preview: file.preview,
    },
  });
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
export const save =
  (
    url,
    bodyInfo,
    lineupBodyList,
    colorBodyList,
    trimBodyList,
    discountBodyList
  ) =>
  async (dispatch) => {
    const validation = [];
    if (bodyInfo.brand_id === null) {
      validation.push({
        title: "정보",
        name: "차량",
      });
    }
    if (bodyInfo.group_id === "") {
      validation.push({
        title: "정보",
        name: "차량",
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

        const created_info = await modelService.create({
          ...bodyInfo,
          discount_condition_ids: discount_condition_id_array.join(","),
        });
        const model_id = created_info["insertId"];

        //create lineup
        const tempLineupBodyList = lineupBodyList.map((body) => ({
          ...body,
          model_id: model_id,
        }));

        if (tempLineupBodyList.length > 0) {
          await modelLineupService.create(tempLineupBodyList);
        }

        //create color
        const tempColorBodyList = colorBodyList.map((body) => ({
          ...body,
          model_id: model_id,
        }));

        if (tempColorBodyList.length > 0) {
          await modelColorService.create(tempColorBodyList);
        }

        //create trim
        const tempTrimBodyList = trimBodyList.map((body) => ({
          ...body,
          model_id: model_id,
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

const initialState = {
  redirectTo: "",
  validation: {
    show: false,
    list: [],
  },
  brandOptionList: [],
  groupOptionList: [],
  bodyInfo: {
    brand_id: null,
    group_id: null,
    is_new: null,
    model_name: "",
    release_date: new Date(),
    sequence: 1,
    is_use: "0",
    discount_condition_ids: "",
    picture_1: {},
    picture_2: {},
    picture_3: {},
    picture_4: {},
    picture_5: {},
    picture_6: {},
    picture_7: {},
    picture_8: {},
    preview_1: preview_default_image,
    preview_2: preview_default_image,
    preview_3: preview_default_image,
    preview_4: preview_default_image,
    preview_5: preview_default_image,
    preview_6: preview_default_image,
    preview_7: preview_default_image,
    preview_8: preview_default_image,
    check_name: "",
  },
  lineupBodyList: [
    {
      number: 1,
      model_id: null,
      name: "",
      price: 0,
      detail: "",
    },
  ],
  colorBodyList: [
    {
      number: 1,
      model_id: null,
      name: "",
      price: 0,
    },
  ],
  trimBodyList: [
    {
      number: 1,
      model_id: null,
      name: "",
      price: 0,
      detail: "",
    },
  ],
  discountBodyList: [],
};

export default function create(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        brandOptionList: action.payload.brandOptionList,
        groupOptionList: action.payload.groupOptionList,
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
    case SAVE:
      return {
        ...state,
        redirectTo: action.payload.url,
      };
    default:
      return state;
  }
}
