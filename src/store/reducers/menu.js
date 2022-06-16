import { Constants } from "../../constants/Constants";
import { userRoleService } from "../../services/userRoleService";

const prefix = "menu/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SET_HEADER_MENU = prefix + "SET_HEADER_MENU";
const SET_SIDE_MENU = prefix + "SET_SIDE_MENU";

export const init = () => async (dispatch) => {
  try {
    const user_info = sessionStorage.getItem("token")
      ? JSON.parse(sessionStorage.getItem("token"))
      : null;
    const session_header = sessionStorage.getItem("headerMenuKey")
      ? JSON.parse(sessionStorage.getItem("headerMenuKey"))
      : "";
    const session_sider = sessionStorage.getItem("siderMenuKey")
      ? JSON.parse(sessionStorage.getItem("siderMenuKey"))
      : "";

    const roleList = await userRoleService.getList({
      user_id: user_info.idx,
    });

    let headerMenuRole = {};
    let siderMenuRole = {};

    if (user_info.idx === 1) {
      for (let i = 0; i < Constants.headerMenus.length; i++) {
        const header_menu = Constants.headerMenus[i];
        headerMenuRole[header_menu.key] = true;
        siderMenuRole[header_menu.key] = [];
        for (
          let j = 0;
          j <
          Constants.siderMenus.filter(
            (item) => item.headerMenu === header_menu.key
          ).length;
          j++
        ) {
          siderMenuRole[header_menu.key].push(1);
        }
      }
    } else {
      for (let i = 0; i < Constants.headerMenus.length; i++) {
        const header_menu = Constants.headerMenus[i];
        if (
          roleList.some(
            (item) =>
              item.name === header_menu.key ||
              ((item.name === "content1" || item.name === "content2") &&
                header_menu.key === "content")
          )
        ) {
          headerMenuRole[header_menu.key] = true;

          let temp_siderMenu = [];
          let role_info;
          let role_status;
          switch (header_menu.key) {
            case "car":
              role_info = roleList.filter(
                (item) => item.name === header_menu.key
              )[0];

              for (
                let j = 0;
                j <
                Constants.siderMenus.filter(
                  (item) => item.headerMenu === header_menu.key
                ).length;
                j++
              ) {
                temp_siderMenu.push(parseInt(role_info.status));
              }
              break;
            case "finance":
              role_info = roleList.filter(
                (item) => item.name === header_menu.key
              )[0];

              for (
                let j = 0;
                j <
                Constants.siderMenus.filter(
                  (item) => item.headerMenu === header_menu.key
                ).length;
                j++
              ) {
                temp_siderMenu.push(parseInt(role_info.status));
              }
              break;
            case "estimation":
              role_info = roleList.filter(
                (item) => item.name === header_menu.key
              )[0];

              for (let j = 0; j < 3; j++) {
                role_status = role_info.status.split(",")[j];
                if (j === 0) {
                  temp_siderMenu.push(parseInt(role_status));
                }
                temp_siderMenu.push(parseInt(role_status));
              }
              break;
            case "content":
              if (roleList.some((item) => item.name === "content2")) {
                role_info = roleList.filter(
                  (item) => item.name === "content2"
                )[0];

                for (let j = 0; j < 4; j++) {
                  role_status = role_info.status.split(",")[j];

                  switch (j) {
                    case 2:
                      temp_siderMenu.push(parseInt(role_status));
                      temp_siderMenu.push(parseInt(role_status));
                      break;
                    case 3:
                      temp_siderMenu.push(parseInt(role_status));
                      temp_siderMenu.push(parseInt(role_status));
                      temp_siderMenu.push(parseInt(role_status));
                      break;
                    default:
                      temp_siderMenu.push(parseInt(role_status));
                  }
                }
              } else {
                for (let j = 0; j < 4; j++) {
                  switch (j) {
                    case 2:
                      temp_siderMenu.push(0);
                      temp_siderMenu.push(0);
                      break;
                    case 3:
                      temp_siderMenu.push(0);
                      temp_siderMenu.push(0);
                      temp_siderMenu.push(0);
                      break;
                    default:
                      temp_siderMenu.push(0);
                  }
                }
              }

              if (roleList.some((item) => item.name === "content1")) {
                role_info = roleList.filter(
                  (item) => item.name === "content1"
                )[0];

                for (let j = 0; j < 2; j++) {
                  role_status = role_info.status.split(",")[j];
                  if (j === 1) {
                    temp_siderMenu.push(parseInt(role_status));
                  }
                }
              } else {
                temp_siderMenu.push(0);
              }
              break;
          }
          siderMenuRole[header_menu.key] = temp_siderMenu;
        } else {
          headerMenuRole[header_menu.key] = false;
          siderMenuRole[header_menu.key] = [];
        }
      }
      siderMenuRole["user"] = [0, 0, 0];
    }

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
        roleList: roleList,
        headerMenuRole: headerMenuRole,
        siderMenuRole: siderMenuRole,
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
  const headerMenuRole = state.menu.headerMenuRole;
  const siderMenuRole = state.menu.siderMenuRole;

  let siderMenu = { key: "" };

  if (headerMenuRole[key]) {
    if (siderMenuRole[key].some((item) => item === 1)) {
      siderMenu.key = siderMenuRole[key]
        .findIndex((item) => item === 1)
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
  roleList: [],
  headerMenuRole: {
    car: false,
    finance: false,
    estimation: false,
    content: false,
    user: false,
  },
  siderMenuRole: {
    car: [],
    finance: [],
    estimation: [],
    content: [],
    user: [],
  },
};

export default function menu(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        roleList: action.payload.roleList,
        headerMenuRole: action.payload.headerMenuRole,
        siderMenuRole: action.payload.siderMenuRole,
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
