import { brandService } from "../../../../services/brandService";
import { groupService } from "../../../../services/groupService";
import { lineupService } from "../../../../services/lineupService";
import { trimService } from "../../../../services/trimService";
import { modelService } from "../../../../services/modelService";

const prefix = "car/trim/list/";

const INIT = prefix + "INIT";
const SHOW_MORE = prefix + "SHOW_MORE";
const SEARCH = prefix + "SEARCH";
const SET_SEARCH = prefix + "SET_SEARCH";

// 초기화
export const init = () => async (dispatch) => {
  try {
    const dataSource = await trimService.getList(0);
    const dataLength = await trimService.getCount();
    const brandOptionList = await brandService.getOptionList();
    const groupOptionList = await groupService.getOptionList();
    const modelOptionList = await modelService.getOptionList();
    const lineupOptionList = await lineupService.getOptionList();

    dispatch({
      type: INIT,
      payload: {
        dataSource: dataSource,
        dataLength: dataLength,
        brandOptionList: brandOptionList,
        groupOptionList: groupOptionList,
        modelOptionList: modelOptionList,
        lineupOptionList: lineupOptionList,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

// 더보기
export const showMore = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const offset = state.trimList.offset + 10;
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

// 검색
export const search = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const searchData = state.trimList.searchData;
    const dataSource = await trimService.getList(0, searchData);

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

// 검색 초기화
export const reset = () => async (dispatch) => {
  try {
    dispatch(init());
  } catch (e) {
    console.log(e);
  }
};

// 검색값 설정
export const setSearch = (name, value) => ({
  type: SET_SEARCH,
  payload: {
    name: name,
    value: value,
  },
});

// 초기상태값
const initialState = {
  offset: 0,
  brandOptionList: [],
  groupOptionList: [],
  modelOptionList: [],
  lineupOptionList: [],
  dataSource: [],
  dataLength: 0,
  searchData: {
    brand_id: null,
    group_id: null,
    model_id: null,
    lineup_id: null,
    is_use: null,
  },
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        brandOptionList: action.payload.brandOptionList,
        groupOptionList: action.payload.groupOptionList,
        modelOptionList: action.payload.modelOptionList,
        lineupOptionList: action.payload.lineupOptionList,
        dataSource: action.payload.dataSource,
        dataLength: action.payload.dataLength,
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
          group_id:
            action.payload.name === "brand_id"
              ? null
              : state.searchData.group_id,
          model_id:
            action.payload.name === "brand_id" ||
            action.payload.name === "group_id"
              ? null
              : state.searchData.model_id,
          lineup_id:
            action.payload.name === "brand_id" ||
            action.payload.name === "group_id" ||
            action.payload.name === "model_id"
              ? null
              : state.searchData.lineup_id,
          [action.payload.name]: action.payload.value,
        },
      };
    default:
      return state;
  }
}
