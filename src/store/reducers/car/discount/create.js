import { GetDateStringFromDate } from "../../../../constants/GlobalFunctions";
import { brandService } from "../../../../services/brandService";
import { discountConditionService } from "../../../../services/discountConditionService";
import { discountKindService } from "../../../../services/discountKindService";

const prefix = "car/discount/create/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_VALIDATION = prefix + "SHOW_VALIDATION";
const CLOSE_VALIDATION = prefix + "CLOSE_VALIDATION";
const ADD_BODY = prefix + "ADD_BODY";
const DELETE_BODY = prefix + "DELETE_BODY";
const SET_BODY = prefix + "SET_BODY";
const ADD_KIND_BODY = prefix + "ADD_KIND_BODY";
const SET_KIND_BODY = prefix + "SET_KIND_BODY";
const DELETE_KIND_BODY = prefix + "DELETE_KIND_BODY";
const SET_CONDITION_BODY = prefix + "SET_CONDITION_BODY";
const SAVE = prefix + "SAVE";

export const init = () => async (dispatch) => {
  try {
    const brandOptionList = await brandService.getOptionList();

    dispatch({
      type: INIT,
      payload: {
        brandOptionList: brandOptionList,
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
export const addBody = () => ({
  type: ADD_BODY,
});
export const deleteBody = (number) => ({
  type: DELETE_BODY,
  payload: {
    number: number,
  },
});
export const setBody = (number, name, value) => ({
  type: SET_BODY,
  payload: {
    number: number,
    name: name,
    value: value,
  },
});
export const addKindBody = (number) => ({
  type: ADD_KIND_BODY,
  payload: {
    number: number,
  },
});
export const setKindBody = (number, kindNumber, name, value) => ({
  type: SET_KIND_BODY,
  payload: {
    number: number,
    kindNumber: kindNumber,
    name: name,
    value: value,
  },
});
export const deleteKindBody = (number, kindNumber) => ({
  type: DELETE_KIND_BODY,
  payload: {
    number: number,
    kindNumber: kindNumber,
  },
});
export const setConditionBody = (
  number,
  kindNumber,
  conditionNumber,
  name,
  value
) => ({
  type: SET_CONDITION_BODY,
  payload: {
    number: number,
    kindNumber: kindNumber,
    conditionNumber: conditionNumber,
    name: name,
    value: value,
  },
});
export const save = (url, bodyList) => async (dispatch) => {
  const validation = [];
  bodyList.map((body, index) => {
    if (body.brand_id === null) {
      validation.push({
        title: "정보 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "브랜드",
      });
    }
    body.kindBodyList.map((kindBody, kindIndex) => {
      if (kindBody.kind_name === "") {
        validation.push({
          title:
            "종류 " +
            (kindIndex + 1 < 10 ? "0" + (kindIndex + 1) : kindIndex + 1),
          name:
            "상품 " +
            (kindIndex + 1 < 10
              ? "0" + (kindIndex + 1)
              : kindIndex + 1 + "(할인 종류 이름)"),
        });
      }
    });
  });

  if (validation.length > 0) {
    dispatch(showValidation(validation));
  } else {
    try {
      const created_info = await discountKindService.create(bodyList);
      const startedIndex = created_info["insertId"];

      await discountConditionService.create(startedIndex, bodyList);

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
  bodyList: [
    {
      number: 1,
      brand_id: null,
      kindBodyList: [
        {
          number: 1,
          kind_name: "",
          kind_detail: "",
          s_date: new Date(),
          e_date: new Date(),
          conditionBodyList: [
            {
              number: 1,
              condition_name: "",
              discount_price: 0,
              price_unit: "0",
            },
          ],
        },
      ],
    },
  ],
};

export default function create(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        brandOptionList: action.payload.brandOptionList,
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
    case ADD_BODY:
      return {
        ...state,
        bodyList: [
          ...state.bodyList,
          {
            ...initialState.bodyList[0],
            number: state.bodyList[state.bodyList.length - 1].number + 1,
          },
        ],
      };
    case DELETE_BODY:
      return {
        ...state,
        bodyList: state.bodyList.filter(
          (body) => body.number !== action.payload.number
        ),
      };
    case SET_BODY:
      return {
        ...state,
        bodyList: state.bodyList.map((body) =>
          body.number === action.payload.number
            ? {
                ...body,
                [action.payload.name]: action.payload.value,
              }
            : body
        ),
      };
    case ADD_KIND_BODY:
      return {
        ...state,
        bodyList: state.bodyList.map((body) =>
          body.number === action.payload.number
            ? {
                ...body,
                kindBodyList: [
                  ...body.kindBodyList,
                  {
                    ...initialState.bodyList[0].kindBodyList[0],
                    number:
                      body.kindBodyList[body.kindBodyList.length - 1].number +
                      1,
                  },
                ],
              }
            : body
        ),
      };
    case SET_KIND_BODY:
      return {
        ...state,
        bodyList: state.bodyList.map((body) =>
          body.number === action.payload.number
            ? {
                ...body,
                kindBodyList: body.kindBodyList.map((kindBody) =>
                  kindBody.number === action.payload.kindNumber
                    ? {
                        ...kindBody,
                        [action.payload.name]: action.payload.value,
                        s_date:
                          action.payload.name === "s_date"
                            ? GetDateStringFromDate(
                                new Date(action.payload.value)
                              )
                            : kindBody.s_date,
                        e_date:
                          action.payload.name === "e_date"
                            ? GetDateStringFromDate(
                                new Date(action.payload.value)
                              )
                            : kindBody.e_date,
                      }
                    : kindBody
                ),
              }
            : body
        ),
      };
    case DELETE_KIND_BODY:
      return {
        ...state,
        bodyList: state.bodyList.map((body) =>
          body.number === action.payload.number
            ? {
                ...body,
                kindBodyList: [
                  ...body.kindBodyList.filter(
                    (kindBody) => kindBody.number !== action.payload.kindNumber
                  ),
                ],
              }
            : body
        ),
      };
    case SET_CONDITION_BODY:
      return {
        ...state,
        bodyList: state.bodyList.map((body) =>
          body.number === action.payload.number
            ? {
                ...body,
                kindBodyList: body.kindBodyList.map((kindBody) =>
                  kindBody.number === action.payload.kindNumber
                    ? {
                        ...kindBody,
                        conditionBodyList: kindBody.conditionBodyList.map(
                          (conditionBody) =>
                            conditionBody.number ===
                            action.payload.conditionNumber
                              ? {
                                  ...conditionBody,
                                  [action.payload.name]: action.payload.value,
                                }
                              : conditionBody
                        ),
                      }
                    : kindBody
                ),
              }
            : body
        ),
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