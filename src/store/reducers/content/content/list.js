import { contentService } from "../../../../services/contentService";
import { GetDateStringFromDate } from "../../../../constants/GlobalFunctions";
import { recommendationService } from "../../../../services/recommendationService";

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

// 초기화
export const init = () => async (dispatch) => {
  try {
    const mediaOptionList = await contentService.getMediaOptionList();
    const categoryOptionList = await contentService.getCategoryOptionList();
    const dataSource = await contentService.getList(0);
    const dataLength = await contentService.getCount();

    dispatch({
      type: INIT,
      payload: {
        mediaOptionList: mediaOptionList,
        categoryOptionList: categoryOptionList,
        dataSource: dataSource,
        dataLength: dataLength,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

// 재로딩 경로 삭제
export const removeRedirectTo = () => ({
  type: REMOVE_REDIRECTTO,
});

// 더보기
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

// 검색
export const search = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const searchData = state.contentList.searchData;
    const dataSource = await contentService.getList(0, searchData);
    const dataLength = await contentService.getCount(searchData);
    let updatedDataSource = [];

    if (searchData.is_recommend != null) {
      for (let i = 0; i < dataSource.length; i++) {
        const element = dataSource[i];

        const count = await recommendationService.getContentCount({
          content_id: element.idx,
        });

        if (
          (searchData.is_recommend === "0" && count !== 0) ||
          (searchData.is_recommend === "1" && count === 0)
        ) {
          updatedDataSource.push(element);
        }
      }
    } else {
      updatedDataSource = dataSource;
    }

    dispatch({
      type: SEARCH,
      payload: {
        dataSource: updatedDataSource,
        dataLength: dataLength,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

// 검색 초기화
export const reset = () => async (dispatch) => {
  try {
    dispatch(init());
  } catch (e) {
    console.log(e);
  }
};

// 검색값 설정
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

export const showConfirm = (idx) => (dispatch, getState) => {
  const state = getState();
  const dataSource = state.contentList.dataSource;

  const body_info = dataSource.filter((item) => item.idx === idx)[0];

  dispatch({
    type: SHOW_CONFIRM,
    payload: {
      idx: idx,
      name: body_info.title,
    },
  });
};

export const closeConfirm = () => ({
  type: CLOSE_CONFIRM,
});

// 삭제
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

// 초기상태값
const initialState = {
  offset: 0,
  confirm: {
    show: false,
    idx: null,
    name: "",
  },
  mediaOptionList: [],
  categoryOptionList: [],
  dataSource: [],
  dataLength: 0,
  searchData: {
    date_period: 0,
    s_date: null,
    e_date: null,
    media: null,
    title: null,
    category: null,
    is_recommend: null,
    is_use: null,
  },
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        mediaOptionList: action.payload.mediaOptionList,
        categoryOptionList: action.payload.categoryOptionList,
        dataSource: action.payload.dataSource,
        dataLength: action.payload.dataLength,
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
        dataLength: action.payload.dataLength,
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
          name: action.payload.name,
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
