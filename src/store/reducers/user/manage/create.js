import { userService } from "../../../../services/userService";

const prefix = "user/manage/create/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_VALIDATION = prefix + "SHOW_VALIDATION";
const CLOSE_VALIDATION = prefix + "CLOSE_VALIDATION";
const CHECK_NAME = prefix + "CHECK_NAME";
const ADD_BODY = prefix + "ADD_BODY";
const DELETE_BODY = prefix + "DELETE_BODY";
const SET_BODY = prefix + "SET_BODY";
const SAVE = prefix + "SAVE";

export const init = () => async (dispatch) => {
  try {
    dispatch({
      type: INIT,
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
    const result = await userService.checkName(name);

    dispatch({
      type: CHECK_NAME,
      payload: {
        number: number,
        check_name: result ? "exist" : "not-exist",
      },
    });
  } catch (e) {
    console.log(e);
  }
};
export const addBody = () => ({
  type: ADD_BODY,
});
export const deleteBody = (number) => ({
  type: DELETE_BODY,
  payload: {
    number: number,
  },
});
export const setBody = (number, name, value) => (dispatch) => {
  let danger_password = false;
  let short_password = false;

  if (name == "password") {
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;

    const uppercasePassword = uppercaseRegExp.test(value);
    const lowercasePassword = lowercaseRegExp.test(value);
    const digitsPassword = digitsRegExp.test(value);
    const specialCharPassword = specialCharRegExp.test(value);
    const minLengthPassword = minLengthRegExp.test(value);

    if (!minLengthPassword) {
      danger_password = true;
      short_password = true;
    } else if (!uppercasePassword) {
      danger_password = true;
    } else if (!lowercasePassword) {
      danger_password = true;
    } else if (!digitsPassword) {
      danger_password = true;
    } else if (!specialCharPassword) {
      danger_password = true;
    }
  }

  dispatch({
    type: SET_BODY,
    payload: {
      number: number,
      name: name,
      value: value,
      danger_password: danger_password,
      short_password: short_password,
    },
  });
};
export const save = (url, bodyList) => async (dispatch) => {
  const validation = [];
  bodyList.map((body, index) => {
    if (body.name === "") {
      validation.push({
        title: "정보 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "이름",
      });
    }
    if (body.user_id === "") {
      validation.push({
        title: "정보 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "아이디",
      });
    }
    if (body.type_id === null) {
      validation.push({
        title: "정보 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "구분",
      });
    }
    if (body.group_id === null) {
      validation.push({
        title: "정보 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "그룹",
      });
    }
    if (body.password === "" || body.danger_password) {
      validation.push({
        title: "정보 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "비밀번호",
      });
    }
  });

  if (validation.length > 0) {
    dispatch(showValidation(validation));
  } else {
    try {
      await userService.create(bodyList);

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
      name: "",
      user_id: "",
      type_id: null,
      group_id: null,
      password: "",
      check_name: "",
      danger_password: false,
      short_password: false,
    },
  ],
};

export default function create(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
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
                group_id:
                  action.payload.name === "type_id" ? null : body.group_id,
                [action.payload.name]: action.payload.value,
                danger_password:
                  action.payload.name === "password"
                    ? action.payload.danger_password
                    : state.danger_password,
                short_password:
                  action.payload.name === "password"
                    ? action.payload.short_password
                    : state.short_password,
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
