import preview_default_image from "../../../../assets/images/preview-default-image.png";
import { GetBase64 } from "../../../../constants/GlobalFunctions";
import { brandService } from "../../../../services/brandService";

const prefix = "car/brand/create/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_VALIDATION = prefix + "SHOW_VALIDATION";
const CLOSE_VALIDATION = prefix + "CLOSE_VALIDATION";
const CHECK_NAME = prefix + "CHECK_NAME";
const PREVIEW = prefix + "PREVIEW";
const ADD_BODY = prefix + "ADD_BODY";
const DELETE_BODY = prefix + "DELETE_BODY";
const SET_BODY = prefix + "SET_BODY";
const SAVE = prefix + "SAVE";

export const init = () => async (dispatch) => {
  try {
    const sequence = (await brandService.sequence()) + 1;

    dispatch({
      type: INIT,
      payload: {
        sequence: sequence,
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
export const checkName = (number, name) => async (dispatch) => {
  try {
    if (name === "") {
      dispatch(
        showValidation([
          {
            title: "정보 " + (number < 10 ? "0" + number : number),
            name: "브랜드명",
          },
        ])
      );
    } else {
      const result = await brandService.checkName(name);

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
export const addBody = () => (dispatch, getState) => {
  const state = getState();
  const bodyList = state.brandCreate.bodyList;

  if (bodyList.length < 10) {
    dispatch({
      type: ADD_BODY,
    });
  }
};
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
export const deleteLogo = (number) => (dispatch) => {
  dispatch(setBody(number, "logo", { uid: "__AUTO__" }));

  dispatch(preview(number, null));
};
export const save = (url) => async (dispatch, getState) => {
  const state = getState();
  const bodyList = state.brandCreate.bodyList;

  const validation = [];
  bodyList.map((body, index) => {
    if (body.check_name !== "not-exist") {
      validation.push({
        title: "정보 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "브랜드명 중복체크",
      });
    }
    if (body.brand_name === "") {
      validation.push({
        title: "정보 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "브랜드",
      });
    }
    if (body.sequence === null) {
      validation.push({
        title: "정보 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "순서",
      });
    }
    if (body.nation === null) {
      validation.push({
        title: "정보 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "국가",
      });
    }
    if (body.is_income === null) {
      validation.push({
        title: "정보 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "수입여부",
      });
    }
    if (body.public_uri === "") {
      validation.push({
        title: "정보 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "공식사이트",
      });
    }
    if (body.room_uri === "") {
      validation.push({
        title: "정보 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "전시장 안내",
      });
    }
    if (body.service_uri === "") {
      validation.push({
        title: "정보 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "서비스 센터",
      });
    }
    if (body.deposit_uri === "") {
      validation.push({
        title: "정보 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "보증금 안내",
      });
    }
    if (body.preview === preview_default_image) {
      validation.push({
        title: "정보 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "로고",
      });
    }
  });

  if (validation.length > 0) {
    dispatch(showValidation(validation));
  } else {
    try {
      await brandService.create(bodyList);

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
  bodyList: [
    {
      number: 1,
      brand_name: "",
      sequence: 1,
      nation: null,
      is_income: null,
      is_use: "0",
      public_uri: "",
      room_uri: "",
      service_uri: "",
      deposit_uri: "",
      logo: { uid: "__AUTO__" },
      preview: preview_default_image,
      check_name: "",
    },
  ],
};

export default function create(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        bodyList: [
          {
            ...initialState.bodyList[0],
            sequence: action.payload.sequence,
          },
        ],
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
    case PREVIEW:
      return {
        ...state,
        bodyList: state.bodyList.map((body) =>
          body.number === action.payload.number
            ? {
                ...body,
                preview: action.payload.preview,
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
            sequence: state.bodyList[state.bodyList.length - 1].sequence + 1,
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
                  action.payload.name === "brand_name" ? "" : body.check_name,
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
