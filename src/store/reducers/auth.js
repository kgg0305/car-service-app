import { authService } from "../../services/authService";
import { userService } from "../../services/userService";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SET_VALIDATION = "SET_VALIDATION";
const SET_FORM = "SET_FORM";
const SET_TOKEN = "SET_TOKEN";
const REMOVE_TOKEN = "REMOVE_TOKEN";
const SET_CHANGE_FORM = "SET_CHANGE_FORM";
const SET_CHANGE_VALIDATION = "SET_CHANGE_VALIDATION";

export const login = (user_id, password) => async (dispatch) => {
  try {
    const result = await authService.login(user_id, password);

    dispatch(
      setValidation({
        name: "user_id",
        value: false,
      })
    );

    dispatch(
      setValidation({
        name: "password",
        value: false,
      })
    );

    switch (result.status) {
      case "successful":
        dispatch(setToken(result.token));
        break;
      case "no-user":
        dispatch(
          setValidation({
            name: "user_id",
            value: true,
          })
        );
        break;
      case "no-password":
        dispatch(
          setValidation({
            name: "password",
            value: true,
          })
        );
        break;
      default:
        break;
    }
  } catch (e) {
    console.log(e);
  }
};
export const logout = () => ({ type: LOGOUT });
export const setValidation = (payload) => ({ type: SET_VALIDATION, payload });
export const setForm = (payload) => ({ type: SET_FORM, payload });
export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: { token: token },
});
export const removeToken = () => ({ type: REMOVE_TOKEN });
export const setChangeForm = (payload) => ({
  type: SET_CHANGE_FORM,
  payload,
});
export const setChangeValidation = (payload) => ({
  type: SET_CHANGE_VALIDATION,
  payload,
});
export const changePassword = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const user_info = state.auth.token;
    const new_password = state.auth.changeForm.new_password;
    const confirm_password = state.auth.changeForm.confirm_password;

    let danger_password = false;
    let short_password = false;
    let match_password = false;

    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;

    const uppercasePassword = uppercaseRegExp.test(new_password);
    const lowercasePassword = lowercaseRegExp.test(new_password);
    const digitsPassword = digitsRegExp.test(new_password);
    const specialCharPassword = specialCharRegExp.test(new_password);
    const minLengthPassword = minLengthRegExp.test(new_password);

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

    if (new_password !== confirm_password) {
      match_password = true;
    }

    dispatch(
      setChangeValidation({
        name: "danger_password",
        value: danger_password,
      })
    );

    dispatch(
      setChangeValidation({
        name: "short_password",
        value: short_password,
      })
    );

    dispatch(
      setChangeValidation({
        name: "match_password",
        value: match_password,
      })
    );

    if (!danger_password && !short_password && !match_password) {
      await userService.update({
        ...user_info,
        password: new_password,
        is_reset_password: true,
      });

      const updated_user_info = await userService.get(user_info.idx);

      dispatch(setToken(updated_user_info));
    }
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  token: JSON.parse(sessionStorage.getItem("token")),
  validation: {
    user_id: false,
    password: false,
  },
  form: {
    user_id: "",
    password: "",
  },
  changeValidation: {
    danger_password: false,
    short_password: false,
    match_password: false,
  },
  changeForm: {
    new_password: "",
    confirm_password: "",
  },
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
      };
    case LOGOUT:
      return {
        user: 0,
      };
    case SET_VALIDATION:
      return {
        ...state,
        validation: {
          ...state.validation,
          [action.payload.name]: action.payload.value,
        },
      };
    case SET_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.name]: action.payload.value,
        },
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };
    case REMOVE_TOKEN:
      return {
        ...state,
        token: null,
      };
    case SET_CHANGE_FORM:
      return {
        ...state,
        changeForm: {
          ...state.changeForm,
          [action.payload.name]: action.payload.value,
        },
      };
    case SET_CHANGE_VALIDATION:
      return {
        ...state,
        changeValidation: {
          ...state.changeValidation,
          [action.payload.name]: action.payload.value,
        },
      };
    default:
      return state;
  }
}
