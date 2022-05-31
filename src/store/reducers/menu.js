import { Constants } from "../../constants/Constants";
import { userRoleService } from "../../services/userRoleService";

const prefix = "menu/";

const INIT = prefix + "INIT";
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

    let headerMenu = [];
    let sideMenu = [];

    // if (user_info.idx === 1) {
    //   for (let i = 0; i < Constants.headerMenus.length; i++) {
    //     const header_menu = Constants.headerMenus[i];
    //     headerMenu.push(true);
    //     for (
    //       let j = 0;
    //       j <
    //       Constants.siderMenus.filter(
    //         (item) => item.headerMenu === header_menu.key
    //       ).length;
    //       j++
    //     ) {
    //       sideMenu.push(true);
    //     }
    //   }
    // } else {
    //   for (let i = 0; i < Constants.headerMenus.length; i++) {
    //     const header_menu = Constants.headerMenus[i];
    //     if (
    //       roleList.some(
    //         (item) =>
    //           item.name === header_menu.key ||
    //           ((item.name === "content1" || item.name === "content2") &&
    //             header_menu.key === "content")
    //       )
    //     ) {
    //       headerMenu.push(true);

    //       let temp_sideMenu = [];
    //       let role_info;
    //       let role_status;
    //       switch (header_menu) {
    //         case "car":
    //           temp_sideMenu = [];
    //           role_info = roleList.filter((item) => item.name === "car")[0];

    //           for (
    //             let j = 0;
    //             j <
    //             Constants.siderMenus.filter(
    //               (item) => item.headerMenu === header_menu.key
    //             ).length;
    //             j++
    //           ) {
    //             if (role_info.status === "1") {
    //               temp_sideMenu.push(true);
    //             } else {
    //               temp_sideMenu.push(false);
    //             }
    //           }
    //           sideMenu.push(temp_sideMenu);
    //           break;
    //         case "finance":
    //           temp_sideMenu = [];
    //           role_info = roleList.filter((item) => item.name === "finance")[0];

    //           for (
    //             let j = 0;
    //             j <
    //             Constants.siderMenus.filter(
    //               (item) => item.headerMenu === header_menu.key
    //             ).length;
    //             j++
    //           ) {
    //             if (role_info.status === "1") {
    //               temp_sideMenu.push(true);
    //             } else {
    //               temp_sideMenu.push(false);
    //             }
    //           }
    //           sideMenu.push(temp_sideMenu);
    //           break;
    //         case "estimation":
    //           temp_sideMenu = [];
    //           role_info = roleList.filter(
    //             (item) => item.name === "estimation"
    //           )[0];

    //           for (let j = 0; j < 3; j++) {
    //             role_status = role_info.status.split(",")[i];
    //             if (role_status === "1" || (j == 1 && role_status == "2")) {
    //               temp_sideMenu.push(true);
    //             } else {
    //               temp_sideMenu.push(false);
    //             }
    //           }
    //           sideMenu.push(temp_sideMenu);
    //           break;
    //         case "content":
    //           temp_sideMenu = [];
    //           role_info = roleList.filter(
    //             (item) => item.name === "content1"
    //           )[0];

    //           for (let j = 0; j < 3; j++) {
    //             role_status = role_info.status.split(",")[i];
    //             if (role_status === "1" || (j == 1 && role_status == "2")) {
    //               temp_sideMenu.push(true);
    //             } else {
    //               temp_sideMenu.push(false);
    //             }
    //           }
    //           sideMenu.push(temp_sideMenu);
    //           break;
    //       }
    //     } else {
    //       headerMenu.push(false);

    //       let temp_sideMenu = [];
    //       for (
    //         let j = 0;
    //         j <
    //         Constants.siderMenus.filter(
    //           (item) => item.headerMenu === header_menu.key
    //         ).length;
    //         j++
    //       ) {
    //         temp_sideMenu.push(false);
    //       }
    //       sideMenu.push(temp_sideMenu);
    //     }
    //   }
    // }

    dispatch({
      type: INIT,
      payload: {
        roleList: roleList,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
export const setHeaderMenu = (key) => ({
  type: SET_HEADER_MENU,
  payload: {
    key: key,
  },
});
export const setSideMenu = (key) => ({
  type: SET_SIDE_MENU,
  payload: {
    key: key,
  },
});

const initialState = {
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
  headerMenuRole: [],
  sideMenuRole: [],
};

export default function menu(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        roleList: action.payload.roleList,
      };
    case SET_HEADER_MENU:
      return {
        ...state,
        headerMenu: {
          key: action.payload.key,
        },
        sideMenu: {
          key: "",
        },
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
