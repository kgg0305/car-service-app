import { brandService } from "../../../../services/brandService";
import { discountConditionService } from "../../../../services/discountConditionService";
import { discountKindService } from "../../../../services/discountKindService";

const prefix = "car/discount/edit/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_VALIDATION = prefix + "SHOW_VALIDATION";
const CLOSE_VALIDATION = prefix + "CLOSE_VALIDATION";
const SHOW_CONFIRM = prefix + "SHOW_CONFIRM";
const CLOSE_CONFIRM = prefix + "CLOSE_CONFIRM";
const SET_BODY = prefix + "SET_BODY";
const ADD_CONDITION_BODY = prefix + "ADD_CONDITION_BODY";
const SET_CONDITION_BODY = prefix + "SET_CONDITION_BODY";
const DELETE_CONDITION_BODY = prefix + "DELETE_CONDITION_BODY";
const SAVE = prefix + "SAVE";
const REMOVE = prefix + "REMOVE";

// 초기화
export const init = (idx) => async (dispatch) => {
  try {
    const brandOptionList = await brandService.getOptionList();
    const bodyInfo = await discountKindService.get(idx);
    const conditionBodyList = await discountConditionService.getListAll({
      discount_kind_id: idx,
    });
    const conditionIdList = conditionBodyList.map((item) => item.idx);

    dispatch({
      type: INIT,
      payload: {
        brandOptionList: brandOptionList,
        bodyInfo: bodyInfo,
        conditionBodyList: conditionBodyList.map((body, index) => ({
          ...body,
          number: index + 1,
        })),
        conditionIdList: conditionIdList,
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

// 항목값 설정
export const setBody = (name, value) => async (dispatch) => {
  try {
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
export const addConditionBody = () => ({
  type: ADD_CONDITION_BODY,
});
export const setConditionBody = (number, name, value) => ({
  type: SET_CONDITION_BODY,
  payload: {
    number: number,
    name: name,
    value: value,
  },
});
export const deleteConditionBody = (number) => ({
  type: DELETE_CONDITION_BODY,
  payload: {
    number: number,
  },
});

// 등록
export const save = (url) => async (dispatch, getState) => {
  const state = getState();
  const bodyInfo = state.discountEdit.bodyInfo;
  const conditionBodyList = state.discountEdit.conditionBodyList;
  const conditionIdList = state.discountEdit.conditionIdList;

  const validation = [];
  if (bodyInfo.brand_id === null) {
    validation.push({
      title: "정보",
      name: "브랜드",
    });
  }
  if (bodyInfo.kind_name === "") {
    validation.push({
      title: "종류",
      name: "할인종류 이름",
    });
  }
  if (bodyInfo.kind_detail === "") {
    validation.push({
      title: "종류",
      name: "세부내용",
    });
  }

  conditionBodyList.map((body, index) => {
    if (body.condition_name === "") {
      validation.push({
        title: "조건 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "조건명",
      });
    }
    if (body.discount_price === "") {
      validation.push({
        title: "조건 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "가격",
      });
    }
    if (body.price_unit === null) {
      validation.push({
        title: "조건 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "단위",
      });
    }
  });

  if (validation.length > 0) {
    dispatch(showValidation(validation));
  } else {
    try {
      await discountKindService.update(bodyInfo);

      //delete condition
      for (let i = 0; i < conditionIdList.length; i++) {
        const element = conditionIdList[i];
        if (!conditionBodyList.some((item) => item.idx === element)) {
          discountConditionService.remove(element);
        }
      }

      for (let index = 0; index < conditionBodyList.length; index++) {
        const element = conditionBodyList[index];
        if (element.idx) {
          await discountConditionService.update(element);
        } else {
          await discountConditionService.create({
            ...element,
            discount_kind_id: bodyInfo.idx,
          });
        }
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

// 삭제
export const remove = (url, idx) => async (dispatch) => {
  try {
    await discountKindService.remove(idx);

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
  bodyInfo: {
    number: null,
    brand_id: null,
    kind_name: "",
    kind_detail: "",
    s_date: new Date(),
    e_date: new Date(),
  },
  conditionBodyList: [],
  conditionIdList: [],
};

export default function edit(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        brandOptionList: action.payload.brandOptionList,
        bodyInfo: action.payload.bodyInfo,
        conditionBodyList: action.payload.conditionBodyList,
        conditionIdList: action.payload.conditionIdList,
        confirm: {
          ...initialState.confirm,
          name: action.payload.bodyInfo.kind_name,
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
          [action.payload.name]: action.payload.value,
        },
      };
    case ADD_CONDITION_BODY:
      return {
        ...state,
        conditionBodyList: [
          ...state.conditionBodyList,
          {
            number: state.conditionBodyList.length + 1,
            condition_name: "",
            discount_price: 0,
            price_unit: "0",
          },
        ],
      };
    case SET_CONDITION_BODY:
      return {
        ...state,
        conditionBodyList: state.conditionBodyList.map((body) =>
          body.number === action.payload.number
            ? {
                ...body,
                [action.payload.name]: action.payload.value,
              }
            : body
        ),
      };
    case DELETE_CONDITION_BODY:
      return {
        ...state,
        conditionBodyList: [
          ...state.conditionBodyList.filter(
            (conditionBody) => conditionBody.number !== action.payload.number
          ),
        ],
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
