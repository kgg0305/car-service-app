import { Constants } from "../../constants/Constants";

const prefix = "menu/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SET_HEADER_MENU = prefix + "SET_HEADER_MENU";
const SET_SIDE_MENU = prefix + "SET_SIDE_MENU";

export const init = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const headerMenuRole = state.role.headerMenu;
    const siderMenuRole = state.role.siderMenuRole;

    const user_info = sessionStorage.getItem("token")
      ? JSON.parse(sessionStorage.getItem("token"))
      : null;
    const session_header = sessionStorage.getItem("headerMenuKey")
      ? JSON.parse(sessionStorage.getItem("headerMenuKey"))
      : "";
    const session_sider = sessionStorage.getItem("siderMenuKey")
      ? JSON.parse(sessionStorage.getItem("siderMenuKey"))
      : "";

    let headerMenu = { key: "" };
    let siderMenu = { key: "" };
    let redirectTo = "";

    if (headerMenuRole[session_header]) {
      headerMenu.key = session_header;
      siderMenu.key = session_sider;
    } else {
      for (let i = 0; i < Constants.headerMenus.length; i++) {
        const header_menu = Constants.headerMenus[i];
        if (headerMenuRole[header_menu.key]) {
          if (siderMenuRole[header_menu.key].some((item) => item === 1)) {
            headerMenu.key = header_menu.key;
            siderMenu.key = siderMenuRole[header_menu.key]
              .findIndex((item) => item === 1)
              .toString();
            redirectTo = Constants.siderMenus.filter(
              (item) => item.headerMenu === headerMenu.key
            )[siderMenuRole[header_menu.key].findIndex((item) => item === 1)]
              .link;
            break;
          }
          if (headerMenu.key !== "") {
            break;
          }
        }
      }
    }

    dispatch({
      type: INIT,
      payload: {
        headerMenu: headerMenu,
        siderMenu: siderMenu,
        redirectTo: redirectTo,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
export const setHeaderMenu = (key) => (dispatch, getState) => {
  const state = getState();
  const headerMenuRole = state.role.headerMenuRole;
  const siderMenuRole = state.role.siderMenuRole;

  let siderMenu = { key: "" };

  if (headerMenuRole[key]) {
    if (siderMenuRole[key].some((item) => item !== 0)) {
      siderMenu.key = siderMenuRole[key]
        .findIndex((item) => item !== 0)
        .toString();
    }
  }

  dispatch({
    type: SET_HEADER_MENU,
    payload: {
      key: key,
      siderMenu: siderMenu,
    },
  });
};
export const setSideMenu = (key) => ({
  type: SET_SIDE_MENU,
  payload: {
    key: key,
  },
});
export const removeRedirectTo = () => ({
  type: REMOVE_REDIRECTTO,
});

const initialState = {
  redirectTo: "",
  headerMenu: {
    key: sessionStorage.getItem("headerMenuKey")
      ? JSON.parse(sessionStorage.getItem("headerMenuKey"))
      : "car",
  },
  siderMenu: {
    key: sessionStorage.getItem("siderMenuKey")
      ? JSON.parse(sessionStorage.getItem("siderMenuKey"))
      : "0",
  },
};

export default function menu(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        headerMenu: action.payload.headerMenu,
        siderMenu: action.payload.siderMenu,
        redirectTo: action.payload.redirectTo,
      };
    case REMOVE_REDIRECTTO:
      return {
        ...state,
        redirectTo: "",
      };
    case SET_HEADER_MENU:
      return {
        ...state,
        headerMenu: {
          key: action.payload.key,
        },
        siderMenu: action.payload.siderMenu,
      };
    case SET_SIDE_MENU:
      return {
        ...state,
        siderMenu: {
          key: action.payload.key,
        },
      };
    default:
      return state;
  }
}
