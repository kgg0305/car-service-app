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
const ADD_SPECIFICATION_BODY = prefix + "ADD_SPECIFICATION_BODY";
const SET_SPECIFICATION_BODY = prefix + "SET_SPECIFICATION_BODY";
const DELETE_SPECIFICATION_BODY = prefix + "DELETE_SPECIFICATION_BODY";
const SET_TRIM_BODY = prefix + "SET_TRIM_BODY";
const PUT_TRIM_BODY = prefix + "PUT_TRIM_BODY";
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

    dispatch({
      type: INIT,
      payload: {
        bodyInfo: bodyInfo,
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
    const result = await trimService.checkName(name);

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
export const save =
  (url, bodyInfo, specificationBodyList, trimBodyList, specificationIdList) =>
  async (dispatch) => {
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
  },
  specificationBodyList: [],
  trimBodyList: [],
  specificationIdList: [],
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
          lineup_id:
            action.payload.name === "brand_id" ||
            action.payload.name === "group_id" ||
            action.payload.name === "model_id"
              ? null
              : state.bodyInfo.lineup_id,
          [action.payload.name]: action.payload.value,
        },
      };
    case ADD_SPECIFICATION_BODY:
      return {
        ...state,
        specificationBodyList: [
          ...state.specificationBodyList,
          {
            ...initialState.specificationBodyList[0],
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
