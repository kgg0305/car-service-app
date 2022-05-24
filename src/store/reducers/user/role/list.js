import { userRoleService } from "../../../../services/userRoleService";
import { userService } from "../../../../services/userService";

const prefix = "user/role/list/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SET_DATA_SOURCE = prefix + "SET_DATA_SOURCE";
const SET_STATUS = prefix + "SET_STATUS";
const ADD_USER_NAME = prefix + "ADD_USER_NAME";
const DELETE_USER_NAME = prefix + "DELETE_USER_NAME";
const SET_USER_NAME = prefix + "SET_USER_NAME";
const SET_CHECK_NAME = prefix + "SET_CHECK_NAME";
const SAVE = prefix + "SAVE";

export const init = () => async (dispatch) => {
  try {
    const dataSource = await userRoleService.getList(0);
    const roleIdList = dataSource.map((item) => item.idx);
    const userOptionList = await userService.getOptionList();

    dispatch({
      type: INIT,
      payload: {
        dataSource: dataSource,
        roleIdList: roleIdList,
        userOptionList: userOptionList,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
export const removeRedirectTo = () => ({
  type: REMOVE_REDIRECTTO,
});
export const setDataSource = (dataSource, idx, name, value) => (dispatch) => {
  const body = {
    ...dataSource.filter((body) => body.idx === idx)[0],
    [name]: value,
  };

  userRoleService.update(body);

  dispatch({
    type: SET_DATA_SOURCE,
    payload: {
      idx: idx,
      name: name,
      value: value,
    },
  });
};
export const addUserName =
  (name, userName, userOptionList, dataSource) => (dispatch) => {
    let updatedDataSource = [];

    if (userOptionList.some((item) => item.label === userName)) {
      const user_option_info = userOptionList.filter(
        (item) => item.label === userName
      )[0];

      updatedDataSource = [
        ...dataSource,
        {
          idx: null,
          number:
            dataSource.length == 0 ? 1 : dataSource[dataSource.length - 1],
          name: name,
          user_id: user_option_info.value,
          user_name: user_option_info.label,
          status: "0",
        },
      ];

      dispatch({
        type: ADD_USER_NAME,
        payload: {
          dataSource: updatedDataSource,
        },
      });
    } else {
      dispatch(setCheckName(name, true));
    }
  };
export const deleteUserName = (number) => ({
  type: DELETE_USER_NAME,
  payload: {
    number: number,
  },
});
export const setStatus = (number, status) => ({
  type: SET_STATUS,
  payload: {
    number: number,
    status: status,
  },
});
export const setUserName = (name, value) => ({
  type: SET_USER_NAME,
  payload: {
    name: name,
    value: value,
  },
});
export const setCheckName = (name, value) => ({
  type: SET_CHECK_NAME,
  payload: {
    name: name,
    value: value,
  },
});
export const save = (url, dataSource, roleIdList) => async (dispatch) => {
  //delete role
  for (let i = 0; i < roleIdList.length; i++) {
    const element = roleIdList[i];
    if (!dataSource.some((item) => item.idx === element)) {
      userRoleService.remove(element);
    }
  }

  //update role
  for (let i = 0; i < dataSource.length; i++) {
    const element = dataSource[i];
    if (element.idx) {
      await userRoleService.update(element);
    }
  }

  //create role
  const tempRoleBodyList = dataSource.filter((body) => body.idx === null);

  if (tempRoleBodyList.length > 0) {
    await userRoleService.create(tempRoleBodyList);
  }

  dispatch({
    type: SAVE,
    payload: {
      url: url,
    },
  });
};

const initialState = {
  redirectTo: "",
  dataSource: [],
  roleIdList: [],
  userOptionList: [],
  userName: {},
  checkName: false,
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        dataSource: action.payload.dataSource,
        roleIdList: action.payload.roleIdList,
        userOptionList: action.payload.userOptionList,
      };
    case REMOVE_REDIRECTTO:
      return {
        ...state,
        redirectTo: "",
      };
    case SET_DATA_SOURCE:
      return {
        ...state,
        dataSource: state.dataSource.map((body) =>
          body.idx === action.payload.idx
            ? {
                ...body,
                [action.payload.name]: action.payload.value,
              }
            : body
        ),
      };
    case ADD_USER_NAME:
      return {
        ...state,
        dataSource: action.payload.dataSource,
        checkName: false,
      };
    case DELETE_USER_NAME:
      return {
        ...state,
        dataSource: state.dataSource.filter(
          (item) => item.number !== action.payload.number
        ),
      };
    case SET_STATUS:
      return {
        ...state,
        dataSource: state.dataSource.map((item) => ({
          ...item,
          status:
            item.number === action.payload.number
              ? action.payload.status
              : item.status,
        })),
      };
    case SET_USER_NAME:
      return {
        ...state,
        userName: {
          [action.payload.name]: action.payload.value,
        },
      };
    case SET_CHECK_NAME:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
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