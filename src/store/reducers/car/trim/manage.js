import { lineupService } from "../../../../services/lineupService";
import { trimService } from "../../../../services/trimService";

const prefix = "car/trim/manage/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_MORE = prefix + "SHOW_MORE";
const SHOW_CONFIRM = prefix + "SHOW_CONFIRM";
const CLOSE_CONFIRM = prefix + "CLOSE_CONFIRM";
const REMOVE = prefix + "REMOVE";
const SET_USE = prefix + "SET_USE";

export const init = (lineup_id) => async (dispatch) => {
  try {
    const dataSource = await trimService.getList(0, {
      lineup_id: lineup_id,
    });
    const lineupBodyInfo = await lineupService.get(lineup_id);

    dispatch({
      type: INIT,
      payload: {
        dataSource: dataSource,
        lineupBodyInfo: lineupBodyInfo,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
export const removeRedirectTo = () => ({
  type: REMOVE_REDIRECTTO,
});
export const showMore = (offset) => async (dispatch) => {
  try {
    const dataSource = await trimService.getList(offset);

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
    await trimService.remove(idx);

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
  const trim_info = {
    ...dataSource.filter((item) => item.idx === idx)[0],
    is_use: value,
  };

  await trimService.update(trim_info);

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
  lineupBodyInfo: {
    lineup_name: "",
  },
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        lineupBodyInfo: action.payload.lineupBodyInfo,
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
