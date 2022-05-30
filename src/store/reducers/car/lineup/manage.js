import { modelService } from "../../../../services/modelService";
import { lineupService } from "../../../../services/lineupService";

const prefix = "car/lineup/manage/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_MORE = prefix + "SHOW_MORE";
const SHOW_CONFIRM = prefix + "SHOW_CONFIRM";
const CLOSE_CONFIRM = prefix + "CLOSE_CONFIRM";
const REMOVE = prefix + "REMOVE";
const SET_USE = prefix + "SET_USE";

export const init = (model_id) => async (dispatch) => {
  try {
    const dataSource = await lineupService.getList(0, {
      model_id: model_id,
    });
    const modelBodyInfo = await modelService.get(model_id);

    dispatch({
      type: INIT,
      payload: {
        dataSource: dataSource,
        modelBodyInfo: modelBodyInfo,
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
    const offset = state.lineupManage.offset + 10;
    const modelBodyInfo = state.lineupManage.modelBodyInfo;
    const dataSource = await lineupService.getList(offset, {
      model_id: modelBodyInfo.idx,
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
    await lineupService.remove(idx);

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
  const lineup_info = {
    ...dataSource.filter((item) => item.idx === idx)[0],
    is_use: value,
  };

  await lineupService.update(lineup_info);

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
  modelBodyInfo: {
    brand_name: "",
  },
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        modelBodyInfo: action.payload.modelBodyInfo,
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
