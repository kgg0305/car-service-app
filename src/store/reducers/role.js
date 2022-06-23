import { Constants } from "../../constants/Constants";
import { userRoleService } from "../../services/userRoleService";

const prefix = "role/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";

export const init = () => async (dispatch) => {
  try {
    const user_info = sessionStorage.getItem("token")
      ? JSON.parse(sessionStorage.getItem("token"))
      : null;
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
          siderMenuRole[header_menu.key].push(2);
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
              // 콘텐츠관리 -> 콘텐츠
              if (roleList.some((item) => item.name === "content1")) {
                role_info = roleList.filter(
                  (item) => item.name === "content1"
                )[0];
                temp_siderMenu.push(parseInt(role_info.status.split(",")[0]));
              } else {
                temp_siderMenu.push(0);
              }
              // 콘텐츠 운영관리
              if (roleList.some((item) => item.name === "content2")) {
                role_info = roleList.filter(
                  (item) => item.name === "content2"
                )[0];

                for (let j = 0; j < 4; j++) {
                  role_status = role_info.status.split(",")[j];

                  switch (j) {
                    case 0:
                      temp_siderMenu.push(parseInt(role_status));
                      break;
                    case 1:
                      temp_siderMenu.push(parseInt(role_status));
                      break;
                    case 2:
                      temp_siderMenu.push(parseInt(role_status));
                      temp_siderMenu.push(parseInt(role_status));
                      break;
                    case 3:
                      temp_siderMenu.push(parseInt(role_status));
                      temp_siderMenu.push(parseInt(role_status));
                      temp_siderMenu.push(parseInt(role_status));
                      break;
                  }
                }
              } else {
                for (let j = 0; j < 4; j++) {
                  switch (j) {
                    case 0:
                      temp_siderMenu.push(0);
                      break;
                    case 1:
                      temp_siderMenu.push(0);
                      break;
                    case 2:
                      temp_siderMenu.push(0);
                      temp_siderMenu.push(0);
                      break;
                    case 3:
                      temp_siderMenu.push(0);
                      temp_siderMenu.push(0);
                      temp_siderMenu.push(0);
                      break;
                  }
                }
              }

              // 콘텐츠관리 -> 매체 PV
              if (roleList.some((item) => item.name === "content1")) {
                role_info = roleList.filter(
                  (item) => item.name === "content1"
                )[0];

                temp_siderMenu.push(parseInt(role_info.status.split(",")[1]));
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

    dispatch({
      type: INIT,
      payload: {
        roleList: roleList,
        headerMenuRole: headerMenuRole,
        siderMenuRole: siderMenuRole,
        redirectTo: redirectTo,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
export const removeRedirectTo = () => ({
  type: REMOVE_REDIRECTTO,
});

const initialState = {
  redirectTo: "",
  refreshed: false,
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
        redirectTo: action.payload.redirectTo,
      };
    case REMOVE_REDIRECTTO:
      return {
        ...state,
        redirectTo: "",
        refreshed: true,
      };
    default:
      return state;
  }
}
