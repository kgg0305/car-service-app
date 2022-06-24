import { brandService } from "../../../../services/brandService";
import { carKindService } from "../../../../services/carKindService";
import { groupService } from "../../../../services/groupService";

const prefix = "car/group/create/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_VALIDATION = prefix + "SHOW_VALIDATION";
const CLOSE_VALIDATION = prefix + "CLOSE_VALIDATION";
const CHECK_NAME = prefix + "CHECK_NAME";
const ADD_BODY = prefix + "ADD_BODY";
const DELETE_BODY = prefix + "DELETE_BODY";
const SET_BODY = prefix + "SET_BODY";
const SAVE = prefix + "SAVE";

// 초기화
export const init = () => async (dispatch) => {
  try {
    const brandOptionList = await brandService.getOptionList();
    const carKindOptionList = await carKindService.getOptionList();

    dispatch({
      type: INIT,
      payload: {
        brandOptionList: brandOptionList,
        carKindOptionList: carKindOptionList,
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

// 증복명 검사
export const checkName = (number, name) => async (dispatch) => {
  try {
    if (name === "") {
      dispatch(
        showValidation([
          {
            title: "정보 " + (number < 10 ? "0" + number : number),
            name: "모델그룹명",
          },
        ])
      );
    } else {
      const result = await groupService.checkName(name);

      dispatch({
        type: CHECK_NAME,
        payload: {
          number: number,
          check_name: result ? "exist" : "not-exist",
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
};

// 항목 추가
export const addBody = () => (dispatch, getState) => {
  const state = getState();
  const bodyList = state.groupCreate.bodyList;

  if (bodyList.length < 10) {
    dispatch({
      type: ADD_BODY,
    });
  }
};

// 항목 삭제
export const deleteBody = (number) => ({
  type: DELETE_BODY,
  payload: {
    number: number,
  },
});

// 항목값 설정
export const setBody = (number, name, value) => ({
  type: SET_BODY,
  payload: {
    number: number,
    name: name,
    value: value,
  },
});

// 등록
export const save = (url) => async (dispatch, getState) => {
  const state = getState();
  const bodyList = state.groupCreate.bodyList;

  const validation = [];
  bodyList.map((body, index) => {
    if (body.check_name !== "not-exist") {
      validation.push({
        title: "정보 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "그룹명 중복체크",
      });
    }
    if (body.brand_id === null) {
      validation.push({
        title: "정보 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "브랜드",
      });
    }
    if (body.group_name === "") {
      validation.push({
        title: "정보 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "모델그룹",
      });
    }
    if (body.car_kind_id === null) {
      validation.push({
        title: "정보 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "차종",
      });
    }
  });

  if (validation.length > 0) {
    dispatch(showValidation(validation));
  } else {
    try {
      await groupService.create(bodyList);

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

// 초기상태값
const initialState = {
  redirectTo: "",
  validation: {
    show: false,
    list: [],
  },
  brandOptionList: [],
  carKindOptionList: [],
  bodyList: [
    {
      number: 1,
      brand_id: null,
      group_name: "",
      car_kind_id: null,
      is_use: "0",
      check_name: "",
    },
  ],
};

export default function create(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        brandOptionList: action.payload.brandOptionList,
        carKindOptionList: action.payload.carKindOptionList,
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
        bodyList: state.bodyList.map((body) =>
          body.number === action.payload.number
            ? {
                ...body,
                check_name: action.payload.check_name,
              }
            : body
        ),
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
                check_name:
                  action.payload.name === "group_name" ? "" : body.check_name,
                [action.payload.name]: action.payload.value,
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
