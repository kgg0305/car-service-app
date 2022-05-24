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

export const init = () => async (dispatch) => {
  try {
    const dataSource = await trimService.getList(0);
    const brandOptionList = await brandService.getOptionList();
    const groupOptionList = await groupService.getOptionList();
    const modelOptionList = await modelService.getOptionList();
    const lineupOptionList = await lineupService.getOptionList();

    dispatch({
      type: INIT,
      payload: {
        dataSource: dataSource,
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

export const search = (searchData) => async (dispatch) => {
  try {
    const dataSource = await trimService.getList(0, searchData);

    dispatch({
      type: SEARCH,
      payload: {
        offset: 0,
        dataSource: dataSource,
        searchData: searchData,
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

export const setSearch = (name, value) => ({
  type: SET_SEARCH,
  payload: {
    name: name,
    value: value,
  },
});

const initialState = {
  offset: 0,
  brandOptionList: [],
  groupOptionList: [],
  modelOptionList: [],
  lineupOptionList: [],
  dataSource: [],
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
        offset: action.payload.offset,
        dataSource: action.payload.dataSource,
        searchData: action.payload.searchData,
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
