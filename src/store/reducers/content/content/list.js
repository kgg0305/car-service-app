import { contentService } from "../../../../services/contentService";
import { GetDateStringFromDate } from "../../../../constants/GlobalFunctions";

const prefix = "content/content/list/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_MORE = prefix + "SHOW_MORE";
const SEARCH = prefix + "SEARCH";
const SET_SEARCH = prefix + "SET_SEARCH";
const SHOW_CONFIRM = prefix + "SHOW_CONFIRM";
const CLOSE_CONFIRM = prefix + "CLOSE_CONFIRM";
const REMOVE = prefix + "REMOVE";
const SET_USE = prefix + "SET_USE";

export const init = () => async (dispatch) => {
  try {
    const dataSource = await contentService.getList(0);

    dispatch({
      type: INIT,
      payload: {
        dataSource: dataSource,
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
    const offset = state.contentList.offset + 10;
    const dataSource = await contentService.getList(offset);

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

export const search = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const searchData = state.contentList.searchData;
    const dataSource = await contentService.getList(0, searchData);

    dispatch({
      type: SEARCH,
      payload: {
        dataSource: dataSource,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const reset = () => async (dispatch) => {
  try {
    dispatch(init());
  } catch (e) {
    console.log(e);
  }
};

export const setSearch = (name, value) => (dispatch) => {
  let s_date = null;
  let e_date = null;
  if (name === "date_period") {
    s_date = new Date();
    e_date = new Date();
    switch (value) {
      case 0:
        s_date = null;
        e_date = null;
        break;
      case 1:
        break;
      case 2:
        s_date.setDate(s_date.getDate() - 1);
        break;
      case 3:
        s_date.setDate(s_date.getDate() - 3);
        break;
      case 4:
        s_date.setDate(s_date.getDate() - 7);
        break;
      case 5:
        s_date.setMonth(s_date.getMonth() - 1);
        break;
      case 6:
        s_date.setMonth(s_date.getMonth() - 3);
        break;
      default:
        break;
    }

    if (value !== 0) {
      s_date = GetDateStringFromDate(s_date);
      e_date = GetDateStringFromDate(e_date);
    }
  }

  dispatch({
    type: SET_SEARCH,
    payload: {
      name: name,
      value: value,
      s_date: s_date,
      e_date: e_date,
    },
  });
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
    await contentService.remove(idx);

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

export const setUse = (dataSource, idx, checked) => async (dispatch) => {
  try {
    let body_info = dataSource.filter((item) => item.idx === idx)[0];
    body_info.is_use = checked ? "1" : "0";
    await contentService.update(body_info);

    dispatch({
      type: SET_USE,
      payload: {
        idx: null,
        checked: checked,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  offset: 0,
  confirm: {
    show: false,
    idx: null,
  },
  dataSource: [],
  searchData: {
    date_period: 0,
    s_date: null,
    e_date: null,
    idx: null,
    title: null,
    category_id: null,
    is_recommend: null,
    is_use: null,
  },
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        dataSource: action.payload.dataSource,
      };
    case REMOVE_REDIRECTTO:
      return {
        ...state,
        redirectTo: "",
      };
    case SHOW_MORE:
      return {
        ...state,
        dataSource: [...state.dataSource, ...action.payload.dataSource],
        offset: action.payload.offset,
      };
    case SEARCH:
      return {
        ...state,
        dataSource: action.payload.dataSource,
      };
    case SET_SEARCH:
      return {
        ...state,
        searchData: {
          ...state.searchData,
          s_date:
            action.payload.name === "date_period"
              ? action.payload.s_date
              : state.searchData.s_date,
          e_date:
            action.payload.name === "date_period"
              ? action.payload.e_date
              : state.searchData.e_date,
          [action.payload.name]: action.payload.value,
        },
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
          idx: null,
        },
      };
    case REMOVE:
      return {
        ...state,
        redirectTo: action.payload.url,
      };
    case SET_USE:
      return {
        ...state,
        dataSource: state.dataSource.map((body) =>
          body.idx === action.payload.idx
            ? {
                ...body,
                is_use: action.payload.checked ? "1" : "0",
              }
            : body
        ),
      };
    default:
      return state;
  }
}
