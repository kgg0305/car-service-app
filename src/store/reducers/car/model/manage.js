import { brandService } from "../../../../services/brandService";
import { groupService } from "../../../../services/groupService";
import { modelService } from "../../../../services/modelService";

const prefix = "car/model/manage/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_MORE = prefix + "SHOW_MORE";
const SHOW_CONFIRM = prefix + "SHOW_CONFIRM";
const CLOSE_CONFIRM = prefix + "CLOSE_CONFIRM";
const REMOVE = prefix + "REMOVE";
const SET_USE = prefix + "SET_USE";

export const init = (group_id) => async (dispatch) => {
  try {
    const dataSource = await modelService.getList(0, {
      group_id: group_id,
    });
    const groupBodyInfo = await groupService.get(group_id);

    dispatch({
      type: INIT,
      payload: {
        dataSource: dataSource,
        groupBodyInfo: groupBodyInfo,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
export const removeRedirectTo = () => ({
  type: REMOVE_REDIRECTTO,
});
export const showMore = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const offset = state.modelManage.offset + 10;
    const groupBodyInfo = state.modelManage.groupBodyInfo;
    const dataSource = await modelService.getList(offset, {
      group_id: groupBodyInfo.idx,
    });

    dispatch({
      type: SHOW_MORE,
      payload: {
        dataSource: dataSource,
        offset: offset,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
export const showConfirm = (idx) => ({
  type: SHOW_CONFIRM,
  payload: {
    idx: idx,
  },
});
export const closeConfirm = () => ({
  type: CLOSE_CONFIRM,
});
export const remove = (url, idx) => async (dispatch) => {
  try {
    await modelService.remove(idx);

    dispatch({
      type: REMOVE,
      payload: {
        url: url,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
export const setUse = (idx, value, dataSource) => async (dispatch) => {
  const model_info = {
    ...dataSource.filter((item) => item.idx === idx)[0],
    is_use: value,
  };

  await modelService.update(model_info);

  dispatch({
    type: SET_USE,
    payload: {
      idx: idx,
      value: value,
    },
  });
};

const initialState = {
  redirectTo: "",
  offset: 0,
  confirm: {
    show: false,
    idx: null,
  },
  dataSource: [],
  groupBodyInfo: {
    group_name: "",
  },
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        groupBodyInfo: action.payload.groupBodyInfo,
        dataSource: action.payload.dataSource,
      };
    case REMOVE_REDIRECTTO:
      return {
        ...state,
        redirectTo: "",
      };
    case SHOW_CONFIRM:
      return {
        ...state,
        confirm: {
          ...state.confirm,
          show: true,
          idx: action.payload.idx,
        },
      };
    case CLOSE_CONFIRM:
      return {
        ...state,
        confirm: {
          ...state.confirm,
          show: false,
        },
      };
    case SHOW_MORE:
      return {
        ...state,
        dataSource: [...state.dataSource, ...action.payload.dataSource],
        offset: action.payload.offset,
      };
    case SET_USE:
      return {
        ...state,
        dataSource: state.dataSource.map((item) => ({
          ...item,
          is_use:
            item.idx === action.payload.idx
              ? action.payload.value
              : item.is_use,
        })),
      };
    case REMOVE:
      return {
        ...state,
        redirectTo: action.payload.url,
      };
    default:
      return state;
  }
}
