import { brandService } from "../../../../services/brandService";
import { modelService } from "../../../../services/modelService";

const prefix = "car/brand/list/";

const INIT = prefix + "INIT";
const SHOW_MORE = prefix + "SHOW_MORE";
const SEARCH = prefix + "SEARCH";
const SET_SEARCH = prefix + "SET_SEARCH";

export const init = () => async (dispatch) => {
  try {
    const brandOptionList = await brandService.getOptionList();
    const dataSource = await brandService.getList(0);

    let updatedDataSource = [];

    for (let i = 0; i < dataSource.length; i++) {
      const element = dataSource[i];
      updatedDataSource.push({
        ...element,
        model_count: await modelService.getCount({
          brand_id: element.idx,
        }),
      });
    }

    dispatch({
      type: INIT,
      payload: {
        brandOptionList: brandOptionList,
        dataSource: updatedDataSource,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const showMore = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const offset = state.brandList.offset + 10;
    const dataSource = await brandService.getList(offset);

    let updatedDataSource = [];

    for (let i = 0; i < dataSource.length; i++) {
      const element = dataSource[i];
      updatedDataSource.push({
        ...element,
        model_count: await modelService.getCount({
          brand_id: element.idx,
        }),
      });
    }

    dispatch({
      type: SHOW_MORE,
      payload: {
        dataSource: updatedDataSource,
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
    const searchData = state.brandList.searchData;
    const dataSource = await brandService.getList(0, searchData);

    let updatedDataSource = [];

    for (let i = 0; i < dataSource.length; i++) {
      const element = dataSource[i];
      updatedDataSource.push({
        ...element,
        model_count: await modelService.getCount({
          brand_id: element.idx,
        }),
      });
    }

    dispatch({
      type: SEARCH,
      payload: {
        dataSource: updatedDataSource,
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
  dataSource: [],
  searchData: {
    idx: null,
    is_use: null,
  },
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        brandOptionList: action.payload.brandOptionList,
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
