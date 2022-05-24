import { authService } from "../../services/authService";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SET_VALIDATION = "SET_VALIDATION";
const SET_FORM = "SET_FORM";
const SET_TOKEN = "SET_TOKEN";
const REMOVE_TOKEN = "REMOVE_TOKEN";

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
    default:
      return state;
  }
}
