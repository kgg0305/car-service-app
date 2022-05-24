const SET_HEADER_MENU = "SET_HEADER_MENU";
const SET_SIDE_MENU = "SET_SIDE_MENU";

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
};

export default function menu(state = initialState, action) {
  switch (action.type) {
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
