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
    const roleList = await userRoleService.getList({
      user_id: user_info.idx,
    });

    let headerMenuRole = {};
    let sideMenuRole = {};

    if (user_info.idx === 1) {
      for (let i = 0; i < Constants.headerMenus.length; i++) {
        const header_menu = Constants.headerMenus[i];
        headerMenuRole[header_menu.key] = true;
        sideMenuRole[header_menu.key] = [];
        for (
          let j = 0;
          j <
          Constants.siderMenus.filter(
            (item) => item.headerMenu === header_menu.key
          ).length;
          j++
        ) {
          sideMenuRole[header_menu.key].push(1);
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

          let temp_sideMenu = [];
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
                temp_sideMenu.push(parseInt(role_info.status));
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
                temp_sideMenu.push(parseInt(role_info.status));
              }
              break;
            case "estimation":
              role_info = roleList.filter(
                (item) => item.name === header_menu.key
              )[0];

              for (let j = 0; j < 3; j++) {
                role_status = role_info.status.split(",")[j];
                if (j === 0) {
                  temp_sideMenu.push(parseInt(role_status));
                }
                temp_sideMenu.push(parseInt(role_status));
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
                      temp_sideMenu.push(parseInt(role_status));
                      temp_sideMenu.push(parseInt(role_status));
                      break;
                    case 3:
                      temp_sideMenu.push(parseInt(role_status));
                      temp_sideMenu.push(parseInt(role_status));
                      temp_sideMenu.push(parseInt(role_status));
                      break;
                    default:
                      temp_sideMenu.push(parseInt(role_status));
                  }
                }
              } else {
                for (let j = 0; j < 4; j++) {
                  switch (j) {
                    case 2:
                      temp_sideMenu.push(0);
                      temp_sideMenu.push(0);
                      break;
                    case 3:
                      temp_sideMenu.push(0);
                      temp_sideMenu.push(0);
                      temp_sideMenu.push(0);
                      break;
                    default:
                      temp_sideMenu.push(0);
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
                    temp_sideMenu.push(parseInt(role_status));
                  }
                }
              } else {
                temp_sideMenu.push(0);
              }
              break;
          }
          sideMenuRole[header_menu.key] = temp_sideMenu;
        } else {
          headerMenuRole[header_menu.key] = false;
          sideMenuRole[header_menu.key] = [];
        }
      }
      sideMenuRole["user"] = [0, 0, 0];
    }

    let headerMenu = { key: "" };
    let sideMenu = { key: "" };
    let redirectTo = "";
    for (let i = 0; i < Constants.headerMenus.length; i++) {
      const header_menu = Constants.headerMenus[i];
      if (headerMenuRole[header_menu.key]) {
        if (sideMenuRole[header_menu.key].some((item) => item === 1)) {
          headerMenu.key = header_menu.key;
          sideMenu.key = sideMenuRole[header_menu.key]
            .findIndex((item) => item === 1)
            .toString();
          redirectTo = Constants.siderMenus.filter(
            (item) => item.headerMenu === headerMenu.key
          )[sideMenuRole[header_menu.key].findIndex((item) => item === 1)].link;
          break;
        }
        if (headerMenu.key !== "") {
          break;
        }
      }
    }

    dispatch({
      type: INIT,
      payload: {
        roleList: roleList,
        headerMenuRole: headerMenuRole,
        sideMenuRole: sideMenuRole,
        headerMenu: headerMenu,
        sideMenu: sideMenu,
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
  const sideMenuRole = state.menu.sideMenuRole;

  let sideMenu = { key: "" };

  if (headerMenuRole[key]) {
    if (sideMenuRole[key].some((item) => item === 1)) {
      sideMenu.key = sideMenuRole[key]
        .findIndex((item) => item === 1)
        .toString();
    }
  }

  dispatch({
    type: SET_HEADER_MENU,
    payload: {
      key: key,
      sideMenu: sideMenu,
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
  sideMenu: {
    key: sessionStorage.getItem("sideMenuKey")
      ? JSON.parse(sessionStorage.getItem("sideMenuKey"))
      : "brand",
  },
  roleList: [],
  headerMenuRole: {
    car: false,
    finance: false,
    estimation: false,
    content: false,
    user: false,
  },
  sideMenuRole: {
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
        sideMenuRole: action.payload.sideMenuRole,
        headerMenu: action.payload.headerMenu,
        sideMenu: action.payload.sideMenu,
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
        sideMenu: action.payload.sideMenu,
      };
    case SET_SIDE_MENU:
      return {
        ...state,
        sideMenu: {
          key: action.payload.key,
        },
      };
    default:
      return state;
  }
}
