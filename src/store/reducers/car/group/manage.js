import { brandService } from "../../../../services/brandService";
import { groupService } from "../../../../services/groupService";

const prefix = "car/group/manage/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_MORE = prefix + "SHOW_MORE";
const SHOW_CONFIRM = prefix + "SHOW_CONFIRM";
const CLOSE_CONFIRM = prefix + "CLOSE_CONFIRM";
const REMOVE = prefix + "REMOVE";
const SET_USE = prefix + "SET_USE";
const SAVE = prefix + "SAVE";

export const init = (brand_id) => async (dispatch) => {
  try {
    const dataSource = await groupService.getList(0, {
      brand_id: brand_id,
    });
    const brandBodyInfo = await brandService.get(brand_id);

    dispatch({
      type: INIT,
      payload: {
        dataSource: dataSource,
        brandBodyInfo: brandBodyInfo,
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
    const offset = state.groupManage.offset + 10;
    const brandBodyInfo = state.groupManage.brandBodyInfo;
    const dataSource = await groupService.getList(offset, {
      brand_id: brandBodyInfo.idx,
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
export const remove = (idx) => async (dispatch) => {
  try {
    dispatch(closeConfirm());

    dispatch({
      type: REMOVE,
      payload: {
        idx: idx,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
export const setUse = (idx, value) => async (dispatch) => {
  dispatch({
    type: SET_USE,
    payload: {
      idx: idx,
      value: value,
    },
  });
};
export const save = (url) => async (dispatch, getState) => {
  try {
    const state = getState();
    const dataSource = state.groupManage.dataSource;
    const deleted_ids = state.groupManage.deleted_ids;
    const changed_ids = state.groupManage.changed_ids;

    for (let i = 0; i < changed_ids.length; i++) {
      const body_info =
        dataSource.filter((item) => item.idx === changed_ids[i]).length > 0
          ? dataSource.filter((item) => item.idx === changed_ids[i])[0]
          : null;

      if (body_info) {
        groupService.update(body_info);
      }
    }

    for (let i = 0; i < deleted_ids.length; i++) {
      const idx = deleted_ids[i];
      groupService.remove(idx);
    }

    dispatch({
      type: SAVE,
      payload: {
        url: url,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  redirectTo: "",
  offset: 0,
  confirm: {
    show: false,
    idx: null,
  },
  dataSource: [],
  dataLength: 0,
  brandBodyInfo: {
    brand_name: "",
  },
  deleted_ids: [],
  changed_ids: [],
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        brandBodyInfo: action.payload.brandBodyInfo,
        dataSource: action.payload.dataSource,
        dataLength: action.payload.dataLength,
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
        changed_ids: [...state.changed_ids, action.payload.idx],
      };
    case REMOVE:
      return {
        ...state,
        dataSource: state.dataSource.filter(
          (item) => item.idx !== action.payload.idx
        ),
        deleted_ids: [...state.deleted_ids, action.payload.idx],
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
