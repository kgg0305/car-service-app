import { brandService } from "../../../../services/brandService";
import { groupService } from "../../../../services/groupService";
import { modelService } from "../../../../services/modelService";

const prefix = "car/model/list/";

const INIT = prefix + "INIT";
const SHOW_MORE = prefix + "SHOW_MORE";
const SEARCH = prefix + "SEARCH";
const SET_SEARCH = prefix + "SET_SEARCH";

export const init = () => async (dispatch) => {
  try {
    const dataSource = await modelService.getList(0);
    const dataLength = await modelService.getCount();
    const brandOptionList = await brandService.getOptionList();
    const groupOptionList = await groupService.getOptionList();

    dispatch({
      type: INIT,
      payload: {
        dataSource: dataSource,
        dataLength: dataLength,
        brandOptionList: brandOptionList,
        groupOptionList: groupOptionList,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const showMore = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const offset = state.modelList.offset + 10;
    const dataSource = await modelService.getList(offset);

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
    const searchData = state.modelList.searchData;
    const dataSource = await modelService.getList(0, searchData);

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
  dataSource: [],
  dataLength: 0,
  searchData: {
    brand_id: null,
    group_id: null,
    is_new: null,
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
          [action.payload.name]: action.payload.value,
        },
      };
    default:
      return state;
  }
}
