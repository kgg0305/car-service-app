import { brandService } from "../../../../services/brandService";
import { carKindService } from "../../../../services/carKindService";
import { groupService } from "../../../../services/groupService";

const prefix = "car/group/list/";

const INIT = prefix + "INIT";
const SHOW_MORE = prefix + "SHOW_MORE";
const SEARCH = prefix + "SEARCH";
const SET_SEARCH = prefix + "SET_SEARCH";

export const init = () => async (dispatch) => {
  try {
    const dataSource = await groupService.getList(0);
    const brandOptionList = await brandService.getOptionList();
    const carKindOptionList = await carKindService.getOptionList();

    dispatch({
      type: INIT,
      payload: {
        dataSource: dataSource,
        brandOptionList: brandOptionList,
        carKindOptionList: carKindOptionList,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const showMore = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const offset = state.groupList.offset + 10;
    const dataSource = await groupService.getList(offset);

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
    const searchData = state.groupList.searchData;
    const dataSource = await groupService.getList(0, searchData);

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
  carKindOptionList: [],
  dataSource: [],
  searchData: {
    brand_id: null,
    is_use: null,
    car_kind_id: null,
  },
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        brandOptionList: action.payload.brandOptionList,
        carKindOptionList: action.payload.carKindOptionList,
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
        dataSource: action.payload.dataSource,
      };
    case SET_SEARCH:
      return {
        ...state,
        searchData: {
          ...state.searchData,
          [action.payload.name]: action.payload.value,
        },
      };
    default:
      return state;
  }
}
